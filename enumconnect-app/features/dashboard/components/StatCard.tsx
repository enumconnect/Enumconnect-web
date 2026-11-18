type Props = { label: string; value: string; sub: string };

export function StatCard({ label, value, sub }: Props) {
  return (
    <div className="rounded-[22px] border border-[#D9DEE8] bg-white p-6">
      <p className="m-0 text-[15px] text-[#575757]">{label}</p>
      <p className="mb-1 mt-3 text-[clamp(28px,3vw,36px)] font-extrabold leading-none text-[#1a1a1a]">
        {value}
      </p>
      <p className="m-0 text-[15px] text-[#575757]">{sub}</p>
    </div>
  );
}
