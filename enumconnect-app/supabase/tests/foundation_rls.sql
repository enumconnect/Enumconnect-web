-- =============================================================================
-- Foundation isolation tests (synthetic data only)
--
-- Run AFTER migration 20261102100000_foundation.sql is applied, in the Supabase
-- SQL editor (runs as the postgres role). The whole script is one transaction
-- that ends in ROLLBACK, so it leaves no users, rows or log entries behind.
--
-- Each DO block impersonates a user the same way Supabase does: it sets the JWT
-- claims and switches to the `authenticated` role, so RLS and column grants
-- apply exactly as they do for real API requests. A failed assertion aborts
-- the script with a message saying which rule broke.
--
-- Users:  A, B = researchers | E = enumerator
--         S1 = staff (platform_admin) | S2 = staff (security_auditor)
-- =============================================================================

begin;

-- Synthetic users. The signup trigger creates their profiles.
insert into auth.users (id, email, raw_user_meta_data) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'a@test.invalid',  '{"role":"researcher","full_name":"Researcher A"}'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'b@test.invalid',  '{"role":"researcher","full_name":"Researcher B"}'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'e@test.invalid',  '{"role":"enumerator","full_name":"Enumerator E"}'),
  ('55555555-5555-5555-5555-555555555555', 's1@test.invalid', '{"role":"researcher","full_name":"Staff One"}'),
  ('66666666-6666-6666-6666-666666666666', 's2@test.invalid', '{"role":"researcher","full_name":"Staff Two"}');

-- T1: signup created profiles with the requested account types ------------------
do $$
begin
  assert (select role from public.profiles where id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa') = 'researcher',
    'T1: A should be a researcher';
  assert (select role from public.profiles where id = 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee') = 'enumerator',
    'T1: E should be an enumerator';
end $$;

-- T2: signup cannot obtain staff, or omit the role -----------------------------
do $$
declare
  rejected int := 0;
begin
  begin
    insert into auth.users (id, email, raw_user_meta_data)
    values (gen_random_uuid(), 'x1@test.invalid', '{"role":"staff"}');
  exception when raise_exception then
    rejected := rejected + 1;
  end;

  begin
    insert into auth.users (id, email, raw_user_meta_data)
    values (gen_random_uuid(), 'x2@test.invalid', '{}');
  exception when raise_exception then
    rejected := rejected + 1;
  end;

  assert rejected = 2, 'T2: signup with role=staff or no role must be rejected';
end $$;

-- Promote S1 and S2 to staff (bootstrap path: done as postgres, never by a client)
update public.profiles set role = 'staff'
where id in ('55555555-5555-5555-5555-555555555555', '66666666-6666-6666-6666-666666666666');

insert into public.staff_roles (user_id, staff_role) values
  ('55555555-5555-5555-5555-555555555555', 'platform_admin'),
  ('66666666-6666-6666-6666-666666666666', 'security_auditor');

-- T3: staff roles can only go to staff accounts --------------------------------
do $$
declare
  rejected boolean := false;
begin
  begin
    insert into public.staff_roles (user_id, staff_role)
    values ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'finance');
  exception when raise_exception then
    rejected := true;
  end;
  assert rejected, 'T3: a researcher account must not be able to hold a staff role';
end $$;

-- T4: researcher A sees only their own profile ---------------------------------
do $$
declare
  n int;
begin
  perform set_config('request.jwt.claims',
    json_build_object('sub', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'role', 'authenticated')::text, true);
  set local role authenticated;

  select count(*) into n from public.profiles;
  assert n = 1, format('T4: A should see exactly 1 profile, saw %s', n);

  select count(*) into n from public.profiles where id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
  assert n = 0, 'T4: A must not see B''s profile';

  reset role;
end $$;

-- T5: a user cannot change their own role or status, nor edit someone else -----
do $$
declare
  blocked_role   boolean := false;
  blocked_status boolean := false;
  n int;
begin
  perform set_config('request.jwt.claims',
    json_build_object('sub', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'role', 'authenticated')::text, true);
  set local role authenticated;

  begin
    update public.profiles set role = 'staff' where id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
  exception when insufficient_privilege then
    blocked_role := true;
  end;
  assert blocked_role, 'T5: A must not be able to change their own role';

  begin
    update public.profiles set account_status = 'active' where id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
  exception when insufficient_privilege then
    blocked_status := true;
  end;
  assert blocked_status, 'T5: A must not be able to change their own account status';

  update public.profiles set full_name = 'Researcher A (edited)'
  where id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
  get diagnostics n = row_count;
  assert n = 1, 'T5: A should be able to edit their own name';

  update public.profiles set full_name = 'hacked'
  where id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
  get diagnostics n = row_count;
  assert n = 0, 'T5: A must not be able to edit B''s profile';

  reset role;
end $$;

-- T6: ordinary users cannot read or write audit logs ---------------------------
do $$
declare
  n int;
  blocked boolean := false;
begin
  perform set_config('request.jwt.claims',
    json_build_object('sub', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'role', 'authenticated')::text, true);
  set local role authenticated;

  select count(*) into n from public.audit_logs;
  assert n = 0, format('T6: A should see 0 audit rows, saw %s', n);

  begin
    insert into public.audit_logs (action, entity_table) values ('forged', 'profiles');
  exception when insufficient_privilege then
    blocked := true;
  end;
  assert blocked, 'T6: A must not be able to write audit rows';

  reset role;
end $$;

-- T7: notice acknowledgements: own only, insert-only ---------------------------
do $$
declare
  n int;
  blocked_other  boolean := false;
  blocked_update boolean := false;
begin
  perform set_config('request.jwt.claims',
    json_build_object('sub', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'role', 'authenticated')::text, true);
  set local role authenticated;

  insert into public.notice_acknowledgements (user_id, notice_type, notice_version)
  values ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'privacy_notice', 'v1');

  begin
    insert into public.notice_acknowledgements (user_id, notice_type, notice_version)
    values ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'privacy_notice', 'v1');
  exception when insufficient_privilege then
    blocked_other := true;
  end;
  assert blocked_other, 'T7: A must not record a notice acknowledgement for B';

  begin
    update public.notice_acknowledgements set notice_version = 'v0';
  exception when insufficient_privilege then
    blocked_update := true;
  end;
  assert blocked_update, 'T7: acknowledgements must not be updatable by clients';

  select count(*) into n from public.notice_acknowledgements;
  assert n = 1, format('T7: A should see exactly 1 acknowledgement, saw %s', n);

  reset role;
end $$;

-- T8: non-staff cannot use the admin functions ---------------------------------
do $$
declare
  blocked_status boolean := false;
  blocked_grant  boolean := false;
begin
  perform set_config('request.jwt.claims',
    json_build_object('sub', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'role', 'authenticated')::text, true);
  set local role authenticated;

  begin
    perform public.set_account_status('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'suspended');
  exception when insufficient_privilege then
    blocked_status := true;
  end;
  assert blocked_status, 'T8: a researcher must not be able to suspend accounts';

  begin
    perform public.grant_staff_role('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'platform_admin');
  exception when insufficient_privilege then
    blocked_grant := true;
  end;
  assert blocked_grant, 'T8: a researcher must not be able to grant staff roles';

  reset role;
end $$;

-- T9: platform admin can manage accounts, but not themselves, and not read audit
do $$
declare
  n int;
  blocked_self boolean := false;
begin
  perform set_config('request.jwt.claims',
    json_build_object('sub', '55555555-5555-5555-5555-555555555555', 'role', 'authenticated')::text, true);
  set local role authenticated;

  perform public.set_account_status('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'suspended');

  begin
    perform public.set_account_status('55555555-5555-5555-5555-555555555555', 'deactivated');
  exception when insufficient_privilege then
    blocked_self := true;
  end;
  assert blocked_self, 'T9: a platform admin must not change their own status';

  select count(*) into n from public.profiles;
  assert n >= 5, format('T9: platform admin should see all profiles, saw %s', n);

  select count(*) into n from public.audit_logs;
  assert n = 0, 'T9: platform admin must not read audit logs (that is the auditor role)';

  reset role;
end $$;

-- T10: a suspended user loses write access and role resolution -----------------
do $$
declare
  n int;
  blocked boolean := false;
begin
  perform set_config('request.jwt.claims',
    json_build_object('sub', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'role', 'authenticated')::text, true);
  set local role authenticated;

  assert public.current_account_type() is null, 'T10: suspended A should resolve to no account type';

  update public.profiles set full_name = 'still editing'
  where id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
  get diagnostics n = row_count;
  assert n = 0, 'T10: suspended A must not be able to edit their profile';

  begin
    insert into public.notice_acknowledgements (user_id, notice_type, notice_version)
    values ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'terms', 'v1');
  exception when insufficient_privilege then
    blocked := true;
  end;
  assert blocked, 'T10: suspended A must not be able to write records';

  reset role;
end $$;

-- T11: the security auditor sees the trail, including who did what -------------
do $$
declare
  n int;
begin
  perform set_config('request.jwt.claims',
    json_build_object('sub', '66666666-6666-6666-6666-666666666666', 'role', 'authenticated')::text, true);
  set local role authenticated;

  select count(*) into n from public.audit_logs where action = 'staff_role.granted';
  assert n >= 2, format('T11: expected >= 2 staff_role.granted rows, saw %s', n);

  select count(*) into n from public.audit_logs
  where action = 'profile.access_changed'
    and actor_id = '55555555-5555-5555-5555-555555555555'
    and entity_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
  assert n = 1, 'T11: the suspension of A by S1 should be logged with S1 as actor';

  reset role;
end $$;

-- T12: staff_roles visibility: own rows for users, all for oversight roles -----
do $$
declare
  n int;
begin
  perform set_config('request.jwt.claims',
    json_build_object('sub', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'role', 'authenticated')::text, true);
  set local role authenticated;
  select count(*) into n from public.staff_roles;
  assert n = 0, 'T12: a researcher must not see staff role assignments';
  reset role;

  perform set_config('request.jwt.claims',
    json_build_object('sub', '55555555-5555-5555-5555-555555555555', 'role', 'authenticated')::text, true);
  set local role authenticated;
  select count(*) into n from public.staff_roles;
  assert n >= 2, 'T12: platform admin should see staff role assignments';
  reset role;
end $$;

-- T13: audit logs and acknowledgements are append-only, even for postgres ------
do $$
declare
  blocked_update   boolean := false;
  blocked_delete   boolean := false;
  blocked_truncate boolean := false;
begin
  begin
    update public.audit_logs set action = 'tampered';
  exception when raise_exception then
    blocked_update := true;
  end;
  assert blocked_update, 'T13: audit_logs must reject UPDATE';

  begin
    delete from public.audit_logs;
  exception when raise_exception then
    blocked_delete := true;
  end;
  assert blocked_delete, 'T13: audit_logs must reject DELETE';

  begin
    truncate public.audit_logs;
  exception when raise_exception then
    blocked_truncate := true;
  end;
  assert blocked_truncate, 'T13: audit_logs must reject TRUNCATE';
end $$;

select 'ALL FOUNDATION TESTS PASSED' as result;

rollback;
