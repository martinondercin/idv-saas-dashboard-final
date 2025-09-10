import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Link2,
  QrCode,
  Trash2,
  Copy,
  Download,
  ChevronDown,
  ChevronUp,
  HelpCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function NoCodeVerification() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentUrl, setCurrentUrl] = useState("https://verify-identity.info/abc123");
  const [isUrlGenerated, setIsUrlGenerated] = useState(true);
  const [usageCount, setUsageCount] = useState(120);
  const [usageLimit, setUsageLimit] = useState(150);
  const [isViewCurrentOpen, setIsViewCurrentOpen] = useState(false);
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);
  
  const usagePercentage = (usageCount / usageLimit) * 100;
  const isLimitReached = usageCount >= usageLimit;

  const generateLink = () => {
    if (isLimitReached) {
      toast({
        title: "Limit Reached",
        description: "You've reached your free trial limit. Please upgrade to continue.",
        variant: "destructive",
      });
      return;
    }
    
    const randomId = Math.random().toString(36).substring(2, 15);
    const newUrl = `https://verify-identity.info/${randomId}`;
    setCurrentUrl(newUrl);
    setIsUrlGenerated(true);
    setIsViewCurrentOpen(true); // Auto-open the collapsible to show the new link
    toast({
      title: "Link & QR Code Generated",
      description: "Your verification link and QR code have been created successfully.",
    });
  };

  const revokeLink = () => {
    setCurrentUrl("");
    setIsUrlGenerated(false);
    setIsViewCurrentOpen(false); // Also close the collapsible when revoking
    toast({
      title: "Link Revoked",
      description: "Your verification link has been disabled. You can now generate a new one.",
    });
  };

  const learnMore = () => {
    setIsLearnMoreOpen(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    toast({
      title: "Copied!",
      description: "URL copied to clipboard.",
    });
  };

  const downloadQR = () => {
    toast({
      title: "QR Code Downloaded",
      description: "QR code has been saved to your device.",
    });
  };

  const contactUs = () => {
    toast({
      title: "Contact",
      description: "Redirecting to contact form...",
    });
  };

  const navigateToApiIntegration = () => {
    navigate("/integration/api-keys");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Banner */}
      <div className="bg-primary text-primary-foreground px-6 py-3">
        <span className="font-medium">No-code free trial</span>
      </div>

      <div className="p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Static Link & QR Code Header */}
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Static Link & QR Code
            </h1>
            <p className="text-muted-foreground">
              Generate a static link and QR code for customer identity verification without technical setup.
            </p>
          </div>

          {/* Usage Progress */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">{usageCount} verifications performed</span>
                {isLimitReached && (
                  <Badge variant="destructive" className="text-xs">
                    ⚠ Limit Achieved
                  </Badge>
                )}
              </div>
              <span className="text-sm text-muted-foreground">{usageLimit} free limit</span>
            </div>
            <Progress value={usagePercentage} className="h-2" />
          </div>

          {/* Success Message */}
          <div className="bg-primary/10 text-primary p-4 rounded-lg border border-primary/20">
            <p className="font-medium">
              You've successfully completed {usageCount} identity verifications with our service.
            </p>
          </div>

          {/* Limit Warning Message - Only show when approaching limit */}
          {usageCount >= usageLimit * 0.8 && !isLimitReached && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg">
              <p className="font-medium">
                You're approaching your free trial limit. You have {usageLimit - usageCount} verifications remaining.
              </p>
            </div>
          )}

          {/* Limit Reached Message - Only show when limit is reached */}
          {isLimitReached && (
            <div className="bg-muted p-4 rounded-lg border">
              <p className="text-foreground">
                Your free trial has reached its limit, but we'd love to help you continue growing. Let's discuss a custom plan that fits your verification volume and business needs.{" "}
                <button
                  onClick={contactUs}
                  className="text-primary hover:underline font-medium"
                >
                  Contact Us
                </button>
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Button
              onClick={generateLink}
              disabled={isUrlGenerated || isLimitReached}
              className="flex items-center gap-2"
            >
              <Link2 className="h-4 w-4" />
              {isUrlGenerated ? "Link Already Generated" : "Generate Link"}
            </Button>
            
            <Button
              onClick={revokeLink}
              disabled={!isUrlGenerated}
              variant="outline"
              className="flex items-center gap-2 text-destructive border-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
              Revoke Link
            </Button>
            
            <Button
              onClick={learnMore}
              variant="outline"
              className="flex items-center gap-2"
            >
              <HelpCircle className="h-4 w-4" />
              Learn More
            </Button>
          </div>

          {/* View Current Link & QR Code */}
          <Collapsible open={isViewCurrentOpen} onOpenChange={setIsViewCurrentOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-primary hover:text-primary/80 p-0"
              >
                {isViewCurrentOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
                View current link & QR code
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="mt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Side - Link and QR Code */}
                <div className="space-y-6">
                  {/* Verification Link */}
                  <div className="bg-card border rounded-lg p-4">
                    <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                      Verification Link
                    </Label>
                    <div className="flex items-center gap-2">
                      <div className="bg-muted p-3 rounded border font-mono text-sm flex-1">
                        {currentUrl}
                      </div>
                      <Button
                        onClick={copyToClipboard}
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-2 flex-shrink-0"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="bg-card border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <Label className="text-sm font-medium text-muted-foreground">
                        Verification QR Code
                      </Label>
                      <Button
                        onClick={downloadQR}
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                    
                    {/* QR Code Display */}
                    <div className="bg-card border-2 border-border rounded p-4 text-center">
                      <div className="w-32 h-32 mx-auto bg-card border rounded flex items-center justify-center">
                        {/* QR Code Pattern */}
                        <div className="grid grid-cols-8 gap-[1px] w-24 h-24">
                          {Array.from({ length: 64 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-full h-full ${
                                Math.random() > 0.5 ? 'bg-foreground' : 'bg-background'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    You can re-use this link or QR code on other websites or channels until it is revoked.
                  </p>
                </div>

                {/* Right Side - No-Code Integration Info */}
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">No-Code Integration</h3>
                  
                  <div className="mb-6">
                    <h4 className="font-medium text-primary mb-2">Simplicity First</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Our no-code solution allows you to implement identity verification without writing a single line of code.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Key Benefits:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        Instant setup with no technical knowledge required
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        Share links via email, SMS or embed in your website
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        QR code support for mobile verification
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        Perfect for small businesses and quick implementations
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* API Integration Section */}
          <div className="bg-muted/50 p-6 rounded-lg border border-border mt-8">
            <p className="text-muted-foreground text-sm mb-4">
              If the no-code is not enough for you, try API Integration
            </p>
            <Button
              onClick={navigateToApiIntegration}
              variant="outline"
              className="flex items-center gap-2"
            >
              API Integration
            </Button>
          </div>
        </div>
      </div>

      {/* Learn More Dialog */}
      <Dialog open={isLearnMoreOpen} onOpenChange={setIsLearnMoreOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">No-Code Integration</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-primary mb-2">Simplicity First</h4>
              <p className="text-sm text-muted-foreground">
                Our no-code solution allows you to implement identity verification without writing a single line of code.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-3">Key Benefits:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Instant setup with no technical knowledge required
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Share links via email, SMS or embed in your website
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  QR code support for mobile verification
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Perfect for small businesses and quick implementations
                </li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}