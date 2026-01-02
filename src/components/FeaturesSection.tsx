import { Scan, Target, BarChart3, MapPin, Cpu, Shield } from "lucide-react";

const features = [
  {
    icon: Scan,
    title: "Crack Detection",
    description: "Advanced segmentation identifies hairline cracks, spider webs, and shattered glass patterns.",
  },
  {
    icon: Target,
    title: "Dead Pixel Detection",
    description: "Precisely locates dead pixels, black spots, and display abnormalities on your screen.",
  },
  {
    icon: BarChart3,
    title: "Severity Scoring",
    description: "Get a detailed severity score from 0-100 based on damage extent and type.",
  },
  {
    icon: MapPin,
    title: "Repair Shop Locator",
    description: "Find nearby certified repair shops with estimated costs based on your damage report.",
  },
  {
    icon: Cpu,
    title: "AI-Powered Analysis",
    description: "Deep learning models trained on thousands of damaged screens for accurate detection.",
  },
  {
    icon: Shield,
    title: "Insurance Ready",
    description: "Generate detailed reports suitable for insurance claims and warranty processing.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Powerful Features</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI system provides comprehensive damage analysis with industry-leading accuracy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass-card p-6 rounded-2xl hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;