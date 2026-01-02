import { useState, useCallback, forwardRef } from "react";
import { Upload, Image, X, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface AnalysisResult {
  overallScore: number;
  severity: "Low" | "Moderate" | "High" | "Critical";
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

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setProgress(0);
    
    // Simulate analysis progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setResult({
            overallScore: 72,
            severity: "Moderate",
            damageTypes: [
              { type: "Hairline Cracks", detected: true, confidence: 94 },
              { type: "Shattered Glass", detected: false, confidence: 12 },
              { type: "Dead Pixels", detected: true, confidence: 67 },
              { type: "Black Spots", detected: false, confidence: 8 },
              { type: "Discoloration", detected: true, confidence: 45 },
            ],
            estimatedCost: "$50 - $120",
            recommendations: [
              "Screen replacement recommended",
              "Touch functionality may be affected",
              "Suggest visiting certified repair center",
            ],
          });
          return 100;
        }
        return prev + 2;
      });
    }, 50);
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

  return (
    <section id="analyze" ref={ref} className="py-24 relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Analyze Your Screen</span>
          </h2>
          <p className="text-muted-foreground">
            Upload a clear image of your smartphone screen to begin damage analysis
          </p>
        </div>

        <div className="glass-card p-8 rounded-3xl">
          {!uploadedImage ? (
            <div
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
            </div>
          ) : (
            <div className="space-y-6">
              {/* Uploaded Image Preview */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden bg-secondary/50">
                  <img
                    src={uploadedImage}
                    alt="Uploaded screen"
                    className="w-full max-h-80 object-contain"
                  />
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <div className="text-center">
                        <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                        <p className="text-foreground font-medium">Analyzing damage...</p>
                        <p className="text-sm text-muted-foreground">{progress}%</p>
                      </div>
                    </div>
                  )}
                  {/* Scan line effect */}
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
                    <span>Processing image...</span>
                    <span>{progress}%</span>
                  </div>
                </div>
              )}

              {/* Results */}
              {result && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  {/* Score Overview */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-secondary/50 rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold gradient-text">{result.overallScore}</div>
                      <div className="text-xs text-muted-foreground">Damage Score</div>
                    </div>
                    <div className="bg-secondary/50 rounded-xl p-4 text-center">
                      <div className={`text-3xl font-bold ${getSeverityColor(result.severity)}`}>
                        {result.severity}
                      </div>
                      <div className="text-xs text-muted-foreground">Severity Level</div>
                    </div>
                    <div className="bg-secondary/50 rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold text-primary">{result.estimatedCost}</div>
                      <div className="text-xs text-muted-foreground">Est. Repair Cost</div>
                    </div>
                  </div>

                  {/* Damage Types */}
                  <div className="bg-secondary/30 rounded-xl p-5">
                    <h4 className="font-semibold mb-4 text-foreground">Damage Detection Results</h4>
                    <div className="space-y-3">
                      {result.damageTypes.map((damage, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {damage.detected ? (
                              <AlertTriangle className="w-4 h-4 text-warning" />
                            ) : (
                              <CheckCircle2 className="w-4 h-4 text-success" />
                            )}
                            <span className="text-sm text-foreground">{damage.type}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Progress 
                              value={damage.confidence} 
                              className="w-20 h-1.5" 
                            />
                            <span className="text-xs text-muted-foreground w-10">
                              {damage.confidence}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-secondary/30 rounded-xl p-5">
                    <h4 className="font-semibold mb-3 text-foreground">Recommendations</h4>
                    <ul className="space-y-2">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <Button 
                      onClick={resetUpload}
                      variant="outline"
                      className="flex-1"
                    >
                      Analyze Another
                    </Button>
                    <Button 
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Download Report
                    </Button>
                  </div>
                </div>
              )}

              {/* Analyze Button */}
              {!isAnalyzing && !result && (
                <Button
                  onClick={startAnalysis}
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-xl shadow-[0_4px_20px_hsl(175_85%_45%_/_0.3)] hover:shadow-[0_6px_30px_hsl(175_85%_45%_/_0.4)] transition-all duration-300"
                >
                  <Image className="w-5 h-5 mr-2" />
                  Start Damage Analysis
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

UploadSection.displayName = "UploadSection";

export default UploadSection;