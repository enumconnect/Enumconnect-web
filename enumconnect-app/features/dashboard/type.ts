export type AccountStatus = "active" | "suspended";

export type ProfileFields = {
  department: string | null;
  researchLevel: string | null;
  shortBio: string | null;
  photoUrl: string | null;
};

export type Researcher = {
  id: string;
  fullName: string;
  status: AccountStatus;
  emailVerified: boolean;
  phoneVerified: boolean;
  hasNotifications: boolean;
  profile: ProfileFields;
};

export type AttentionKind = "review" | "flag" | "applications";

export type AttentionItem = {
  id: string;
  kind: AttentionKind;
  title: string;
  detail: string;
  actionLabel: string;
  href: string;
};

export type DashboardSummary = {
  responsesCollected: number;
  responsesTarget: number;
  awaitingReview: number;
  awaitingReviewFrom: string;
  fundedProjects: number;
  attention: AttentionItem[];
  spending: {
    paidToEnumerators: number;
    waitingApproval: number;
    serviceFee: number;
  };
};
