import Link from "next/link";

const projects = [
  { title: "Household water use survey", place: "Kano Municipal · Hausa speakers", pay: "₦20,000", meta: "2 weeks · 8 responses" },
  { title: "Market trader focus groups", place: "Kano State · Yoruba", pay: "₦15,000", meta: "1 week · 4 groups" },
  { title: "Student health survey", place: "Nukes · English, Hausa", pay: "₦12,000", meta: "10 days · 60 responses" },
];

export function OpenProjects() {
  return (
    <section
      className="bg-[#000080] text-white py-[78px] max-[640px]:py-[55px]"
      id="open-projects"
    >
      <div className="mx-auto w-[min(calc(100%-48px),1200px)] max-[900px]:w-[min(calc(100%-40px),760px)] max-[640px]:w-[min(calc(100%-32px),480px)] grid grid-cols-[minmax(0,0.95fr)_minmax(400px,1.05fr)] items-center gap-[clamp(40px,8vw,100px)] max-[900px]:grid-cols-1 max-[640px]:gap-8">
        {/* copy */}
        <div id="for-enumerators">
          <h2 className="mt-[17px] mb-3 text-[clamp(32px,4vw,44px)] leading-[1.12] tracking-[-1px] max-[640px]:text-[34px] font-extrabold">
            Earn from research
            <br />
            <span className="text-[#8FD1AE]">fieldwork near you</span>
          </h2>
          <p className="m-0 text-[#B6B6EC] text-[18px] font-[400px]">
            Use your languages and local knowledge on real studies.
          </p>

          <ul className="grid gap-[18px] mt-[27px] mb-[27px] p-0 list-none">
            <li className="flex items-start gap-[13px]">
              <span className="grid place-items-center w-[34px] h-[34px] shrink-0 rounded-lg bg-[#2f9d63] text-[15px]">
                ▣
              </span>
              <div>
                <strong className="block mt-[1px] mb-[5px] font-extrabold text-white text-[20px] ">
                  Real projects from researchers
                </strong>
                <small className="block max-w-[600px] text-[#B6B6EC] text-base font-[400px] leading-[1.5]">
                  Surveys and interviews work posted by students, lecturers and
                  university research groups.
                </small>
              </div>
            </li>
            <li className="flex items-start gap-[13px]">
              <span className="grid place-items-center w-[34px] h-[34px] shrink-0 rounded-lg bg-[#2f9d63] text-[15px]">
                ▤
              </span>
              <div>
                <strong className="block mt-[1px] mb-[5px] font-extrabold text-white text-[20px] ">
                  Paid to your bank account
                </strong>
                <small className="block max-w-[600px] text-[#B6B6EC] text-base font-[400px] leading-[1.5]">
                  When your work is approved, payment goes to the account on
                  your profile. No more pay to apply.
                </small>
              </div>
            </li>
            <li className="flex items-start gap-[13px]">
              <span className="grid place-items-center w-[34px] h-[34px] shrink-0 rounded-lg bg-[#2f9d63] text-[15px]">
                ✦
              </span>
              <div>
                <strong className="block mt-[1px] mb-[5px] font-extrabold text-white text-[20px]">
                  A record that grows with you
                </strong>
                <small className="block max-w-[600px] text-[#B6B6EC] text-base font-[400px] leading-[1.5]">
                  Every completed project adds to your rating and history, so
                  researchers pick you again.
                </small>
              </div>
            </li>
          </ul>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              className="inline-flex min-h-[42px] items-center justify-center rounded-[8px] border border-transparent bg-white px-8 py-4 text-base font-bold text-[#000080] no-underline transition-colors hover:bg-[#eef0ff]"
              href="/signup?role=enumerator"
            >
              Join as an enumerator
            </Link>
            <span className="text-[#8FD1AE] font-bold text-base">
              Free to join
            </span>
          </div>
        </div>

        {/* project board */}
        <div className="rounded-[18px] bg-[#2626A6] p-[22px] max-[640px]:p-[15px]">
          <div className="flex items-center justify-between mb-[14px]">
            <h3 className="m-0 text-[20px] font-extrabold">Open projects</h3>
            <span className="text-[#B6B6EC] font-[400px] text-[14px]">
              Examples only
            </span>
          </div>
          <div className="grid gap-[11px]">
            {projects.map(({ title, place, pay, meta }) => (
              <article
                key={title}
                className="rounded-[10px] bg-white p-[13px] text-[#11134a] max-[640px]:p-[11px]"
              >
                <div className="flex items-center justify-between gap-[10px]">
                  <h4 className="m-0 text-[#212121] font-extrabold text-[18px]">
                    {title}
                  </h4>
                  <span className="text-[#8E8E8E] font-bold text-[12px] uppercase">
                    Sample
                  </span>
                </div>
                <p className="my-[6px] mb-3 text-[#575757] font-[400px] text-[14px]">
                  {place}
                </p>
                <div className="flex items-center justify-start gap-[10px] max-[640px]:gap-[7px]">
                  <strong className="rounded bg-[#F8BE00] px-[7px] py-[5px] text-[#212121] text-base font-bold">
                    {pay}
                  </strong>
                  <span className="flex-1 text-[#575757] font-[400px] text-[14px] max-[640px]:text-[9px]">
                    {meta}
                  </span>
                  <Link
                    href=""
                    aria-label={`Apply for ${title}`}
                    className="rounded-[5px] bg-[#000080] px-[13px] py-[6px] text-white text-[10px] font-bold no-underline transition-colors hover:bg-[#17179b]"
                  >
                    Apply
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
