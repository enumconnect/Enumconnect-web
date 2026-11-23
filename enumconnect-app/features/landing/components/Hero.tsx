"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { nigerianStates, fieldworkTypes, Tab } from "../data/hero";

export const Hero = () => {
  const [activeTab, setActiveTab] = useState<Tab>(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 640px)").matches
      ? "fieldwork"
      : "hiring",
  );

  return (
    <section className="overflow-hidden bg-[#e5f3ff] pt-20 max-[850px]:pt-[72px]">
      <div className="mx-auto grid min-h-[560px] w-[min(calc(100%-48px),1200px)] grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] items-center gap-[clamp(32px,6vw,100px)] py-12 max-[900px]:grid-cols-[minmax(0,1.05fr)_minmax(260px,0.95fr)] max-[900px]:gap-7 max-[900px]:min-h-0 max-[850px]:py-8 max-[640px]:w-[min(calc(100%-32px),480px)] max-[640px]:grid-cols-1 max-[640px]:gap-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[#000080] text-[14px] font-bold max-[640px]:text-xs">
            <span className="w-2 h-2 rounded-full bg-[#2f9d63]" />
            For researchers and enumerators across Nigeria
          </span>

          <h1 className="mt-5 mb-3.5 font-extrabold text-[#000080] text-[clamp(36px,4.1vw,56px)] leading-[1.12] tracking-[-1.7px] max-[900px]:text-[clamp(34px,5vw,46px)] max-[640px]:mt-4 max-[640px]:text-[clamp(34px,9vw,46px)] max-[640px]:tracking-[-1.2px]">
            Research Data Collection,
            <br />
            Powered by People
            <br />
            <span className="text-[#2f9d63]">You Can Trust</span>
          </h1>

          <p className="max-w-145 m-0 text-[#424242] text-[18px] leading-[1.7] max-[640px]:text-[15px]">
            {activeTab === "hiring"
              ? "Connect with verified field professionals, coordinate research projects across locations, track assignment progress and receive organised data submissions — all through one trusted platform."
              : "Find fieldwork opportunities that match your skills, apply for research projects, and put your experience to work."}
          </p>

          <div
            className="mt-5 flex gap-5 border-b border-[#cbd9ee] max-[480px]:gap-4"
            aria-label="Choose your role"
          >
            <button
              type="button"
              onClick={() => setActiveTab("hiring")}
              className={`relative min-h-11 pb-2.5 text-base no-underline bg-transparent border-0 cursor-pointer transition-colors max-[480px]:text-sm
                ${
                  activeTab === "hiring"
                    ? "text-[#000080] font-bold after:absolute after:right-0 after:-bottom-px after:left-0 after:h-0.5 after:bg-[#000080] after:content-['']"
                    : "text-[#575757]"
                }`}
            >
              I&apos;m hiring
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("fieldwork")}
              className={`relative min-h-11 pb-[10px] text-base no-underline bg-transparent border-0 cursor-pointer transition-colors max-[480px]:text-sm
                ${
                  activeTab === "fieldwork"
                    ? "text-[#000080] font-bold after:absolute after:right-0 after:bottom-[-1px] after:left-0 after:h-[2px] after:bg-[#000080] after:content-['']"
                    : "text-[#575757]"
                }`}
            >
              I want fieldwork
            </button>
          </div>

          {activeTab === "hiring" ? (
            <>
              <form
                action="#open-projects"
                className="mt-[30px] mb-6 grid grid-cols-[1fr_1fr_0.8fr_auto] items-center gap-3 rounded-[10px] border border-[#D4D4D4] bg-white p-[10px] shadow-[0_6px_18px_#12214c0c] max-[900px]:grid-cols-[1fr_1fr] max-[640px]:grid-cols-1 max-[640px]:gap-2"
              >
                <label className="grid gap-[5px] px-[7px] max-[640px]:min-h-[58px] max-[640px]:rounded-[8px] max-[640px]:border max-[640px]:border-[#D4D4D4] max-[640px]:px-[12px] max-[640px]:py-[8px]">
                  <span className="text-[#575757] text-[13px] font-bold">
                    Fieldwork type
                  </span>
                  <select
                    name="fieldworkType"
                    defaultValue=""
                    className="w-full border-0 bg-transparent text-[#818797] text-[13px] outline-none"
                  >
                    <option value="" disabled>
                      Select type
                    </option>
                    {fieldworkTypes.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-[5px] px-[7px] border-l border-[#e8ebf2] max-[900px]:border-l-0 max-[640px]:min-h-[58px] max-[640px]:rounded-[8px] max-[640px]:border max-[640px]:border-[#D4D4D4] max-[640px]:px-[12px] max-[640px]:py-[8px]">
                  <span className="text-[#575757] text-[13px] font-bold">
                    State
                  </span>
                  <select
                    name="state"
                    defaultValue=""
                    className="w-full border-0 bg-transparent text-[#818797] text-[13px] outline-none"
                  >
                    <option value="" disabled>
                      Select state
                    </option>
                    {nigerianStates.map((state) => (
                      <option key={state}>{state}</option>
                    ))}
                    <option>Federal Capital Territory (FCT)</option>
                  </select>
                </label>
                <label className="grid gap-[5px] px-[7px] border-l border-[#e8ebf2] max-[900px]:border-l-0 max-[640px]:min-h-[58px] max-[640px]:rounded-[8px] max-[640px]:border max-[640px]:border-[#D4D4D4] max-[640px]:px-[12px] max-[640px]:py-[8px]">
                  <span className="text-[#575757] text-[13px] font-bold">
                    Enumerators
                  </span>
                  <input
                    type="number"
                    name="enumerators"
                    min="1"
                    step="1"
                    placeholder="e.g. 5"
                    className="w-full border-0 bg-transparent text-[#818797] text-[13px] outline-none"
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex min-h-11 items-center justify-center rounded-[7px] border border-transparent bg-[#000080] px-[14px] text-[14px] font-bold text-white whitespace-nowrap transition-colors hover:bg-[#17179b] max-[640px]:w-full"
                >
                  Post a project
                </button>
              </form>

              {/* hint */}
              <p className="mt-[10px] mb-8 text-[#575757] text-[14px] max-[640px]:text-[13px]">
                <span className="text-[#2f9d63] font-bold mr-2">i</span>
                Takes about 5 minutes. You only pay once you have picked your
                team.
              </p>

              {/* proof */}
              <div className="mt-[14px] flex flex-wrap gap-x-[22px] gap-y-[10px] text-[#48566c] text-[13px] max-[640px]:gap-x-4 max-[640px]:gap-y-2 max-[640px]:text-xs">
                <span className="flex items-center gap-[6px]">
                  <span className="text-[#2f9d63] font-bold mr-2">✓</span>{" "}
                  Verified field professionals
                </span>
                <span className="flex items-center gap-[6px]">
                  <span className="text-[#2f9d63] font-bold mr-2">✓</span> Clear
                  costs upfront
                </span>
                <span className="flex items-center gap-[6px]">
                  <span className="text-[#2f9d63] font-bold mr-2">✓</span> Paid
                  for approved work
                </span>
              </div>
            </>
          ) : (
            <>
              {/* enumerator CTA buttons */}
              <div className="mt-[30px] flex flex-wrap gap-3 max-[640px]:flex-col">
                <Link
                  href="/sign-up/enumerator"
                  className="inline-flex min-h-12 items-center justify-center rounded-[10px] bg-[#000080] px-6 text-[16px] font-bold text-white no-underline transition-colors hover:bg-[#17179b] max-[640px]:w-full"
                >
                  Join as an enumerator
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex min-h-12 items-center justify-center rounded-[10px] border border-[#000080] bg-transparent px-6 text-[16px] font-bold text-[#000080] no-underline transition-colors hover:bg-white max-[640px]:w-full"
                >
                  See how it works
                </Link>
              </div>

              {/* hint */}
              <p className="mt-[25px] mb-8 text-[#5e6476] text-[14px] max-[640px]:text-[13px]">
                <span className="text-[#2f9d63] font-[400px] mr-2">i</span>
                Free to join. You never pay to apply for projects.
              </p>

              {/* proof */}
              <div className="mt-[14px] flex flex-wrap gap-x-[22px] gap-y-[10px] text-[#48566c] text-[13px] max-[640px]:flex-col max-[640px]:gap-y-3 max-[640px]:text-xs">
                <span className="flex items-center gap-[6px]">
                  <span className="text-[#2f9d63] font-bold mr-2">✓</span>{" "}
                  Verified field professionals
                </span>
                <span className="flex items-center gap-[6px]">
                  <span className="text-[#2f9d63] font-bold mr-2">✓</span> Clear
                  costs upfront
                </span>
                <span className="flex items-center gap-[6px]">
                  <span className="text-[#2f9d63] font-bold mr-2">✓</span> Paid
                  for approved work
                </span>
              </div>
            </>
          )}
        </div>

        <div className="w-full max-[640px]:mx-auto max-[640px]:max-w-[420px]">
          <Image
            src="/images/heroimage.svg"
            alt="A researcher interviewing a community member"
            width={601}
            height={695}
            className="h-auto w-full max-[640px]:hidden"
          />
          <Image
            src="/images/Hero-photomobile.svg"
            alt="A researcher interviewing a community member"
            width={601}
            height={695}
            className="hidden rounded-t-3xl h-auto w-full max-[640px]:block"
            priority
          />
        </div>
      </div>
    </section>
  );
};
