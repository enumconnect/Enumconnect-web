"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Check, Lock, X } from "lucide-react";
import { MeterBar } from "@/components/ui/MeterBar";
import { profileFieldLabels, type ProfileProgress } from "../lib/profile";
import { routes } from "../lib/routes";

type Props = { open: boolean; onClose: () => void; progress: ProfileProgress };

export function FinishProfileModal({ open, onClose, progress }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose(); // click on the backdrop
      }}
      aria-labelledby="finish-profile-title"
      className="m-auto w-[min(calc(100%-32px),540px)] rounded-[28px] bg-white p-0 backdrop:bg-[#000080]/50"
    >
      <div className="relative p-6 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 text-[#424242] hover:text-[#000080]"
        >
          <X size={22} />
        </button>

        <span
          className="grid h-12 w-12 place-items-center rounded-full bg-[#EEF0FF] text-[#000080]"
          aria-hidden="true"
        >
          <Lock size={22} />
        </span>

        <h2
          id="finish-profile-title"
          className="mb-3 mt-6 text-[26px] font-extrabold leading-[1.2] text-[#1a1a1a]"
        >
          Finish your profile to post a project
        </h2>
        <p className="m-0 text-[16px] leading-[1.6] text-[#424242]">
          Enumerators choose which projects to apply for based on who is running
          them. Add the last few details and you can post straight away. It
          takes about 2 minutes.
        </p>

        <div className="mb-2 mt-6 flex items-center justify-between text-[15px]">
          <span className="font-bold text-[#1a1a1a]">
            Profile {progress.percent}% complete
          </span>
          <span className="text-[13px] text-[#575757]">
            {progress.missing.length} left
          </span>
        </div>
        <MeterBar value={progress.percent} label="Profile completeness" />

        <ul className="m-0 mt-5 grid list-none gap-3.5 rounded-2xl border border-[#E4E8F0] bg-[#F8FFFD] p-5">
          <DoneRow>Email verified</DoneRow>
          <DoneRow>Name, institution, research area</DoneRow>
          {progress.missing.map((key) => (
            <li
              key={key}
              className="flex items-center gap-3 text-[16px] text-[#1a1a1a]"
            >
              <span
                className="h-[26px] w-[26px] shrink-0 rounded-full border-2 border-dashed border-[#C9CCE0]"
                aria-hidden="true"
              />
              <span className="flex-1">{profileFieldLabels[key]}</span>
              <span className="text-[14px] font-semibold text-[#000080]">
                To add
              </span>
            </li>
          ))}
        </ul>

        <Link
          href={routes.profileEdit}
          className="mt-6 block rounded-xl bg-[#000080] py-4 text-center text-[17px] font-bold text-white hover:bg-[#17179b]"
        >
          Complete profile
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 block w-full text-center text-[17px] font-bold text-[#000080] hover:underline"
        >
          Not now
        </button>
      </div>
    </dialog>
  );
}

function DoneRow({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-3 text-[16px] text-[#424242]">
      <span
        className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-[#2F9D63] text-white"
        aria-hidden="true"
      >
        <Check size={15} strokeWidth={3.5} />
      </span>
      {children}
    </li>
  );
}
