import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { safeNextPath } from "@/lib/safe-redirect";
import { recordNoticeAcknowledgements } from "@/lib/notices";

const ALLOWED_TYPES: EmailOtpType[] = ["email", "signup", "email_change"];

/**
 * Target of the link in the verification email:
 *   {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/onboarding
 * It verifies the token on the server and signs the user in, even if the link
 * is opened in a different browser from the one used to sign up.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") as EmailOtpType | null;
  const next = safeNextPath(url.searchParams.get("next"), "/");

  const failure = NextResponse.redirect(new URL("/login?error=confirmation_failed", url.origin));

  if (!tokenHash || !type || !ALLOWED_TYPES.includes(type)) {
    return failure;
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });

  if (error || !data.user) {
    return failure;
  }

  await recordNoticeAcknowledgements(supabase, data.user);
  return NextResponse.redirect(new URL(next, url.origin));
}
