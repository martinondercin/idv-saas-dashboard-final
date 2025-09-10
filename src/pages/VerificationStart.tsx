import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, CheckCircle } from "lucide-react";

type Workflow = {
  id: string;
  name: string;
  description: string;
  steps: string[];
  estimatedTime: string;
  isActive: boolean;
  isDefault: boolean;
  isUpdating?: boolean;
  iconName: string;
};

export default function VerificationStart() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [isStarting, setIsStarting] = useState(false);

  // Load workflows from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('workflows');
    if (saved) {
      try {
        const parsedWorkflows = JSON.parse(saved);
        setWorkflows(parsedWorkflows);
      } catch (error) {
        console.error('Failed to load workflows from localStorage:', error);
      }
    }
  }, []);

  const defaultFlow = workflows.find(w => w.isActive && w.isDefault);

  const handleStartVerification = async () => {
    setIsStarting(true);
    // Mock verification start delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Here you would typically launch the IDV widget or redirect to verification flow
    console.log('Starting verification with flow:', defaultFlow?.name);
    setIsStarting(false);
  };

  if (!defaultFlow) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">No Default Verification Flow</h2>
            <p className="text-muted-foreground mb-4">
              Please contact support or try again later. No active default verification flow is currently configured.
            </p>
            <Button variant="outline" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center pt-8">
          <h1 className="text-3xl font-bold mb-2">Identity Verification</h1>
          <p className="text-muted-foreground">
            Complete your verification to continue
          </p>
        </div>

        {/* Flow Preview */}
        <div className="p-6 bg-muted/30 rounded-lg border">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="h-6 w-6 text-primary" />
            <div>
              <h2 className="text-xl font-semibold">
                You're completing <strong>{defaultFlow.name}</strong>
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="bg-teal-500 text-white border-teal-500">
                  Default Flow
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{defaultFlow.estimatedTime}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">Verification Steps:</p>
            <div className="flex flex-wrap gap-2">
              {defaultFlow.steps.map((step, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {step}
                  </Badge>
                  {index < defaultFlow.steps.length - 1 && (
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            {defaultFlow.description}
          </p>
        </div>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Before You Begin</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">What You'll Need:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Valid government-issued ID</li>
                  <li>• Good lighting</li>
                  <li>• Device camera access</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Tips for Success:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Ensure ID is clearly visible</li>
                  <li>• Remove glasses if requested</li>
                  <li>• Stay centered in frame</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Start Button */}
        <div className="text-center pb-8">
          <Button 
            size="lg" 
            onClick={handleStartVerification}
            disabled={isStarting}
            className="min-w-48"
          >
            {isStarting ? (
              "Starting Verification..."
            ) : (
              <>
                Start Verification
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground mt-3">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}