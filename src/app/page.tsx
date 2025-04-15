"use client";

import CTASection from "@/components/landing-page/cta-section/cta-section";
import FeaturesSection from "@/components/landing-page/feature-section/feature-section";
import Footer from "@/components/landing-page/footer/footer";
import HeroSection from "@/components/landing-page/hero-section/hero-section";
import Navbar from "@/components/landing-page/nav-bar/nav-bar";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </>
  );
}
