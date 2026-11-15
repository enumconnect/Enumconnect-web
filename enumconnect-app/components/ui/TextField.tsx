import type { InputHTMLAttributes } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
};

export function TextField({ label, hint, className = "", ...rest }: TextFieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm leading-5 font-bold text-[color:var(--color-text-primary)]">
        {label}
      </span>
      <input
        className={
          "h-11 w-full px-3 text-base border rounded-[var(--radius-md)] " +
          "border-[color:var(--color-border-default)] bg-[color:var(--color-bg-surface)] " +
          "text-[color:var(--color-text-primary)] " +
          "placeholder:text-[color:var(--color-text-placeholder)] " +
          className
        }
        {...rest}
      />
      {hint ? (
        <span className="text-xs leading-4 font-semibold text-[color:var(--color-text-secondary)]">{hint}</span>
      ) : null}
    </label>
  );
}