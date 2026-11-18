import Link from "next/link";
import { Check } from "lucide-react";
import { MeterBar } from "@/components/ui/MeterBar";
import { profileFieldLabels, type ProfileProgress } from "../lib/profile";
import { routes } from "../lib/routes";
import type { ProfileFields } from "../type";

type Props = { profile: ProfileFields; progress: ProfileProgress };

export function ProfileChecklistCard({ profile, progress }: Props) {
  const keys = Object.keys(profileFieldLabels) as (keyof ProfileFields)[];

  return (
    <section className="rounded-[24px] border border-[#D9DEE8] bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="m-0 text-[22px] font-extrabold text-[#000080]">
            Complete your profile
          </h2>
          <p className="m-0 mt-1 text-[15px] text-[#575757]">
            Helps enumerators trust your project.
          </p>
        </div>
        <span className="text-[16px] font-bold text-[#1B6A40]">
          {progress.percent}%
        </span>
      </div>

      <MeterBar
        value={progress.percent}
        label="Profile completeness"
        className="mt-4"
      />

      <ul className="m-0 mt-5 grid list-none gap-3.5 p-0">
        <li className="flex items-center gap-3 text-[15px] text-[#575757]">
          <Tick done />
          Name, institution, research area
        </li>
        {keys.map((key) => {
          const done = Boolean(profile[key]);
          return (
            <li key={key} className="flex items-center gap-3 text-[16px]">
              <Tick done={done} />
              <span
                className={`flex-1 ${done ? "text-[#575757]" : "font-bold text-[#1a1a1a]"}`}
              >
                {profileFieldLabels[key]}
              </span>
              {!done && (
                <Link
                  href={routes.profileEdit}
                  className="text-[15px] font-bold text-[#000080] hover:underline"
                >
                  Add
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Tick({ done }: { done: boolean }) {
  return done ? (
    <span
      className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-[#2F9D63] text-white"
      aria-hidden="true"
    >
      <Check size={15} strokeWidth={3.5} />
    </span>
  ) : (
    <span
      className="h-[26px] w-[26px] shrink-0 rounded-full border-2 border-[#C9CCE0]"
      aria-hidden="true"
    />
  );
}
