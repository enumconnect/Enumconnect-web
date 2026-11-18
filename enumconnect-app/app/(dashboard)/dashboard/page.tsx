import {
  ActiveView,
  SuspendedView,
  WelcomeView,
  createProjectAccess,
  getDashboardSummary,
  getResearcher,
  profileProgress,
} from "@/features/dashboard";
import { getProjects } from "@/features/projects";

export default async function DashboardPage() {
  const researcher = await getResearcher();

  if (researcher.status === "suspended") {
    return <SuspendedView fullName={researcher.fullName} />;
  }

  const progress = profileProgress(researcher.profile);
  const access = createProjectAccess(researcher);
  const [projects, summary] = await Promise.all([
    getProjects(),
    getDashboardSummary(),
  ]);

  if (projects.length === 0) {
    return (
      <WelcomeView
        researcher={researcher}
        progress={progress}
        access={access}
      />
    );
  }

  return (
    <ActiveView
      researcher={researcher}
      projects={projects}
      summary={summary}
      progress={progress}
      access={access}
    />
  );
}
