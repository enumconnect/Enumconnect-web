import type { ReactNode } from "react";
import { countryCallingCodes, maxNationalNumberLength } from "@/features/auth/lib/phone";

const label = "text-sm leading-5 font-bold text-[color:var(--color-text-primary)]";
const hintCls = "text-xs leading-4 font-semibold text-[color:var(--color-text-secondary)]";
const box =
  "flex h-[52px] w-full items-center rounded-[var(--radius-md)] border border-[color:var(--color-border-default)] bg-[color:var(--color-bg-surface)] text-base";
const bare =
  "h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-[color:var(--color-text-placeholder)]";

function Chevron() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-[color:var(--color-text-body)]">
      <path d="M5.5 8l4.5 4.5L14.5 8" />
    </svg>
  );
}

function Eye() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-[color:var(--color-text-secondary)]">
      <path d="M1.5 10S4.5 4.5 10 4.5 18.5 10 18.5 10 15.5 15.5 10 15.5 1.5 10 1.5 10z" />
      <circle cx="10" cy="10" r="2.5" />
    </svg>
  );
}

export function ProgressBar({ value, className = "" }: { value: number; className?: string }) {
  return (
    <div className={`h-1.5 w-full rounded-full bg-[color:var(--color-tab-track)] ${className}`}>
      <div className="h-full rounded-full bg-[color:var(--color-control-trust)]" style={{ width: `${value}%` }} />
    </div>
  );
}

export function PhoneField({
  value,
  onChange,
  callingCode,
  onCallingCodeChange,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  callingCode: string;
  onCallingCodeChange: (callingCode: string) => void;
  error?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className={label}>Phone number (optional)</span>
      <span className={`${box} overflow-hidden`}>
        <select
          aria-label="Country calling code"
          value={callingCode}
          onChange={(event) => onCallingCodeChange(event.target.value)}
          className="h-full w-[88px] shrink-0 border-r border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-selected)] px-2 text-sm font-bold text-[color:var(--color-text-primary)] outline-none"
        >
          {countryCallingCodes.map(({ iso, code }) => (
            <option key={iso} value={code}>{code}</option>
          ))}
        </select>
        <input
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="Phone number"
          value={value}
          onChange={(event) => onChange(event.target.value.replace(/\D/g, "").slice(0, maxNationalNumberLength(callingCode)))}
          aria-invalid={error ? true : undefined}
          className={`${bare} px-3`}
        />
      </span>
      {error ? <span role="alert" className="text-xs leading-4 font-semibold text-[color:var(--color-border-error)]">{error}</span> : null}
    </label>
  );
}

export function SelectField({ label: text, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className={label}>{text}</span>
      <div className={`${box} justify-between px-3 text-[color:var(--color-text-placeholder)]`}>
        {placeholder}
        <Chevron />
      </div>
    </div>
  );
}

export function PasswordField({ hint }: { hint: string }) {
  return (
    <label className="flex flex-col gap-2">
      <span className={label}>Password</span>
      <span className={`${box} px-3`}>
        <input type="password" placeholder="Create a password" className={bare} />
        <Eye />
      </span>
      <span className={hintCls}>{hint}</span>
    </label>
  );
}

export function CheckboxRow({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`flex items-center gap-3 text-xs leading-4 font-semibold text-[color:var(--color-text-body)] ${className}`}>
      <span className="size-5 shrink-0 rounded-md border border-[color:var(--color-border-default)] bg-[color:var(--color-bg-surface)]" />
      <span>{children}</span>
    </div>
  );
}