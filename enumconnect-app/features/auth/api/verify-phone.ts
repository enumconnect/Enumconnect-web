import "server-only";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const verificationSchema = z.object({
  token: z.string().regex(/^\d{6}$/),
});

export async function POST(request: Request) {
  const parsed = verificationSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Enter the 6-digit code." }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    return Response.json({ error: "Confirm your email before verifying your phone." }, { status: 401 });
  }

  const phone = user.new_phone ||
    (typeof user.user_metadata.phone_number === "string" ? user.user_metadata.phone_number : "");
  if (!phone) {
    return Response.json({ error: "No phone number is attached to this account." }, { status: 400 });
  }

  const { error } = await supabase.auth.verifyOtp({
    phone,
    token: parsed.data.token,
    type: "phone_change",
  });
  if (error) {
    return Response.json({ error: "That code is invalid or expired. Request a new code and try again." }, { status: 400 });
  }

  return Response.json({ ok: true });
}
