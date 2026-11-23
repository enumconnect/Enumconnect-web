import { z } from "zod";

export const emailSchema = z.string().trim().toLowerCase().email().max(254);
export const phoneSchema = z.string().regex(/^\+234[789]\d{9}$/);

// Keep in step with the password policy configured in Supabase Auth.
const passwordSchema = z
  .string()
  .min(8)
  .max(72)
  .regex(/[0-9]/, "Password must include a number");

export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  phone: phoneSchema,
  // 'staff' is deliberately not accepted: staff accounts are never self-service.
  role: z.enum(["researcher", "enumerator"]),
  fullName: z.string().trim().min(1).max(120).optional(),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1).max(72),
});

export const resetPasswordSchema = z.object({
  password: passwordSchema,
});
