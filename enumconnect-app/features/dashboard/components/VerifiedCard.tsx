import Link from "next/link";
import { Check } from "lucide-react";
import { routes } from "../lib/routes";

const items = [
  "Email and phone verified",
  "Name, institution, research area",
  "Department and research level",
  "Short bio and profile photo",
];

export function VerifiedCard() {
  return (
    <section className="rounded-[24px] border border-[#BFE3CF] bg-[#E8F5EE] p-6">
      <div className="flex items-center gap-4">
        <span
          className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full bg-[#2F9D63] text-white"
          aria-hidden="true"
        >
          <Check size={26} strokeWidth={3} />
        </span>
        <h2 className="m-0 text-[24px] font-extrabold text-[#1a1a1a]">
          You&apos;re verified
        </h2>
      </div>
      <p className="mb-5 mt-5 text-[16px] leading-[1.6] text-[#424242]">
        Email, phone and profile are complete. Enumerators will see a Verified
        researcher badge on your projects.
      </p>
      <ul className="m-0 grid list-none gap-3.5 p-0">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-3 text-[16px] text-[#424242]"
          >
            <Check
              size={18}
              strokeWidth={3}
              className="shrink-0 text-[#1B6A40]"
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>
      <Link
        href={routes.profile}
        className="mt-6 inline-block text-[16px] font-bold text-[#000080] hover:underline"
      >
        View my profile
      </Link>
    </section>
  );
}
