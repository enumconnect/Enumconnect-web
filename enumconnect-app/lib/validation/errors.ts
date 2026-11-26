import type { ZodError } from "zod";

/** First message per field, so the frontend can show it under the input. */
export function fieldErrors(error: ZodError): Record<string, string> {
  const fields: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!(key in fields)) {
      fields[key] = issue.message;
    }
  }
  return fields;
}

/**
 * 400 response for invalid input. Field-level messages are safe here (they
 * describe our own rules). Never use this style for login failures or for
 * anything that would reveal whether an account exists.
 */
export function invalidInput(error: ZodError) {
  return Response.json(
    { error: "Invalid input", fields: fieldErrors(error) },
    { status: 400 },
  );
}
