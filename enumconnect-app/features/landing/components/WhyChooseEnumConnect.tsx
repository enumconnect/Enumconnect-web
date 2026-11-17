import Image from "next/image";


const benefits = [
  
  [
    "/icons/icon-shield.svg",
    "Verified, trained people",
    "Every enumerator is ID verified, and they train on the ethics and consent before a first job.",
  ],
  [
    "/icons/icon-lang.svg",
    "Speaks their language",
    "Find enumerators by language and LGA: Hausa, Yoruba, Igbo, Pidgin and more.",
  ],
  [
    "/icons/icon-cost.svg",
    "Clear costs upfront",
    "See the full project cost, including our fee, before you publish anything.",
  ],
  [
    "/icons/icon-review.svg",
    "Approve before anyone is paid",
    "Check every submission. Enumerators are paid for the work you approve.",
  ],
  [
    "/icons/icon-pin.svg",
    "Proof it came from the field",
    "Where your study needs it, submissions record location and time.",
  ],
  [
    "/icons/icon-list.svg",
    "Built for academic fieldwork",
    "Household surveys, interviews, focus groups, health facility and school surveys.",
  ],
];

export function WhyChooseEnumConnect() {
  return (
    <section className="py-[76px_80px] bg-[#E3F2FF] max-[640px]:py-[54px]">
      <div className="mx-auto w-[min(calc(100%-48px),1200px)] max-[900px]:w-[min(calc(100%-40px),760px)] max-[640px]:w-[min(calc(100%-32px),480px)]">
        {/* section heading */}
        <div className="mb-[30px] max-[640px]:mb-6">
          <h2 className="m-0 text-[#000080] font-extrabold text-[clamp(28px,3vw,40px)] leading-[1.15] tracking-[-1.2px] max-[640px]:text-[28px]">
            Why Enumconnect
          </h2>
          <p className="mt-[9px] mb-0 text-[#424242] text-[18px] font-[400px] max-[640px]:text-[13px] max-[640px]:leading-[1.5]">
            Research fieldwork. Without all the back and forth.
          </p>
        </div>

        {/* benefits layout */}
        <div className="grid grid-cols-[minmax(235px,0.7fr)_minmax(0,1.3fr)] items-stretch gap-6 max-[640px]:grid-cols-1">
          {/* photo */}
          <div className="relative overflow-hidden rounded-[18px] bg-[#E3F2FF]  max-[640px]:min-h-[360px]">
            <Image
              src="/images/whyenum.svg"
              alt="Local field researchers preparing for community research"
              fill
              sizes="(max-width: 640px) 100vw, 360px"
              className="object-cover"
            />
            <div className="absolute right-0 bottom-0 left-0 grid gap-3 pt-[45px] px-[18px] pb-[18px] bg-gradient-to-t from-[#11134ae8] to-transparent text-white">
              <strong className="text-[20px] font-extrabold leading-[1.2]">
                Local people.
                <br />
                Local languages.
              </strong>
              <div className="flex flex-wrap gap-2">
                {["Hausa", "Yoruba", "Igbo", "Pidgin"].map((lang) => (
                  <span
                    key={lang}
                    className="rounded-full bg-white px-3 py-1  text-[#000080] text-[14px] font-bold"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* benefits grid */}
          <div className="grid grid-cols-2 gap-[14px] max-[640px]:grid-cols-1 max-[640px]:gap-[10px]">
            {benefits.map(([icon, title, description]) => (
              <article
                key={title}
                className="flex gap-3 rounded-xl bg-white p-[17px] max-[640px]:p-[14px]"
              >
                <div
                  className="grid place-items-center w-[44px] h-[44px] shrink-0 rounded-lg bg-[#E3F5EB] "
                  aria-hidden="true"
                >
                  <Image src={icon} alt={title} width={20} height={20} />
                </div>

                <div>
                  <h3 className="mt-[3px] mb-[7px] font-extrabold text-[#000080] text-[20px]">
                    {title}
                  </h3>
                  <p className="m-0 text-[#424242] text-base leading-[1.5]">
                    {description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
