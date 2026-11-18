import {
  ProjectsPanel,
  dashboardFilters,
  type Project,
} from "@/features/projects";
import { getFirstName } from "../lib/name";
import { getGreeting } from "../lib/greeting";
import { formatNaira } from "../lib/money";
import type { CreateProjectAccess, ProfileProgress } from "../lib/profile";
import type { DashboardSummary, Researcher } from "../type";
import { AttentionList } from "./AttentionList";
import { CreateProjectButton } from "./CreateProjectButton";
import { SpendingCard } from "./SpendingCard";
import { StatCard } from "./StatCard";

type Props = {
  researcher: Researcher;
  projects: Project[];
  summary: DashboardSummary;
  progress: ProfileProgress;
  access: CreateProjectAccess;
};

export function ActiveView({
  researcher,
  projects,
  summary,
  progress,
  access,
}: Props) {
  const firstName = getFirstName(researcher.fullName);

  const visible = projects.filter((p) => p.status !== "cancelled"); // dashboard hides cancelled
  const inRecruitment = visible.filter((p) => p.status === "recruiting").length;
  const running = visible.filter(
    (p) => p.status === "active" || p.status === "recruiting",
  ).length;
  const reviewCount = summary.attention.filter(
    (a) => a.kind === "review",
  ).length;
  const paidIn =
    summary.spending.paidToEnumerators +
    summary.spending.waitingApproval +
    summary.spending.serviceFee;
  const targetPct = Math.round(
    (summary.responsesCollected / summary.responsesTarget) * 100,
  );

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="m-0 text-[clamp(28px,4vw,40px)] font-extrabold leading-[1.1] text-[#1a1a1a]">
            {getGreeting()}, {firstName}
          </h1>
          <p className="m-0 mt-2 text-[18px] text-[#575757]">
            {running} {running === 1 ? "project" : "projects"} running.
            {reviewCount > 0 && ` ${reviewCount} needs your review.`}
          </p>
        </div>
        <CreateProjectButton access={access} progress={progress} />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Active projects"
          value={String(running)}
          sub={`${inRecruitment} in recruitment`}
        />
        <StatCard
          label="Responses collected"
          value={`${summary.responsesCollected} of ${summary.responsesTarget}`}
          sub={`${targetPct}% of your target`}
        />
        <StatCard
          label="Waiting for your review"
          value={String(summary.awaitingReview)}
          sub={`From ${summary.awaitingReviewFrom}`}
        />
        <StatCard
          label="Spent so far"
          value={formatNaira(paidIn)}
          sub={`${summary.fundedProjects} ${summary.fundedProjects === 1 ? "project" : "projects"} funded`}
        />
      </div>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)]">
        <ProjectsPanel
          projects={visible}
          filters={dashboardFilters}
          title="Your projects"
        />
        <div className="grid gap-6">
          <AttentionList items={summary.attention} />
          <SpendingCard spending={summary.spending} />
        </div>
      </div>
    </>
  );
}
