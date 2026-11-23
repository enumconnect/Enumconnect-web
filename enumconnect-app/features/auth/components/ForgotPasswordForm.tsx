"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";

export function ForgotPasswordForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function sendLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!email.trim()) {
      setError("Enter the email address used to sign up.");
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        setError("Enter a valid email address and try again.");
        return;
      }
      setStep(2);
    } catch {
      setError("Network problem. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function resendLink() {
    setError("");
    setSubmitting(true);
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        setError("We couldn't resend the link. Please try again.");
      }
    } catch {
      setError("Network problem. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (step === 2) {
    return (
      <div>
        <h1 className="text-[32px] leading-10 font-extrabold text-[color:var(--color-text-primary)]">Check your email</h1>
        <p className="mt-4 text-sm leading-[22px] text-[color:var(--color-text-body)]">
          If <span className="font-bold">{email}</span> has an EnumConnect account, we&apos;ve sent a link to reset your password. The link works for 1 hour.
        </p>
        <div className="mt-6 rounded-[var(--radius-md)] bg-[color:var(--color-bg-selected)] px-4 py-3 text-sm text-[color:var(--color-text-body)]">
          Didn&apos;t get it? Check your spam folder, or send the link again.
        </div>
        {error ? <div role="alert" className="mt-4 rounded-[var(--radius-md)] bg-[#fdecec] px-4 py-3 text-sm font-semibold text-[color:var(--color-border-error)]">{error}</div> : null}
        <Button onClick={resendLink} variant="outline" fullWidth disabled={submitting} className="mt-6 disabled:opacity-60">
          {submitting ? "Sending…" : "Send the link again"}
        </Button>
        <div className="mt-6 text-center">
          <Link href="/login" className="text-sm font-bold text-[color:var(--color-text-link)]">Back to log in</Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={sendLink} noValidate>
      <h1 className="text-[32px] leading-10 font-extrabold text-[color:var(--color-text-primary)]">Reset your password</h1>
      <p className="mt-2 text-sm leading-5 text-[color:var(--color-text-body)]">Enter the email you signed up with. We&apos;ll send you a link to set a new password.</p>
      {error ? <div role="alert" className="mt-5 rounded-[var(--radius-md)] bg-[#fdecec] px-4 py-3 text-sm font-semibold text-[color:var(--color-border-error)]">{error}</div> : null}
      <div className="mt-6">
        <TextField label="Email address" name="email" type="email" autoComplete="email" placeholder="ibrahim.musa@gmail.com" value={email} onChange={(event) => setEmail(event.target.value)} />
      </div>
      <Button type="submit" fullWidth disabled={submitting} className="mt-6 disabled:opacity-60">{submitting ? "Sending…" : "Send reset link"}</Button>
      <div className="mt-6 text-center">
        <Link href="/login" className="text-sm font-bold text-[color:var(--color-text-link)]">Back to log in</Link>
      </div>
    </form>
  );
}
