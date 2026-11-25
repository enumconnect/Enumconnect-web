import "server-only";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { emailSchema } from "@/features/auth/lib/validation";

const resendSchema = z.object({
  email: emailSchema,
  role: z.enum(["researcher", "enumerator"]),
});

export async function POST(request: Request) {
  const parsed = resendSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const supabase = await createClient();
  const origin = new URL(request.url).origin;
  const { error } = await supabase.auth.resend({
    type: "signup",
    email: parsed.data.email,
    options: {
      emailRedirectTo: `${origin}/auth/signup-confirmation`,
    },
  });

  if (error) {
    console.error("signup confirmation resend failed", error.code);
    return Response.json({ error: "Could not resend the confirmation email. Please try again." }, { status: 400 });
  }

  return Response.json({ ok: true });
}
