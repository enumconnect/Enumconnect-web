import Image from "next/image";
import { benefits } from "../data/WhyChooseEnumConnect";

export function WhyChooseEnumConnect() {
  return (
    <section className="py-[76px_80px] bg-[#E3F2FF] max-[640px]:py-[54px]">
      <div className="mx-auto w-[min(calc(100%-48px),1066px)] max-[900px]:w-[min(calc(100%-40px),760px)] max-[640px]:w-[min(calc(100%-32px),480px)]">
        {/* section heading */}
        <div className="mb-[30px] max-[640px]:mb-6">
          <h2 className="m-0 text-[#000080] font-extrabold text-[clamp(28px,3vw,36px)] leading-[1.15] tracking-[-0.5px] max-[640px]:text-[28px]">
            Research Fieldwork, Without All the Back and Forth
          </h2>
          <p className="mt-[18px] mb-0 max-w-[760px] text-[#424242] text-base leading-[1.4]">
            Finding field professionals, sharing instructions, tracking
            submissions, and managing payments can be a lot to handle.
            EnumConnect brings everything together in one organised platform.
          </p>
        </div>

        {/* benefits layout */}
        <div className="grid grid-cols-[minmax(235px,0.44fr)_minmax(0,1fr)] items-stretch gap-5 max-[640px]:grid-cols-1">
          {/* photo */}
          <div className="relative overflow-hidden rounded-[18px] bg-[#E3F2FF] max-[640px]:aspect-[4/3]">
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
          <div className="grid grid-cols-2 gap-5 max-[640px]:grid-cols-1 max-[640px]:gap-[10px]">
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className={`grid grid-cols-[40px_minmax(0,1fr)] gap-x-[18px] gap-y-3 rounded-xl bg-white p-5 max-[640px]:p-3.5 ${
                  benefit.wide ? "col-span-2 max-[640px]:col-span-1" : ""
                }`}
              >
                <div
                  className="grid h-10 w-10 place-items-center rounded-lg bg-[#E3F5EB]"
                  aria-hidden="true"
                >
                  <Image src={benefit.icon} alt="" width={20} height={20} />
                </div>

                <h3 className="mt-[6px] mb-0 font-extrabold text-[#000080] text-[18px] max-[640px]:text-[17px]">
                  {benefit.title}
                </h3>
                <p className="col-span-2 m-0 text-[#424242] text-base leading-[1.4] max-[640px]:text-[14px]">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
