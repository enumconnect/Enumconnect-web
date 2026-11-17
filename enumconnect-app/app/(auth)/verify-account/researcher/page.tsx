import { StatCard } from "@/features/auth/components/AuthShell";
import { VerifyScreen } from "@/features/auth/components/VerifyScreen";;

export default function ResearcherVerify() {
  return (
    <VerifyScreen
      name="Chiamaka"
      phone="+234 801 234 5678"
      email="chiamaka.okafor@unn.edu.ng"
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