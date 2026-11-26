import type { SupabaseClient, User } from "@supabase/supabase-js";

// Bump a version when the Terms or Privacy Notice text changes.
// The version written to the database always comes from here, never from the client.
export const NOTICE_VERSIONS = {
  terms: "2026-11-v1",
  privacy_notice: "2026-11-v1",
} as const;

/**
 * Record that the user was shown the current Terms and Privacy Notice.
 * Called once the user has a session (after email verification), because the
 * table's RLS only lets a signed-in user write their own rows.
 *
 * Limit to be aware of: "accepted_notices" in user metadata is set by the
 * signup request and could be forged by someone calling Supabase Auth directly,
 * so this is evidence that the notices were presented, not proof of reading.
 */
export async function recordNoticeAcknowledgements(
  supabase: SupabaseClient,
  user: User,
): Promise<void> {
  if (user.user_metadata?.accepted_notices !== true) return;

  const { data: existing, error: readError } = await supabase
    .from("notice_acknowledgements")
    .select("notice_type, notice_version")
    .eq("user_id", user.id);

  if (readError) {
    console.error("notice lookup failed", readError.code);
    return;
  }

  const have = new Set((existing ?? []).map((r) => `${r.notice_type}:${r.notice_version}`));
  const rows = (Object.entries(NOTICE_VERSIONS) as [keyof typeof NOTICE_VERSIONS, string][])
    .filter(([type, version]) => !have.has(`${type}:${version}`))
    .map(([type, version]) => ({
      user_id: user.id,
      notice_type: type,
      notice_version: version,
    }));

  if (rows.length === 0) return;

  const { error } = await supabase.from("notice_acknowledgements").insert(rows);
  if (error) {
    console.error("notice insert failed", error.code);
  }
}
