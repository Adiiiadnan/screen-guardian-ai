import { Users, Target, TrendingUp, Zap, Smartphone, Cpu, Lightbulb, HelpCircle } from "lucide-react";

const aboutItems = [
  {
    icon: Lightbulb,
    title: "Overview",
    description: "ScreenScan AI is an intelligent damage detection platform that uses advanced computer vision to analyze smartphone screens, identifying cracks, dead pixels, and display abnormalities with precision accuracy.",
  },
  {
    icon: Users,
    title: "Client",
    description: "Designed for smartphone users, repair shops, insurance companies, and device resellers who need reliable, instant damage assessments for decision-making and documentation.",
  },
  {
    icon: Target,
    title: "Business Requirement",
    description: "The market demands standardized, unbiased damage evaluation. Manual inspection is subjective and time-consuming. Businesses need automated, consistent reporting for claims processing and pricing.",
  },
  {
    icon: TrendingUp,
    title: "Preferable Outcome",
    description: "Users receive instant severity scores, accurate repair cost estimates, and insurance-ready reports within seconds—transforming hours of work into a 30-second automated workflow.",
  },
  {
    icon: Zap,
    title: "Reduce Manual Effort",
    description: "Eliminates the need for multiple repair shop visits, manual documentation, and subjective assessments. One photo upload replaces the entire traditional inspection process.",
  },
  {
    icon: Smartphone,
    title: "Cross-device Damage Detection",
    description: "Our AI models are trained on thousands of device types—from budget phones to flagship models. Accurate detection across all screen sizes, resolutions, and display technologies.",
  },
  {
    icon: Cpu,
    title: "Phone Make & Model Detection",
    description: "Automatic device identification using image recognition. The system detects your phone's make and model to provide device-specific repair pricing and part availability.",
  },
  {
    icon: Lightbulb,
    title: "Our Solution",
    description: "A comprehensive AI platform combining damage detection, severity scoring, cost estimation, and repair shop matching—all accessible through a simple photo upload interface.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Why ScreenScan AI?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Understanding the problem we solve and why our solution matters.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {aboutItems.map((item, index) => (
            <div
              key={index}
              className="glass-card p-6 rounded-2xl hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why We Need It Section */}
        <div className="glass-card p-8 rounded-2xl border-primary/20">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <HelpCircle className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Why Do We Need This?</h3>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  <strong className="text-foreground">The Problem:</strong> Every year, millions of smartphones suffer screen damage. Users waste hours visiting multiple repair shops, getting inconsistent quotes, and struggling with insurance claims that require proper documentation.
                </p>
                <p>
                  <strong className="text-foreground">The Gap:</strong> There is no standardized way to assess screen damage. Repair costs vary wildly, and insurance companies often dispute claims due to lack of objective evidence.
                </p>
                <p>
                  <strong className="text-foreground">Our Answer:</strong> ScreenScan AI bridges this gap with AI-powered, unbiased damage assessment that benefits everyone—users get fair pricing, repair shops get qualified leads, and insurers get reliable documentation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
