import "server-only";
import { createClient } from "@/lib/supabase/server";
import { emailSchema } from "@/features/auth/lib/validation";

export async function POST(request: Request) {
  const parsed = emailSchema.safeParse(
    (await request.json().catch(() => null))?.email,
  );
  if (!parsed.success) {
    return Response.json({ error: "Invalid input" }, { status: 400 });
  }

  const supabase = await createClient();
  const origin = new URL(request.url).origin;
  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data, {
    redirectTo: `${origin}/auth/callback?next=/reset-password`,
  });

  if (error) {
    console.error("password reset request failed", error.code);
  }

  return Response.json({
    message: "If an account exists for this email, a reset link has been sent.",
  });
}
