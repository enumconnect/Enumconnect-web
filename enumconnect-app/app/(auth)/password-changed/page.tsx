import Link from "next/link";
import { AuthShell, StatCard } from "@/features/auth";
export default function PasswordChangedPage() {
  return (
    <AuthShell
      topRight={<>New to EnumConnect? <Link href="/sign-up/researcher" className="font-bold text-[color:var(--color-text-link)]">Create an account</Link></>}
      headline={<>Fieldwork without<br />the WhatsApp hunt.</>}
      points={["Verified enumerators near your sites", "Clear costs before you pay", "Review every response before payout"]}
      photo="/researcher-photo.png"
      card={<StatCard />}
    >
      <div className="pt-[296px] max-[1099px]:pt-[180px] max-[480px]:pt-[150px]">
        <div className="inline-flex rounded-full bg-[color:var(--color-banner-bg)] px-3 py-1.5 text-xs font-bold text-[color:var(--color-banner-text)]">
          Your password has been changed
        </div>
        <h1 className="mt-5 text-[32px] leading-10 font-extrabold text-[color:var(--color-text-primary)]">You&apos;re all set</h1>
        <p className="mt-3 text-sm leading-5 text-[color:var(--color-text-body)]">Log in with your email and your new password.</p>
        <Link
          href="/login"
          className="mt-6 inline-flex h-14 w-full items-center justify-center rounded-[var(--radius-md)] bg-[color:var(--color-primary)] px-5 text-base font-bold text-[color:var(--color-text-on-action)]"
        >
          Log in
        </Link>
      </div>
    </AuthShell>
  );
}
