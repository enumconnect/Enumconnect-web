"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthShell, type ShellContent } from "./AuthShell";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/FormParts";

type Role = "researcher" | "enumerator";
type VerificationAccount = {
  email: string;
  fullName: string;
  emailVerified: boolean;
  role: Role;
};

type VerifyScreenProps = {
  role: Role;
  initialEmail?: string;
  next: string[];
  content?: ShellContent;
};

const link = "font-bold text-[color:var(--color-text-link)]";

function Mail() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-[color:var(--color-text-link)]">
      <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
      <path d="M3 6l7 5 7-5" />
    </svg>
  );
}

export function VerifyScreen({ role, initialEmail = "", next, content }: VerifyScreenProps) {
  const router = useRouter();
  const [account, setAccount] = useState<VerificationAccount | null>(null);
  const [email, setEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function loadStatus() {
      try {
        const response = await fetch("/api/auth/verification/status", { cache: "no-store" });
        if (response.status === 401) {
          if (active) setLoading(false);
          return;
        }
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error ?? "Could not load verification status.");
        }
        const currentAccount = result as VerificationAccount;
        if (!active) return;
        if (currentAccount.role !== role) {
          router.replace(`/verify-account/${currentAccount.role}`);
          return;
        }
        setAccount(currentAccount);
        setEmail(currentAccount.email);
      } catch (caught) {
        if (active) {
          setError(caught instanceof Error ? caught.message : "Could not load verification status.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadStatus();
    return () => {
      active = false;
    };
  }, [role, router]);

  async function resendEmail() {
    setError("");
    setStatusMessage("");
    setSubmitting(true);
    try {
      const response = await fetch("/api/auth/verification/resend-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Could not resend the confirmation email.");
      setStatusMessage("If the account can receive a confirmation email, a new link has been sent.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not resend the confirmation email.");
    } finally {
      setSubmitting(false);
    }
  }

  const complete = Boolean(account?.emailVerified);
  const emailVerified = Boolean(account?.emailVerified);

  return (
    <AuthShell
      {...content}
      topRight={<>Need help? <a href="mailto:enumhubafrica@gmail.com" className={link}>Contact us</a></>}
    >
      <div className="pt-[82px] pb-12 max-[900px]:pt-[120px]">
        <Link href={`/sign-up/${role}`} className={`flex items-center gap-2 text-sm leading-5 ${link}`}>
          <span aria-hidden="true">←</span>
          Back to sign-up
        </Link>
        <div className="mt-[26px]">
          <h1 className="text-[26px] leading-[34px] font-extrabold text-[color:var(--color-text-link)]">
            {complete ? "Your account is verified" : "Verify your email"}
          </h1>
          <p className="mt-1 text-xs leading-4 font-semibold text-[color:var(--color-text-secondary)]">
            {complete ? "Email verification complete" : "Step 2 of 2 · almost done"}
          </p>
        </div>
        <ProgressBar value={complete ? 100 : 50} className="mt-2" />

        {loading ? (
          <p role="status" className="mt-4 text-sm text-[color:var(--color-text-secondary)]">Checking your verification status…</p>
        ) : complete ? (
          <div className="mt-4 rounded-xl bg-[color:var(--color-banner-bg)] px-4 py-3">
            <p className="m-0 text-sm font-bold text-[color:var(--color-banner-text)]">
              Thanks{account?.fullName ? `, ${account.fullName}` : ""}. Your email is verified.
            </p>
            {role === "researcher" ? (
              <Button fullWidth className="mt-4" onClick={() => router.push("/researcher/dashboard")}>Continue to dashboard</Button>
            ) : (
              <p className="mb-0 mt-2 text-sm text-[color:var(--color-text-body)]">
                Your account is verified. The enumerator dashboard is not available yet.
              </p>
            )}
          </div>
        ) : emailVerified ? (
          <p className="mt-4 text-sm leading-[22px] text-[color:var(--color-text-body)]">
            Your email address is verified. You can continue to your account.
          </p>
        ) : (
          <p className="mt-4 text-sm leading-[22px] text-[color:var(--color-text-body)]">
            We sent a confirmation link to your email. Open it to verify your account.
          </p>
        )}

        <div className="mt-5 rounded-xl border border-[color:var(--color-border)] bg-white px-4 py-4">
          <div className="flex gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[color:var(--color-bg-selected)]"><Mail /></span>
            <div className="min-w-0">
              <div className={`text-sm leading-5 ${link}`}>{emailVerified ? "Email confirmed" : "Check your email too"}</div>
              <div className="mt-1 text-xs leading-4 text-[color:var(--color-text-secondary)]">
                {emailVerified ? "Your email address is verified." : "We sent a confirmation link to"}
              </div>
              <div className="mt-1 break-all text-xs leading-4 font-bold text-[color:var(--color-text-primary)]">{email || "your sign-up email"}</div>
              {!emailVerified ? (
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  {email ? <a href={`mailto:${email}`} className="inline-flex h-9 items-center justify-center rounded-lg border border-[color:var(--color-primary)] px-4 text-xs font-bold text-[color:var(--color-primary)]">Open email app</a> : null}
                  <Button type="button" variant="text" disabled={submitting || !email} onClick={resendEmail}>
                    Resend link
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {error ? <div role="alert" className="mt-4 rounded-[var(--radius-md)] bg-[#fdecec] px-4 py-3 text-sm font-semibold text-[color:var(--color-border-error)]">{error}</div> : null}
        {statusMessage ? <div role="status" className="mt-3 rounded-[var(--radius-md)] bg-[color:var(--color-banner-bg)] px-4 py-3 text-sm font-semibold text-[color:var(--color-banner-text)]">{statusMessage}</div> : null}

        <div className="mt-4 rounded-xl bg-[color:var(--color-banner-bg)] px-4 py-3">
          <div className="text-sm leading-5 font-bold text-[color:var(--color-banner-text)]">What happens next</div>
          <ol className="mt-2 flex flex-col gap-2">
            {next.map((item, index) => {
              const isComplete = index === 0 && emailVerified;
              return (
                <li key={item} className="flex items-center gap-3 text-xs leading-4 font-semibold text-[color:var(--color-text-body)]">
                  <span className={`grid size-[22px] shrink-0 place-items-center rounded-full text-[11px] font-bold ${isComplete ? "bg-[color:var(--color-control-trust)] text-white" : "border border-[color:var(--color-control-trust)] text-[color:var(--color-banner-text)]"}`}>
                    {index + 1}
                  </span>
                  {item}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </AuthShell>
  );
}
