import { Check, Zap, Shield, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Basic",
    icon: Zap,
    price: "Free",
    period: "",
    description: "Perfect for occasional screen checks",
    features: [
      "3 analyses per month",
      "Basic damage detection",
      "Standard report",
      "Email support",
    ],
    buttonText: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    icon: Shield,
    price: "$9.99",
    period: "/month",
    description: "For regular device maintenance",
    features: [
      "Unlimited analyses",
      "Advanced AI detection",
      "Detailed repair estimates",
      "Priority support",
      "Repair shop recommendations",
      "History & tracking",
    ],
    buttonText: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    icon: Crown,
    price: "$49.99",
    period: "/month",
    description: "For repair shops & businesses",
    features: [
      "Everything in Pro",
      "API access",
      "Bulk analysis",
      "White-label reports",
      "Dedicated account manager",
      "Custom integrations",
      "Team collaboration",
    ],
    buttonText: "Contact Sales",
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Pricing Plans
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Choose Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              {" "}Analysis Plan
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From casual users to repair professionals, we have a plan that fits your needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative glass-card border-border/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                plan.popular
                  ? "border-primary/50 shadow-lg shadow-primary/20"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div
                  className={`w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                    plan.popular
                      ? "bg-primary/20"
                      : "bg-muted"
                  }`}
                >
                  <plan.icon
                    className={`w-7 h-7 ${
                      plan.popular ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="text-center pb-6">
                <div className="mb-6">
                  <span className="text-5xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>

                <ul className="space-y-3 text-left">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-muted-foreground text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                  }`}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            All plans include a 14-day money-back guarantee.{" "}
            <a href="#" className="text-primary hover:underline">
              Compare all features
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
