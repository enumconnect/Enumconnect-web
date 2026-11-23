import Link from "next/link";
import { AuthShell, LoginForm, StatCard } from "@/features/auth";

export default function LoginPage() {
  return (
    <AuthShell
      headline={<>Fieldwork without<br />the WhatsApp hunt.</>}
      points={["Verified enumerators near your sites", "Clear costs before you pay", "Review every response before payout"]}
      photo="/researcher-photo.png"
      card={<StatCard />}
      topRight={<>New to EnumConnect? <Link href="/sign-up/researcher" className="font-bold text-[color:var(--color-text-link)]">Create an account</Link></>}
    >
      <div className="pt-[218px] max-[1099px]:pt-[140px] max-[480px]:pt-[120px]">
        <LoginForm />
      </div>
    </AuthShell>
  );
}
