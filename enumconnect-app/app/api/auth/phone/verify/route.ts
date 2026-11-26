import { createClient } from "@/lib/supabase/server";
import { verifyPhoneSchema } from "@/lib/validation/auth";
import { invalidInput } from "@/lib/validation/errors";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  const parsed = verifyPhoneSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return invalidInput(parsed.error);
  }
  const { phone, code } = parsed.data;

  const { error } = await supabase.auth.verifyOtp({
    phone,
    token: code,
    type: "phone_change",
  });

  if (error) {
    if (error.status === 429) {
      return Response.json({ error: "Too many attempts. Try again later." }, { status: 429 });
    }
    return Response.json({ error: "Invalid or expired code" }, { status: 401 });
  }

  return Response.json({ ok: true });
}
