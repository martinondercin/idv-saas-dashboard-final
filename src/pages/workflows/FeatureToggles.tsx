import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  ToggleLeft, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Settings,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
  Users
} from "lucide-react";

const mockFeatures = [
  {
    id: "FT-001",
    name: "Advanced ML Risk Scoring",
    description: "Enhanced machine learning algorithms for risk assessment",
    category: "Risk Management",
    status: "Enabled",
    environment: "Production",
    rollout: 100,
    createdDate: "2024-11-15",
    lastModified: "2024-12-01",
    owner: "Risk Team",
    dependencies: ["Basic Risk Scoring", "ML Pipeline"],
    userSegments: ["Premium Users", "Enterprise"]
  },
  {
    id: "FT-002", 
    name: "Real-time Transaction Blocking",
    description: "Ability to block suspicious transactions in real-time",
    category: "Security",
    status: "Enabled",
    environment: "Production",
    rollout: 75,
    createdDate: "2024-11-20",
    lastModified: "2024-11-28",
    owner: "Security Team",
    dependencies: ["Transaction Processing"],
    userSegments: ["All Users"]
  },
  {
    id: "FT-003",
    name: "Behavioral Analytics Dashboard",
    description: "Advanced user behavior pattern analysis interface",
    category: "Analytics",
    status: "Testing",
    environment: "Staging",
    rollout: 25,
    createdDate: "2024-11-25",
    lastModified: "2024-12-02",
    owner: "Analytics Team",
    dependencies: ["Data Pipeline", "Dashboard Framework"],
    userSegments: ["Internal Users"]
  },
  {
    id: "FT-004",
    name: "Biometric Authentication",
    description: "Fingerprint and facial recognition for secure access",
    category: "Authentication",
    status: "Disabled",
    environment: "Development",
    rollout: 0,
    createdDate: "2024-12-01",
    lastModified: "2024-12-02",
    owner: "Auth Team",
    dependencies: ["Mobile SDK", "Biometric Libraries"],
    userSegments: ["Mobile Users"]
  },
  {
    id: "FT-005",
    name: "Multi-Currency Support",
    description: "Support for multiple currencies in transactions",
    category: "Core Features",
    status: "Enabled",
    environment: "Production",
    rollout: 100,
    createdDate: "2024-10-15",
    lastModified: "2024-11-10",
    owner: "Platform Team",
    dependencies: ["Currency Service", "Exchange Rate API"],
    userSegments: ["International Users"]
  },
  {
    id: "FT-006",
    name: "Automated KYC Verification",
    description: "AI-powered know your customer verification process",
    category: "Compliance",
    status: "Testing",
    environment: "Staging",
    rollout: 50,
    createdDate: "2024-11-30",
    lastModified: "2024-12-02",
    owner: "Compliance Team",
    dependencies: ["KYC Service", "Document Processing"],
    userSegments: ["New Users"]
  }
];

const getStatusBadge = (status: string) => {
  const variants: { [key: string]: { variant: "default" | "secondary" | "destructive" | "outline", color: string } } = {
    "Enabled": { variant: "default", color: "text-accent" },
    "Testing": { variant: "secondary", color: "text-yellow-600" },
    "Disabled": { variant: "outline", color: "text-gray-600" }
  };
  return <Badge variant={variants[status]?.variant || "outline"}>{status}</Badge>;
};

const getEnvironmentBadge = (env: string) => {
  const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
    "Production": "default",
    "Staging": "secondary", 
    "Development": "outline"
  };
  return <Badge variant={variants[env] || "outline"}>{env}</Badge>;
};

export default function FeatureToggles() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedEnvironment, setSelectedEnvironment] = useState("all");

  const filteredFeatures = mockFeatures.filter(feature => {
    const matchesSearch = feature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feature.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || feature.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || feature.status === selectedStatus;
    const matchesEnvironment = selectedEnvironment === "all" || feature.environment === selectedEnvironment;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesEnvironment;
  });

  const stats = {
    totalFeatures: mockFeatures.length,
    enabledFeatures: mockFeatures.filter(f => f.status === "Enabled").length,
    testingFeatures: mockFeatures.filter(f => f.status === "Testing").length,
    averageRollout: Math.round(mockFeatures.reduce((sum, f) => sum + f.rollout, 0) / mockFeatures.length)
  };

  const toggleFeature = (featureId: string) => {
    // This would typically make an API call to toggle the feature
    console.log(`Toggling feature ${featureId}`);
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Feature Toggles</h1>
          <p className="text-muted-foreground">Manage feature rollouts and experimentation</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Global Settings
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Feature Toggle
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Feature Toggle</DialogTitle>
                <DialogDescription>Define a new feature toggle for controlled rollout</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Feature Name</Label>
                  <Input id="name" placeholder="Enter feature name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="risk">Risk Management</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="analytics">Analytics</SelectItem>
                      <SelectItem value="auth">Authentication</SelectItem>
                      <SelectItem value="core">Core Features</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe the feature" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="environment">Environment</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select environment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="staging">Staging</SelectItem>
                      <SelectItem value="production">Production</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner">Owner Team</Label>
                  <Input id="owner" placeholder="Responsible team" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="enabled" />
                  <Label htmlFor="enabled">Enable immediately</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rollout">Initial Rollout %</Label>
                  <Input id="rollout" type="number" min="0" max="100" placeholder="0" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Create Feature</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Features</CardTitle>
            <ToggleLeft className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalFeatures}</div>
            <p className="text-xs text-muted-foreground">Feature toggles active</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enabled</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{stats.enabledFeatures}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Testing</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.testingFeatures}</div>
            <p className="text-xs text-muted-foreground">In testing phase</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rollout</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageRollout}%</div>
            <p className="text-xs text-muted-foreground">User exposure</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="features" className="w-full">
        <TabsList>
          <TabsTrigger value="features">Feature Management</TabsTrigger>
          <TabsTrigger value="rollouts">Rollout Strategy</TabsTrigger>
          <TabsTrigger value="analytics">Usage Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="features" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search features..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Risk Management">Risk Management</SelectItem>
                    <SelectItem value="Security">Security</SelectItem>
                    <SelectItem value="Analytics">Analytics</SelectItem>
                    <SelectItem value="Authentication">Authentication</SelectItem>
                    <SelectItem value="Core Features">Core Features</SelectItem>
                    <SelectItem value="Compliance">Compliance</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Enabled">Enabled</SelectItem>
                    <SelectItem value="Testing">Testing</SelectItem>
                    <SelectItem value="Disabled">Disabled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedEnvironment} onValueChange={setSelectedEnvironment}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Environments</SelectItem>
                    <SelectItem value="Production">Production</SelectItem>
                    <SelectItem value="Staging">Staging</SelectItem>
                    <SelectItem value="Development">Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Features Table */}
          <Card>
            <CardHeader>
              <CardTitle>Feature Toggles</CardTitle>
              <CardDescription>Control feature availability and rollout strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Feature</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Environment</TableHead>
                    <TableHead>Rollout</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFeatures.map((feature) => (
                    <TableRow key={feature.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{feature.name}</div>
                          <div className="text-sm text-muted-foreground">{feature.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>{feature.category}</TableCell>
                      <TableCell>{getStatusBadge(feature.status)}</TableCell>
                      <TableCell>{getEnvironmentBadge(feature.environment)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary transition-all duration-300"
                              style={{ width: `${feature.rollout}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{feature.rollout}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{feature.owner}</TableCell>
                      <TableCell>{feature.lastModified}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Switch
                            checked={feature.status === "Enabled"}
                            onCheckedChange={() => toggleFeature(feature.id)}
                          />
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rollouts" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Rollout Strategies</CardTitle>
                <CardDescription>Configure how features are rolled out to users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Percentage Rollout</div>
                      <div className="text-sm text-muted-foreground">Gradual percentage-based release</div>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">User Segment</div>
                      <div className="text-sm text-muted-foreground">Target specific user groups</div>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Geographic</div>
                      <div className="text-sm text-muted-foreground">Region-based feature access</div>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Rollouts</CardTitle>
                <CardDescription>Features currently being rolled out</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockFeatures.filter(f => f.rollout > 0 && f.rollout < 100).map((feature) => (
                  <div key={feature.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{feature.name}</span>
                      <span className="text-sm">{feature.rollout}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${feature.rollout}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Feature Adoption</CardTitle>
                <CardDescription>Last 30 days</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Active Features:</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>User Engagement:</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Error Rate:</span>
                    <span className="font-medium text-red-600">0.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Impact</CardTitle>
                <CardDescription>Feature performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Avg Response Time:</span>
                    <span className="font-medium">145ms</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Memory Usage:</span>
                    <span className="font-medium">+12MB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>CPU Impact:</span>
                    <span className="font-medium">+3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Feedback</CardTitle>
                <CardDescription>Feature satisfaction</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Positive Feedback:</span>
                    <span className="font-medium text-accent">87%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Feature Requests:</span>
                    <span className="font-medium">23</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Bug Reports:</span>
                    <span className="font-medium text-red-600">5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}