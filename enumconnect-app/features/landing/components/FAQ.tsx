"use client";

import { useState } from "react";
import Link from "next/link";
import { questions, tabs, type Role } from "../data/faq";

export const FAQ = () => {
  const [role, setRole] = useState<Role>("researchers");

  return (
    <section className="bg-white py-[76px_82px] max-[640px]:py-[54px]" id="faq">
      <div className="mx-auto grid w-[min(calc(100%-48px),1200px)] grid-cols-[minmax(220px,0.65fr)_minmax(0,1.35fr)] gap-[clamp(40px,8vw,100px)] max-[900px]:w-[min(calc(100%-40px),760px)] max-[640px]:w-[min(calc(100%-32px),480px)] max-[640px]:grid-cols-1 max-[640px]:gap-8">
        <div className="hidden max-[640px]:block">
          <h2 className="m-0 text-[34px] font-extrabold leading-[1.08] text-[#000080]">
            Frequently Asked
            <br />
            Questions
          </h2>
          <p className="mt-4 mb-0 text-[16px] leading-[1.5] text-[#424242]">
            Here are some things you may want to know before getting started
            with EnumConnect.
          </p>
        </div>

        {/* intro */}
        <div className="max-[640px]:hidden">
          <h2 className="m-0 text-[40px] font-extrabold leading-[1.1] text-[#000080] max-[640px]:text-[32px]">
            Frequently Asked
            <br />
            Questions
          </h2>
          <p className="mb-[25px] mt-3 max-w-[500px] text-[18px] font-normal leading-[1.5] text-[#424242]">
            Here are some things you may want to know before getting started
            with Enumconnect.
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
              href="mailto:enumhubafrica@gmail.com"
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
            className="flex w-fit rounded-full border-2 border-[#D9D6F8] bg-[#E6E4FA] p-0.5 max-[640px]:grid max-[640px]:w-full max-[640px]:grid-cols-2"
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
                  className={`rounded-full px-[17px] py-2 text-base transition max-[640px]:min-w-0 max-[640px]:whitespace-nowrap max-[640px]:px-2 ${
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

          <h3 className="mb-[18px] mt-[30px] text-[24px] font-extrabold text-[#000080] max-[640px]:text-[20px]">
            {role === "researchers"
              ? "For Researchers and Organisations"
              : "For Enumerators"}
          </h3>

          <div
            id="faq-panel"
            role="tabpanel"
            aria-labelledby={`faq-tab-${role}`}
            key={role}
          >
            {questions[role].map(([question, answer]) => (
              <details
                key={question}
                name={`faq-${role}`}
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
        <div className="hidden rounded-[18px] bg-[#E3F2FF] px-6 py-7 max-[640px]:block">
          <strong className="text-[28px] font-extrabold leading-[1.15] text-[#000080]">
            Still have a question?
          </strong>
          <p className="mb-5 mt-3 text-[16px] leading-[1.5] text-[#424242]">
            Send us a message and our team will get back to you by email.
          </p>
          <Link
            className="inline-flex min-h-12 items-center justify-center rounded-[8px] border-2 border-[#000080] px-6 text-[18px] font-bold text-[#000080] no-underline"
            href="mailto:enumhubafrica@gmail.com"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
};
