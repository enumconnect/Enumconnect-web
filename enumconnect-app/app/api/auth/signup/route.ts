import { createClient } from "@/lib/supabase/server";
import { signupSchema } from "@/lib/validation/auth";
import { invalidInput } from "@/lib/validation/errors";

export async function POST(request: Request) {
  const parsed = signupSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return invalidInput(parsed.error);
  }
  const { email, password, role, fullName, captchaToken } = parsed.data;

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // The database signup trigger reads `role` and `full_name` and creates the
      // profile. Phone, state and LGA are NOT accepted here: they are collected
      // by authenticated endpoints after email verification.
      data: { role, full_name: fullName, accepted_notices: true },
      captchaToken,
    },
  });

  if (error) {
    // Log the code only: never the message, which can contain the email.
    console.error("signup failed", error.code);
    if (error.code === "weak_password") {
      return Response.json(
        { error: "Invalid input", fields: { password: "Choose a stronger password" } },
        { status: 400 },
      );
    }
    if (error.status === 429) {
      return Response.json({ error: "Too many attempts. Try again later." }, { status: 429 });
    }
    return Response.json({ error: "Could not create account" }, { status: 400 });
  }

  return Response.json(
    { message: "Check your email to confirm your account." },
    { status: 201 },
  );
}
