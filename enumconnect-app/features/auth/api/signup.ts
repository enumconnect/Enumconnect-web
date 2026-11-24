import "server-only";
import { createClient } from "@/lib/supabase/server";
import { signupSchema } from "@/features/auth/lib/validation";

export async function POST(request: Request) {
  const parsed = signupSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Invalid input" }, { status: 400 });
  }
  const { email, password, role, fullName, phone } = parsed.data;

  const supabase = await createClient();
  const origin = new URL(request.url).origin;
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=/verify-account/${role}`,
      data: {
        role,
        full_name: fullName,
        phone_number: phone,
        ...(role === "enumerator" ? { state: parsed.data.state, lga: parsed.data.lga } : {}),
        ...(role === "researcher" ? {
          institution: parsed.data.institution,
          research_area: parsed.data.researchArea,
        } : {}),
      },
    },
  });

  if (error) {
    console.error("signup failed", error.code);
    return Response.json({ error: "Could not create account" }, { status: 400 });
  }

  return Response.json(
    { message: "Check your email to confirm your account." },
    { status: 201 },
  );
}
