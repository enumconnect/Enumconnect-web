import type { Project, ProjectStatus } from "../types";

export type Filter = {
  id: string;
  label: string;
  statuses: ProjectStatus[] | null;
};

export const dashboardFilters: Filter[] = [
  { id: "all", label: "All", statuses: null },
  { id: "active", label: "Active", statuses: ["active", "recruiting"] },
  { id: "draft", label: "Draft", statuses: ["draft"] },
  { id: "completed", label: "Completed", statuses: ["completed"] },
];

export const projectsPageFilters: Filter[] = [
  { id: "all", label: "All", statuses: null },
  { id: "recruiting", label: "Recruiting", statuses: ["recruiting"] },
  { id: "active", label: "Active", statuses: ["active"] },
  { id: "draft", label: "Draft", statuses: ["draft"] },
  { id: "completed", label: "Completed", statuses: ["completed"] },
  { id: "cancelled", label: "Cancelled", statuses: ["cancelled"] },
];

export function applyFilter(projects: Project[], filter: Filter): Project[] {
  const { statuses } = filter;
  return statuses
    ? projects.filter((p) => statuses.includes(p.status))
    : projects;
}
