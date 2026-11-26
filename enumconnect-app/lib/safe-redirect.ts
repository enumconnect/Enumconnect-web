/**
 * Only allow redirects to a path on this site. Without this check, a crafted
 * link such as /auth/confirm?next=https://evil.example would send a freshly
 * signed-in user to another website (open redirect).
 */
export function safeNextPath(value: string | null, fallback = "/"): string {
  if (
    !value ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\")
  ) {
    return fallback;
  }
  return value;
}
