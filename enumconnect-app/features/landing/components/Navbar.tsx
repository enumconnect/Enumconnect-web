import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/#for-researchers", label: "For researchers" },
  { href: "", label: "For enumerators" },
  { href: "/#how-it-works", label: "How it works" },
];

export function Navbar() {
  return (
    <header className="fixed w-full z-50 bg-white">
      <div className="mx-auto flex min-h-[72px] w-full max-w-[1440px] items-center justify-between gap-8 px-10 max-[850px]:flex-wrap max-[850px]:gap-x-6 max-[850px]:gap-y-4 max-[850px]:px-5 max-[850px]:py-3 max-[480px]:px-4">
        <Link
          className="inline-flex w-fit shrink-0 items-center"
          href="/"
          aria-label="EnumConnect home"
        >
          <Image
            src="/icons/EnumLogo.svg"
            alt="EnumConnect"
            width={146}
            height={41}
            className="block h-auto w-[146px] max-[480px]:w-[126px]"
            priority
          />
        </Link>

        <nav
          className="flex items-center justify-center gap-[clamp(20px,3vw,44px)] max-[850px]:order-3 max-[850px]:w-full max-[850px]:justify-center max-[850px]:gap-6 max-[480px]:justify-between max-[480px]:gap-3"
          aria-label="Main navigation"
        >
          {navLinks.map(({ href, label }) => (
            <Link
              className="whitespace-nowrap text-base font-medium text-[#424242] no-underline transition-colors hover:text-[#000080] max-[480px]:text-xs"
              href={href}
              key={label}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-8 max-[480px]:gap-3">
          <Link
            className="whitespace-nowrap text-[15px] font-bold text-[#000080] no-underline transition-colors  max-[480px]:text-xs"
            href="/login"
          >
            Log in
          </Link>
          <Link
            className="inline-flex min-h-10 items-center justify-center whitespace-nowrap rounded-md bg-[#000080] px-5 text-[15px] font-bold text-white no-underline transition-colors hover:bg-[#17179b] max-[480px]:min-h-9 max-[480px]:px-3.5 max-[480px]:text-xs"
            href="/signup"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
