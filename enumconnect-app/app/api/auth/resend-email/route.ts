import { createClient } from "@/lib/supabase/server";
import { resendEmailSchema } from "@/lib/validation/auth";
import { invalidInput } from "@/lib/validation/errors";

export async function POST(request: Request) {
  const parsed = resendEmailSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return invalidInput(parsed.error);
  }
  const { email, captchaToken } = parsed.data;

  const supabase = await createClient();
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: { captchaToken },
  });

  if (error) {
    console.error("resend failed", error.code);
    if (error.status === 429) {
      return Response.json({ error: "Please wait before requesting another email." }, { status: 429 });
    }
  }

  // Same answer whether or not the account exists or is already verified.
  return Response.json({
    message: "If the account exists and is not yet verified, a new email has been sent.",
  });
}
