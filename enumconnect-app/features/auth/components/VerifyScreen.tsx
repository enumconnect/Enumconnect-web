import { AuthShell, type ShellContent } from "./AuthShell";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/FormParts";

const link = "font-bold text-[color:var(--color-text-link)]";

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 8H3M7 4L3 8l4 4" />
    </svg>
  );
}

function Mail() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-[color:var(--color-text-link)]">
      <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
      <path d="M3 6l7 5 7-5" />
    </svg>
  );
}

type VerifyScreenProps = {
  name: string;
  phone: string;
  email: string;
  next: string[];
  content?: ShellContent;
};

export function VerifyScreen({ name, phone, email, next, content }: VerifyScreenProps) {
  return (
    <AuthShell
      {...content}
      className="min-h-[936px]"
      topRight={
        <>
          Need help? <span className={link}>Contact us</span>
        </>
      }
    >
      <div className="pt-[98px] pb-12">
        <div className={`flex items-center gap-2 text-sm leading-5 ${link}`}>
          <Arrow />
          Back to sign-up
        </div>
        <div className="mt-[33px]">
          <div role="heading" aria-level={1} className="text-2xl leading-[33px] font-extrabold text-[color:var(--color-text-link)]">
            Verify your phone and email
          </div>
          <p className="mt-1 text-xs leading-4 font-semibold text-[color:var(--color-text-secondary)]">Step 2 of 2 · almost done</p>
        </div>
        <ProgressBar value={100} className="mt-3" />
        <p className="mt-4 text-sm leading-[22px] text-[color:var(--color-text-body)]">
          Thanks, {name}. We sent a 6-digit code to
          <br />
          <span className="font-bold text-[color:var(--color-text-primary)]">{phone}</span>
        </p>
        <div className="mt-6 flex flex-col gap-2">
          <span className="text-sm leading-5 font-bold text-[color:var(--color-text-primary)]">Enter code</span>
          <div className="grid grid-cols-6 gap-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <input
                key={i}
                maxLength={1}
                inputMode="numeric"
                aria-label={`Digit ${i + 1}`}
                className="h-14 w-full rounded-[var(--radius-md)] border-[1.2px] border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-surface)] text-center text-xl font-bold outline-none"
              />
            ))}
          </div>
        </div>
        <div className="mt-4 flex justify-between text-xs leading-4 text-[color:var(--color-text-secondary)]">
          <span>
            Didn&apos;t get it? <span className={link}>Resend code in 0:45</span>
          </span>
          <span>
            Wrong number? <span className={link}>Change it</span>
          </span>
        </div>
        <Button fullWidth className="mt-6">
          Verify and continue
        </Button>
        <div className="mt-7 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-surface)] px-5 pt-5 pb-4">
          <div className="flex gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[color:var(--color-bg-selected)]">
              <Mail />
            </span>
            <div>
              <div className={`text-sm leading-5 ${link}`}>Check your email too</div>
              <div className="mt-1 text-xs leading-4 text-[color:var(--color-text-secondary)]">We sent a link to confirm</div>
              <div className="mt-1 text-xs leading-4 font-bold text-[color:var(--color-text-primary)]">{email}</div>
              <div className="mt-3 flex items-center gap-3">
                <Button variant="outline">Open email app</Button>
                <Button variant="text">Resend link</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 rounded-xl bg-[color:var(--color-banner-bg)] px-5 py-4">
          <div className="text-xs leading-4 font-bold text-[color:var(--color-text-primary)]">What happens next</div>
          <ol className="mt-3 flex flex-col gap-3">
            {next.map((t, i) => (
              <li key={t} className="flex items-center gap-3 text-xs leading-4 font-semibold text-[color:var(--color-text-body)]">
                <span
                  className={`grid size-[22px] shrink-0 place-items-center rounded-full text-[11px] font-bold ${
                    i === 0
                      ? "bg-[color:var(--color-control-trust)] text-white"
                      : "border border-[color:var(--color-control-trust)] text-[color:var(--color-banner-text)]"
                  }`}
                >
                  {i + 1}
                </span>
                {t}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </AuthShell>
  );
}