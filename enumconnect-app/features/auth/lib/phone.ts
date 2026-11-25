export const countryCallingCodes = [
  { country: "Nigeria", iso: "NG", code: "+234" },
  { country: "Ghana", iso: "GH", code: "+233" },
  { country: "Kenya", iso: "KE", code: "+254" },
  { country: "South Africa", iso: "ZA", code: "+27" },
  { country: "Uganda", iso: "UG", code: "+256" },
  { country: "Tanzania", iso: "TZ", code: "+255" },
  { country: "Rwanda", iso: "RW", code: "+250" },
  { country: "Ethiopia", iso: "ET", code: "+251" },
  { country: "Senegal", iso: "SN", code: "+221" },
  { country: "Cote d'Ivoire", iso: "CI", code: "+225" },
  { country: "United States", iso: "US", code: "+1" },
  { country: "Canada", iso: "CA", code: "+1" },
  { country: "United Kingdom", iso: "GB", code: "+44" },
  { country: "Ireland", iso: "IE", code: "+353" },
  { country: "France", iso: "FR", code: "+33" },
  { country: "Germany", iso: "DE", code: "+49" },
  { country: "Netherlands", iso: "NL", code: "+31" },
  { country: "Spain", iso: "ES", code: "+34" },
  { country: "Italy", iso: "IT", code: "+39" },
  { country: "Portugal", iso: "PT", code: "+351" },
  { country: "India", iso: "IN", code: "+91" },
  { country: "Pakistan", iso: "PK", code: "+92" },
  { country: "Bangladesh", iso: "BD", code: "+880" },
  { country: "United Arab Emirates", iso: "AE", code: "+971" },
  { country: "Saudi Arabia", iso: "SA", code: "+966" },
  { country: "Qatar", iso: "QA", code: "+974" },
  { country: "China", iso: "CN", code: "+86" },
  { country: "Japan", iso: "JP", code: "+81" },
  { country: "South Korea", iso: "KR", code: "+82" },
  { country: "Australia", iso: "AU", code: "+61" },
  { country: "New Zealand", iso: "NZ", code: "+64" },
  { country: "Brazil", iso: "BR", code: "+55" },
  { country: "Mexico", iso: "MX", code: "+52" },
] as const;

export function isValidInternationalPhone(phone: string) {
  if (!/^\+[1-9]\d{7,14}$/.test(phone)) return false;
  return countryCallingCodes.some(({ code }) => {
    const nationalNumber = phone.slice(code.length);
    return phone.startsWith(code) && /^\d{4,}$/.test(nationalNumber);
  });
}

export function toInternationalPhone(callingCode: string, nationalNumber: string) {
  return nationalNumber ? `${callingCode}${nationalNumber}` : undefined;
}

export function maxNationalNumberLength(callingCode: string) {
  return 15 - callingCode.slice(1).length;
}
