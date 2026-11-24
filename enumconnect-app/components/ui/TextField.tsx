import type { InputHTMLAttributes, ReactNode } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
  trailing?: ReactNode;
};

export function TextField({ label, hint, error, trailing, className = "", ...rest }: TextFieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm leading-5 font-bold text-[color:var(--color-text-primary)]">
        {label}
      </span>
      <span className="relative block">
        <input
          aria-invalid={error ? true : undefined}
          className={
            "h-11 w-full px-3 text-base border rounded-[var(--radius-md)] " +
            "bg-[color:var(--color-bg-surface)] text-[color:var(--color-text-primary)] " +
            "placeholder:text-[color:var(--color-text-placeholder)] focus-visible:outline-hidden " +
            (error
              ? "border-[color:var(--color-border-error)] ring-1 ring-[color:var(--color-border-error)] "
              : "border-[color:var(--color-border-default)] focus-visible:border-[color:var(--color-border-focus)] focus-visible:ring-1 focus-visible:ring-[color:var(--color-border-focus)] ") +
            (trailing ? "pr-10 " : "") +
            className
          }
          {...rest}
        />
        {trailing ? (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            {trailing}
          </span>
        ) : null}
      </span>
      {error ? (
        <span role="alert" className="text-xs leading-4 font-semibold text-[color:var(--color-border-error)]">
          {error}
        </span>
      ) : hint ? (
        <span className="text-xs leading-4 font-semibold text-[color:var(--color-text-secondary)]">{hint}</span>
      ) : null}
    </label>
  );
}