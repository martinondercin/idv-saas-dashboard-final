import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { 
  Play, 
  Pause, 
  Clock, 
  CheckCircle,
  Shield,
  Eye,
  FileText,
  Zap,
  Settings
} from "lucide-react";

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

// Icon mapping to avoid serialization issues
const iconMap = {
  "Shield": Shield,
  "CheckCircle": CheckCircle,
  "FileText": FileText,
  "Eye": Eye,
  "Settings": Settings,
};

const initialWorkflows: Workflow[] = [
  {
    id: "full-kyc",
    name: "Full Identity Verification",
    description: "Complete identity verification with document capture, selfie, and liveness detection",
    iconName: "Shield",
    steps: ["Document capture", "Document validation", "Selfie", "Face match", "Liveness check"],
    estimatedTime: "60-90 seconds",
    isActive: true,
    isDefault: true
  },
  {
    id: "age-verification",
    name: "Age Verification Flow", 
    description: "Quick age verification starting with selfie analysis and optional document check",
    iconName: "CheckCircle",
    steps: ["Selfie capture", "Age estimation", "Document verification (if needed)"],
    estimatedTime: "30-45 seconds",
    isActive: true,
    isDefault: false
  },
  {
    id: "ocr-document",
    name: "OCR Document Reading",
    description: "Extract and validate document information for form auto-filling and data extraction",
    iconName: "FileText",
    steps: ["Document capture", "OCR text extraction", "Data validation"],
    estimatedTime: "15-30 seconds",
    isActive: false,
    isDefault: false
  },
  {
    id: "liveness-only",
    name: "Liveness Check Only",
    description: "Quick liveness detection for user authentication and session verification",
    iconName: "Eye",
    steps: ["Selfie capture", "Liveness detection"],
    estimatedTime: "10-15 seconds",
    isActive: true,
    isDefault: false
  },
  {
    id: "kyc-compliance",
    name: "KYC Compliance Flow",
    description: "Full regulatory compliance verification with AML screening and watchlist checks",
    iconName: "Settings",
    steps: ["Identity verification", "AML screening", "Watchlist check", "Compliance review"],
    estimatedTime: "2-3 minutes",
    isActive: false,
    isDefault: false
  }
];

const WorkflowCard = ({ workflow, onToggle, onSetDefault }: { workflow: Workflow, onToggle: (id: string, newState: boolean) => void, onSetDefault: (id: string) => void }) => {
  const Icon = iconMap[workflow.iconName as keyof typeof iconMap] || Settings; // Fallback to Settings icon
  
  const getStatusColor = () => {
    return workflow.isActive ? "text-green-600" : "text-gray-500";
  };
  
  const getStatusText = () => {
    return workflow.isActive ? "Active" : "Not Active";
  };
  
  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-lg">{workflow.name}</h3>
                  {workflow.isDefault && (
                    <Badge className="bg-teal-500 hover:bg-teal-500 text-white border-0 font-medium">
                      Default
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{workflow.description}</p>
              </div>
            </div>
            <div className={`text-sm font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Workflow Steps:</p>
            <div className="flex flex-wrap gap-1">
              {workflow.steps.map((step: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {step}
                </Badge>
              ))}
            </div>
          </div>

          {/* Time */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Estimated time: {workflow.estimatedTime}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-3">
              <Switch 
                checked={workflow.isActive}
                disabled={workflow.isUpdating}
                onCheckedChange={(checked) => onToggle(workflow.id, checked)}
              />
              <span className="text-sm">Active</span>
            </div>
            
            <div className="flex items-center gap-2">
              {workflow.isActive && !workflow.isDefault && (
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => onSetDefault(workflow.id)}
                >
                  Set as Default
                </Button>
              )}
              <Button 
                variant={workflow.isActive ? "default" : "secondary"}
                size="sm"
                disabled={workflow.isUpdating}
                onClick={() => onToggle(workflow.id, !workflow.isActive)}
              >
                {workflow.isUpdating ? (
                  "Updating..."
                ) : workflow.isActive ? (
                  <>
                    <Pause className="h-3 w-3 mr-1" />
                    Deactivate Flow
                  </>
                ) : (
                  <>
                    <Zap className="h-3 w-3 mr-1" />
                    Activate Flow
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function WorkflowSettings() {
  const [workflows, setWorkflows] = useState<Workflow[]>(initialWorkflows);
  const { toast } = useToast();

  // Load workflows from localStorage on component mount
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

  // Save workflows to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('workflows', JSON.stringify(workflows));
  }, [workflows]);

  const handleToggle = async (id: string, newState: boolean) => {
    // Set updating state
    setWorkflows(prev =>
      prev.map(w => w.id === id ? { ...w, isUpdating: true } : w)
    );

    // Mock API call with delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Update workflow state - if deactivating the default, remove default status
    setWorkflows(prev =>
      prev.map(w =>
        w.id === id ? { 
          ...w, 
          isActive: newState, 
          isDefault: newState ? w.isDefault : false, 
          isUpdating: false 
        } : w
      )
    );

    const workflow = workflows.find(w => w.id === id);
    toast({
      title: `Workflow ${newState ? 'Activated' : 'Deactivated'}`,
      description: `${workflow?.name} has been ${newState ? 'activated' : 'deactivated'} successfully.`,
      variant: newState ? "default" : "destructive",
    });
  };

  const handleSetDefault = (id: string) => {
    setWorkflows(prev =>
      prev.map(w => ({ ...w, isDefault: w.id === id }))
    );

    const workflow = workflows.find(w => w.id === id);
    toast({
      title: "Default Workflow Set",
      description: `${workflow?.name} has been set as the default workflow.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Verification Workflows</h1>
          <p className="text-muted-foreground mt-1">Manage your identity verification flows</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {workflows.map((workflow) => (
          <WorkflowCard 
            key={workflow.id} 
            workflow={workflow} 
            onToggle={handleToggle}
            onSetDefault={handleSetDefault}
          />
        ))}
      </div>
    </div>
  );
}