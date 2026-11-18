import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Researcher } from "../type";
import { nameFromEmail } from "./name";

export async function getResearcher(): Promise<Researcher> {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, role, account_status, full_name")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("dashboard profile lookup failed", error.code);
    throw new Error("Could not load researcher profile");
  }

  if (
    !profile ||
    profile.role !== "researcher" ||
    profile.account_status === "deactivated"
  ) {
    redirect("/");
  }

  return {
    id: profile.id,
    fullName: profile.full_name || nameFromEmail(user.email ?? "") || "Researcher",
    status: profile.account_status === "suspended" ? "suspended" : "active",
    emailVerified: Boolean(user.email_confirmed_at),
    phoneVerified: Boolean(user.phone_confirmed_at),
    hasNotifications: false,
    profile: {
      department: null,
      researchLevel: null,
      shortBio: null,
      photoUrl: null,
    },
  };
}
