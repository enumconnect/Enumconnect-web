"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ClipboardEvent, type FormEvent, type KeyboardEvent } from "react";
import { AuthShell, type ShellContent } from "./AuthShell";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/FormParts";

type Role = "researcher" | "enumerator";
type VerificationAccount = {
  email: string;
  fullName: string;
  phone: string;
  emailVerified: boolean;
  phoneVerified: boolean;
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
  const codeRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [account, setAccount] = useState<VerificationAccount | null>(null);
  const [email, setEmail] = useState(initialEmail);
  const [token, setToken] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [changingPhone, setChangingPhone] = useState(false);
  const [countdown, setCountdown] = useState(0);
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
        if (currentAccount.emailVerified && !currentAccount.phoneVerified) {
          const sendResponse = await fetch("/api/auth/verification/phone", { method: "POST" });
          const sendResult = await sendResponse.json();
          if (!sendResponse.ok) {
            setError(sendResult.error ?? "Could not send your phone verification code.");
          } else {
            setStatusMessage("We sent a 6-digit code by SMS.");
            setCountdown(45);
          }
        }
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

  useEffect(() => {
    if (countdown === 0) return;
    const timer = window.setTimeout(() => setCountdown((current) => current - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [countdown]);

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

  async function resendPhone() {
    setError("");
    setStatusMessage("");
    setSubmitting(true);
    try {
      const response = await fetch("/api/auth/verification/phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resend: true }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Could not resend the phone code.");
      setStatusMessage("A new 6-digit code has been sent by SMS.");
      setCountdown(45);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not resend the phone code.");
    } finally {
      setSubmitting(false);
    }
  }

  async function savePhone(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatusMessage("");
    if (!/^[789]\d{9}$/.test(phoneInput)) {
      setError("Enter a valid Nigerian mobile number.");
      return;
    }
    setSubmitting(true);
    const phone = `+234${phoneInput}`;
    try {
      const response = await fetch("/api/auth/verification/phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Could not update your phone number.");
      setAccount((current) => current ? { ...current, phone } : current);
      setChangingPhone(false);
      setToken("");
      setCountdown(45);
      setStatusMessage("A new 6-digit code has been sent to your updated phone number.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not update your phone number.");
    } finally {
      setSubmitting(false);
    }
  }

  async function verifyPhone(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatusMessage("");
    setSubmitting(true);
    try {
      const response = await fetch("/api/auth/verification/verify-phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Could not verify the phone number.");
      setAccount((current) => current ? { ...current, phoneVerified: true } : current);
      setStatusMessage("Your email and phone are verified.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not verify the phone number.");
    } finally {
      setSubmitting(false);
    }
  }

  function updateDigit(index: number, value: string) {
    const digits = token.padEnd(6, " ").split("");
    digits[index] = value.replace(/\D/g, "").slice(-1);
    const nextToken = digits.join("").replace(/\s/g, "");
    setToken(nextToken);
    if (value && index < 5) codeRefs.current[index + 1]?.focus();
  }

  function pasteCode(event: ClipboardEvent<HTMLInputElement>) {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    event.preventDefault();
    setToken(pasted);
    codeRefs.current[Math.min(pasted.length, 5)]?.focus();
  }

  function codeKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !token[index] && index > 0) {
      codeRefs.current[index - 1]?.focus();
    }
  }

  const complete = Boolean(account?.emailVerified && account.phoneVerified);
  const emailVerified = Boolean(account?.emailVerified);
  const phone = account?.phone ?? "";
  const minutes = Math.floor(countdown / 60);
  const seconds = String(countdown % 60).padStart(2, "0");

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
            {complete ? "Your account is verified" : "Verify your phone and email"}
          </h1>
          <p className="mt-1 text-xs leading-4 font-semibold text-[color:var(--color-text-secondary)]">
            {complete ? "Email and phone verification complete" : "Step 2 of 2 · almost done"}
          </p>
        </div>
        <ProgressBar value={complete ? 100 : emailVerified ? 75 : 50} className="mt-2" />

        {loading ? (
          <p role="status" className="mt-4 text-sm text-[color:var(--color-text-secondary)]">Checking your verification status…</p>
        ) : complete ? (
          <div className="mt-4 rounded-xl bg-[color:var(--color-banner-bg)] px-4 py-3">
            <p className="m-0 text-sm font-bold text-[color:var(--color-banner-text)]">
              Thanks{account?.fullName ? `, ${account.fullName}` : ""}. Your email and phone are verified.
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
          <>
            <p className="mt-4 text-sm leading-[22px] text-[color:var(--color-text-body)]">
              Thanks{account?.fullName ? `, ${account.fullName}` : ""}. We sent a 6-digit code to
              <br />
              <span className="font-bold text-[color:var(--color-text-primary)]">{phone}</span>
            </p>
            {changingPhone ? (
              <form onSubmit={savePhone} className="mt-4 flex gap-2">
                <span className="flex h-11 items-center rounded-[var(--radius-md)] border border-[color:var(--color-border-default)] bg-white px-3 text-sm font-bold">+234</span>
                <input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  value={phoneInput}
                  onChange={(event) => setPhoneInput(event.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="801 234 5678"
                  aria-label="New phone number"
                  className="h-11 min-w-0 flex-1 rounded-[var(--radius-md)] border border-[color:var(--color-border-default)] bg-white px-3 text-sm outline-none"
                />
                <Button type="submit" disabled={submitting}>{submitting ? "Saving…" : "Save"}</Button>
              </form>
            ) : (
              <form onSubmit={verifyPhone} className="mt-5">
                <span className="text-sm leading-5 font-bold text-[color:var(--color-text-primary)]">Enter code</span>
                <div className="mt-1.5 grid grid-cols-6 gap-2">
                  {Array.from({ length: 6 }, (_, index) => (
                    <input
                      key={index}
                      ref={(element) => { codeRefs.current[index] = element; }}
                      type="text"
                      inputMode="numeric"
                      autoComplete={index === 0 ? "one-time-code" : "off"}
                      maxLength={1}
                      value={token[index] ?? ""}
                      onChange={(event) => updateDigit(index, event.target.value)}
                      onKeyDown={(event) => codeKeyDown(index, event)}
                      onPaste={index === 0 ? pasteCode : undefined}
                      aria-label={`Digit ${index + 1}`}
                      className="h-12 w-full rounded-[var(--radius-md)] border border-[color:var(--color-border-subtle)] bg-white text-center text-lg font-bold outline-none focus:border-[color:var(--color-border-focus)]"
                    />
                  ))}
                </div>
                <div className="mt-3 flex justify-between gap-3 text-xs leading-4 text-[color:var(--color-text-secondary)]">
                  <span>
                    Didn&apos;t get it?{" "}
                    {countdown > 0 ? (
                      <span className={link}>Resend code in {minutes}:{seconds}</span>
                    ) : (
                      <button type="button" disabled={submitting} onClick={resendPhone} className={`${link} disabled:opacity-60`}>Resend code</button>
                    )}
                  </span>
                  <button type="button" onClick={() => { setPhoneInput(""); setChangingPhone(true); }} className={link}>Change it</button>
                </div>
                <Button type="submit" fullWidth disabled={submitting || token.length !== 6} className="mt-5 disabled:opacity-60">
                  {submitting ? "Verifying…" : "Verify and continue"}
                </Button>
              </form>
            )}
          </>
        ) : (
          <p className="mt-4 text-sm leading-[22px] text-[color:var(--color-text-body)]">
            Confirm your email first. Once confirmed, we&apos;ll send a 6-digit code to your phone.
          </p>
        )}

        <div className="mt-5 rounded-xl border border-[color:var(--color-border)] bg-white px-4 py-4">
          <div className="flex gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[color:var(--color-bg-selected)]"><Mail /></span>
            <div className="min-w-0">
              <div className={`text-sm leading-5 ${link}`}>{emailVerified ? "Email confirmed" : "Check your email too"}</div>
              <div className="mt-1 text-xs leading-4 text-[color:var(--color-text-secondary)]">
                {emailVerified ? "Your email address is verified." : "We sent a link to confirm"}
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
              const isComplete = index === 0 ? emailVerified : index === 1 ? complete : complete;
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
