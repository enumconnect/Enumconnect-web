import Image from "next/image";
import { audiences } from "../data/AudienceSection";
export function AudienceSection() {
  return (
    <section
      className="bg-[#000080] text-white py-[22px] pb-[25px]"
      aria-label="Who Enumconnect serves"
    >
      <div className="mx-auto w-[min(calc(100%-48px),1200px)] max-[640px]:w-[min(calc(100%-32px),480px)]">
        <p className="m-0 mb-[17px] text-[#B6B6EC] text-center text-base">
          Built for academic research in Nigeria
        </p>
        <ul className="m-0 grid list-none grid-cols-4 gap-6 p-0 max-[640px]:grid-cols-2 max-[640px]:gap-x-3 max-[640px]:gap-y-4">
          {audiences.map(({ icon, mobileIcon, label }) => (
            <li
              key={label}
              className="flex items-center justify-center gap-3 text-base font-bold text-white max-[640px]:min-h-[60px] max-[640px]:justify-start max-[640px]:gap-2 max-[640px]:rounded-[14px] max-[640px]:bg-[#191989] max-[640px]:px-3 max-[640px]:text-[14px]"
            >
              <span
                className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-[#2F9D63] max-[640px]:h-7 max-[640px]:w-7 max-[640px]:rounded-none max-[640px]:bg-transparent"
                aria-hidden="true"
              >
                <Image
                  src={icon}
                  alt=""
                  width={20}
                  height={20}
                  className="max-[640px]:hidden"
                />
                <Image
                  src={mobileIcon}
                  alt=""
                  width={24}
                  height={24}
                  className="hidden max-[640px]:block"
                />
              </span>
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
