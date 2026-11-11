import { createClient } from "@/lib/supabase/server";
import { signupSchema } from "@/lib/validation/auth";

export async function POST(request: Request) {
  const parsed = signupSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Invalid input" }, { status: 400 });
  }
  const { email, password, role, fullName } = parsed.data;

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    // The database signup trigger reads `role` and creates the profile.
    options: { data: { role, full_name: fullName } },
  });

  if (error) {
    // Log the code only: never the message, which can contain the email.
    console.error("signup failed", error.code);
    return Response.json({ error: "Could not create account" }, { status: 400 });
  }

  return Response.json(
    { message: "Check your email to confirm your account." },
    { status: 201 },
  );
}