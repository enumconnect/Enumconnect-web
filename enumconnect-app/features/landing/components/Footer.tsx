import Image from "next/image";
import Link from "next/link";
import { linkGroups } from "../data/footer";

export function Footer() {
  return (
    <footer className="bg-[#000080] text-white pt-[55px] pb-5" id="about">
      <div className="mx-auto w-[min(calc(100%-48px),1200px)] max-[900px]:w-[min(calc(100%-40px),760px)] max-[640px]:w-[min(calc(100%-32px),480px)]">
        {/* footer main grid */}
        <div className="grid grid-cols-[1.5fr_repeat(4,1fr)] gap-[34px] pb-[38px] max-[900px]:grid-cols-[repeat(4,1fr)] max-[640px]:grid-cols-[1fr_1fr] max-[640px]:gap-x-5 max-[640px]:gap-y-7">
          {/* brand column */}
          <div className="flex flex-col items-start gap-[9px] max-[900px]:col-span-full max-[640px]:col-span-full">
            <Link href="/" aria-label="EnumConnect home">
              <Image
                src="/icons/EnumLogoWhite.svg"
                alt="EnumConnect"
                width={146}
                height={41}
                className="block w-[135px] h-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-2 mb-2 text-white text-base font-bold leading-[1.6]">
              Reliable research.
              <br />
              Empowered professionals.
            </p>
            <Link
              href="mailto:hello@enumconnect.com"
              className="text-white font-[400px] text-base no-underline hover:text-white hover:underline"
            >
              ✉ &nbsp;Email us
            </Link>
            <Link
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              className="text-[#d1d1ed] text-[11px] no-underline hover:text-white hover:underline"
            >
              <p className="flex items-center gap-2 ">
                <Image
                  src="/icons/icon-whatsapp.svg"
                  width={17}
                  height={17}
                  alt="EnumConnect"
                />
                <span className="text-white font-[400px] text-base">
                  WhatsApp us
                </span>
              </p>
            </Link>
          </div>

          {/* link groups */}
          {linkGroups.map(({ title, links }) => (
            <nav
              key={title}
              className="flex flex-col items-start gap-[11px]"
              aria-label={title}
            >
              <h3 className="m-0 mb-[5px] text-base font-bold text-white">
                {title}
              </h3>
              {links.map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="text-[#B6B6EC] text-[14px] font-[400px] leading-[1.4] no-underline hover:text-white hover:underline"
                >
                  {label}
                </Link>
              ))}
            </nav>
          ))}
        </div>

        {/* footer bottom */}
        <div className="flex justify-between gap-5 border-t border-white/[0.17] pt-4 text-[#c4c4e6] text-[10px] max-[640px]:flex-col max-[640px]:gap-[9px] max-[640px]:leading-[1.5]">
          <small className="text-[#B6B6EC] text-[14px] font-[400px]">
            &copy; 2026 Enumconnect. Built in Nigeria.
          </small>
          <span className="text-[#B6B6EC] text-[14px] font-[400px]">
            Fieldwork marketplace for academic research
          </span>
        </div>
      </div>
    </footer>
  );
}
