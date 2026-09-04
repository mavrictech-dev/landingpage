import React, { Suspense, lazy } from "react";
import { ThemeProvider } from "@/lib/ThemeContext";
import BackgroundAtmosphere from "@/components/landing/BackgroundAtmosphere";
import RainOverlay from "@/components/landing/RainOverlay";
import SnowOverlay from "@/components/landing/SnowOverlay";
import Navbar from "@/components/landing/Navbar";
import ScrollProgress from "@/components/landing/ScrollProgress";
import HeroSection from "@/components/landing/HeroSection";
import SolutionsSection from "@/components/landing/SolutionsSection";
import ThemeControlPanel from "@/components/landing/ThemeControlPanel";
import WhatsAppFloatingButton from "@/components/landing/WhatsAppFloatingButton";
import PromoFloatingBanner from "@/components/landing/PromoFloatingBanner";

// Lazy loaded components (below the fold)
const NosotrosSection = lazy(() => import("@/components/landing/NosotrosSection"));
const FeaturedWork = lazy(() => import("@/components/landing/FeaturedWork"));
const TeamSection = lazy(() => import("@/components/landing/TeamSection"));
const FinalCTA = lazy(() => import("@/components/landing/FinalCTA"));
const Footer = lazy(() => import("@/components/landing/Footer"));
const SurveyEntryNotification = lazy(() => import("@/components/landing/SurveyEntryNotification"));

export default function Landing() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen overflow-x-hidden">
        <BackgroundAtmosphere />
        <RainOverlay />
        <SnowOverlay />
        <Navbar />
        <ScrollProgress />
        <ThemeControlPanel />
        
        <main>
          <HeroSection />
          <SolutionsSection />
          
          <Suspense fallback={<div className="min-h-[200px]" />}>
            <NosotrosSection />
            <FeaturedWork />
            <TeamSection />
            <FinalCTA />
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
          <SurveyEntryNotification />
        </Suspense>

        <WhatsAppFloatingButton />
        <PromoFloatingBanner />
      </div>
    </ThemeProvider>
  );
}
