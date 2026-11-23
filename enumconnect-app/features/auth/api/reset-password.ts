import "server-only";
import { createClient } from "@/lib/supabase/server";
import { resetPasswordSchema } from "@/features/auth/lib/validation";

export async function POST(request: Request) {
  const parsed = resetPasswordSchema.safeParse(
    await request.json().catch(() => null),
  );
  if (!parsed.success) {
    return Response.json({ error: "Invalid password" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    return Response.json({ error: "Reset link expired" }, { status: 401 });
  }

  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });
  if (error) {
    console.error("password update failed", error.code);
    return Response.json({ error: "Could not update password" }, { status: 400 });
  }

  return Response.json({ ok: true });
}
