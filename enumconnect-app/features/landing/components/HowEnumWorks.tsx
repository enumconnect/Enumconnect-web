"use client";

import { useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProjectCard } from "../components/ProjectCard";
import { TrainingCard } from "../components/TrainingCard";
import { panels, tabs, type Role } from "../data/howenumworks";

const cards = {
  project: <ProjectCard />,
  training: <TrainingCard />,
};

export function HowEnumWorks() {
  const [role, setRole] = useState<Role>("researchers");
  const panel = panels[role];

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      setRole((r) => (r === "researchers" ? "enumerators" : "researchers"));
    }
  }

  return (
    <section
      id="how-it-works"
      className="overflow-x-clip bg-white py-[74px_80px] max-[640px]:py-[54px]"
    >
      <div className="mx-auto w-[min(calc(100%-48px),1200px)] max-[900px]:w-[min(calc(100%-40px),760px)] max-[640px]:w-[min(calc(100%-32px),480px)]">
     
        <div className="mb-[30px] text-center max-[640px]:mb-6">
          <h2 className="m-0 text-[clamp(28px,3vw,40px)] font-extrabold leading-[1.15] tracking-[-1.2px] text-[#000080]">
            How EnumConnect works
          </h2>
          <p className="mb-0 mt-[9px] text-[18px] font-normal text-[#424242] max-[640px]:text-[14px]">
            From Finding Field Data Collectors to Managing Research Submissions
          </p>
        </div>

      
        <div
          role="tablist"
          aria-label="How it works"
          onKeyDown={onKeyDown}
          className="mx-auto mb-[34px] flex w-fit rounded-full border-2 border-[#D9D6F8] bg-[#E6E4FA] p-0.5 max-[640px]:mb-[25px]"
        >
          {tabs.map((t) => {
            const active = role === t.id;
            return (
              <button
                key={t.id}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={active}
                aria-controls="how-panel"
                tabIndex={active ? 0 : -1}
                onClick={() => setRole(t.id)}
                className={`rounded-full px-5 py-[9px] text-base transition max-[640px]:px-[14px] max-[640px]:py-2 max-[640px]:text-[14px] ${
                  active
                    ? "bg-white font-bold text-[#000080] shadow-[0_1px_5px_#0000000c]"
                    : "font-normal text-[#575757] hover:text-[#000080]"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

    
        <div
          id="how-panel"
          role="tabpanel"
          aria-labelledby={`tab-${role}`}
          className="grid grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] items-center gap-[clamp(35px,6vw,76px)] max-[640px]:grid-cols-1 max-[640px]:gap-10"
        >
       
          <div className="relative mb-5 mr-6 aspect-square max-[640px]:mr-0 max-[640px]:aspect-square">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-[26px] bg-[#2F9D63]"
            />
            <div className="absolute inset-0 overflow-hidden rounded-[26px]">
              <Image
                key={panel.image}
                src={panel.image}
                alt={panel.alt}
                fill
                sizes="(max-width: 640px) 100vw, 430px"
                className="object-cover max-[640px]:hidden"
              />
              <Image
                key={panel.mobileImage}
                src={panel.mobileImage}
                alt={panel.alt}
                fill
                sizes="(max-width: 640px) 100vw, 430px"
                className="hidden object-cover max-[640px]:block"
              />
            </div>
            <div className="absolute -bottom-[10px] -right-[34px] max-[640px]:hidden">
              {cards[panel.card]}
            </div>
          </div>

          {/* steps */}
          <div>
            <ol className="m-0 grid list-none gap-0 p-0">
              {panel.steps.map(({ title, body }, i) => {
                const isLast = i === panel.steps.length - 1;
                return (
                  <li
                    key={title}
                    className="relative grid grid-cols-[34px_1fr] gap-[14px] pb-6 max-[640px]:gap-[10px] max-[640px]:pb-5"
                  >
                    {!isLast && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-[2px] left-[15px] top-[38px] border-l-2 border-dotted border-[#2A9D6A]"
                      />
                    )}
                    <span className="z-10 grid h-8 w-8 place-items-center rounded-full bg-[#000080] text-[13px] font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="mb-[5px] mt-[3px] text-[20px] font-extrabold text-[#000080] max-[640px]:text-[16px]">
                        {title}
                      </h3>
                      <p className="m-0 max-w-[480px] text-base font-normal leading-[1.55] text-[#424242] max-[640px]:text-[14px]">
                        {body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* actions */}
            <div className="ml-12 mt-2 flex flex-wrap items-center gap-[18px] max-[640px]:ml-0 max-[640px]:flex-col max-[640px]:gap-[18px]">
              <Link
                href={panel.cta.href}
                className="inline-flex min-h-[42px] items-center justify-center rounded-[7px] bg-[#000080] px-[18px] text-base font-bold text-white no-underline transition-colors hover:bg-[#17179b] max-[640px]:min-h-[58px] max-[640px]:w-full"
              >
                {panel.cta.label}
              </Link>
              <Link
                href="#faq"
                className="text-base font-bold text-[#000080] no-underline hover:underline max-[640px]:w-full max-[640px]:text-center"
              >
                Questions? Read the FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
