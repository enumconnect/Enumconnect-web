import type { Project } from "../types";

export async function getProjects(): Promise<Project[]> {
  // TODO: replace with a Supabase query using createClient() so RLS applies
  return [
    {
      id: "p1",
      title: "Household water use survey",
      status: "active",
      meta: "Kano · Nassarawa and Tarauni LGAs · 24 to 28 Nov",
      progress: { done: 128, total: 200, label: "128 of 200 responses" },
      detail: "5 enumerators · 3 days left",
    },
    {
      id: "p2",
      title: "Clinic exit interviews",
      status: "recruiting",
      meta: "Kaduna · Zaria LGA · 2 to 9 Dec",
      detail: "7 applicants · 3 new · Choose your team by 25 Nov",
    },
    {
      id: "p3",
      title: "Youth employment survey",
      status: "draft",
      meta: "Lagos · Ikeja LGA · not scheduled",
      detail: "Step 3 of 6 done · Saved 2 days ago",
    },
    {
      id: "p4",
      title: "Market prices study",
      status: "completed",
      meta: "Enugu · Nsukka LGA · Oct 2026",
      progress: { done: 150, total: 150, label: "150 of 150 responses" },
      detail: "4 enumerators · Rate your team",
    },
    {
      id: "p5",
      title: "Teacher attitudes survey",
      status: "cancelled",
      meta: "Oyo · Ibadan North LGA · cancelled 3 Nov",
      detail: "Refund of ₦45,000 sent to your bank",
    },
  ];
}
