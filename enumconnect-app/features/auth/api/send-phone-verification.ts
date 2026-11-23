import "server-only";
import { createClient } from "@/lib/supabase/server";
import { phoneSchema } from "@/features/auth/lib/validation";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return Response.json({ error: "Confirm your email before verifying your phone." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const requestedPhone = typeof body?.phone === "string"
    ? phoneSchema.safeParse(body.phone)
    : null;
  if (requestedPhone && !requestedPhone.success) {
    return Response.json({ error: "Enter a valid Nigerian mobile number." }, { status: 400 });
  }

  const phone = requestedPhone?.success
    ? requestedPhone.data
    : typeof user.user_metadata.phone_number === "string"
    ? user.user_metadata.phone_number
    : "";
  if (!phone) {
    return Response.json({ error: "No phone number is attached to this account." }, { status: 400 });
  }
  if (user.phone_confirmed_at) {
    return Response.json({ ok: true, verified: true });
  }

  if (body?.resend === true) {
    const { error } = await supabase.auth.resend({ type: "phone_change", phone });
    if (error) {
      console.error("phone verification resend failed", error.code);
      return Response.json({ error: "Could not resend the code. Check SMS provider configuration and try again." }, { status: 503 });
    }
  } else if (user.new_phone === phone) {
    return Response.json({ ok: true, alreadySent: true });
  } else {
    const { error } = await supabase.auth.updateUser({
      phone,
      data: { ...user.user_metadata, phone_number: phone },
    });
    if (error) {
      console.error("phone verification send failed", error.code);
      return Response.json({ error: "Could not send the code. Check SMS provider configuration and try again." }, { status: 503 });
    }
  }

  return Response.json({ ok: true });
}
