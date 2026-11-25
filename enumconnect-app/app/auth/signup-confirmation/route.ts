import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) return NextResponse.redirect(new URL("/login", url.origin));

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return NextResponse.redirect(new URL("/login", url.origin));

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  const role = user?.user_metadata.role;
  if (userError || (role !== "researcher" && role !== "enumerator")) {
    return NextResponse.redirect(new URL("/login", url.origin));
  }

  return NextResponse.redirect(new URL(`/verify-account/${role}`, url.origin));
}
