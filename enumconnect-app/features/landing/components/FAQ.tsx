"use client";

import { useState } from "react";
import Link from "next/link";
import { questions, tabs, type Role } from "../data/faq";

export const FAQ = () => {
  const [role, setRole] = useState<Role>("researchers");

  return (
    <section className="bg-white py-[76px_82px] max-[640px]:py-[54px]" id="faq">
      <div className="mx-auto grid w-[min(calc(100%-48px),1200px)] grid-cols-[minmax(220px,0.65fr)_minmax(0,1.35fr)] gap-[clamp(40px,8vw,100px)] max-[900px]:w-[min(calc(100%-40px),760px)] max-[640px]:w-[min(calc(100%-32px),480px)] max-[640px]:grid-cols-1 max-[640px]:gap-8">
        {/* intro */}
        <div>
          <h2 className="m-0 text-[40px] font-extrabold leading-[1.1] text-[#000080] max-[640px]:text-[32px]">
            Questions,
            <br />
            <span className="text-[#2F9D63]">answered</span>
          </h2>
          <p className="mb-[25px] mt-3 max-w-[230px] text-[18px] font-normal leading-[1.5] text-[#424242]">
            The things people ask before their first project.
          </p>

          <div className="rounded-xl bg-[#E3F2FF] p-[18px] max-[640px]:max-w-[360px]">
            <strong className="text-[20px] font-extrabold text-[#000080]">
              Still have a question?
            </strong>
            <p className="mb-3 mt-2 text-[14px] font-normal leading-[1.5] text-[#424242]">
              Send us a message and our team will get back to you by email.
            </p>
            <Link
              className="inline-flex min-h-[34px] items-center justify-center rounded-[7px] border border-[#000080] bg-white px-[13px] text-base font-bold text-[#000080] no-underline transition-colors hover:bg-[#000080] hover:text-white"
              href="mailto:hello@enumconnect.com"
            >
              Contact us
            </Link>
          </div>
        </div>

        {/* content */}
        <div className="min-w-0">
          {/* tabs */}
          <div
            role="tablist"
            aria-label="Frequently asked questions"
            className="mb-[18px] flex w-fit rounded-full border-2 border-[#D9D6F8] bg-[#E6E4FA] p-0.5"
          >
            {tabs.map((t) => {
              const active = role === t.id;
              return (
                <button
                  key={t.id}
                  role="tab"
                  id={`faq-tab-${t.id}`}
                  aria-selected={active}
                  aria-controls="faq-panel"
                  tabIndex={active ? 0 : -1}
                  onClick={() => setRole(t.id)}
                  className={`rounded-full px-[17px] py-2 text-base transition ${
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
            id="faq-panel"
            role="tabpanel"
            aria-labelledby={`faq-tab-${role}`}
            key={role}
          >
            {questions[role].map(([question, answer], index) => (
              <details
                key={question}
                name={`faq-${role}`}
                open={index === 0}
                className="group border-b border-[#e4e8f0] px-6 transition-colors group-open:border-transparent open:rounded-2xl open:border-transparent open:bg-[#F0EFFC]"
              >
                <summary className="flex min-h-[53px] cursor-pointer list-none items-center justify-between gap-5 py-3 text-[18px] font-extrabold text-[#000080] max-[640px]:min-h-[50px] max-[640px]:text-[15px] [&::-webkit-details-marker]:hidden">
                  <span className="group-not-open:text-[#1a1a1a]">
                    {question}
                  </span>

                  <span
                    aria-hidden="true"
                    className="relative h-[24px] w-[24px] shrink-0 rounded-full bg-[#E6E4FA]
                      before:absolute before:left-[6px] before:top-[11px] before:h-[2px] before:w-[12px] before:bg-[#000080] before:content-['']
                      after:absolute after:left-[6px] after:top-[11px] after:h-[2px] after:w-[12px] after:rotate-90 after:bg-[#000080] after:transition-transform after:content-['']
                      group-open:bg-[#000080] group-open:before:bg-white group-open:after:rotate-0 group-open:after:bg-white"
                  />
                </summary>
                <p className="mb-0 mr-[34px] max-w-[680px] pb-5 text-base font-normal leading-[1.6] text-[#424242]">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
