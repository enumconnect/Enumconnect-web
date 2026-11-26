import { z } from "zod";
import { normalizeNigerianPhone } from "./phone";

const email = z
  .string()
  .trim()
  .toLowerCase()
  .email("Enter a valid email address")
  .max(254);

// Matches the Figma hint: "At least 8 characters, including a number".
// Keep in step with the password settings in Supabase Auth.
const password = z
  .string()
  .min(8, "Use at least 8 characters")
  .max(72, "Use 72 characters or fewer")
  .regex(/\d/, "Include at least one number");

// Only needed when CAPTCHA protection is enabled in Supabase Auth.
const captchaToken = z.string().min(1).max(2048).optional();

const phone = z.string().trim().transform((value, ctx) => {
  const normalised = normalizeNigerianPhone(value);
  if (!normalised) {
    ctx.addIssue({ code: "custom", message: "Enter a valid Nigerian phone number" });
    return z.NEVER;
  }
  return normalised;
});

export const signupSchema = z.object({
  email,
  password,
  // 'staff' is deliberately not accepted: staff accounts are never self-service.
  role: z.enum(["researcher", "enumerator"], { message: "Choose researcher or enumerator" }),
  fullName: z.string().trim().min(2, "Enter your full name").max(120),
  acceptedTerms: z
    .boolean()
    .refine((value) => value === true, {
      message: "You must accept the Terms of service and Privacy policy",
    }),
  captchaToken,
});

export const loginSchema = z.object({
  email,
  password: z.string().min(1).max(72),
  captchaToken,
});

export const resendEmailSchema = z.object({ email, captchaToken });

export const verifyEmailSchema = z.object({
  email,
  code: z.string().trim().regex(/^\d{6,10}$/, "Enter the code from your email"),
});

export const sendPhoneCodeSchema = z.object({ phone });

export const verifyPhoneSchema = z.object({
  phone,
  code: z.string().trim().regex(/^\d{6}$/, "Enter the 6-digit code"),
});
