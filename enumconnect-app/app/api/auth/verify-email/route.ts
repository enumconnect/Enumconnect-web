import { createClient } from "@/lib/supabase/server";
import { verifyEmailSchema } from "@/lib/validation/auth";
import { invalidInput } from "@/lib/validation/errors";
import { recordNoticeAcknowledgements } from "@/lib/notices";

/**
 * Verify the email with the code typed in the app. On success Supabase returns
 * a session, so the user is signed in (cookies are set) and can continue to the
 * phone step.
 */
export async function POST(request: Request) {
  const parsed = verifyEmailSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return invalidInput(parsed.error);
  }
  const { email, code } = parsed.data;

  const supabase = await createClient();
  // type "email" is used for signup-confirmation codes. If Postman shows an
  // error about the type, try "signup" instead (older name for the same thing).
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token: code,
    type: "email",
  });

  if (error || !data.user) {
    if (error?.status === 429) {
      return Response.json({ error: "Too many attempts. Try again later." }, { status: 429 });
    }
    return Response.json({ error: "Invalid or expired code" }, { status: 401 });
  }

  await recordNoticeAcknowledgements(supabase, data.user);
  return Response.json({ ok: true });
}
