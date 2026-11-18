import Link from "next/link";
import { Info } from "lucide-react";
import { routes } from "../lib/routes";

export function BeforeYouStart() {
  return (
    <section className="rounded-[24px] bg-[#E3F2FF] p-6">
      <h2 className="m-0 flex items-center gap-3 text-[20px] font-extrabold text-[#000080]">
        <span
          className="grid h-6 w-6 place-items-center rounded-full bg-white text-[#000080]"
          aria-hidden="true"
        >
          <Info size={14} />
        </span>
        Before you start
      </h2>
      <p className="mb-6 mt-4 text-[16px] leading-[1.65] text-[#424242]">
        Have your questionnaire ready. You can build it in Enumconnect. Ethics
        approval comes from you and your institution.
      </p>
      <Link
        href={routes.researcherGuide}
        className="text-[16px] font-bold text-[#000080] hover:underline"
      >
        Read the researcher guide
      </Link>
    </section>
  );
}

export function QuestionsCard() {
  return (
    <section className="rounded-[24px] border border-[#D9DEE8] bg-white p-6">
      <h2 className="m-0 text-[20px] font-extrabold text-[#000080]">
        Questions?
      </h2>
      <p className="m-0 mt-2 text-[16px] text-[#575757]">
        Our team replies by email.
      </p>
      <a
        href={routes.contact}
        className="mt-1 inline-block text-[16px] font-bold text-[#000080] hover:underline"
      >
        Contact us
      </a>
    </section>
  );
}
