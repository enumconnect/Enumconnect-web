import { Check } from "lucide-react";

function Badge({
  children,
  solid = false,
}: {
  children: React.ReactNode;
  solid?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[14px] font-bold ${
        solid ? "bg-[#2F9D63] text-white" : "bg-[#E3F5EB] text-[#1B6A40]"
      }`}
    >
      <Check size={14} strokeWidth={3} aria-hidden="true" />
      {children}
    </span>
  );
}

type Props = {
  verifiedResearcher: boolean;
  emailVerified: boolean;
};

export function VerifiedBadges({
  verifiedResearcher,
  emailVerified,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {verifiedResearcher && <Badge solid>Verified researcher</Badge>}
      {emailVerified && <Badge>Email verified</Badge>}
    </div>
  );
}
