import Image from "next/image";
import Link from "next/link";
import { linkGroups } from "../data/footer";

const socialIcons = [
  ["/icons/LinkedIn.svg", "LinkedIn"],
  ["/icons/Facebook.svg", "Facebook"],
  ["/icons/X.svg", "X"],
  ["/icons/Instagram.svg", "Instagram"],
  ["/icons/TikTok.svg", "TikTok"],
];

export function Footer() {
  return (
    <footer className="bg-[#000080] text-white pt-[55px] pb-5" id="about">
      <div className="mx-auto w-[min(calc(100%-80px),1668px)] max-[900px]:w-[min(calc(100%-40px),760px)] max-[640px]:w-[min(calc(100%-32px),480px)]">
        <div className="grid grid-cols-[1.2fr_repeat(5,minmax(0,1fr))] gap-[clamp(18px,2.4vw,48px)] pb-[38px] max-[1100px]:grid-cols-3 max-[1100px]:gap-x-8 max-[1100px]:gap-y-8 max-[1100px]:pb-8 max-[640px]:grid-cols-2 max-[640px]:gap-x-5 max-[640px]:gap-y-7">
          <div className="flex flex-col items-start gap-[9px] max-[1100px]:col-span-full max-[640px]:col-span-full">
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
              Trusted Data
              <br />
              <span className="text-[#8FD1AE]">
                Verified Field Professionals.
              </span>
            </p>
            <div className="mt-4 hidden items-center gap-5 min-[641px]:flex">
              {socialIcons.map(([src, label]) => (
                <Image
                  key={label}
                  src={src}
                  alt={label}
                  width={28}
                  height={28}
                  className="h-7 w-7 brightness-0 invert"
                />
              ))}
            </div>
          </div>

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

          <div className="flex flex-col items-start gap-[11px] max-[640px]:col-span-full">
            <h3 className="m-0 mb-[5px] text-base font-bold text-white">
              Contact Us
            </h3>
            <Link
              href="mailto:enumhubafrica@gmail.com"
              className="text-[#B6B6EC] text-[14px] leading-[1.4] no-underline hover:text-white hover:underline max-[640px]:text-[16px]"
            >
              Official Email: enumhubafrica@gmail.com
            </Link>
            <p className="m-0 text-[#B6B6EC] text-[14px] leading-[1.4] max-[640px]:text-[16px]">
              Official Phone Number:
            </p>
            <p className="m-0 text-[#B6B6EC] text-[14px] leading-[1.4] max-[640px]:text-[16px]">
              Company Address:
            </p>
            <div className="mt-8 hidden max-[640px]:block">
              <h3 className="mb-4 text-[20px] font-bold">Connect with Us</h3>
              <div className="flex items-center gap-5">
                {socialIcons.map(([src, label]) => (
                  <Image
                    key={label}
                    src={src}
                    alt={label}
                    width={34}
                    height={34}
                    className="h-[34px] w-[34px] brightness-0 invert"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-5 border-t border-white/[0.17] pt-4 text-[#c4c4e6] text-[10px] max-[640px]:flex-col max-[640px]:gap-[9px] max-[640px]:leading-[1.5]">
          <small className="text-[#B6B6EC] text-[14px] font-[400px]">
            &copy; 2026 EnumConnect. All rights reserved.
          </small>
        </div>
      </div>
    </footer>
  );
}
