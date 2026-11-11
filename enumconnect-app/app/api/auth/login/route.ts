import { createClient } from "@/lib/supabase/server";
import { loginSchema } from "@/lib/validation/auth";

export async function POST(request: Request) {
  const parsed = loginSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Invalid input" }, { status: 400 });
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    // One generic answer for wrong password, unknown email or unconfirmed
    // email, so the response reveals nothing about which accounts exist.
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // The session cookies were set by the Supabase client's setAll().
  return Response.json({ ok: true });
}