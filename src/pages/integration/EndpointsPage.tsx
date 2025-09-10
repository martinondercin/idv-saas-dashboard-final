import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Globe, Server, Settings, Plus, Edit, Trash2, Activity } from "lucide-react";
import { useState } from "react";

const endpoints = [
  {
    id: "ep_001",
    name: "Document Verification",
    url: "/api/v1/verify/document", 
    method: "POST",
    status: "Active",
    rateLimit: "1000/min",
    avgResponseTime: "2.3s",
    successRate: "98.5%",
    requests24h: 15420
  },
  {
    id: "ep_002", 
    name: "Face Verification",
    url: "/api/v1/verify/face",
    method: "POST", 
    status: "Active",
    rateLimit: "500/min",
    avgResponseTime: "1.8s",
    successRate: "97.2%",
    requests24h: 8930
  },
  {
    id: "ep_003",
    name: "Liveness Check", 
    url: "/api/v1/verify/liveness",
    method: "POST",
    status: "Maintenance",
    rateLimit: "200/min", 
    avgResponseTime: "3.1s",
    successRate: "94.8%",
    requests24h: 2340
  },
  {
    id: "ep_004",
    name: "Transaction Status",
    url: "/api/v1/transaction/{id}",
    method: "GET",
    status: "Active", 
    rateLimit: "2000/min",
    avgResponseTime: "0.5s", 
    successRate: "99.9%",
    requests24h: 45670
  }
];

const environments = [
  {
    name: "Production",
    baseUrl: "https://api.verifyid.com",
    status: "Online",
    version: "v1.2.3", 
    uptime: "99.9%",
    region: "US East",
    tls: true
  },
  {
    name: "Staging", 
    baseUrl: "https://staging-api.verifyid.com",
    status: "Online",
    version: "v1.3.0-beta",
    uptime: "99.5%", 
    region: "US West",
    tls: true
  },
  {
    name: "Development",
    baseUrl: "https://dev-api.verifyid.com", 
    status: "Online",
    version: "v1.4.0-alpha",
    uptime: "95.2%",
    region: "EU Central",
    tls: true
  },
  {
    name: "Sandbox",
    baseUrl: "https://sandbox-api.verifyid.com",
    status: "Offline", 
    version: "v1.1.0",
    uptime: "0%",
    region: "Local",
    tls: false
  }
];

const rateLimits = [
  { endpoint: "Document Verification", current: 850, limit: 1000, period: "per minute" },
  { endpoint: "Face Verification", current: 320, limit: 500, period: "per minute" }, 
  { endpoint: "Liveness Check", current: 45, limit: 200, period: "per minute" },
  { endpoint: "Transaction Status", current: 1200, limit: 2000, period: "per minute" }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Active":
    case "Online":
      return <Badge variant="default">{status}</Badge>;
    case "Maintenance": 
      return <Badge variant="secondary">{status}</Badge>;
    case "Offline":
      return <Badge variant="destructive">{status}</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default function EndpointsPage() {
  const [isNewEndpointDialogOpen, setIsNewEndpointDialogOpen] = useState(false);
  const [newEndpointData, setNewEndpointData] = useState({
    verifiedUrl: "",
    rejectedUrl: "",
    unverifiedUrl: "",
    callbackUrl: "",
    logoUrl: ""
  });

  const handleCreateEndpoint = () => {
    // Here you would typically make an API call to create the endpoint
    console.log("Creating new endpoint:", newEndpointData);
    setIsNewEndpointDialogOpen(false);
    setNewEndpointData({ 
      verifiedUrl: "",
      rejectedUrl: "",
      unverifiedUrl: "",
      callbackUrl: "",
      logoUrl: ""
    });
  };

  const handleGenerateCredentials = () => {
    // Generate API credentials logic here
    console.log("Generating API credentials...");
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Endpoint Configuration</h1>
          <Dialog open={isNewEndpointDialogOpen} onOpenChange={setIsNewEndpointDialogOpen}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Endpoint
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create a new API endpoint configuration</p>
              </TooltipContent>
            </Tooltip>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>API Integration Setup</DialogTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Configure your integration endpoints and generate secure API credentials for identity verification
                </p>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="verified-url" className="flex items-center gap-2">
                      Verified URL
                      <Tooltip>
                        <TooltipTrigger>
                          <span className="h-4 w-4 rounded-full bg-muted flex items-center justify-center text-xs">?</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>URL where successful verification results are sent</p>
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                    <Input
                      id="verified-url"
                      placeholder="https://yourdomain.com/verification/success"
                      value={newEndpointData.verifiedUrl}
                      onChange={(e) => setNewEndpointData({ ...newEndpointData, verifiedUrl: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rejected-url" className="flex items-center gap-2">
                      Rejected URL
                      <Tooltip>
                        <TooltipTrigger>
                          <span className="h-4 w-4 rounded-full bg-muted flex items-center justify-center text-xs">?</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>URL where failed verification results are sent</p>
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                    <Input
                      id="rejected-url"
                      placeholder="https://yourdomain.com/verification/failed"
                      value={newEndpointData.rejectedUrl}
                      onChange={(e) => setNewEndpointData({ ...newEndpointData, rejectedUrl: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unverified-url" className="flex items-center gap-2">
                      Unverified URL
                      <Tooltip>
                        <TooltipTrigger>
                          <span className="h-4 w-4 rounded-full bg-muted flex items-center justify-center text-xs">?</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>URL where pending verification results are sent</p>
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                    <Input
                      id="unverified-url"
                      placeholder="https://yourdomain.com/verification/pending"
                      value={newEndpointData.unverifiedUrl}
                      onChange={(e) => setNewEndpointData({ ...newEndpointData, unverifiedUrl: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="callback-url" className="flex items-center gap-2">
                      Callback URL
                      <Tooltip>
                        <TooltipTrigger>
                          <span className="h-4 w-4 rounded-full bg-muted flex items-center justify-center text-xs">?</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Webhook endpoint for real-time verification updates</p>
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                    <Input
                      id="callback-url"
                      placeholder="https://yourdomain.com/api/webhook/verification"
                      value={newEndpointData.callbackUrl}
                      onChange={(e) => setNewEndpointData({ ...newEndpointData, callbackUrl: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="logo-url" className="flex items-center gap-2">
                      Logo URL
                      <Tooltip>
                        <TooltipTrigger>
                          <span className="h-4 w-4 rounded-full bg-muted flex items-center justify-center text-xs">?</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>URL to your company logo for verification screens</p>
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                    <Input
                      id="logo-url"
                      placeholder="https://yourdomain.com/assets/logo.png"
                      value={newEndpointData.logoUrl}
                      onChange={(e) => setNewEndpointData({ ...newEndpointData, logoUrl: e.target.value })}
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium">API Credentials</h3>
                      <p className="text-sm text-muted-foreground">Generate secure API keys after URL validation</p>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={handleGenerateCredentials}
                      disabled={!newEndpointData.verifiedUrl || !newEndpointData.callbackUrl}
                      className="bg-accent/10 border-accent text-accent hover:bg-accent/20"
                    >
                      Generate API Credentials
                    </Button>
                  </div>
                  
                  {(!newEndpointData.verifiedUrl || !newEndpointData.callbackUrl) && (
                    <div className="flex items-center gap-2 p-3 bg-warning/10 border border-warning/20 rounded-md">
                      <span className="text-warning">⚠</span>
                      <span className="text-sm text-warning">Complete URL validation to enable credential generation</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsNewEndpointDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateEndpoint} 
                  disabled={!newEndpointData.verifiedUrl && !newEndpointData.rejectedUrl && !newEndpointData.unverifiedUrl && !newEndpointData.callbackUrl}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Save Configuration
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Endpoints</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Across 4 environments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Endpoints</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground">83% operational</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.9s</div>
            <p className="text-xs text-muted-foreground">-0.2s from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Requests Today</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72.3K</div>
            <p className="text-xs text-muted-foreground">+15% from yesterday</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="endpoints" className="space-y-4">
        <TabsList>
          <TabsTrigger value="endpoints">API Endpoints</TabsTrigger>
          <TabsTrigger value="environments">Environments</TabsTrigger>
          <TabsTrigger value="rate-limits">Rate Limits</TabsTrigger>
        </TabsList>

        <TabsContent value="endpoints">
          <Card>
            <CardHeader>
              <CardTitle>API Endpoints</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Endpoint Name</TableHead>
                    <TableHead>URL Path</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Rate Limit</TableHead>
                    <TableHead>Avg Response</TableHead>
                    <TableHead>Success Rate</TableHead>
                    <TableHead>Requests (24h)</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {endpoints.map((endpoint) => (
                    <TableRow key={endpoint.id}>
                      <TableCell className="font-medium">{endpoint.name}</TableCell>
                      <TableCell className="font-mono text-sm">{endpoint.url}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{endpoint.method}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(endpoint.status)}</TableCell>
                      <TableCell>{endpoint.rateLimit}</TableCell>
                      <TableCell>{endpoint.avgResponseTime}</TableCell>
                      <TableCell>{endpoint.successRate}</TableCell>
                      <TableCell>{endpoint.requests24h.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit endpoint configuration</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Settings className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Configure endpoint settings</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="environments">
          <div className="grid gap-4">
            {environments.map((env) => (
              <Card key={env.name}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {env.name}
                        {getStatusBadge(env.status)}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {env.baseUrl}
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
                        <p>Configure environment settings</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm font-medium">Version</p>
                      <p className="text-sm text-muted-foreground">{env.version}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Uptime</p>
                      <p className="text-sm text-muted-foreground">{env.uptime}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Region</p>
                      <p className="text-sm text-muted-foreground">{env.region}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">TLS Enabled</p>
                      <Switch checked={env.tls} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rate-limits">
          <Card>
            <CardHeader>
              <CardTitle>Current Rate Limit Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {rateLimits.map((limit) => (
                <div key={limit.endpoint} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{limit.endpoint}</span>
                    <span className="text-sm text-muted-foreground">
                      {limit.current} / {limit.limit} {limit.period}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        (limit.current / limit.limit) > 0.8 ? 'bg-destructive' :
                        (limit.current / limit.limit) > 0.6 ? 'bg-yellow-500' :
                        'bg-primary'
                      }`}
                      style={{ width: `${(limit.current / limit.limit) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {((limit.current / limit.limit) * 100).toFixed(1)}% of limit used
                  </p>
                </div>
              ))}
              
              <div className="pt-4 border-t">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      Adjust Rate Limits
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Modify rate limiting rules</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </TooltipProvider>
  );
}