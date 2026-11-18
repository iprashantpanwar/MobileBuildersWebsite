import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { HeroSection } from "./components/hero/HeroSection";
import { AmbassadorsSection } from "./components/sections/AmbassadorsSection";
import { AboutSection } from "./components/sections/AboutSection";
import { CommunitySection } from "./components/sections/CommunitySection";
import { TopicsTicker } from "./components/sections/TopicsTicker";
import { JoinCommunitySection } from "./components/sections/JoinCommunitySection";
import { PartnersSection } from "./components/sections/PartnersSection";
import { PartnershipSection } from "./components/sections/PartnershipSection";
import { OpportunitiesSection } from "./components/sections/OpportunitiesSection";
import { PastEventsSection } from "./components/sections/PastEventsSection";
import { ResourcesSection } from "./components/sections/ResourcesSection";
import { TeamSection } from "./components/sections/TeamSection";
import { UpcomingEventsSection } from "./components/sections/UpcomingEventsSection";
import { useReveal } from "./hooks/useReveal";

export function App() {
  useReveal();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <HeroSection />
        <TopicsTicker />
        <AboutSection />
        <UpcomingEventsSection />
        <PastEventsSection />
        <OpportunitiesSection />
        <CommunitySection />
        <TeamSection />
        <AmbassadorsSection />
        <ResourcesSection />
        <PartnersSection />
        <PartnershipSection />
        <JoinCommunitySection />
      </main>
      <Footer />
    </>
  );
}
