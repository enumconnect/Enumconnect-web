import Link from "next/link";
import { AuthShell, SignUpForm } from "@/features/auth";
import { ProgressBar } from "@/components/ui/FormParts";
import { RoleTabs } from "@/components/ui/RoleTabs";

const link = "font-bold text-[color:var(--color-text-link)]";

export default function EnumeratorSignUp() {
  return (
    <AuthShell
      topRight={
        <>
          Already have an account? <Link href="/login" className={link}>Log in</Link>
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
            Step 1 of 2 · next, verify your email
          </p>
        </div>
        <ProgressBar value={50} className="mt-3" />
        <SignUpForm
          role="enumerator"
          namePlaceholder="e.g John James"
          passwordHint="At least 8 characters, including a number."
          bannerText="Free to join. You never pay to apply for projects."
        />
      </div>
    </AuthShell>
  );
}