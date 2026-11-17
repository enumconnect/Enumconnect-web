import { Nunito } from "next/font/google";
import type { ReactNode } from "react";

const nunito = Nunito({ subsets: ["latin"] });

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
    <div className="absolute -right-4 bottom-0 flex h-[90px] w-[236px] flex-col justify-between rounded-xl bg-white p-4 shadow-lg">
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
    <div className={`${nunito.className} flex min-w-[1100px] bg-[color:var(--color-bg-page)] ${className}`}>
      <aside className="relative w-[600px] shrink-0 bg-[color:var(--color-primary)] text-[color:var(--color-text-on-action)]">
        <img src="/logo-white.png" alt="EnumConnect" className="absolute top-[45px] left-16 h-[38.5px] w-[145px]" />
        <div
          role="heading"
          aria-level={1}
          className="absolute top-[156px] left-16 text-[40px] leading-[52px] font-extrabold tracking-[-0.4px] whitespace-nowrap"
        >
          {headline}
        </div>
        <ul className="absolute top-[300px] left-16 flex flex-col gap-4 text-base leading-6">
          {points.map((t) => (
            <li key={t} className="flex items-center gap-3">
              <Tick />
              {t}
            </li>
          ))}
        </ul>
        <div className="absolute top-[456px] left-16 h-[363px] w-[494px]">
          <div className="absolute top-6 left-6 h-[339px] w-[470px] rounded-2xl bg-[color:var(--color-control-trust)]" />
          <img src={photo} alt="" className="absolute top-0 left-0 h-[339px] w-[470px] rounded-2xl object-cover" />
          {card}
        </div>
        <p className="absolute bottom-[42px] left-16 text-base leading-6">Reliable Research. Empowered Professionals.</p>
      </aside>
      <main className="relative flex-1">
        <p className="absolute top-[49px] right-16 text-sm leading-5 text-[color:var(--color-text-secondary)]">{topRight}</p>
        <div className="mx-auto w-[480px]">{children}</div>
      </main>
    </div>
  );
}