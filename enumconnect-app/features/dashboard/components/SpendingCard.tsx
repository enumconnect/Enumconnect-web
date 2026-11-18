import Link from "next/link";
import { formatNaira } from "../lib/money";
import { routes } from "../lib/routes";
import type { DashboardSummary } from "../type";

export function SpendingCard({
  spending,
}: {
  spending: DashboardSummary["spending"];
}) {
  const paidIn =
    spending.paidToEnumerators + spending.waitingApproval + spending.serviceFee;
  const rows = [
    ["Paid in", paidIn],
    ["Paid to enumerators", spending.paidToEnumerators],
    ["Waiting for your approval", spending.waitingApproval],
    ["Service fee", spending.serviceFee],
  ] as const;

  return (
    <section className="rounded-[24px] border border-[#D9DEE8] bg-white p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="m-0 text-[22px] font-extrabold text-[#1a1a1a]">
          Spending
        </h2>
        <Link
          href={routes.payments}
          className="text-[15px] font-bold text-[#000080] hover:underline"
        >
          See all payments
        </Link>
      </div>
      <dl className="m-0 mt-5 grid gap-4">
        {rows.map(([label, amount]) => (
          <div key={label} className="flex items-center justify-between gap-4">
            <dt className="text-[16px] text-[#575757]">{label}</dt>
            <dd className="m-0 text-[16px] font-bold text-[#1a1a1a]">
              {formatNaira(amount)}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mb-0 mt-5 border-t border-[#E4E8F0] pt-4 text-[14px] text-[#575757]">
        Enumerators are paid when you approve their work.
      </p>
    </section>
  );
}
