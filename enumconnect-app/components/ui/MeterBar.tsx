type Props = { value: number; label: string; className?: string };

export const MeterBar = ({ value, label, className = "" }: Props) => {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`h-[7px] overflow-hidden rounded-full bg-[#E3E4F5] ${className}`}
    >
      <div
        className="h-full rounded-full bg-[#2F9D63]"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
};
