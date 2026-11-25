import Image from "next/image";
import type { ReactNode } from "react";

const defaultPoints = [
  "Legitimate, funded research projects",
  "Paid for approved work",
  "A verified record of your fieldwork",
];

function Tick() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx="10" cy="10" r="10" className="fill-[color:var(--color-control-trust)]" />
      <path d="M6 10.5l2.5 2.5L14 7.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SampleCard() {
  return (
    <div className="absolute right-0 bottom-0 w-[290px] rounded-xl bg-white p-4 shadow-lg">
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[color:var(--color-control-trust)] text-sm font-bold text-white">
          AB
        </span>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm leading-5 font-bold text-[color:var(--color-text-primary)]">
            Aisha B.
            <span className="rounded-full bg-[color:var(--color-banner-bg)] px-2 text-[10px] leading-4 font-semibold text-[color:var(--color-banner-text)]">
              ✓ Verified
            </span>
          </div>
          <div className="text-xs leading-4 text-[color:var(--color-text-secondary)]">Kano · Hausa, English</div>
        </div>
        <span className="text-[8px] font-bold tracking-wider text-[color:var(--color-text-secondary)]">SAMPLE</span>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-[color:var(--color-border)] pt-3 text-xs leading-4 text-[color:var(--color-text-secondary)]">
        <span>Household surveys</span>
        <span className="font-semibold text-[color:var(--color-text-primary)]">
          <span className="text-[color:var(--color-amber)]">★</span> 4.9 · 12 projects
        </span>
      </div>
    </div>
  );
}

export function StatCard() {
  return (
    <div className="absolute -right-[22px] -bottom-[14px] flex h-[90px] w-[236px] origin-bottom-right scale-[0.82] flex-col justify-between rounded-xl bg-white p-4 shadow-lg">
      <span className="text-xs leading-4 text-[color:var(--color-text-secondary)]">Responses reviewed</span>
      <div className="flex items-baseline justify-between">
        <span className="text-2xl leading-8 font-extrabold text-[color:var(--color-text-primary)]">
          32 <span className="text-xs font-normal text-[color:var(--color-text-secondary)]">of 40</span>
        </span>
        <span className="text-sm font-bold text-[color:var(--color-control-trust)]">80%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-[color:var(--color-bg-subtle)]">
        <div className="h-full w-[80%] rounded-full bg-[color:var(--color-control-trust)]" />
      </div>
    </div>
  );
}

export type ShellContent = {
  headline?: ReactNode;
  points?: string[];
  photo?: string;
  card?: ReactNode;
};

export function AuthShell({
  topRight,
  className = "",
  headline = (
    <>
      Paid research work,
      <br />
      close to home.
    </>
  ),
  points = defaultPoints,
  photo = "/enumerator-photo.png",
  card = <SampleCard />,
  children,
}: ShellContent & { topRight: ReactNode; className?: string; children: ReactNode }) {
  return (
    <div className={`grid min-h-screen w-full grid-cols-[42%_minmax(0,1fr)] overflow-x-hidden bg-[color:var(--color-bg-page)] max-[900px]:grid-cols-1 ${className}`}>
      <aside className="relative min-h-screen overflow-hidden bg-[color:var(--color-primary)] text-[color:var(--color-text-on-action)] max-[900px]:hidden">
        <Image src="/logo-white.png" alt="EnumConnect" width={120} height={32} priority className="absolute top-[36px] left-[clamp(24px,4.4vw,52px)] h-[32px] w-[120px]" />
        <div
          role="heading"
          aria-level={1}
          className="absolute top-[132px] left-[clamp(24px,4.4vw,52px)] max-w-[calc(100%-104px)] text-[40px] leading-[48px] font-extrabold tracking-[-0.4px]"
        >
          {headline}
        </div>
        <ul className="absolute top-[248px] left-[clamp(24px,4.4vw,52px)] flex flex-col gap-3 text-sm leading-5">
          {points.map((t) => (
            <li key={t} className="flex items-center gap-3">
              <Tick />
              {t}
            </li>
          ))}
        </ul>
        <div className="absolute top-[374px] left-[clamp(24px,4.4vw,52px)] aspect-[470/339] w-[min(470px,calc(100%-126px))]">
          <div className="absolute top-5 left-5 h-full w-full rounded-2xl bg-[color:var(--color-control-trust)]" />
          <Image src={photo} alt="" fill sizes="(max-width: 900px) 0px, 42vw" className="rounded-2xl object-cover" />
          {card}
        </div>
        <p className="absolute bottom-[36px] left-[clamp(24px,4.4vw,52px)] text-sm leading-5">Reliable Research. Empowered Professionals.</p>
      </aside>
      <main className="relative min-h-screen min-w-0 bg-[color:var(--color-bg-page)]">
        <p className="absolute top-[38px] right-[clamp(24px,4.4vw,52px)] text-sm leading-5 text-[color:var(--color-text-secondary)] max-[900px]:right-6">{topRight}</p>
        <div className="mx-auto w-[min(394px,calc(100%-48px))] max-[900px]:w-full max-[900px]:px-6 max-[480px]:px-4">{children}</div>
      </main>
    </div>
  );
}