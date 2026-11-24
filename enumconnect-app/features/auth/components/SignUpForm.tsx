"use client";

import { useId, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { InfoBanner } from "@/components/ui/InfoBanner";
import { TextField } from "@/components/ui/TextField";
import { signupSchema } from "@/features/auth/lib/validation";

type Role = "enumerator" | "researcher";
type Field = "fullName" | "email" | "phone" | "password";
type Values = Record<Field, string>;

const label = "text-sm leading-5 font-bold text-[color:var(--color-text-primary)]";
const note = "text-xs leading-4 font-semibold";
const red = "text-[color:var(--color-border-error)]";
const link = "font-bold text-[color:var(--color-text-link)] underline";

function toE164(input: string) {
  let digits = input.replace(/\D/g, "");
  if (digits.startsWith("234") && digits.length > 10) digits = digits.slice(3);
  if (digits.startsWith("0")) digits = digits.slice(1);
  return `+234${digits}`;
}

function describe(field: Field, code: string, minimum: unknown, message: string) {
  if (field === "fullName") return "Enter your full name.";
  if (field === "email") return "Enter a valid email address.";
  if (field === "phone") return "Enter a valid phone number, like 801 234 5678.";
  if (code === "too_small" && typeof minimum === "number") return `Use at least ${minimum} characters.`;
  if (code === "too_big") return "That password is too long.";
  return message || "Enter a valid password.";
}

function check(values: Values, role: Role) {
  const result = signupSchema.safeParse({
    email: values.email,
    password: values.password,
    fullName: values.fullName,
    phone: toE164(values.phone),
    role,
  });
  const errors: Partial<Record<Field, string>> = {};
  if (result.success) return { data: result.data, errors };
  for (const issue of result.error.issues) {
    const field = String(issue.path[0]) as Field;
    if (field in values && !errors[field]) {
      errors[field] = describe(field, issue.code, (issue as { minimum?: unknown }).minimum, issue.message);
    }
  }
  return { data: null, errors };
}

function Chevron() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-[color:var(--color-text-body)]">
      <path d="M5.5 8l4.5 4.5L14.5 8" />
    </svg>
  );
}

function Eye({ off }: { off: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1.5 10S4.5 4.5 10 4.5 18.5 10 18.5 10 15.5 15.5 10 15.5 1.5 10 1.5 10z" />
      <circle cx="10" cy="10" r="2.5" />
      {off ? <path d="M3 3l14 14" /> : null}
    </svg>
  );
}

const boxBase =
  "flex h-[52px] w-full items-center rounded-[var(--radius-md)] border bg-[color:var(--color-bg-surface)] text-base ";
const boxOk =
  "border-[color:var(--color-border-default)] focus-within:border-[color:var(--color-border-focus)] focus-within:ring-1 focus-within:ring-[color:var(--color-border-focus)]";
const boxBad = "border-[color:var(--color-border-error)] ring-1 ring-[color:var(--color-border-error)]";
const bare =
  "h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-[color:var(--color-text-placeholder)]";

function PhoneInput({
  value,
  onChange,
  onBlur,
  error,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  error?: string;
}) {
  const id = useId();
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={label}>
        Phone number
      </label>
      <span className={`${boxBase}overflow-hidden ${error ? boxBad : boxOk}`}>
        <span className="flex h-full w-[88px] shrink-0 items-center justify-center gap-1 border-r border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-selected)] font-bold text-[color:var(--color-text-primary)]">
          +234
          <Chevron />
        </span>
        <input
          id={id}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="801 234 5678"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
          className={`${bare} px-3`}
        />
      </span>
      {error ? (
        <span role="alert" className={`${note} ${red}`}>
          {error}
        </span>
      ) : null}
    </div>
  );
}

function PasswordInput({
  value,
  onChange,
  onBlur,
  error,
  hint,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  error?: string;
  hint: string;
}) {
  const id = useId();
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={label}>
        Password
      </label>
      <span className={`${boxBase}px-3 ${error ? boxBad : boxOk}`}>
        <input
          id={id}
          name="password"
          type={show ? "text" : "password"}
          autoComplete="new-password"
          placeholder="Create a password"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
          className={bare}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          className="shrink-0 text-[color:var(--color-text-secondary)]"
        >
          <Eye off={show} />
        </button>
      </span>
      {error ? (
        <span role="alert" className={`${note} ${red}`}>
          {error}
        </span>
      ) : (
        <span className={`${note} text-[color:var(--color-text-secondary)]`}>{hint}</span>
      )}
    </div>
  );
}

function TermsCheckbox({
  checked,
  onChange,
  error,
  className = "",
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  error?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className={`flex items-center gap-3 ${note} text-[color:var(--color-text-body)]`}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="size-5 shrink-0 rounded-md accent-[color:var(--color-control-checked)]"
        />
        <span>
          I agree to the <span className={link}>Terms of service</span> and <span className={link}>Privacy policy</span>
        </span>
      </label>
      {error ? (
        <span role="alert" className={`mt-2 block ${note} ${red}`}>
          {error}
        </span>
      ) : null}
    </div>
  );
}

export function SignUpForm({
  role,
  namePlaceholder,
  passwordHint,
  bannerText,
  extra,
}: {
  role: Role;
  namePlaceholder: string;
  passwordHint: string;
  bannerText: string;
  extra: ReactNode;
}) {
  const [values, setValues] = useState<Values>({ fullName: "", email: "", phone: "", password: "" });
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [terms, setTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [formError, setFormError] = useState("");

  const { data, errors } = check(values, role);
  const shown = (f: Field) => (touched[f] || submitted ? errors[f] : undefined);
  const change = (f: Field) => (e: ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [f]: e.target.value }));
  const blur = (f: Field) => () => setTouched((t) => ({ ...t, [f]: true }));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setFormError("");
    if (!data || Object.keys(errors).length > 0 || !terms) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 201) setDone(true);
      else if (res.status === 400) setFormError("We couldn't create your account. Check your details and try again.");
      else if (res.status === 429) setFormError("Too many attempts. Please wait a moment and try again.");
      else setFormError("Something went wrong. Please try again.");
    } catch {
      setFormError("Network problem. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="mt-[26px] flex flex-col gap-6">
        <TextField
          label="Full name"
          name="fullName"
          autoComplete="name"
          placeholder={namePlaceholder}
          value={values.fullName}
          onChange={change("fullName")}
          onBlur={blur("fullName")}
          error={shown("fullName")}
        />
        <TextField
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="your@university.edu.ng"
          value={values.email}
          onChange={change("email")}
          onBlur={blur("email")}
          error={shown("email")}
        />
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <PhoneInput value={values.phone} onChange={change("phone")} onBlur={blur("phone")} error={shown("phone")} />
        {extra}
        <PasswordInput
          value={values.password}
          onChange={change("password")}
          onBlur={blur("password")}
          error={shown("password")}
          hint={passwordHint}
        />
      </div>
      <TermsCheckbox
        className="mt-6"
        checked={terms}
        onChange={setTerms}
        error={submitted && !terms ? "Accept the terms to continue." : undefined}
      />
      {formError ? (
        <div role="alert" className={`mt-6 rounded-[var(--radius-md)] bg-[#fdecec] px-4 py-3 text-sm font-bold ${red}`}>
          {formError}
        </div>
      ) : null}
      <Button type="submit" fullWidth disabled={submitting || done} className="mt-6 disabled:opacity-60">
        {submitting ? "Creating account…" : "Create account"}
      </Button>
      <InfoBanner className="mt-6">{done ? "Check your email to confirm your account." : bannerText}</InfoBanner>
    </form>
  );
}