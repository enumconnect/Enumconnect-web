# EnumConnect backend: access architecture (draft for team review)

Source: Data Protection Requirements Register v1.0 (2 Nov 2026), section 8 item P0 "Data inventory and access architecture". This must be agreed before further core tables are built. Status: **proposed, not yet approved**.

## 1. Principles

1. The database decides access (RLS). API code authenticates and validates; it never is the only gate.
2. Access is granted per project, never globally. No role reads research data just because of what it is.
3. Anything privileged (service-role key) lives in server-only modules and is used for a short, audited list of jobs.
4. Sensitive values never appear in logs, notifications or error messages. Logs store record references, not content.
5. Every column has a documented purpose, access rule and retention rule (see `docs/data-dictionary.md`, to be created with each migration).

## 2. Identities

**Account type** (`profiles.role`): `researcher`, `enumerator`, `staff`. Chosen at signup for the first two only; `staff` can never be self-selected.

**Staff roles** (`staff_roles` table, many per user, DB-06). Replaces a single all-powerful `admin`:

| staff_role | Can | Cannot |
|---|---|---|
| verification_reviewer | Review identity documents and record decisions (DP-04) | Research data, payments |
| project_reviewer | Review sensitive-research declarations and ethics/site documents (DP-07 review, DP-09) | Participant data, submissions |
| finance | Payment and payout records (DP-10) | Research data, identity documents |
| support | Support and privacy requests (DP-12), limited account info (DP-01) | Research data, documents |
| security_auditor | Read audit records (DP-11) | Write anything, research data |
| platform_admin | Suspend/reactivate accounts, grant/revoke staff roles | Research data by default |

No staff role reads DP-06, DP-07 or DP-08 data by default. Any exception path (break-glass) is an open decision (section 9).

## 3. Project-level access

- `projects.owner_id` (DB-01) plus a `project_memberships` row per researcher on the project (DB-04): `project_role` (owner, member), `can_view_sensitive`, `status`, `granted_by`, `granted_at`, `revoked_at`. Owner membership is created by a trigger.
- Enumerators are **not** memberships. They get access only through `project_assignments` (DB-03).
- Access to restricted project records is evaluated at query time from the assignment status, so revocation is immediate (DB-07). There is no cached permission to clear.

Assignment statuses (from the PRD) and what each grants an enumerator:

| Status | Access |
|---|---|
| offered | Listing-level project summary only |
| accepted, in_progress, submitted, revision_requested, resubmitted | Assigned-project access: own assignment, own submissions, project instructions |
| approved, rejected, cancelled, disputed | **Decision needed** (section 9). Proposed: own assignment row and own payment status only; no restricted project records |

## 4. Access matrix (proposed)

| Table | DP | Read | Write |
|---|---|---|---|
| profiles | DP-01 | Owner; support (limited columns) | Owner (name only); platform_admin (status) |
| staff_roles | n/a | platform_admin, security_auditor | platform_admin, audited |
| researcher_profiles | DP-02 | Owner; public fields visible to enumerators connected to their projects | Owner |
| enumerator_profiles | DP-03 | Owner; researchers see public fields only for applicants/invitees on their projects | Owner |
| verification_records, verification docs | DP-04 | Owner (status only); verification_reviewer | Owner (submit); verification_reviewer (decision) |
| projects | DP-05 | Project members; assigned enumerators (restricted columns) | Owner and permitted members |
| project_memberships | DP-05 | Members of that project | Project owner |
| project_assignments | DP-05 | Project members; the assigned enumerator | Project members (offer/revoke); enumerator (accept/decline/submit status) |
| research_submissions | DP-06 | Project members; submitting enumerator while assigned | Assigned enumerator; members (review) |
| sensitive_responses | DP-07 | **No direct SELECT.** Only via logged RPC, for members with `can_view_sensitive` | Assigned enumerator (insert) once the project's sensitive review is approved |
| participant_records | DP-06 | Project members with permission; pseudonymous reference by default | Assigned enumerator, members |
| gps_verifications | DP-08 | Project members; the assignment's enumerator (own events) | Enumerator (event-based insert) |
| project_documents, files | DP-09 | Project members; project_reviewer | Project members; project_reviewer (decision) |
| payments, ledger | DP-10 | Relevant user; finance | Server-side only (webhooks/service role) |
| audit_logs | DP-11 | security_auditor | Triggers and server functions only; append-only |
| privacy_requests, support | DP-12 | Assigned support staff; requester | Requester; support |
| notice_acknowledgements | privacy records | Owner; support (limited) | Owner (insert only) |
| consent_records | privacy records | Project members; participant reference | Enumerator/server (insert; withdrawal = new row) |

## 5. RLS helper functions (SECURITY DEFINER, search_path = '')

`has_staff_role(role)`, `is_project_member(project_id)`, `has_project_role(project_id, roles[])`, `can_view_sensitive(project_id)`, `is_assigned_enumerator(project_id)` (checks the access-granting status set above), `current_account_type()`.

All return false/null for suspended or deactivated accounts.

## 6. Auditing reads

Triggers cannot fire on SELECT, so "record access to sensitive research records" needs a different pattern:

- Sensitive values live in a separate table with no client SELECT grant.
- They are read through an RPC function that (1) re-checks `can_view_sensitive`, (2) writes the access-log row, (3) returns the data, all in one transaction. If logging fails, the read fails (fail closed).
- The same pattern applies to GPS coordinates, verification documents (signed-URL issuance) and data exports.

Audit rows store actor, project, action, record reference and timestamp. Never values (DP-11, register section 4C).

## 7. Public and semi-public surfaces

- **Project discovery:** a curated view of open projects with explicit columns only (never `select *`). Views run with the owner's rights and bypass RLS, so the column list is the security boundary.
- **QR verification:** one function returning only status fields (identity status, assignment status, scope, expiry/revocation). No raw GPS, no documents, no contact details.

## 8. Files, errors, secrets

- Private buckets only; object paths start with `<project_id>/` or `<user_id>/`; storage RLS checks membership from the path; downloads use short-lived signed URLs issued after an authorisation check (SEC-04).
- RLS denial returns zero rows, so the API must answer "not found" and "not allowed" identically (SEC-10).
- Service-role code lives in modules marked `server-only` so it cannot be imported into client bundles (SEC-06).

## 9. Open decisions (need an owner)

1. What can an enumerator still see after approval, revocation or during a dispute? (proposal in section 3)
2. Is any staff break-glass access to research data allowed? If yes: time-boxed, reason recorded, audited, requires two staff.
3. GPS: store raw coordinates or only result, accuracy and distance? Register says "coordinates where necessary". Data minimisation favours the latter.
4. Retention period per data category (needs the founder and legal input).
5. Lawful basis per processing purpose. The register warns consent is not automatically the basis, so the migration 1 `consents` table should become `notice_acknowledgements` (evidence a notice was shown), with project-level `consent_records` added for participants.
6. Participant identifiers: pseudonymous reference only, or direct identifiers where a study needs them?

## 10. Acceptance tests (register DB-01 to DB-07)

| Req | Test (run as each user with direct API/SQL requests) |
|---|---|
| DB-01 | Researcher B selects researcher A's project by ID: 0 rows |
| DB-02 | Submissions/files queried across projects: 0 rows |
| DB-03 | Unassigned enumerator selects a project's restricted records: 0 rows |
| DB-04 | Researcher without membership: denied |
| DB-05 | Same checks via direct Supabase REST call with the user's token |
| DB-06 | Each staff role attempts research data: 0 rows |
| DB-07 | Revoke an assignment, immediately re-query: 0 rows |

## 11. Migration roadmap

1. **M1 foundation (revise before applying):** account types, profiles, staff_roles, helper functions, audit_logs, notice_acknowledgements.
2. **M2:** researcher/enumerator profiles, verification records.
3. **M3 (core P0):** projects, memberships, applications, assignments, project helper functions, isolation test suite.
4. **M4:** private storage, research_submissions, participant_records, sensitive_responses and RPC, consent_records, sensitive review workflow.
5. **M5:** GPS verifications.
6. **M6 (P1):** privacy requests, retention schedule, data export, breach records.
