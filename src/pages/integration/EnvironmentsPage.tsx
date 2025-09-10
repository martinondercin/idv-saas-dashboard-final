import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Server, Globe, Shield, Database, Plus, Settings, AlertTriangle } from "lucide-react";

const environments = [
  {
    name: "Production",
    status: "Active",
    region: "us-east-1",
    instances: 8,
    load: 67,
    memory: 45,
    cpu: 23,
    requests: "45.2K/hour",
    errorRate: "0.1%",
    responseTime: "150ms"
  },
  {
    name: "Staging", 
    status: "Active",
    region: "us-west-2",
    instances: 3,
    load: 34,
    memory: 28,
    cpu: 15,
    requests: "8.3K/hour", 
    errorRate: "0.3%",
    responseTime: "180ms"
  },
  {
    name: "Development",
    status: "Active", 
    region: "eu-central-1",
    instances: 2,
    load: 12,
    memory: 18,
    cpu: 8,
    requests: "1.2K/hour",
    errorRate: "1.2%", 
    responseTime: "250ms"
  },
  {
    name: "Testing",
    status: "Maintenance",
    region: "ap-southeast-1", 
    instances: 1,
    load: 5,
    memory: 15,
    cpu: 3,
    requests: "0.3K/hour",
    errorRate: "0%",
    responseTime: "300ms"
  }
];

const databaseConfig = [
  { name: "Primary Database", type: "PostgreSQL", version: "14.2", status: "Connected", connections: "25/100" },
  { name: "Cache Database", type: "Redis", version: "7.0", status: "Connected", connections: "15/50" },
  { name: "Analytics DB", type: "MongoDB", version: "5.0", status: "Connected", connections: "8/20" },
  { name: "Backup Database", type: "PostgreSQL", version: "14.2", status: "Standby", connections: "0/100" }
];

const securitySettings = [
  { name: "API Rate Limiting", description: "Limit requests per minute per IP", enabled: true },
  { name: "DDoS Protection", description: "Advanced protection against attacks", enabled: true },
  { name: "Request Signing", description: "Require signed requests for sensitive operations", enabled: false },
  { name: "IP Whitelisting", description: "Only allow requests from approved IPs", enabled: true },
  { name: "CORS Validation", description: "Validate cross-origin requests", enabled: true },
  { name: "SSL Termination", description: "Force HTTPS for all connections", enabled: true }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Active":
    case "Connected":
      return <Badge variant="default">{status}</Badge>;
    case "Maintenance":
    case "Standby": 
      return <Badge variant="secondary">{status}</Badge>;
    case "Error":
      return <Badge variant="destructive">{status}</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getLoadColor = (load: number) => {
  if (load > 80) return "bg-error";
  if (load > 60) return "bg-warning"; 
  return "bg-accent";
};

export default function EnvironmentsPage() {
  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Environment Settings</h1>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Environment
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create a new deployment environment</p>
            </TooltipContent>
          </Tooltip>
        </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Environments</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">1 in maintenance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Instances</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground">Across 4 regions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">170ms</div>
            <p className="text-xs text-muted-foreground">-20ms from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.2%</div>
            <p className="text-xs text-muted-foreground">Within SLA targets</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="environments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="environments">Environment Status</TabsTrigger>
          <TabsTrigger value="database">Database Config</TabsTrigger>
          <TabsTrigger value="security">Security Settings</TabsTrigger>
          <TabsTrigger value="variables">Environment Variables</TabsTrigger>
        </TabsList>

        <TabsContent value="environments">
          <div className="grid gap-6">
            {environments.map((env) => (
              <Card key={env.name}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {env.name}
                        {getStatusBadge(env.status)}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Region: {env.region} • {env.instances} instances
                      </p>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Configure environment parameters</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-sm font-medium mb-2">CPU Usage</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getLoadColor(env.cpu)}`}
                            style={{ width: `${env.cpu}%` }}
                          ></div>
                        </div>
                        <span className="text-xs">{env.cpu}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Memory Usage</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getLoadColor(env.memory)}`}
                            style={{ width: `${env.memory}%` }}
                          ></div>
                        </div>
                        <span className="text-xs">{env.memory}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Requests/Hour</p>
                      <p className="text-lg font-semibold">{env.requests}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Error Rate</p>
                      <p className="text-lg font-semibold">{env.errorRate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="database">
          <div className="space-y-4">
            {databaseConfig.map((db) => (
              <Card key={db.name}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg">{db.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {db.type} {db.version} • {db.connections} connections
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(db.status)}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Configure database connection</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {securitySettings.map((setting) => (
                <div key={setting.name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{setting.name}</p>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                  <Switch defaultChecked={setting.enabled} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="variables">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Environment Variables</CardTitle>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Variable
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add new environment variable</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="var-name">Variable Name</Label>
                    <Input id="var-name" placeholder="API_BASE_URL" />
                  </div>
                  <div>
                    <Label htmlFor="var-value">Value</Label>
                    <Input id="var-value" placeholder="https://api.example.com" />
                  </div>
                  <div>
                    <Label htmlFor="var-env">Environment</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select environment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="production">Production</SelectItem>
                        <SelectItem value="staging">Staging</SelectItem>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="all">All Environments</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-fit">Add Variable</Button>
              </div>
              
              <div className="space-y-2 pt-4 border-t">
                <h4 className="font-medium">Existing Variables</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-muted rounded">
                    <div>
                      <p className="font-mono text-sm">DATABASE_URL</p>
                      <p className="text-xs text-muted-foreground">Production, Staging</p>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded">
                    <div>
                      <p className="font-mono text-sm">REDIS_HOST</p>
                      <p className="text-xs text-muted-foreground">All Environments</p>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded">
                    <div>
                      <p className="font-mono text-sm">LOG_LEVEL</p>
                      <p className="text-xs text-muted-foreground">Development</p>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </TooltipProvider>
  );
}