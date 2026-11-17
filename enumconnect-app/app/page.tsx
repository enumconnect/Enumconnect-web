import { Navbar } from "@/features/landing/components/Navbar";
import { Hero } from "@/features/landing/components/Hero";
import { AudienceSection } from "@/features/landing/components/AudienceSection";
import { HowEnumWorks } from "@/features/landing/components/HowEnumWorks";
import { WhyChooseEnumConnect } from "@/features/landing/components/WhyChooseEnumConnect";
import { OpenProjects } from "@/features/landing/components/OpenProjects";
import { TrustSection } from "@/features/landing/components/TrustSection";
import { FAQ } from "@/features/landing/components/FAQ";
import { FinalCTA } from "@/features/landing/components/FinalCTA";
import { Footer } from "@/features/landing/components/Footer";
import { FindEnumerators } from "@/features/landing/components/FindEnumerator";
import { FindRightPeople } from "@/features/landing/components/FindRightPeople";

export default function Home() {
  return (
    <div className="bg-white">
      <Navbar />
      <main>
        <Hero />
        <AudienceSection />
        <FindRightPeople/>
        <FindEnumerators />
        <HowEnumWorks />
        <WhyChooseEnumConnect />
        <OpenProjects />
        <TrustSection />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
