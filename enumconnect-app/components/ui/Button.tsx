import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "outline" | "text";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  fullWidth?: boolean;
};

const variants: Record<Variant, string> = {
  primary:
    "h-14 px-5 text-base leading-none " +
    "bg-[color:var(--color-primary)] text-[color:var(--color-text-on-action)]",
  outline:
    "h-10 px-4 text-sm border border-[color:var(--color-primary)] text-[color:var(--color-primary)]",
  text: "px-1 text-sm text-[color:var(--color-primary)]",
};

export function Button({
  variant = "primary",
  fullWidth = false,
  className = "",
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center font-bold rounded-[var(--radius-md)] ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...rest}
    />
  );
}