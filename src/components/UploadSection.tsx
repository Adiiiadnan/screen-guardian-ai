import { useState, useCallback, forwardRef } from "react";
import { Upload, Image, X, Loader2, CheckCircle2, AlertTriangle, Brain, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface AnalysisResult {
  overallScore: number;
  severity: "Low" | "Moderate" | "High" | "Critical";
  classification: string;
  damageTypes: {
    type: string;
    detected: boolean;
    confidence: number;
  }[];
  estimatedCost: string;
  recommendations: string[];
}

const UploadSection = forwardRef<HTMLElement>((_, ref) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setUploadedImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setUploadedImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = async () => {
    if (!uploadedImage) return;
    setIsAnalyzing(true);
    setProgress(0);

    // Animate progress while waiting
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 90 ? 90 : prev + Math.random() * 8));
    }, 300);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-damage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ imageBase64: uploadedImage }),
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Analysis failed");
      }

      const data: AnalysisResult = await response.json();
      clearInterval(interval);
      setProgress(100);
      
      setTimeout(() => {
        setIsAnalyzing(false);
        setResult(data);
      }, 500);
    } catch (error) {
      clearInterval(interval);
      setIsAnalyzing(false);
      setProgress(0);
      toast.error(error instanceof Error ? error.message : "Analysis failed. Please try again.");
    }
  };

  const resetUpload = () => {
    setUploadedImage(null);
    setResult(null);
    setProgress(0);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Low": return "text-success";
      case "Moderate": return "text-warning";
      case "High": return "text-destructive";
      case "Critical": return "text-destructive";
      default: return "text-foreground";
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case "Low": return "bg-success/10 border-success/30";
      case "Moderate": return "bg-warning/10 border-warning/30";
      case "High": return "bg-destructive/10 border-destructive/30";
      case "Critical": return "bg-destructive/10 border-destructive/30";
      default: return "bg-secondary";
    }
  };

  return (
    <section id="analyze" ref={ref} className="py-24 relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-4">
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Powered by AI</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Analyze Your Screen</span>
          </h2>
          <p className="text-muted-foreground">
            Upload a clear image of your smartphone screen — our AI will analyze damage in seconds
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 rounded-3xl"
        >
          <AnimatePresence mode="wait">
            {!uploadedImage ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed border-border hover:border-primary/50 rounded-2xl p-12 text-center transition-colors cursor-pointer group"
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <Upload className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    Drop your image here
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    or click to browse from your device
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports: JPG, PNG, WebP (Max 10MB)
                  </p>
                </label>
              </motion.div>
            ) : (
              <motion.div
                key="analysis"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Uploaded Image Preview */}
                <div className="relative">
                  <div className="relative rounded-2xl overflow-hidden bg-secondary/50">
                    <img
                      src={uploadedImage}
                      alt="Uploaded screen"
                      className="w-full max-h-80 object-contain"
                    />
                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center">
                          <div className="relative">
                            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                            <Sparkles className="w-5 h-5 text-primary absolute top-0 right-1/2 translate-x-8 animate-pulse" />
                          </div>
                          <p className="text-foreground font-medium">AI is analyzing damage...</p>
                          <p className="text-sm text-muted-foreground mt-1">{Math.round(progress)}%</p>
                        </div>
                      </div>
                    )}
                    {isAnalyzing && (
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="scan-line w-full h-1" />
                      </div>
                    )}
                  </div>
                  {!isAnalyzing && !result && (
                    <button
                      onClick={resetUpload}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors"
                    >
                      <X className="w-4 h-4 text-foreground" />
                    </button>
                  )}
                </div>

                {/* Progress Bar */}
                {isAnalyzing && (
                  <div className="space-y-2">
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>AI processing image...</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                  </div>
                )}

                {/* Results */}
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {/* Classification Badge */}
                    <div className="text-center">
                      <div className={`inline-flex items-center gap-2 rounded-full px-5 py-2 border ${getSeverityBg(result.severity)}`}>
                        <AlertTriangle className={`w-4 h-4 ${getSeverityColor(result.severity)}`} />
                        <span className={`font-semibold ${getSeverityColor(result.severity)}`}>
                          {result.classification}
                        </span>
                      </div>
                    </div>

                    {/* Score Overview */}
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-secondary/50 rounded-xl p-4 text-center border border-border/50">
                        <div className="text-3xl font-bold gradient-text">{result.overallScore}</div>
                        <div className="text-xs text-muted-foreground">Damage Score</div>
                      </div>
                      <div className="bg-secondary/50 rounded-xl p-4 text-center border border-border/50">
                        <div className={`text-3xl font-bold ${getSeverityColor(result.severity)}`}>
                          {result.severity}
                        </div>
                        <div className="text-xs text-muted-foreground">Severity Level</div>
                      </div>
                      <div className="bg-secondary/50 rounded-xl p-4 text-center border border-border/50">
                        <div className="text-3xl font-bold text-primary">{result.estimatedCost}</div>
                        <div className="text-xs text-muted-foreground">Est. Repair Cost</div>
                      </div>
                    </div>

                    {/* Damage Types */}
                    <div className="bg-secondary/30 rounded-xl p-5 border border-border/30">
                      <h4 className="font-semibold mb-4 text-foreground flex items-center gap-2">
                        <Brain className="w-4 h-4 text-primary" />
                        AI Detection Results
                      </h4>
                      <div className="space-y-3">
                        {result.damageTypes.map((damage, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              {damage.detected ? (
                                <AlertTriangle className="w-4 h-4 text-warning" />
                              ) : (
                                <CheckCircle2 className="w-4 h-4 text-success" />
                              )}
                              <span className="text-sm text-foreground">{damage.type}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Progress value={damage.confidence} className="w-20 h-1.5" />
                              <span className="text-xs text-muted-foreground w-10">
                                {damage.confidence}%
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="bg-secondary/30 rounded-xl p-5 border border-border/30">
                      <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        AI Recommendations
                      </h4>
                      <ul className="space-y-2">
                        {result.recommendations.map((rec, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            {rec}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                      <Button onClick={resetUpload} variant="outline" className="flex-1">
                        Analyze Another
                      </Button>
                      <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                        Download Report
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Analyze Button */}
                {!isAnalyzing && !result && (
                  <Button
                    onClick={startAnalysis}
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-xl shadow-[var(--shadow-button)] hover:shadow-[0_6px_30px_hsl(var(--primary)_/_0.4)] transition-all duration-300"
                  >
                    <Brain className="w-5 h-5 mr-2" />
                    Start AI Damage Analysis
                  </Button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
});

UploadSection.displayName = "UploadSection";

export default UploadSection;
