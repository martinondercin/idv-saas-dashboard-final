import { KPICard } from "@/components/dashboard/KPICard";
import { TransactionFeed } from "@/components/dashboard/TransactionFeed";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import {
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Users,
  Activity,
  Zap,
  Settings,
} from "lucide-react";
import dashboardHero from "@/assets/dashboard-hero.jpg";

export default function Dashboard() {
  const [currentEnvironment, setCurrentEnvironment] = useState(() => {
    return localStorage.getItem('environment') || 'production';
  });

  useEffect(() => {
    const handleEnvironmentChange = (event: CustomEvent) => {
      setCurrentEnvironment(event.detail);
    };

    // Listen for custom environment change events
    window.addEventListener('environmentChanged', handleEnvironmentChange as EventListener);
    
    return () => {
      window.removeEventListener('environmentChanged', handleEnvironmentChange as EventListener);
    };
  }, []);

  // Different KPI data for sandbox vs production
  const kpiData = currentEnvironment === 'sandbox' ? {
    successRate: { value: "99.8%", change: { value: 0.1, period: "test run", type: "increase" as const } },
    avgProcessingTime: { value: "0.5s", change: { value: 2.1, period: "test run", type: "decrease" as const } },
    manualReviews: { value: "5", change: { value: 0, period: "test run", type: "increase" as const } },
    dailyVolume: { value: "150", change: { value: 25, period: "test run", type: "increase" as const } }
  } : {
    successRate: { value: "94.2%", change: { value: 2.4, period: "last 7 days", type: "increase" as const } },
    avgProcessingTime: { value: "2.3s", change: { value: 0.8, period: "last 7 days", type: "decrease" as const } },
    manualReviews: { value: "127", change: { value: 15.2, period: "last 7 days", type: "increase" as const } },
    dailyVolume: { value: "8,429", change: { value: 8.7, period: "yesterday", type: "increase" as const } }
  };

  // Different system status for environments
  const systemServices = currentEnvironment === 'sandbox' ? [
    { name: "API Gateway", status: "Operational", variant: "accent" as const },
    { name: "OCR Service", status: "Test Mode", variant: "warning" as const },
    { name: "Liveness Detection", status: "Test Mode", variant: "warning" as const },
    { name: "Webhook Delivery", status: "Disabled", variant: "secondary" as const }
  ] : [
    { name: "API Gateway", status: "Operational", variant: "accent" as const },
    { name: "OCR Service", status: "Operational", variant: "accent" as const },
    { name: "Liveness Detection", status: "Degraded", variant: "warning" as const },
    { name: "Webhook Delivery", status: "Operational", variant: "accent" as const }
  ];
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-32 bg-gradient-to-r from-primary via-secondary-vibrant to-primary-light overflow-hidden rounded-lg mb-8">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${dashboardHero})` }}
        />
        <div className="relative h-full flex items-center justify-between px-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Identity Verification Dashboard
            </h1>
            <p className="text-white/90 text-sm">
              Monitor verification activity, manage configurations, and track performance metrics
            </p>
          </div>
          <Badge variant="outline" className="bg-white/10 text-white border-white/20">
            {currentEnvironment === 'sandbox' ? 'Sandbox Environment' : 'Production Environment'}
          </Badge>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Success Rate"
          value={kpiData.successRate.value}
          change={kpiData.successRate.change}
          icon={CheckCircle}
          description="Successful verifications"
        />
        <KPICard
          title="Avg Processing Time"
          value={kpiData.avgProcessingTime.value}
          change={kpiData.avgProcessingTime.change}
          icon={Clock}
          description="End-to-end processing"
        />
        <KPICard
          title="Manual Reviews"
          value={kpiData.manualReviews.value}
          change={kpiData.manualReviews.change}
          icon={AlertTriangle}
          description="Pending manual review"
        />
        <KPICard
          title="Daily Volume"
          value={kpiData.dailyVolume.value}
          change={kpiData.dailyVolume.change}
          icon={TrendingUp}
          description={currentEnvironment === 'sandbox' ? 'Test transactions' : 'Transactions today'}
        />
      </div>

      {/* System Status */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemServices.map((service, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm">{service.name}</span>
              <Badge className={`bg-${service.variant}/10 text-${service.variant}`}>
                {service.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Transaction Feed */}
      <TransactionFeed />
    </div>
  );
}