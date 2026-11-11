import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

/**
 * Supabase client that acts AS THE LOGGED-IN USER.
 * It reads the session from the request cookies and forwards the user's JWT to
 * Supabase, so Postgres sees auth.uid() and Row Level Security applies.
 * This is the default client for every endpoint.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    requireEnv("SUPABASE_URL"),
    requireEnv("SUPABASE_PUBLISHABLE_KEY"),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Called from a context that cannot set cookies (e.g. a Server
            // Component). Safe to ignore: Route Handlers can set them, and a
            // proxy can refresh sessions later if we need it.
          }
        },
      },
    },
  );
}
