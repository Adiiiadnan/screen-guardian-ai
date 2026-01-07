import { Smartphone, Shield, Zap } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center animate-pulse-glow">
                <Smartphone className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold gradient-text">ScreenScan AI</h1>
              <p className="text-xs text-muted-foreground">Damage Detection System</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#analyze" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Analyze
            </a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Contact Us
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-success font-medium">AI Online</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;