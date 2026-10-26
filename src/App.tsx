import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { HeroSection } from "./components/hero/HeroSection";
import { CommunitySection } from "./components/sections/CommunitySection";
import { CommunitySnapshot } from "./components/sections/CommunitySnapshot";
import { JoinCommunitySection } from "./components/sections/JoinCommunitySection";
import { PartnershipSection } from "./components/sections/PartnershipSection";
import { PastEventsSection } from "./components/sections/PastEventsSection";
import { ResourcesSection } from "./components/sections/ResourcesSection";
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
        <CommunitySection />
        <ResourcesSection />
        <PartnershipSection />
        <JoinCommunitySection />
      </main>
      <Footer />
    </>
  );
}
