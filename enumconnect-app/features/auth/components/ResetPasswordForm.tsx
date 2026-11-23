"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

function PasswordField({
  label,
  value,
  onChange,
  show,
  onToggle,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  show: boolean;
  onToggle: () => void;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm leading-5 font-bold text-[color:var(--color-text-primary)]">{label}</span>
      <span className="flex h-11 items-center rounded-[var(--radius-md)] border border-[color:var(--color-border-default)] bg-[color:var(--color-bg-surface)] px-3">
        <input
          type={show ? "text" : "password"}
          autoComplete="new-password"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="********"
          className="h-full min-w-0 flex-1 bg-transparent outline-none"
        />
        <button type="button" onClick={onToggle} className="text-xs font-bold text-[color:var(--color-text-link)]">
          {show ? "Hide" : "Show"}
        </button>
      </span>
    </label>
  );
}

export function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const valid = password.length >= 8 && password.length <= 72 && /[0-9]/.test(password);
  const matches = confirm === password;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setError("");
    if (!valid) {
      setError("Use at least 8 characters and include a number.");
      return;
    }
    if (!matches) {
      setError("The passwords don't match.");
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (response.ok) {
        router.push("/password-changed");
      } else if (response.status === 401) {
        setError("This reset link has expired or is no longer valid.");
      } else {
        setError("We couldn't save your new password. Please try again.");
      }
    } catch {
      setError("Network problem. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} noValidate>
      <h1 className="text-[32px] leading-10 font-extrabold text-[color:var(--color-text-primary)]">Set a new password</h1>
      <p className="mt-2 text-sm leading-5 text-[color:var(--color-text-body)]">Choose a new password for your EnumConnect account.</p>
      {error ? <div role="alert" className="mt-5 rounded-[var(--radius-md)] bg-[#fdecec] px-4 py-3 text-sm font-semibold text-[color:var(--color-border-error)]">{error}</div> : null}
      <div className="mt-6 flex flex-col gap-5">
        <PasswordField label="New password" value={password} onChange={setPassword} show={show} onToggle={() => setShow((value) => !value)} />
        {!valid && submitted ? null : <span className="text-xs font-semibold text-[color:var(--color-text-secondary)]">At least 8 characters, including a number.</span>}
        <PasswordField label="Confirm new password" value={confirm} onChange={setConfirm} show={show} onToggle={() => setShow((value) => !value)} />
      </div>
      <Button type="submit" fullWidth disabled={submitting} className="mt-6 disabled:opacity-60">{submitting ? "Saving…" : "Save new password"}</Button>
    </form>
  );
}
