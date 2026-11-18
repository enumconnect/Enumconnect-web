import Link from "next/link";
import Image from "next/image";
import { skills } from "../data/skills";

const tones = {
  navy: "bg-[#F1F1FF] text-[#000080]",
  green: "bg-[#E3F5EB] text-[#2A9D6A]",
};

export function FindRightPeople() {
  return (
    <section
      className="bg-[#F8FFFD] py-[80px] max-[640px]:py-[54px]"
      id="for-researchers"
    >
      <div className="mx-auto w-[min(calc(100%-48px),1200px)] max-[640px]:w-[min(calc(100%-32px),480px)]">
        <div className="grid grid-cols-2 items-center gap-10 max-[900px]:grid-cols-1 max-[900px]:gap-4">
          <h2 className="m-0 text-[clamp(30px,3.4vw,40px)] font-extrabold leading-[1.2] tracking-[-0.5px] text-[#000080]">
            Find the Right People
            <span className="block text-[#2F9D63]">for Your Research</span>
          </h2>

          <p className="m-0 max-w-[560px] text-[18px] font-normal leading-[1.55] text-[#424242] max-[640px]:text-[15px]">
            Every research project is different. Whether you need help
            conducting surveys, interviewing participants or organising research
            responses, find field data collectors with the relevant skills for
            your project.
          </p>
        </div>

        <ul className="m-0 mt-12 grid list-none grid-cols-4 gap-6 p-0 max-[1000px]:grid-cols-2 max-[560px]:grid-cols-1 max-[640px]:mt-8 max-[640px]:gap-4">
          {skills.map(({ title, description, icon, tone }) => (
            <li key={title}>
              <div className="group flex h-full flex-col rounded-[20px] border border-[#D9DEE8] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#000080] hover:shadow-[0_14px_30px_-14px_rgba(0,0,128,0.3)] max-[640px]:relative max-[640px]:min-h-[142px] max-[640px]:rounded-[16px] max-[640px]:px-5 max-[640px]:py-5">
                <div className="flex items-center justify-between max-[640px]:block max-[640px]:w-12">
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-lg ${tones[tone]} max-[640px]:h-[52px] max-[640px]:w-[52px]`}
                    aria-hidden="true"
                  >
                    <Image src={icon} alt="icon" width={24} height={24} />
                  </span>
                  <Image
                    src="/icons/arrow-right.svg"
                    alt="arrow"
                    width={20}
                    height={20}
                    className="max-[640px]:absolute max-[640px]:right-5 max-[640px]:top-7"
                  />
                </div>

                <h3 className="mb-2 mt-5 text-[18px] font-extrabold text-[#000080] max-[640px]:absolute max-[640px]:left-[88px] max-[640px]:right-12 max-[640px]:top-[18px] max-[640px]:mt-0 max-[640px]:text-[18px]">
                  {title}
                </h3>
                <p className="m-0 text-[15px] font-normal leading-[1.6] text-[#424242] max-[640px]:absolute max-[640px]:bottom-5 max-[640px]:left-[88px] max-[640px]:right-5 max-[640px]:top-[58px] max-[640px]:text-[14px] max-[640px]:leading-[1.45]">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <Link
            href="/skills"
            className="inline-block rounded-md bg-[#000080] px-6 py-[15px] text-[16px] font-bold text-white transition hover:bg-[#00006b] max-[640px]:block max-[640px]:w-full"
          >
            Explore All Skills
          </Link>
        </div>
      </div>
    </section>
  );
}
