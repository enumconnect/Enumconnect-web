import type { ReactNode } from "react";

export function InfoBanner({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="note"
      className={
        "flex h-11 items-center gap-3 px-4 text-sm leading-none font-bold " +
        "rounded-[var(--radius-md)] " +
        "bg-[color:var(--color-banner-bg)] text-[color:var(--color-banner-text)] " +
        className
      }
    >
      <svg
        aria-hidden="true"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="shrink-0"
      >
        <circle cx="9" cy="9" r="7.5" />
        <path d="M9 8v4.5M9 5.5v.01" strokeLinecap="round" />
      </svg>
      <span>{children}</span>
    </div>
  );
}