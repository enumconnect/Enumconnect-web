-- =============================================================================
-- Migration 1: foundation (revised to match docs/access-architecture.md)
--   * account types, staff roles, account status
--   * profiles (1:1 with auth.users) with a signup trigger
--   * RLS helper functions
--   * privileged admin functions (the only way to change status / staff roles)
--   * append-only audit_logs and notice_acknowledgements
--
-- Rules applied throughout:
--   1. RLS is enabled on every table. No policy = no access.
--   2. Table privileges are revoked, then re-granted minimally (column-level
--      where it matters), so RLS is not the only line of defence.
--   3. Every SECURITY DEFINER function sets search_path = '' and uses fully
--      qualified names.
--   4. Roles/status are never writable by clients directly.
-- =============================================================================

begin;

-- -----------------------------------------------------------------------------
-- Types
-- -----------------------------------------------------------------------------
create type public.user_role      as enum ('researcher', 'enumerator', 'staff');
create type public.account_status as enum ('active', 'suspended', 'deactivated');
create type public.staff_role     as enum (
  'verification_reviewer',
  'project_reviewer',
  'finance',
  'support',
  'security_auditor',
  'platform_admin'
);

-- -----------------------------------------------------------------------------
-- Generic helper triggers
-- -----------------------------------------------------------------------------
create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create function public.prevent_mutation()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  raise exception '% on %.% is not allowed: table is append-only',
    tg_op, tg_table_schema, tg_table_name;
end;
$$;

-- -----------------------------------------------------------------------------
-- Tables
-- -----------------------------------------------------------------------------

-- profiles: id mirrors auth.users.id. Cascade only removes the identity row.
-- Business tables added later reference profiles with ON DELETE RESTRICT, so a
-- user with business records goes through the anonymisation workflow instead
-- of being hard-deleted.
create table public.profiles (
  id             uuid primary key references auth.users (id) on delete cascade,
  role           public.user_role not null,
  account_status public.account_status not null default 'active',
  full_name      text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- staff_roles: which staff capabilities a staff account holds. No single
-- all-powerful admin (register DB-06).
create table public.staff_roles (
  user_id    uuid not null references public.profiles (id) on delete cascade,
  staff_role public.staff_role not null,
  granted_by uuid references public.profiles (id) on delete set null,
  granted_at timestamptz not null default now(),
  primary key (user_id, staff_role)
);

-- audit_logs: append-only. actor_id has NO foreign key on purpose: audit
-- history must outlive users. project_id is reserved for project-level events.
-- details must hold references, never sensitive values.
create table public.audit_logs (
  id           bigint generated always as identity primary key,
  occurred_at  timestamptz not null default now(),
  actor_id     uuid,
  actor_role   text,
  action       text not null,
  entity_table text not null,
  entity_id    text,
  project_id   uuid,
  details      jsonb not null default '{}'::jsonb
);

create index audit_logs_entity_idx  on public.audit_logs (entity_table, entity_id, occurred_at desc);
create index audit_logs_actor_idx   on public.audit_logs (actor_id, occurred_at desc);
create index audit_logs_project_idx on public.audit_logs (project_id, occurred_at desc);

create trigger audit_logs_no_update_delete
  before update or delete on public.audit_logs
  for each row execute function public.prevent_mutation();

create trigger audit_logs_no_truncate
  before truncate on public.audit_logs
  for each statement execute function public.prevent_mutation();

-- notice_acknowledgements: evidence that a notice/terms version was presented
-- to a user (register section 6, "Privacy notice record"). This is NOT a
-- consent table: consent is not assumed to be the lawful basis for processing.
create table public.notice_acknowledgements (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references public.profiles (id) on delete restrict,
  notice_type    text not null check (notice_type in ('privacy_notice', 'terms')),
  notice_version text not null,
  presented_at   timestamptz not null default now()
);

create index notice_acknowledgements_user_idx
  on public.notice_acknowledgements (user_id, notice_type, presented_at desc);

create trigger notice_acknowledgements_no_update_delete
  before update or delete on public.notice_acknowledgements
  for each row execute function public.prevent_mutation();

create trigger notice_acknowledgements_no_truncate
  before truncate on public.notice_acknowledgements
  for each statement execute function public.prevent_mutation();

-- -----------------------------------------------------------------------------
-- RLS helper functions
-- -----------------------------------------------------------------------------
-- SECURITY DEFINER so they can read profiles/staff_roles without re-triggering
-- those tables' own RLS policies (which would recurse infinitely).
-- Suspended or deactivated accounts get NULL / false: no access at all.
create function public.current_account_type()
returns public.user_role
language sql
stable
security definer
set search_path = ''
as $$
  select p.role
  from public.profiles p
  where p.id = (select auth.uid())
    and p.account_status = 'active'
$$;

create function public.has_staff_role(required_role public.staff_role)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.staff_roles sr
    join public.profiles p on p.id = sr.user_id
    where sr.user_id = (select auth.uid())
      and sr.staff_role = required_role
      and p.role = 'staff'
      and p.account_status = 'active'
  )
$$;

revoke execute on function public.current_account_type()              from public, anon;
revoke execute on function public.has_staff_role(public.staff_role)   from public, anon;
grant  execute on function public.current_account_type()              to authenticated;
grant  execute on function public.has_staff_role(public.staff_role)   to authenticated;

-- -----------------------------------------------------------------------------
-- Signup trigger: create the profile when Supabase Auth creates the user
-- -----------------------------------------------------------------------------
-- raw_user_meta_data is supplied by the CLIENT at sign-up, so it is untrusted.
-- It is accepted only to choose between the two self-service account types.
-- 'staff' can never be obtained this way. Anything else aborts the signup.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  requested_role text := new.raw_user_meta_data ->> 'role';
begin
  if requested_role is null or requested_role not in ('researcher', 'enumerator') then
    raise exception 'Sign-up requires role = researcher or enumerator';
  end if;

  insert into public.profiles (id, role, full_name)
  values (
    new.id,
    requested_role::public.user_role,
    nullif(btrim(new.raw_user_meta_data ->> 'full_name'), '')
  );

  return new;
end;
$$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Only staff accounts may hold staff roles.
create function public.staff_roles_require_staff_account()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not exists (
    select 1 from public.profiles p where p.id = new.user_id and p.role = 'staff'
  ) then
    raise exception 'Staff roles can only be granted to staff accounts';
  end if;
  return new;
end;
$$;

revoke execute on function public.staff_roles_require_staff_account() from public, anon, authenticated;

create trigger staff_roles_require_staff
  before insert on public.staff_roles
  for each row execute function public.staff_roles_require_staff_account();

-- -----------------------------------------------------------------------------
-- Audit triggers
-- -----------------------------------------------------------------------------
create function public.log_profile_access_changes()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.role is distinct from old.role
     or new.account_status is distinct from old.account_status then
    insert into public.audit_logs (actor_id, actor_role, action, entity_table, entity_id, details)
    values (
      (select auth.uid()),
      public.current_account_type()::text,
      'profile.access_changed',
      'profiles',
      new.id::text,
      jsonb_build_object(
        'old_role',   old.role,
        'new_role',   new.role,
        'old_status', old.account_status,
        'new_status', new.account_status
      )
    );
  end if;
  return new;
end;
$$;

revoke execute on function public.log_profile_access_changes() from public, anon, authenticated;

create trigger profiles_audit_access_changes
  after update on public.profiles
  for each row execute function public.log_profile_access_changes();

create function public.log_staff_role_changes()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  affected public.staff_roles;
begin
  if tg_op = 'DELETE' then
    affected := old;
  else
    affected := new;
  end if;

  insert into public.audit_logs (actor_id, actor_role, action, entity_table, entity_id, details)
  values (
    (select auth.uid()),
    public.current_account_type()::text,
    case when tg_op = 'DELETE' then 'staff_role.revoked' else 'staff_role.granted' end,
    'staff_roles',
    affected.user_id::text,
    jsonb_build_object('staff_role', affected.staff_role)
  );

  return affected;
end;
$$;

revoke execute on function public.log_staff_role_changes() from public, anon, authenticated;

create trigger staff_roles_audit_changes
  after insert or delete on public.staff_roles
  for each row execute function public.log_staff_role_changes();

-- -----------------------------------------------------------------------------
-- Privileged admin functions
-- -----------------------------------------------------------------------------
-- Clients have no direct write access to account_status or staff_roles. These
-- functions are the only path, they re-check the caller's staff role, and a
-- platform admin cannot change their own status or roles.
create function public.set_account_status(
  target_user uuid,
  new_status  public.account_status
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.has_staff_role('platform_admin') then
    raise exception 'Not permitted' using errcode = '42501';
  end if;
  if target_user = (select auth.uid()) then
    raise exception 'You cannot change your own account status' using errcode = '42501';
  end if;

  update public.profiles
  set account_status = new_status
  where id = target_user;

  if not found then
    raise exception 'Unknown user' using errcode = 'P0002';
  end if;
end;
$$;

create function public.grant_staff_role(
  target_user   uuid,
  new_staff_role public.staff_role
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.has_staff_role('platform_admin') then
    raise exception 'Not permitted' using errcode = '42501';
  end if;
  if target_user = (select auth.uid()) then
    raise exception 'You cannot change your own staff roles' using errcode = '42501';
  end if;

  insert into public.staff_roles (user_id, staff_role, granted_by)
  values (target_user, new_staff_role, (select auth.uid()))
  on conflict do nothing;
end;
$$;

create function public.revoke_staff_role(
  target_user    uuid,
  old_staff_role public.staff_role
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.has_staff_role('platform_admin') then
    raise exception 'Not permitted' using errcode = '42501';
  end if;
  if target_user = (select auth.uid()) then
    raise exception 'You cannot change your own staff roles' using errcode = '42501';
  end if;

  delete from public.staff_roles
  where user_id = target_user and staff_role = old_staff_role;
end;
$$;

revoke execute on function public.set_account_status(uuid, public.account_status) from public, anon;
revoke execute on function public.grant_staff_role(uuid, public.staff_role)       from public, anon;
revoke execute on function public.revoke_staff_role(uuid, public.staff_role)      from public, anon;
grant  execute on function public.set_account_status(uuid, public.account_status) to authenticated;
grant  execute on function public.grant_staff_role(uuid, public.staff_role)       to authenticated;
grant  execute on function public.revoke_staff_role(uuid, public.staff_role)      to authenticated;

-- -----------------------------------------------------------------------------
-- Privileges and RLS
-- -----------------------------------------------------------------------------

-- profiles ---------------------------------------------------------------------
alter table public.profiles enable row level security;

revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;
-- Column-level grant: a user can edit ONLY their name.
grant update (full_name) on public.profiles to authenticated;

create policy profiles_select_own
  on public.profiles for select to authenticated
  using (id = (select auth.uid()));

create policy profiles_select_staff
  on public.profiles for select to authenticated
  using (public.has_staff_role('support') or public.has_staff_role('platform_admin'));

create policy profiles_update_own
  on public.profiles for update to authenticated
  using (id = (select auth.uid()) and account_status = 'active')
  with check (id = (select auth.uid()));
-- No insert policy (signup trigger inserts) and no delete policy.

-- staff_roles ------------------------------------------------------------------
alter table public.staff_roles enable row level security;

revoke all on public.staff_roles from anon, authenticated;
grant select on public.staff_roles to authenticated;

create policy staff_roles_select_own
  on public.staff_roles for select to authenticated
  using (user_id = (select auth.uid()));

create policy staff_roles_select_oversight
  on public.staff_roles for select to authenticated
  using (public.has_staff_role('platform_admin') or public.has_staff_role('security_auditor'));
-- No write policies: grant/revoke only through the admin functions above.

-- audit_logs -------------------------------------------------------------------
alter table public.audit_logs enable row level security;

revoke all on public.audit_logs from anon, authenticated;
grant select on public.audit_logs to authenticated;

create policy audit_logs_select_auditor
  on public.audit_logs for select to authenticated
  using (public.has_staff_role('security_auditor'));
-- Clients can never write audit rows; triggers and server code do.

-- notice_acknowledgements ------------------------------------------------------
alter table public.notice_acknowledgements enable row level security;

revoke all on public.notice_acknowledgements from anon, authenticated;
grant select, insert on public.notice_acknowledgements to authenticated;

create policy notice_ack_select_own
  on public.notice_acknowledgements for select to authenticated
  using (user_id = (select auth.uid()));

create policy notice_ack_select_support
  on public.notice_acknowledgements for select to authenticated
  using (public.has_staff_role('support'));

create policy notice_ack_insert_own
  on public.notice_acknowledgements for insert to authenticated
  with check (
    user_id = (select auth.uid())
    and public.current_account_type() is not null
  );

commit;
