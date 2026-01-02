import { useRef } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import UploadSection from "@/components/UploadSection";
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
        <FeaturesSection />
        <HowItWorksSection />
        <UploadSection ref={uploadRef} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;