"use client";

import { useId, useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { PhoneField } from "@/components/ui/FormParts";
import { InfoBanner } from "@/components/ui/InfoBanner";
import { TextField } from "@/components/ui/TextField";
import { nigerianUniversities } from "@/features/auth/data/nigerianUniversities";
import { signupSchema } from "@/features/auth/lib/validation";
import { getNigerianLgas, nigerianStates } from "@/features/auth/lib/nigerianLocations";
import { fieldworkTypes } from "@/features/landing/data/hero";

type Role = "enumerator" | "researcher";
type Field = "fullName" | "email" | "password" | "phone" | "state" | "lga" | "institution" | "researchArea";
type Values = Record<Field, string>;

const label = "text-sm leading-5 font-bold text-[color:var(--color-text-primary)]";
const note = "text-xs leading-4 font-semibold";
const red = "text-[color:var(--color-border-error)]";
const link = "font-bold text-[color:var(--color-text-link)] underline";

function describe(field: Field, code: string, minimum: unknown) {
  if (field === "fullName") return "Enter your full name.";
  if (field === "email") return "Enter a valid email address.";
  if (field === "phone") return "Enter a valid Nigerian mobile number.";
  if (field === "state") return "Select a valid Nigerian state.";
  if (field === "lga") return "Select an LGA in the selected state.";
  if (field === "researchArea") return "Enter your research area.";
  if (field === "institution" && code === "too_big") return "Institution name is too long.";
  if (code === "too_small" && typeof minimum === "number") return `Use at least ${minimum} characters.`;
  if (code === "too_big") return "That password is too long.";
  if (field === "password" && (code === "custom" || code === "invalid_format")) return "Include at least one number.";
  return "Enter a valid password.";
}

function ChevronDown() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-[color:var(--color-text-body)]">
      <path d="M5.5 8l4.5 4.5L14.5 8" />
    </svg>
  );
}

function check(values: Values, role: Role) {
  const result = signupSchema.safeParse({
    ...values,
    phone: `+234${values.phone}`,
    role,
  });
  const errors: Partial<Record<Field, string>> = {};
  if (result.success) return { data: result.data, errors };
  for (const issue of result.error.issues) {
    const field = String(issue.path[0]) as Field;
    if (field in values && !errors[field]) {
      errors[field] = describe(field, issue.code, (issue as { minimum?: unknown }).minimum);
    }
  }
  return { data: null, errors };
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
      <span
        className={
          "flex h-[52px] w-full items-center rounded-[var(--radius-md)] border bg-[color:var(--color-bg-surface)] px-3 text-base " +
          (error
            ? "border-[color:var(--color-border-error)] ring-1 ring-[color:var(--color-border-error)]"
            : "border-[color:var(--color-border-default)] focus-within:border-[color:var(--color-border-focus)] focus-within:ring-1 focus-within:ring-[color:var(--color-border-focus)]")
        }
      >
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
          className="h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-[color:var(--color-text-placeholder)]"
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
}: {
  role: Role;
  namePlaceholder: string;
  passwordHint: string;
  bannerText: string;
}) {
  const router = useRouter();
  const [values, setValues] = useState<Values>({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    state: "",
    lga: "",
    institution: "",
    researchArea: "",
  });
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [terms, setTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const stateId = useId();
  const lgaId = useId();
  const institutionListId = useId();
  const researchAreaListId = useId();

  const { data, errors } = check(values, role);
  const shown = (f: Field) => (touched[f] || submitted ? errors[f] : undefined);
  const change = (f: Field) => (e: ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [f]: e.target.value }));
  const blur = (f: Field) => () => setTouched((t) => ({ ...t, [f]: true }));
  const lgas = role === "enumerator" && values.state ? getNigerianLgas(values.state) : [];

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
      if (res.status === 201) {
        router.push(`/verify-account/${role}?email=${encodeURIComponent(data.email)}`);
      }
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
        <PhoneField
          value={values.phone}
          onChange={(phone) => setValues((current) => ({ ...current, phone }))}
          error={shown("phone")}
        />
        {role === "researcher" ? (
          <>
            <TextField
              label="Institution or organisation (optional)"
              name="institution"
              list={institutionListId}
              autoComplete="organization"
              placeholder="Select or type your institution"
              trailing={<ChevronDown />}
              className="h-[52px]"
              maxLength={200}
              value={values.institution}
              onChange={change("institution")}
              onBlur={blur("institution")}
              error={shown("institution")}
            />
            <datalist id={institutionListId}>
              {nigerianUniversities.map((institution) => (
                <option key={institution} value={institution} />
              ))}
            </datalist>
            <TextField
              label="Research area"
              name="researchArea"
              list={researchAreaListId}
              placeholder="e.g. Public health"
              trailing={<ChevronDown />}
              className="h-[52px]"
              required
              maxLength={160}
              value={values.researchArea}
              onChange={change("researchArea")}
              onBlur={blur("researchArea")}
              error={shown("researchArea")}
            />
            <datalist id={researchAreaListId}>
              {fieldworkTypes.map((area) => (
                <option key={area} value={area} />
              ))}
            </datalist>
          </>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <label htmlFor={stateId} className="flex flex-col gap-2">
              <span className={label}>State</span>
              <select
                id={stateId}
                name="state"
                required
                value={values.state}
                onChange={(event) => setValues((current) => ({
                  ...current,
                  state: event.target.value,
                  lga: "",
                }))}
                aria-invalid={shown("state") ? true : undefined}
                className={`h-[52px] w-full rounded-[var(--radius-md)] border bg-[color:var(--color-bg-surface)] px-3 text-base outline-none focus:border-[color:var(--color-border-focus)] ${
                  shown("state")
                    ? "border-[color:var(--color-border-error)]"
                    : "border-[color:var(--color-border-default)]"
                }`}
              >
                <option value="">Select state</option>
                {nigerianStates.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {shown("state") ? (
                <span role="alert" className={`${note} ${red}`}>{shown("state")}</span>
              ) : null}
            </label>
            <label htmlFor={lgaId} className="flex flex-col gap-2">
              <span className={label}>Main LGA</span>
              <select
                id={lgaId}
                name="lga"
                required
                disabled={!values.state}
                value={values.lga}
                onChange={(event) => setValues((current) => ({ ...current, lga: event.target.value }))}
                aria-invalid={shown("lga") ? true : undefined}
                className={`h-[52px] w-full rounded-[var(--radius-md)] border bg-[color:var(--color-bg-surface)] px-3 text-base outline-none focus:border-[color:var(--color-border-focus)] disabled:opacity-60 ${
                  shown("lga")
                    ? "border-[color:var(--color-border-error)]"
                    : "border-[color:var(--color-border-default)]"
                }`}
              >
                <option value="">{values.state ? "Select LGA" : "Select state first"}</option>
                {lgas.map((lga) => (
                  <option key={lga} value={lga}>{lga}</option>
                ))}
              </select>
              {shown("lga") ? (
                <span role="alert" className={`${note} ${red}`}>{shown("lga")}</span>
              ) : null}
            </label>
          </div>
        )}
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
      <Button type="submit" fullWidth disabled={submitting} className="mt-6 disabled:opacity-60">
        {submitting ? "Creating account…" : "Create account"}
      </Button>
      <InfoBanner className="mt-6">{bannerText}</InfoBanner>
    </form>
  );
}