/**
 * Normalise a Nigerian mobile number to E.164 (+234XXXXXXXXXX).
 * Accepts: 0801 234 5678, 801 234 5678, 2348012345678, +234 801 234 5678,
 * and +234 0801... (a common typing mistake).
 * Returns null when the number does not look like a Nigerian mobile number.
 * This checks shape only; it cannot tell whether the number is in service.
 */
export function normalizeNigerianPhone(input: string): string | null {
  const compact = input.replace(/[\s\-().]/g, "");
  let national: string;

  if (compact.startsWith("+234")) {
    national = compact.slice(4).replace(/^0/, "");
  } else if (compact.startsWith("234")) {
    national = compact.slice(3).replace(/^0/, "");
  } else if (compact.startsWith("0")) {
    national = compact.slice(1);
  } else {
    national = compact;
  }

  // 10 digits after the country code, starting with 7, 8 or 9.
  if (!/^[789]\d{9}$/.test(national)) {
    return null;
  }
  return `+234${national}`;
}
