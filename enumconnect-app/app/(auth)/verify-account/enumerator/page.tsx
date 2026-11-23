import { Suspense } from "react";
import { VerifyScreen } from "@/features/auth";

export default function EnumeratorVerify({
  searchParams,
}: {
  searchParams: Promise<{ email?: string | string[] }>;
}) {
  return (
    <Suspense fallback={<div role="status" className="grid min-h-screen place-items-center text-[#575757]">Loading verification…</div>}>
      <EnumeratorVerifyContent searchParams={searchParams} />
    </Suspense>
  );
}

async function EnumeratorVerifyContent({
  searchParams,
}: {
  searchParams: Promise<{ email?: string | string[] }>;
}) {
  const query = await searchParams;
  const email = typeof query.email === "string" ? query.email : "";

  return (
    <VerifyScreen
      role="enumerator"
      initialEmail={email}
      next={["Add your ID, skills and languages", "Complete the short training", "Apply for projects once verified"]}
    />
  );
}