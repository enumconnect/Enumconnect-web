"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown } from "lucide-react";
import { getFirstName, getInitials } from "@/features/dashboard/lib/name";

const nav = [
  { label: "Dashboard", href: "/researcher/dashboard" },
  { label: "Projects", href: "/researcher/projects" },
  { label: "Messages", href: "/researcher/messages" },
  { label: "Payments", href: "/researcher/payments" },
];

type Props = {
  fullName: string;
  hasNotifications?: boolean;
  children: React.ReactNode;
};

export function DashboardShell({
  fullName,
  hasNotifications = false,
  children,
}: Props) {
  const pathname = usePathname();
  const firstName = getFirstName(fullName); // "Chiamaka"
  const initials = getInitials(fullName); // "CO"

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="min-h-screen bg-[#F8FFFD]">
      <header className="sticky top-0 z-30 border-b border-[#E4E8F0] bg-white">
        <div className="mx-auto flex h-[60px] w-[min(calc(100%-32px),1200px)] items-center justify-between gap-6 md:h-[72px]">
          <Link
            href="/researcher/dashboard"
            aria-label="EnumConnect home"
            className="shrink-0"
          >
            <Image
              src="/images/logo.svg"
              alt="EnumConnect"
              width={150}
              height={40}
              priority
            />
          </Link>

          <nav
            aria-label="Main"
            className="hidden h-full flex-1 gap-9 pl-8 md:flex"
          >
            {nav.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className={`relative flex h-full items-center text-[16px] transition-colors ${
                  isActive(href)
                    ? "font-bold text-[#000080] after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:rounded-full after:bg-[#000080]"
                    : "font-normal text-[#575757] hover:text-[#000080]"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label={
                hasNotifications
                  ? "Notifications, you have new ones"
                  : "Notifications"
              }
              className="relative text-[#424242] hover:text-[#000080]"
            >
              <Bell size={22} strokeWidth={1.8} />
              {hasNotifications && (
                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#E5484D]" />
              )}
            </button>

            <button
              type="button"
              className="flex items-center gap-2.5"
              aria-label={`Account menu for ${fullName}`}
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#2F9D63] text-[14px] font-bold text-white">
                {initials}
              </span>
              <span className="hidden text-[15px] font-bold text-[#1a1a1a] sm:inline">
                {firstName}
              </span>
              <ChevronDown
                size={16}
                className="text-[#424242]"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {/* mobile: tabs under the bar */}
        <nav
          aria-label="Main"
          className="flex gap-6 overflow-x-auto border-t border-[#E4E8F0] px-4 md:hidden"
        >
          {nav.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              className={`whitespace-nowrap py-3 text-[14px] ${
                isActive(href)
                  ? "border-b-[3px] border-[#000080] font-bold text-[#000080]"
                  : "text-[#575757]"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="mx-auto w-[min(calc(100%-32px),1200px)] py-10 md:py-14">
        {children}
      </main>
    </div>
  );
}
