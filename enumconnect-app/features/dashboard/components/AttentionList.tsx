import Link from "next/link";
import type { AttentionItem, AttentionKind } from "@/features/dashboard/type";

const tone: Record<AttentionKind, string> = {
  review: "bg-[#FDF1E1]",
  flag: "bg-[#FBEAEA]",
  applications: "bg-[#E3F2FF]",
};

export function AttentionList({ items }: { items: AttentionItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="rounded-[24px] border border-[#D9DEE8] bg-white p-6">
      <h2 className="m-0 text-[22px] font-extrabold text-[#1a1a1a]">
        Needs your attention
      </h2>
      <ul className="m-0 mt-5 grid list-none gap-4 p-0">
        {items.map((item) => (
          <li key={item.id} className={`rounded-2xl p-5 ${tone[item.kind]}`}>
            <h3 className="m-0 text-[17px] font-bold text-[#1a1a1a]">
              {item.title}
            </h3>
            <p className="m-0 mt-1 text-[14px] text-[#575757]">{item.detail}</p>
            <Link
              href={item.href}
              className="mt-2 inline-block text-[16px] font-bold text-[#000080] hover:underline"
            >
              {item.actionLabel} <span aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
