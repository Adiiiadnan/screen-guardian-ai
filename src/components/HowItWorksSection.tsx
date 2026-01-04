import { Upload, Cpu, FileText, ArrowRight } from "lucide-react";
import crackedScreen from "@/assets/cracked-screen.webp";
import screenScanning from "@/assets/screen-scanning.webp";
import damageReport from "@/assets/damage-report.webp";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Image",
    description: "Take a clear photo of your smartphone screen and upload it to our system.",
  },
  {
    number: "02",
    icon: Cpu,
    title: "AI Analysis",
    description: "Our deep learning model analyzes the image for cracks, dead pixels, and defects.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Get Report",
    description: "Receive a detailed damage report with severity score and repair recommendations.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">How It Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get your screen analyzed in three simple steps
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-6 group">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <div className="text-xs text-primary font-mono mb-1">{step.number}</div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block w-5 h-5 text-primary/30 absolute right-0 top-1/2 transform translate-x-full" />
                )}
              </div>
            ))}
          </div>

          {/* Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="glass-card p-2 rounded-2xl overflow-hidden">
                  <img 
                    src={crackedScreen} 
                    alt="Cracked Screen Example" 
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <div className="p-3">
                    <div className="text-xs text-muted-foreground">Step 1</div>
                    <div className="text-sm font-medium text-foreground">Upload Image</div>
                  </div>
                </div>
                <div className="glass-card p-2 rounded-2xl overflow-hidden">
                  <img 
                    src={damageReport} 
                    alt="Damage Report Dashboard" 
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <div className="p-3">
                    <div className="text-xs text-muted-foreground">Step 3</div>
                    <div className="text-sm font-medium text-foreground">Get Report</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="glass-card p-2 rounded-2xl overflow-hidden">
                  <img 
                    src={screenScanning} 
                    alt="AI Screen Scanning" 
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <div className="p-3">
                    <div className="text-xs text-muted-foreground">Step 2</div>
                    <div className="text-sm font-medium text-foreground">AI Analysis</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative glow */}
            <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;