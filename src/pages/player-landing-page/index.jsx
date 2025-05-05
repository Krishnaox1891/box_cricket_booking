import React, { useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import FeaturedVenues from "./components/FeaturedVenues";
import Testimonials from "./components/Testimonials";
import TrustIndicators from "./components/TrustIndicators";
import MobileFilterButton from "./components/MobileFilterButton";
import Footer from "./components/Footer";

const PlayerLandingPage = () => {
  // Set page title
  useEffect(() => {
    document.title = "BoxCricket - Find and Book Box Cricket Venues";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <HowItWorks />
        <FeaturedVenues />
        <TrustIndicators />
        <Testimonials />
        <MobileFilterButton />
      </main>
      <Footer />
    </div>
  );
};

export default PlayerLandingPage;