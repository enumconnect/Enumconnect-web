import "server-only";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const requestedNext = url.searchParams.get("next") ?? "/reset-password";
  const allowedNext = new Set([
    "/reset-password",
    "/verify-account/researcher",
    "/verify-account/enumerator",
  ]);
  const next = allowedNext.has(requestedNext)
    ? requestedNext
    : "/reset-password";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL(next, url.origin));
    }
  }

  return NextResponse.redirect(new URL("/forgot-password", url.origin));
}
