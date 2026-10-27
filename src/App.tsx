import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { HeroSection } from "./components/hero/HeroSection";
import { CommunitySection } from "./components/sections/CommunitySection";
import { CommunitySnapshot } from "./components/sections/CommunitySnapshot";
import { JoinCommunitySection } from "./components/sections/JoinCommunitySection";
import { PartnershipSection } from "./components/sections/PartnershipSection";
import { OpportunitiesSection } from "./components/sections/OpportunitiesSection";
import { PastEventsSection } from "./components/sections/PastEventsSection";
import { ResourcesSection } from "./components/sections/ResourcesSection";
import { TeamSection } from "./components/sections/TeamSection";
import { UpcomingEventsSection } from "./components/sections/UpcomingEventsSection";
import { WhatWeDoSection } from "./components/sections/WhatWeDoSection";
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
        <CommunitySnapshot />
        <WhatWeDoSection />
        <UpcomingEventsSection />
        <PastEventsSection />
        <OpportunitiesSection />
        <CommunitySection />
        <TeamSection />
        <ResourcesSection />
        <PartnershipSection />
        <JoinCommunitySection />
      </main>
      <Footer />
    </>
  );
}
