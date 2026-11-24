import { z } from "zod";
import { getNigerianLgas, nigerianStates } from "./nigerianLocations";

export const emailSchema = z.string().trim().toLowerCase().email().max(254);
export const phoneSchema = z.string().regex(/^\+234[789]\d{9}$/);

// Keep in step with the password policy configured in Supabase Auth.
const passwordSchema = z
  .string()
  .min(8)
  .max(72)
  .regex(/[0-9]/, "Password must include a number");

const signupFields = {
  email: emailSchema,
  password: passwordSchema,
  phone: phoneSchema,
  fullName: z.string().trim().min(1).max(120).optional(),
};

export const signupSchema = z.discriminatedUnion("role", [
  z.object({
    ...signupFields,
    role: z.literal("researcher"),
    institution: z.string().trim().max(200).optional().transform((value) => value || undefined),
    researchArea: z.string().trim().min(1).max(160),
  }),
  z.object({
    ...signupFields,
    role: z.literal("enumerator"),
    state: z.string().refine((state) => nigerianStates.includes(state), "Select a valid Nigerian state."),
    lga: z.string(),
  }).superRefine(({ state, lga }, context) => {
    if (nigerianStates.includes(state) && !getNigerianLgas(state).includes(lga)) {
      context.addIssue({
        code: "custom",
        path: ["lga"],
        message: "Select an LGA in the selected state.",
      });
    }
  }),
]);

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1).max(72),
});

export const resetPasswordSchema = z.object({
  password: passwordSchema,
});
