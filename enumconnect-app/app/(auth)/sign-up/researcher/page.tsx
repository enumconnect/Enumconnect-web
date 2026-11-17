import { AuthShell, StatCard } from "@/features/auth/components/AuthShell";
import { Button } from "@/components/ui/Button";
import { CheckboxRow, PasswordField, PhoneField, ProgressBar, SelectField } from "@/components/ui/FormParts";
import { InfoBanner } from "@/components/ui/InfoBanner";
import { RoleTabs } from "@/components/ui/RoleTabs";
import { TextField } from "@/components/ui/TextField";

const link = "font-bold text-[color:var(--color-text-link)]";

export default function ResearcherSignUp() {
  return (
    <AuthShell
      className="min-h-[1138px]"
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
          Already have an account? <span className={link}>Log in</span>
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
        <div className="mt-[26px] flex flex-col gap-6">
          <TextField label="Full name" placeholder="John James" />
          <TextField label="Email address" type="email" placeholder="your@university.edu.ng" />
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <PhoneField />
          <SelectField label="Institution or organisation (optional)" placeholder="Select or type your institution" />
          <SelectField label="Research area" placeholder="e.g. Public health" />
          <PasswordField hint="At least 8 characters, including a number." />
        </div>
        <CheckboxRow className="mt-6">
          I agree to the <span className={`${link} underline`}>Terms of service</span> and{" "}
          <span className={`${link} underline`}>Privacy policy</span>
        </CheckboxRow>
        <Button fullWidth className="mt-6">
          Create account
        </Button>
        <InfoBanner className="mt-6">Supervising students? Sign up as a researcher too.</InfoBanner>
      </div>
    </AuthShell>
  );
}