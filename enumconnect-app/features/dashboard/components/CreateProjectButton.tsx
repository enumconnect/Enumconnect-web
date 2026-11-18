"use client";

import { useState } from "react";
import Link from "next/link";
import { FinishProfileModal } from "./FinishProfileModal";
import type { CreateProjectAccess, ProfileProgress } from "../lib/profile";
import { routes } from "../lib/routes";

type Props = {
  access: CreateProjectAccess;
  progress: ProfileProgress;
  className?: string;
  children?: React.ReactNode;
};

const base =
  "inline-flex items-center justify-center rounded-lg bg-[#000080] font-bold text-white transition-colors hover:bg-[#17179b]";

export function CreateProjectButton({
  access,
  progress,
  className = "px-6 py-3.5 text-[16px]",
  children = "Create a project",
}: Props) {
  const [open, setOpen] = useState(false);

  if (access === "blocked") return null;

  if (access === "allowed") {
    return (
      <Link href={routes.newProject} className={`${base} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`${base} ${className}`}
      >
        {children}
      </button>
      <FinishProfileModal
        open={open}
        onClose={() => setOpen(false)}
        progress={progress}
      />
    </>
  );
}
