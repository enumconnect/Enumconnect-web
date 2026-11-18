import type { ReactNode } from "react";

export function EmptyProjects({ action }: { action: ReactNode }) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <span
        className="grid h-[60px] w-[60px] place-items-center rounded-full bg-[#EEF0FF] text-[28px] font-light text-[#000080]"
        aria-hidden="true"
      >
        +
      </span>
      <h3 className="mb-2 mt-5 text-[22px] font-extrabold text-[#1a1a1a]">
        No projects yet
      </h3>
      <p className="m-0 mb-6 max-w-[420px] text-[16px] leading-[1.5] text-[#575757]">
        Create your first project to find verified enumerators near your sites.
        Drafts save as you go.
      </p>
      {action}
    </div>
  );
}
