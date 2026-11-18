import type { ProfileFields, Researcher } from "@/features/dashboard/type";

const BASE_PERCENT = 60; // name, email, phone, institution, research area
const OPTIONAL_WEIGHT = 10; // each of the 4 optional fields

export const profileFieldLabels: Record<keyof ProfileFields, string> = {
  department: "Department",
  researchLevel: "Research level",
  shortBio: "Short bio",
  photoUrl: "Profile photo",
};

export function profileProgress(fields: ProfileFields) {
  const keys = Object.keys(fields) as (keyof ProfileFields)[];
  const missing = keys.filter((key) => !fields[key]);

  return {
    percent: BASE_PERCENT + (keys.length - missing.length) * OPTIONAL_WEIGHT,
    missing,
    complete: missing.length === 0,
  };
}

export type ProfileProgress = ReturnType<typeof profileProgress>;

export function createProjectAccess(researcher: Researcher) {
  if (researcher.status === "suspended") return "blocked" as const;
  if (!profileProgress(researcher.profile).complete)
    return "needs-profile" as const;
  return "allowed" as const;
}

export type CreateProjectAccess = ReturnType<typeof createProjectAccess>;
