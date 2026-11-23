import type { DashboardSummary } from "@/features/dashboard/type";

export async function getDashboardSummary(): Promise<DashboardSummary> {
  // TODO: replace with real queries
  return {
    responsesCollected: 168,
    responsesTarget: 350,
    awaitingReview: 40,
    awaitingReviewFrom: "Chinedu O.",
    fundedProjects: 1,
    attention: [
      {
        id: "a1",
        kind: "review",
        title: "40 responses to review",
        detail: "Chinedu O. · Household water use survey",
        actionLabel: "Review now",
        href: "/researcher/projects/p1",
      },
      {
        id: "a2",
        kind: "flag",
        title: "1 flagged response",
        detail: "Household 31 was recorded outside your LGAs",
        actionLabel: "See flag",
        href: "/researcher/projects/p1",
      },
      {
        id: "a3",
        kind: "applications",
        title: "3 new applications",
        detail: "Clinic exit interviews · 7 in total · 1 from your invites",
        actionLabel: "See applicants",
        href: "/researcher/projects/p2",
      },
    ],
    spending: {
      paidToEnumerators: 60000,
      waitingApproval: 40000,
      serviceFee: 10000,
    },
  };
}
