import React from "react";
import { ThemeProvider } from "@/lib/ThemeContext";
import BackgroundAtmosphere from "@/components/landing/BackgroundAtmosphere";
import RainOverlay from "@/components/landing/RainOverlay";
import SnowOverlay from "@/components/landing/SnowOverlay";
import Navbar from "@/components/landing/Navbar";
import ScrollProgress from "@/components/landing/ScrollProgress";
import HeroSection from "@/components/landing/HeroSection";
import TrustStrip from "@/components/landing/TrustStrip";
import SolutionsSection from "@/components/landing/SolutionsSection";
import WhyMavricSection from "@/components/landing/WhyMavricSection";
import FeaturedWork from "@/components/landing/FeaturedWork";
import TeamSection from "@/components/landing/TeamSection";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import ThemeControlPanel from "@/components/landing/ThemeControlPanel";
import NosotrosSection from "@/components/landing/NosotrosSection";
import WhatsAppFloatingButton from "@/components/landing/WhatsAppFloatingButton";

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
          {/*<TrustStrip />*/}
          <SolutionsSection />
          {/*   <WhyMavricSection /> */}
          <NosotrosSection />
         {/*  <FeaturedWork /> */}
          <TeamSection />
          <FinalCTA />
        </main>
        <Footer />
        <WhatsAppFloatingButton />
      </div>
    </ThemeProvider>
  );
}
