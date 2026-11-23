import "server-only";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return Response.json({ error: "Email confirmation is required." }, { status: 401 });
  }

  const metadata = user.user_metadata;
  const phone = typeof metadata.phone_number === "string" ? metadata.phone_number : "";
  const fullName = typeof metadata.full_name === "string" ? metadata.full_name : "";
  const role = metadata.role === "enumerator" ? "enumerator" : "researcher";

  return Response.json({
    email: user.email ?? "",
    fullName,
    phone: user.new_phone ?? user.phone ?? phone,
    emailVerified: Boolean(user.email_confirmed_at),
    phoneVerified: Boolean(user.phone_confirmed_at),
    role,
  }, { headers: { "Cache-Control": "no-store" } });
}
