"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setError("");
    setMessage("");
    if (!email.trim() || !password) {
      setError("Enter both your email address and password.");
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        setError("That email and password don't match an account. Check them and try again, or reset your password.");
        return;
      }
      const me = await fetch("/api/me", { cache: "no-store" });
      if (!me.ok) {
        router.push("/researcher/dashboard");
        return;
      }
      const { profile } = await me.json();
      if (profile.account_status === "pending" || profile.account_status === "unverified") {
        router.push(profile.role === "enumerator" ? "/verify-account/enumerator" : "/verify-account/researcher");
      } else if (profile.role === "enumerator") {
        setMessage("You’re signed in, but the enumerator dashboard isn’t available yet.");
      } else {
        router.push("/researcher/dashboard");
      }
    } catch {
      setError("Network problem. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <h1 className="text-[32px] leading-10 font-extrabold text-[color:var(--color-text-primary)]">Log in to EnumConnect</h1>
      <p className="mt-2 text-sm leading-5 text-[color:var(--color-text-body)]">Welcome back. Researchers and enumerators use the same log-in.</p>
      {error ? (
        <div role="alert" className="mt-5 rounded-[var(--radius-md)] bg-[#fdecec] px-4 py-3 text-sm font-semibold text-[color:var(--color-border-error)]">
          {error}
        </div>
      ) : null}
      {message ? (
        <div role="status" className="mt-5 rounded-[var(--radius-md)] bg-[color:var(--color-banner-bg)] px-4 py-3 text-sm font-semibold text-[color:var(--color-banner-text)]">
          {message}
        </div>
      ) : null}
      <div className="mt-6 flex flex-col gap-5">
        <TextField
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
          error={submitted && !email.trim() ? "Enter your email address." : undefined}
        />
        <label className="flex flex-col gap-2">
          <span className="text-sm leading-5 font-bold text-[color:var(--color-text-primary)]">Password</span>
          <span className="flex h-11 items-center rounded-[var(--radius-md)] border border-[color:var(--color-border-default)] bg-[color:var(--color-bg-surface)] px-3 focus-within:border-[color:var(--color-border-focus)] focus-within:ring-1 focus-within:ring-[color:var(--color-border-focus)]">
            <input
              name="password"
              type={show ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-[color:var(--color-text-placeholder)]"
            />
            <button type="button" onClick={() => setShow((value) => !value)} aria-label={show ? "Hide password" : "Show password"} className="text-xs font-bold text-[color:var(--color-text-link)]">
              {show ? "Hide" : "Show"}
            </button>
          </span>
          {submitted && !password ? <span role="alert" className="text-xs font-semibold text-[color:var(--color-border-error)]">Enter your password.</span> : null}
        </label>
      </div>
      <div className="mt-3 text-right">
        <Link href="/forgot-password" className="text-sm leading-5 font-bold text-[color:var(--color-text-link)]">Forgot password?</Link>
      </div>
      <Button type="submit" fullWidth disabled={submitting} className="mt-5 disabled:opacity-60">
        {submitting ? "Logging in…" : "Log in"}
      </Button>
    </form>
  );
}
