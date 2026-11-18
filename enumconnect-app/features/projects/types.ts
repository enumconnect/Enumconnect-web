export type ProjectStatus =
  | "draft"
  | "recruiting"
  | "active"
  | "completed"
  | "cancelled";

export type Project = {
  id: string;
  title: string;
  status: ProjectStatus;
  meta: string; // "Kano · Nassarawa and Tarauni LGAs · 24 to 28 Nov"
  detail?: string; // text after the bar, or the second line when there is no bar
  progress?: { done: number; total: number; label: string };
};
