import { Suspense } from "react";
import { StatCard, VerifyScreen } from "@/features/auth";

export default function ResearcherVerify({
  searchParams,
}: {
  searchParams: Promise<{ email?: string | string[] }>;
}) {
  return (
    <Suspense fallback={<div role="status" className="grid min-h-screen place-items-center text-[#575757]">Loading verification…</div>}>
      <ResearcherVerifyContent searchParams={searchParams} />
    </Suspense>
  );
}

async function ResearcherVerifyContent({
  searchParams,
}: {
  searchParams: Promise<{ email?: string | string[] }>;
}) {
  const query = await searchParams;
  const email = typeof query.email === "string" ? query.email : "";

  return (
    <VerifyScreen
      role="researcher"
      initialEmail={email}
      next={["Your researcher dashboard opens", "Create your first project", "Choose from enumerators who apply"]}
      content={{
        headline: (
          <>
            Fieldwork without
            <br />
            the WhatsApp hunt.
          </>
        ),
        points: ["Verified enumerators near your sites", "Clear costs before you pay", "Review every response before payout"],
        photo: "/researcher-photo.png",
        card: <StatCard />,
      }}
    />
  );
}