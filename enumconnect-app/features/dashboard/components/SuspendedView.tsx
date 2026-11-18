import { Check, X } from "lucide-react";
import { getFirstName } from "../lib/name";
import { routes } from "../lib/routes";

const cannot = [
  "Post new projects",
  "Fund projects or choose a team",
  "Repeat a past project",
];
const can = [
  "See your projects and their responses",
  "See your payment receipts",
  "Read and reply to messages from our team",
];
const next = [
  {
    title: "We look into the report",
    body: "A person on our team checks the project and the report.",
  },
  {
    title: "You tell us your side",
    body: "Send us anything that helps explain what happened.",
  },
  {
    title: "We email you the outcome",
    body: "If the suspension is lifted, your account goes back to how it was.",
  },
];

const card = "rounded-[24px] border border-[#D9DEE8] bg-white p-6 sm:p-8";
const heading = "m-0 text-[22px] font-extrabold text-[#1a1a1a]";

export function SuspendedView({ fullName }: { fullName: string }) {
  return (
    <>
      <span className="inline-block rounded-full bg-[#FBEAEA] px-4 py-1.5 text-[14px] font-bold tracking-wide text-[#C42B2B]">
        Suspended
      </span>
      <h1 className="mb-3 mt-4 text-[clamp(30px,4vw,44px)] font-extrabold leading-[1.1] text-[#1a1a1a]">
        Your account is suspended
      </h1>
      <p className="m-0 max-w-[760px] text-[18px] leading-[1.5] text-[#424242]">
        {getFirstName(fullName)}, you can still log in, but you can&apos;t start
        new work until our team finishes its review.
      </p>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="grid gap-6">
          <section className={card}>
            <h2 className={heading}>Why your account is suspended</h2>
            <p className="mb-4 mt-4 text-[17px] leading-[1.6] text-[#424242]">
              We received a report about how one of your projects was run. While
              our team looks into it, your account is on hold.
            </p>
            <p className="m-0 text-[14px] text-[#575757]">
              This isn&apos;t a final decision. A person on our team reviews
              every case.
            </p>
          </section>

          <section className={card}>
            <h2 className={heading}>What this means for now</h2>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="m-0 text-[16px] font-bold text-[#1a1a1a]">
                  You can&apos;t
                </h3>
                <ul className="m-0 mt-4 grid list-none gap-3.5 p-0">
                  {cannot.map((t) => (
                    <li
                      key={t}
                      className="flex items-center gap-3 text-[17px] text-[#424242]"
                    >
                      <X
                        size={18}
                        className="shrink-0 text-[#C42B2B]"
                        aria-hidden="true"
                      />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="m-0 text-[16px] font-bold text-[#1a1a1a]">
                  You can still
                </h3>
                <ul className="m-0 mt-4 grid list-none gap-3.5 p-0">
                  {can.map((t) => (
                    <li
                      key={t}
                      className="flex items-center gap-3 text-[17px] text-[#424242]"
                    >
                      <Check
                        size={18}
                        strokeWidth={3}
                        className="shrink-0 text-[#1B6A40]"
                        aria-hidden="true"
                      />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className={card}>
            <h2 className={heading}>What happens next</h2>
            <ol className="m-0 mt-5 grid list-none gap-5 p-0">
              {next.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#EEF0FF] text-[15px] font-bold text-[#000080]">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="m-0 text-[17px] font-bold text-[#1a1a1a]">
                      {s.title}
                    </h3>
                    <p className="m-0 mt-0.5 text-[16px] text-[#575757]">
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <a
              href={routes.contact}
              className="mt-6 inline-block rounded-lg border-2 border-[#000080] px-6 py-3 text-[16px] font-bold text-[#000080] hover:bg-[#F1F1FF]"
            >
              Tell us your side
            </a>
          </section>
        </div>

        <aside className="rounded-[24px] bg-[#E3F2FF] p-6">
          <h2 className="m-0 text-[18px] font-bold text-[#1a1a1a]">
            Questions about this?
          </h2>
          <p className="mb-3 mt-2 text-[15px] text-[#424242]">
            Our team replies by email, usually the same day.
          </p>
          <a
            href={routes.contact}
            className="text-[16px] font-bold text-[#000080] hover:underline"
          >
            Contact us
          </a>
        </aside>
      </div>
    </>
  );
}
