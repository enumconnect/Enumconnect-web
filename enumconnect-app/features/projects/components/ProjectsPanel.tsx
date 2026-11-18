"use client";

import { useState, type ReactNode } from "react";
import { applyFilter, type Filter } from "../lib/filters";
import type { Project } from "../types";
import { ProjectRow } from "./ProjectRow";

type Props = {
  projects: Project[];
  filters: Filter[];
  title: string; // "Your projects" or "5 projects"
  empty?: ReactNode; // shown when there are no projects at all
};

export function ProjectsPanel({ projects, filters, title, empty }: Props) {
  const [activeId, setActiveId] = useState(filters[0].id);
  const active = filters.find((f) => f.id === activeId) ?? filters[0];
  const visible = applyFilter(projects, active);

  return (
    <section className="overflow-hidden rounded-[24px] border border-[#D9DEE8] bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-5 sm:px-6">
        <h2 className="m-0 text-[22px] font-extrabold text-[#000080]">
          {title}
        </h2>

        {projects.length > 0 && (
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter projects"
          >
            {filters.map((f) => {
              const on = f.id === active.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActiveId(f.id)}
                  className={`rounded-full px-3.5 py-1.5 text-[14px] font-bold transition-colors ${
                    on
                      ? "bg-[#EEF0FF] text-[#000080]"
                      : "bg-[#F1F1F4] text-[#575757] hover:text-[#000080]"
                  }`}
                >
                  {f.label} {applyFilter(projects, f).length}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {projects.length === 0 ? (
        empty
      ) : (
        <ul className="m-0 list-none p-0">
          {visible.map((p) => (
            <ProjectRow key={p.id} project={p} />
          ))}
        </ul>
      )}
    </section>
  );
}
