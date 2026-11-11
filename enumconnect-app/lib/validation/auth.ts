import { z } from "zod";

const email = z.string().trim().toLowerCase().email().max(254);

// Keep in step with the password policy configured in Supabase Auth.
const password = z.string().min(10).max(72);

export const signupSchema = z.object({
  email,
  password,
  // 'staff' is deliberately not accepted: staff accounts are never self-service.
  role: z.enum(["researcher", "enumerator"]),
  fullName: z.string().trim().min(1).max(120).optional(),
});

export const loginSchema = z.object({
  email,
  password: z.string().min(1).max(72),
});
