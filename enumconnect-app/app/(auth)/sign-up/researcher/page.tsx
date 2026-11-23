import Link from "next/link";
import { AuthShell, SignUpForm, StatCard } from "@/features/auth";
import { ProgressBar, SelectField } from "@/components/ui/FormParts";
import { RoleTabs } from "@/components/ui/RoleTabs";

const link = "font-bold text-[color:var(--color-text-link)]";

export default function ResearcherSignUp() {
  return (
    <AuthShell
      headline={
        <>
          Fieldwork without
          <br />
          the WhatsApp hunt.
        </>
      }
      points={["Verified enumerators near your sites", "Clear costs before you pay", "Review every response before payout"]}
      photo="/researcher-photo.png"
      card={<StatCard />}
      topRight={
        <>
          Already have an account? <Link href="/login" className={link}>Log in</Link>
        </>
      }
    >
      <div className="pt-[112px] pb-12">
        <RoleTabs labels={["I'm a Researcher", "I'm an Enumerator"]} activeIndex={0} />
        <div className="mt-[35px]">
          <div role="heading" aria-level={1} className="text-2xl leading-[33px] font-extrabold text-[color:var(--color-text-link)]">
            Create your researcher account
          </div>
          <p className="mt-1 text-xs leading-4 font-semibold text-[color:var(--color-text-secondary)]">
            Step 1 of 2 · next, verify your email and phone
          </p>
        </div>
        <ProgressBar value={50} className="mt-3" />
        <SignUpForm
          role="researcher"
          namePlaceholder="John James"
          passwordHint="At least 8 characters, including a number."
          bannerText="Supervising students? Sign up as a researcher too."
          extra={
            <>
              <SelectField label="Institution or organisation (optional)" placeholder="Select or type your institution" />
              <SelectField label="Research area" placeholder="e.g. Public health" />
            </>
          }
        />
      </div>
    </AuthShell>
  );
}