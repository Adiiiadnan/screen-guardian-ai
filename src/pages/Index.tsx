import { useRef } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PricingSection from "@/components/PricingSection";
import UploadSection from "@/components/UploadSection";
import RepairShopLocator from "@/components/RepairShopLocator";
import Footer from "@/components/Footer";
const Index = () => {
  const uploadRef = useRef<HTMLElement>(null);

  const scrollToUpload = () => {
    uploadRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection onScrollToUpload={scrollToUpload} />
        <AboutSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <UploadSection ref={uploadRef} />
        <RepairShopLocator />
      </main>
      <Footer />
    </div>
  );
};

export default Index;