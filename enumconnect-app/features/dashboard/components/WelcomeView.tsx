import Image from "next/image";
import Link from "next/link";
import { getFirstName } from "@/features/dashboard/lib/name";
import type { CreateProjectAccess, ProfileProgress } from "../lib/profile";
import { routes } from "../lib/routes";
import type { Researcher } from "@/features/dashboard/type";
import { BeforeYouStart, QuestionsCard } from "./SideCards";
import { CreateProjectButton } from "./CreateProjectButton";
import { HowProjectRuns } from "./HowProjectRuns";
import { ProfileChecklistCard } from "./ProfileChecklistCard";
import { VerifiedBadges } from "./VerifiedBadges";
import { VerifiedCard } from "./VerifiedCard";

type Props = {
  researcher: Researcher;
  progress: ProfileProgress;
  access: CreateProjectAccess;
};

export function WelcomeView({ researcher, progress, access }: Props) {
  const firstName = getFirstName(researcher.fullName);
  const verified = researcher.emailVerified && progress.complete;

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="m-0 text-[clamp(30px,4vw,44px)] font-extrabold leading-[1.1] text-[#000080]">
            Welcome, {firstName}
          </h1>
          <p className="m-0 mt-3 text-[18px] text-[#424242]">
            {verified
              ? "You\u2019re verified. You can now post your first project."
              : "Your account is ready. Let\u2019s set up your first fieldwork project."}
          </p>
        </div>
        <VerifiedBadges
          verifiedResearcher={verified}
          emailVerified={researcher.emailVerified}
        />
      </div>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        {/* left column */}
        <div className="grid gap-10">
          <section className="grid overflow-hidden rounded-[28px] border border-[#D9DEE8] bg-white md:grid-cols-[1.15fr_1fr]">
            <div className="p-6 sm:p-10">
              <span className="inline-block rounded-full bg-[#E3F2FF] px-4 py-2 text-[14px] font-bold text-[#000080]">
                Get started
              </span>
              <h2 className="mb-3 mt-6 text-[clamp(28px,3.4vw,40px)] font-extrabold leading-[1.1] text-[#000080]">
                Post your first project
              </h2>
              <p className="m-0 max-w-[460px] text-[17px] leading-[1.6] text-[#424242]">
                Tell us what you need collected, where and by when. Verified
                enumerators near your sites apply, and you choose your team.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <CreateProjectButton
                  access={access}
                  progress={progress}
                  className="px-7 py-4 text-[17px]"
                />
                <Link
                  href={routes.howItWorks}
                  className="text-[17px] font-bold text-[#000080] hover:underline"
                >
                  See how it works
                </Link>
              </div>
            </div>
            <div className="relative min-h-[240px]">
              <Image
                src="/images/dashboard-hero.jpg"
                alt="A field researcher speaking with a community member"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
            </div>
          </section>

          <HowProjectRuns />

          <section>
            <h2 className="mb-4 mt-0 text-[22px] font-extrabold text-[#000080]">
              Your projects
            </h2>
            <div className="rounded-[24px] border-2 border-dashed border-[#C9CCE8] px-6 py-12 text-center">
              <span
                className="mx-auto block h-[34px] w-[56px] rounded-lg border-2 border-[#C9CCE8] bg-[#F1F1FF]"
                aria-hidden="true"
              />
              <h3 className="mb-1.5 mt-4 text-[20px] font-bold text-[#1a1a1a]">
                No projects yet
              </h3>
              <p className="m-0 text-[16px] text-[#575757]">
                Projects you create will show here with their progress.
              </p>
            </div>
          </section>
        </div>

        {/* right column */}
        <aside className="grid gap-6">
          {verified ? (
            <VerifiedCard />
          ) : (
            <ProfileChecklistCard
              profile={researcher.profile}
              progress={progress}
            />
          )}
          <BeforeYouStart />
          <QuestionsCard />
        </aside>
      </div>
    </>
  );
}
