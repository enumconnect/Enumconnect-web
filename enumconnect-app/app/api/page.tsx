import { Suspense } from "react";
import {
  CreateProjectButton,
  createProjectAccess,
  getResearcher,
  profileProgress,
} from "@/features/dashboard";
import {
  EmptyProjects,
  ProjectsPanel,
  getProjects,
  projectsPageFilters,
} from "@/features/projects";

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center text-[#575757]" role="status">
          Loading your projects...
        </div>
      }
    >
      <ProjectsPageContent />
    </Suspense>
  );
}

async function ProjectsPageContent() {
  const researcher = await getResearcher();
  const projects = await getProjects();
  const progress = profileProgress(researcher.profile);
  const access = createProjectAccess(researcher);

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="m-0 text-[clamp(28px,4vw,40px)] font-extrabold leading-[1.1] text-[#1a1a1a]">
            Your projects
          </h1>
          <p className="m-0 mt-2 text-[18px] text-[#575757]">
            All your projects in one place. Open one to see its team, progress
            and payments.
          </p>
        </div>
        <CreateProjectButton access={access} progress={progress} />
      </div>

      <div className="mt-8">
        <ProjectsPanel
          projects={projects}
          filters={projectsPageFilters}
          title={`${projects.length} ${projects.length === 1 ? "project" : "projects"}`}
          empty={
            <EmptyProjects
              action={
                <CreateProjectButton
                  access={access}
                  progress={progress}
                  className="px-7 py-3.5 text-[16px]"
                />
              }
            />
          }
        />
      </div>
    </>
  );
}
