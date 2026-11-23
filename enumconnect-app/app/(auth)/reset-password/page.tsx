import Link from "next/link";
import { AuthShell, ResetPasswordForm, StatCard } from "@/features/auth";

export default function ResetPasswordPage() {
  return (
    <AuthShell
      topRight={<>Remembered it? <Link href="/login" className="font-bold text-[color:var(--color-text-link)]">Log in</Link></>}
      headline={<>Fieldwork without<br />the WhatsApp hunt.</>}
      points={["Verified enumerators near your sites", "Clear costs before you pay", "Review every response before payout"]}
      photo="/researcher-photo.png"
      card={<StatCard />}
    >
      <div className="pt-[218px] max-[1099px]:pt-[140px] max-[480px]:pt-[120px]">
        <ResetPasswordForm />
      </div>
    </AuthShell>
  );
}
