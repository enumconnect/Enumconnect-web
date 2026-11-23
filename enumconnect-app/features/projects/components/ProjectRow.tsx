import Link from "next/link";
import { MeterBar } from "@/components/ui/MeterBar";
import type { Project, ProjectStatus } from "../types";

const badge: Record<ProjectStatus, { label: string; cls: string }> = {
  active: { label: "Active", cls: "bg-[#E3F5EB] text-[#1B6A40]" },
  recruiting: {
    label: "Recruitment in progress",
    cls: "bg-[#E3F2FF] text-[#1558B0]",
  },
  draft: { label: "Draft", cls: "bg-[#EFEFEF] text-[#575757]" },
  completed: { label: "Completed", cls: "bg-[#EEF0FF] text-[#000080]" },
  cancelled: { label: "Cancelled", cls: "bg-[#EFEFEF] text-[#575757]" },
};

const action: Record<ProjectStatus, { label: string; primary?: boolean }> = {
  active: { label: "Open project", primary: true },
  recruiting: { label: "See applicants" },
  draft: { label: "Continue" },
  completed: { label: "Rate team" },
  cancelled: { label: "View" },
};

export function ProjectRow({ project }: { project: Project }) {
  const { title, status, meta, detail, progress } = project;
  const b = badge[status];
  const a = action[status];

  return (
    <li className="flex flex-col gap-4 border-t border-[#E4E8F0] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="m-0 text-[17px] font-bold text-[#1a1a1a]">{title}</h3>
          <span
            className={`rounded-full px-3 py-1 text-[13px] font-bold ${b.cls}`}
          >
            {b.label}
          </span>
        </div>
        <p className="m-0 mt-1.5 text-[14px] text-[#575757]">{meta}</p>

        {progress ? (
          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[14px] text-[#424242]">
            <MeterBar
              value={(progress.done / progress.total) * 100}
              label={`${title} progress`}
              className="w-[150px]"
            />
            <span>{progress.label}</span>
            {detail && <span>· {detail}</span>}
          </div>
        ) : (
          detail && (
            <p className="m-0 mt-1.5 text-[14px] text-[#424242]">{detail}</p>
          )
        )}
      </div>

      <Link
        href={`/researcher/projects/${project.id}`}
        className={`inline-flex shrink-0 items-center justify-center rounded-lg px-5 py-2.5 text-[15px] font-bold transition-colors sm:min-w-[120px] ${
          a.primary
            ? "bg-[#000080] text-white hover:bg-[#17179b]"
            : "border-2 border-[#000080] bg-white text-[#000080] hover:bg-[#F1F1FF]"
        }`}
      >
        {a.label}
      </Link>
    </li>
  );
}
