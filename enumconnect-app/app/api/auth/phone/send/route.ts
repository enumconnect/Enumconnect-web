import { createClient } from "@/lib/supabase/server";
import { sendPhoneCodeSchema } from "@/lib/validation/auth";
import { invalidInput } from "@/lib/validation/errors";

/**
 * Send an SMS code to verify a phone number. Requires a signed-in user whose
 * email is already verified, so SMS cost cannot be triggered by anonymous
 * callers. Also used for "resend code" (Supabase enforces its own rate limits).
 */
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  const parsed = sendPhoneCodeSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return invalidInput(parsed.error);
  }

  const { error } = await supabase.auth.updateUser({ phone: parsed.data.phone });
  if (error) {
    console.error("phone code send failed", error.code);
    if (error.status === 429) {
      return Response.json({ error: "Please wait before requesting another code." }, { status: 429 });
    }
    return Response.json({ error: "Could not send the code" }, { status: 400 });
  }

  return Response.json({ message: "Code sent" });
}
