import { Upload, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import aiAutomation from "@/assets/ai-automation.webp";

interface HeroSectionProps {
  onScrollToUpload: () => void;
}

const HeroSection = ({ onScrollToUpload }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">AI-Powered Analysis</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-foreground">Detect Screen</span>
              <br />
              <span className="gradient-text">Damage Instantly</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Upload a photo of your smartphone screen and let our advanced AI analyze cracks, 
              dead pixels, and damage severity in seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                onClick={onScrollToUpload}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 rounded-xl shadow-[0_4px_20px_hsl(175_85%_45%_/_0.3)] hover:shadow-[0_6px_30px_hsl(175_85%_45%_/_0.4)] transition-all duration-300"
              >
                <Upload className="w-5 h-5 mr-2" />
                Start Analysis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-border hover:border-primary/50 hover:bg-primary/5 px-8 py-6 rounded-xl transition-all duration-300"
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start">
              {[
                { value: "99.2%", label: "Accuracy" },
                { value: "<3s", label: "Analysis Time" },
                { value: "10K+", label: "Scans Done" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right content - AI Illustration */}
          <div className="relative flex justify-center">
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75" />
              <img 
                src={aiAutomation} 
                alt="AI Automation" 
                className="relative z-10 w-full max-w-lg drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;