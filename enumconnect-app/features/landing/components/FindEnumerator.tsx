import Image from "next/image";
import Link from "next/link";

const checklist = [
  "Local language skills",
  "Familiar with the community",
  "Close to your research sites",
];

const pilotLocations = ["Lagos", "Ogun", "Oyo", "Osun", "Abuja (FCT)"];

export const FindEnumerators = () => {
  return (
    <section
      className="bg-[#E3F2FF] py-[80px] max-[640px]:py-[54px]"
      id="locations"
    >
      <div className="mx-auto grid w-[min(calc(100%-48px),1200px)] grid-cols-2 items-center gap-16 max-[900px]:grid-cols-1 max-[900px]:gap-10 max-[640px]:w-[min(calc(100%-32px),480px)]">
        {/* LEFT: text */}
        <div>
          <h2 className="m-0 text-[clamp(30px,3.4vw,40px)] font-extrabold leading-[1.15] tracking-[-1px] text-[#000080]">
            Find Field Data Collectors
            <span className="block text-[#2F9D63]">in Your Area</span>
          </h2>

          <p className="mt-5 mb-0 max-w-140 text-[18px] font-[400px] leading-[1.6] text-[#424242] max-[640px]:text-[15px]">
            Research often requires people who understand the communities
            they&apos;re working in. Find field data collectors based in your
            preferred location, with relevant local language skills and cultural
            familiarity.
          </p>

          <ul className="mt-7 mb-0 grid list-none gap-3.5 p-0">
            {checklist.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3.5 text-[14px] font-bold text-[#212121]"
              >
                <Image
                  src="/icons/check.svg"
                  alt="check"
                  width={22}
                  height={22}
                />
                {item}
              </li>
            ))}
          </ul>

          <Link
            href="/locations"
            className="mt-9 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#000080] px-6 py-3.5 text-[16px] font-bold text-white transition hover:bg-[#00006b] max-[640px]:w-full"
          >
            Browse Locations
          </Link>
        </div>

        {/* RIGHT: card */}
        <div className="w-full max-w-[560px] justify-self-end rounded-[28px] border border-[#D9E2F0] bg-white p-3 shadow-[0_18px_40px_-12px_rgba(0,0,128,0.18)] max-[900px]:justify-self-start">
          {/* image + badge */}
          <div className="relative aspect-[534/220] overflow-hidden rounded-[20px] max-[640px]:aspect-[4/3]">
            <Image
              src="/images/findenumeratorimage.svg"
              alt="A local field researcher holding a tablet"
              fill
              sizes="(max-width: 900px) 100vw, 534px"
              className="object-cover"
            />
            <span className="absolute left-5 top-5 hidden rounded-full bg-white px-5 py-3 text-[20px] font-extrabold text-[#2F9D63] shadow-sm max-[640px]:block">
              Pilot locations
            </span>
          </div>

          {/* card body */}
          <div className="px-4 pt-5 pb-4">
            <h3 className="m-0 text-[18px] font-extrabold text-[#000080]">
              Where Enumconnect is starting
            </h3>

            <div className="mt-4 flex flex-wrap gap-2.5">
              {pilotLocations.map((place) => (
                <span
                  key={place}
                  className="inline-flex items-center gap-2 rounded-full border border-[#D9DEE8] bg-white px-4 py-2.5 text-[14px] font-bold text-[#000080]"
                >
                  <Image
                    src="/icons/pin.svg"
                    alt="pin"
                    width={18}
                    height={18}
                  />
                  {place}
                </span>
              ))}

              <span className="inline-flex items-center rounded-full border border-dashed border-[#C5CDE8] px-4 py-2.5 text-[14px] font-bold text-[#575757]">
                + Other confirmed pilot locations
              </span>
            </div>

            <p className="mt-4 mb-0 text-[13px] font-semibold text-[#575757]">
              Confirmed pilot states and locations will be displayed here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
