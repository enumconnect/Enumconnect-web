type RoleTabsProps = {
  labels: [string, string];
  activeIndex: 0 | 1;
  className?: string;
};

export function RoleTabs({ labels, activeIndex, className = "" }: RoleTabsProps) {
  return (
    <div
      className={`flex h-12 w-full rounded-full bg-[color:var(--color-tab-track)] p-1 ${className}`}
    >
      {labels.map((label, i) => (
        <span
          key={label}
          className={
            "flex flex-1 items-center justify-center rounded-full text-base leading-none " +
            (i === activeIndex
              ? "bg-[color:var(--color-bg-surface)] font-bold text-[color:var(--color-text-link)]"
              : "font-normal text-[color:var(--color-text-secondary)]")
          }
        >
          {label}
        </span>
      ))}
    </div>
  );
}