import Link from "next/link";

type RoleTabsProps = {
  labels: [string, string];
  activeIndex: 0 | 1;
  className?: string;
};

export function RoleTabs({ labels, activeIndex, className = "" }: RoleTabsProps) {
  const hrefs = ["/sign-up/researcher", "/sign-up/enumerator"] as const;

  return (
    <nav
      aria-label="Choose account type"
      className={`flex h-12 w-full rounded-full bg-[color:var(--color-tab-track)] p-1 ${className}`}
    >
      {labels.map((label, i) => (
        <Link
          key={label}
          href={hrefs[i]}
          aria-current={i === activeIndex ? "page" : undefined}
          className={
            "flex flex-1 items-center justify-center rounded-full text-base leading-none transition-colors " +
            (i === activeIndex
              ? "bg-[color:var(--color-bg-surface)] font-bold text-[color:var(--color-text-link)]"
              : "font-normal text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-link)]")
          }
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}