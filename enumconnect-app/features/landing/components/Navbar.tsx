"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

const navLinks = [
  { href: "/#for-researchers", label: "For researchers" },
  { href: "/#for-enumerators", label: "For enumerators" },
  { href: "/#how-it-works", label: "How it works" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function handleMenuKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") {
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex min-h-[72px] w-full max-w-[1440px] items-center justify-between gap-8 px-10 max-[850px]:min-h-16 max-[850px]:gap-4 max-[850px]:px-5 max-[480px]:px-4">
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
          className="flex items-center justify-center gap-[clamp(20px,3vw,44px)] max-[850px]:hidden"
          aria-label="Main navigation"
        >
          {navLinks.map(({ href, label }) => (
            <Link
              className="whitespace-nowrap text-base font-medium text-[#424242] no-underline transition-colors hover:text-[#000080]"
              href={href}
              key={label}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-8 max-[850px]:gap-2">
          <div className="flex items-center gap-8 max-[850px]:gap-2">
            <Link
              className="whitespace-nowrap text-[15px] font-bold text-[#000080] no-underline transition-colors hover:underline max-[480px]:text-[13px]"
              href="/login"
            >
              Log in
            </Link>
            <Link
              className="inline-flex min-h-10 items-center justify-center whitespace-nowrap rounded-md bg-[#000080] px-5 text-[15px] font-bold text-white no-underline transition-colors hover:bg-[#17179b] max-[480px]:min-h-10 max-[480px]:px-3 max-[480px]:text-[13px]"
              href="/sign-up/researcher"
            >
              Sign up
            </Link>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="relative z-10 hidden h-11 w-11 items-center justify-center rounded-lg text-[#000080] hover:bg-[#F1F1FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#000080] max-[850px]:inline-flex"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        onKeyDown={handleMenuKeyDown}
        className={`fixed inset-x-0 bottom-0 top-[64px] overflow-y-auto bg-white min-[851px]:hidden ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <div className="mx-auto grid w-full max-w-[1440px] px-6 pt-2 max-[480px]:px-[24px]">
          {navLinks.map(({ href, label }) => (
            <Link
              className="flex min-h-[86px] items-center justify-between border-b border-[#EEF0F5] text-[24px] font-bold text-[#000080] no-underline max-[480px]:min-h-[78px] max-[480px]:text-[21px]"
              href={href}
              key={label}
              onClick={() => setMenuOpen(false)}
            >
              <span className="whitespace-nowrap">{label}</span>
              <span aria-hidden="true" className="text-[28px] font-light leading-none">
                →
              </span>
            </Link>
          ))}
        </div>
        <div className="mx-auto mt-8 grid w-full max-w-[1440px] gap-4 px-6 max-[480px]:px-[24px]">
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#000080] px-4 text-sm font-bold text-[#000080] no-underline"
            href="/login"
            onClick={() => setMenuOpen(false)}
          >
            Log in
          </Link>
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#000080] px-4 text-sm font-bold text-white no-underline hover:bg-[#17179b]"
            href="/sign-up/researcher"
            onClick={() => setMenuOpen(false)}
          >
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  );
}
