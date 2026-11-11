import { createClient } from "@/lib/supabase/server";

const NO_STORE = { "Cache-Control": "no-store" };

export async function GET() {
  const supabase = await createClient();

  // getUser() validates the token with Supabase Auth. Use it (not getSession)
  // for any authorisation decision on the server.
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return Response.json(
      { error: "Not authenticated" },
      { status: 401, headers: NO_STORE },
    );
  }

  // Runs as the user, so RLS applies on top of the .eq() filter.
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, role, account_status, full_name")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("profile lookup failed", error.code);
    return Response.json(
      { error: "Something went wrong" },
      { status: 500, headers: NO_STORE },
    );
  }
  if (!profile) {
    return Response.json({ error: "Not found" }, { status: 404, headers: NO_STORE });
  }

  return Response.json({ profile }, { headers: NO_STORE });
}