import { Suspense } from "react";
import { DashboardShell, getResearcher } from "@/features/dashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div
          className="grid min-h-screen place-items-center text-[#575757]"
          role="status"
        >
          Loading your dashboard...
        </div>
      }
    >
      <DashboardContent>{children}</DashboardContent>
    </Suspense>
  );
}

async function DashboardContent({ children }: { children: React.ReactNode }) {
  const researcher = await getResearcher();

  return (
    <DashboardShell
      fullName={researcher.fullName}
      hasNotifications={researcher.hasNotifications}
    >
      {children}
    </DashboardShell>
  );
}
