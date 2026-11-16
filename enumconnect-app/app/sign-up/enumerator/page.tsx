import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/Button";
import { CheckboxRow, PasswordField, PhoneField, ProgressBar, SelectField } from "@/components/ui/FormParts";
import { InfoBanner } from "@/components/ui/InfoBanner";
import { RoleTabs } from "@/components/ui/RoleTabs";
import { TextField } from "@/components/ui/TextField";

const link = "font-bold text-[color:var(--color-text-link)]";

export default function EnumeratorSignUp() {
  return (
    <AuthShell
      className="min-h-[1042px]"
      topRight={
        <>
          Already have an account? <span className={link}>Log in</span>
        </>
      }
    >
      <div className="pt-[112px] pb-12">
        <RoleTabs labels={["I'm a Researcher", "I'm an Enumerator"]} activeIndex={1} />
        <div className="mt-[35px]">
          <div role="heading" aria-level={1} className="text-2xl leading-[33px] font-extrabold text-[color:var(--color-text-link)]">
            Create your enumerator account
          </div>
          <p className="mt-1 text-xs leading-4 font-semibold text-[color:var(--color-text-secondary)]">
            Step 1 of 2 · next, verify your email and phone
          </p>
        </div>
        <ProgressBar value={50} className="mt-3" />
        <div className="mt-[26px] flex flex-col gap-6">
          <TextField label="Full name" placeholder="e.g John James" />
          <TextField label="Email address" type="email" placeholder="your@university.edu.ng" />
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <PhoneField />
          <div className="grid grid-cols-2 gap-4">
            <SelectField label="State" placeholder="Select state" />
            <SelectField label="Main LGA" placeholder="Select LGA" />
          </div>
          <PasswordField hint="At least 8 characters, including a number." />
        </div>
        <CheckboxRow className="mt-6">
          I agree to the <span className={`${link} underline`}>Terms of service</span> and{" "}
          <span className={`${link} underline`}>Privacy policy</span>
        </CheckboxRow>
        <Button fullWidth className="mt-6">
          Create account
        </Button>
        <InfoBanner className="mt-6">Free to join. You never pay to apply for projects.</InfoBanner>
      </div>
    </AuthShell>
  );
}