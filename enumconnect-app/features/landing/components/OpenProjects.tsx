import Link from "next/link";
import { Banknote, ContactRound, MapPin, Search } from "lucide-react";

const projects = [
  { title: "Household water use survey", place: "Kano Municipal · Hausa", pay: "₦20,000", meta: "2 weeks · 40 responses" },
  { title: "Market trader focus groups", place: "Ibadan North · Yoruba", pay: "₦15,000", meta: "1 week · 4 groups" },
  { title: "Student health survey", place: "Nsukka · Igbo, English", pay: "₦12,000", meta: "10 days · 60 responses" },
];

export function OpenProjects() {
  return (
    <section
      className="bg-[#000080] text-white py-[78px] max-[640px]:py-[55px]"
      id="open-projects"
    >
      <div className="mx-auto grid w-[min(calc(100%-48px),1200px)] grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] items-center gap-[clamp(40px,8vw,100px)] max-[900px]:w-[min(calc(100%-40px),760px)] max-[900px]:grid-cols-1 max-[640px]:w-[min(calc(100%-32px),480px)] max-[640px]:gap-8">
        <div id="for-enumerators">
          <h2 className="mt-[17px] mb-3 text-[clamp(32px,4vw,44px)] leading-[1.12] tracking-[-1px] max-[640px]:text-[34px] font-extrabold">
            Find Fieldwork Opportunities
            <br />
            <span className="text-[#4DAF7A]">on EnumConnect</span>
          </h2>
          <p className="m-0 text-[#B6B6EC] text-[18px] font-normal max-[640px]:text-[16px] max-[640px]:leading-[1.6]">
            Interested in surveys, interviews, or research fieldwork? Find
            projects that match your skills and connect with researchers.
          </p>

          <ul className="grid gap-[18px] mt-[27px] mb-[27px] p-0 list-none max-[640px]:gap-5">
            <li className="flex items-start gap-[13px]">
              <span className="grid place-items-center w-[34px] h-[34px] shrink-0 rounded-lg bg-[#2f9d63] text-[15px]">
                <Search size={22} aria-hidden="true" />
              </span>
              <div>
                <strong className="block mt-[1px] mb-[5px] font-extrabold text-white text-[20px] max-[640px]:text-[17px]">
                  Discover Relevant Opportunities
                </strong>
                <small className="block max-w-[600px] text-[#B6B6EC] text-base font-[400px] leading-[1.5]">
                  Explore enumerator jobs in Nigeria and field data collection
                  projects that match your skills, experience, and location.
                </small>
              </div>
            </li>
            <li className="flex items-start gap-[13px]">
              <span className="grid place-items-center w-[34px] h-[34px] shrink-0 rounded-lg bg-[#2f9d63] text-[15px]">
                <ContactRound size={22} aria-hidden="true" />
              </span>
              <div>
                <strong className="block mt-[1px] mb-[5px] font-extrabold text-white text-[20px] max-[640px]:text-[17px]">
                  Showcase Your Skills
                </strong>
                <small className="block max-w-[600px] text-[#B6B6EC] text-base font-[400px] leading-[1.5]">
                  Build a profile that highlights your qualifications,
                  languages, experience and areas of interest.
                </small>
              </div>
            </li>
            <li className="flex items-start gap-[13px]">
              <span className="grid place-items-center w-[34px] h-[34px] shrink-0 rounded-lg bg-[#2f9d63] text-[15px]">
                <Banknote size={22} aria-hidden="true" />
              </span>
              <div>
                <strong className="block mt-[1px] mb-[5px] font-extrabold text-white text-[20px] max-[640px]:text-[17px]">
                  Get Paid for Approved Work
                </strong>
                <small className="block max-w-[600px] text-[#B6B6EC] text-base font-[400px] leading-[1.5]">
                  Complete assigned tasks, submit your work and receive payment
                  after approval, according to the project and platform payment
                  terms.
                </small>
              </div>
            </li>
          </ul>

          <div className="flex flex-wrap items-center gap-4 max-[640px]:block">
            <Link
              className="inline-flex min-h-[42px] items-center justify-center rounded-[8px] border border-transparent bg-white px-8 py-4 text-base font-bold text-[#000080] no-underline transition-colors hover:bg-[#eef0ff] max-[640px]:flex max-[640px]:w-full max-[640px]:min-h-14"
              href="/sign-up/enumerator"
            >
              Find Fieldwork
            </Link>
          </div>
        </div>

        <div className="rounded-[18px] bg-[#2626A6] p-[22px] max-[640px]:mt-1 max-[640px]:p-[15px]">
          <div className="mb-[14px] flex items-center justify-between">
            <h3 className="m-0 text-[20px] font-extrabold">Open projects</h3>
            <span className="text-[#B6B6EC] font-[400px] text-[14px]">
              Examples only
            </span>
          </div>
          <div className="grid gap-[11px] max-[640px]:gap-4">
            {projects.map(({ title, place, pay, meta }) => (
              <article
                key={title}
                className="rounded-[18px] bg-white p-[13px] text-[#11134a] max-[640px]:p-5"
              >
                <div className="flex items-center justify-between gap-[10px] max-[640px]:items-start">
                  <h4 className="m-0 min-w-0 text-[#212121] font-extrabold text-[18px] max-[640px]:text-[20px]">
                    {title}
                  </h4>
                  <span className="text-[#8E8E8E] font-bold text-[12px] uppercase max-[640px]:mt-1">
                    Sample
                  </span>
                </div>
                <p className="my-[6px] mb-3 flex items-center gap-1.5 text-[#575757] font-[400px] text-[14px] max-[640px]:mb-4 max-[640px]:text-[16px]">
                  <MapPin size={16} aria-hidden="true" />
                  {place}
                </p>
                <div className="flex items-center justify-start gap-[10px] max-[640px]:grid max-[640px]:grid-cols-1">
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <strong className="shrink-0 rounded bg-[#F8BE00] px-[7px] py-[5px] text-[#212121] text-base font-bold max-[640px]:text-[16px]">
                      {pay}
                    </strong>
                    <span className="min-w-0 flex-1 text-[#575757] font-normal text-[14px] max-[640px]:text-[14px]">
                      {meta}
                    </span>
                  </div>
                  <Link
                    href="/researcher/projects"
                    aria-label={`View project: ${title}`}
                    className="inline-flex min-h-9 shrink-0 items-center justify-center rounded-[8px] bg-[#000080] px-[13px] py-[6px] text-white text-[12px] font-bold no-underline transition-colors hover:bg-[#17179b] max-[640px]:mt-1 max-[640px]:min-h-12 max-[640px]:text-[18px]"
                  >
                    View Project
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
