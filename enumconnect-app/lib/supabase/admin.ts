import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * PRIVILEGED client using the secret (service-role) key. It BYPASSES RLS.
 *
 * `import "server-only"` makes the build fail if this file is ever imported
 * from client code (SEC-06).
 *
 * Allowed uses (keep this list short and review every import of this file):
 *   - payment provider webhooks
 *   - writing audit records from server code
 *   - scheduled jobs (retention, cleanup)
 * Never use it to serve a normal user request: use createClient() instead.
 */
export function createAdminClient() {
  const url = process.env.SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SECRET_KEY");
  }

  return createClient(url, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}