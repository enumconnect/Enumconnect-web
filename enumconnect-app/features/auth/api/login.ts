import "server-only";
import { createClient } from "@/lib/supabase/server";
import { loginSchema } from "@/features/auth/lib/validation";

export async function POST(request: Request) {
  const parsed = loginSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Invalid input" }, { status: 400 });
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  return Response.json({ ok: true });
}
