# Data dictionary

One entry per column. Required by the register's definition of done: every field has a documented purpose, access rule and retention rule. Update this file in the same pull request as each migration.

Retention values marked **TBD** wait on the retention schedule decision (access-architecture.md, section 9, item 4).

## Migration 1: foundation

### profiles (DP-01)

| Column | Purpose | Who can read | Who can write | Retention |
|---|---|---|---|---|
| id | Links to the Supabase Auth user | Owner; support, platform_admin | System (signup trigger) | Life of account |
| role | Account type: researcher, enumerator or staff; drives every access rule | Owner; support, platform_admin | Nobody via API; bootstrap/back-office only | Life of account |
| account_status | Active, suspended or deactivated; suspended accounts lose access | Owner; support, platform_admin | platform_admin via `set_account_status` only | Life of account |
| full_name | Display name for communication | Owner; support, platform_admin | Owner | TBD |
| created_at, updated_at | Record keeping | Same as row | System | Life of account |

Email and phone live in Supabase Auth (`auth.users`) and are not copied here, to avoid a second copy of personal data.

### staff_roles

| Column | Purpose | Who can read | Who can write | Retention |
|---|---|---|---|---|
| user_id, staff_role | Which staff capabilities an account holds | The user; platform_admin; security_auditor | platform_admin via grant/revoke functions only | Life of assignment; history kept in audit_logs |
| granted_by, granted_at | Accountability for who granted a role | Same as row | System | Same as row |

### audit_logs (DP-11)

| Column | Purpose | Who can read | Who can write | Retention |
|---|---|---|---|---|
| occurred_at, actor_id, actor_role | Who did something and when. No foreign key so history outlives users | security_auditor | Triggers and server functions only | TBD (long; tamper-resistant) |
| action, entity_table, entity_id, project_id | What happened and to which record | security_auditor | Same | TBD |
| details | Record references and old/new non-sensitive values. Never sensitive research values | security_auditor | Same | TBD |

Append-only: update, delete and truncate are rejected by triggers.

### notice_acknowledgements (privacy records)

| Column | Purpose | Who can read | Who can write | Retention |
|---|---|---|---|---|
| user_id | Whose acknowledgement | Owner; support | Owner (own rows only) | TBD |
| notice_type, notice_version | Which notice or terms version was presented | Same | Same | TBD |
| presented_at | When it was presented | Same | System default | TBD |

Evidence that a notice was shown. It does not assert consent is the lawful basis for any processing.
