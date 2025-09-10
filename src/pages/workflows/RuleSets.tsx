import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  AlertCircle,
  CheckCircle,
  Clock,
  Copy
} from "lucide-react";

const mockRuleSets = [
  {
    id: "RS-001",
    name: "High Value Transaction Rules",
    description: "Rules for transactions over $10,000",
    category: "Amount Based",
    status: "Active",
    rules: 15,
    lastModified: "2024-12-01",
    priority: "High",
    conditions: [
      "Transaction amount > $10,000",
      "User account age < 30 days",
      "New payment method"
    ],
    actions: ["Manual Review", "Additional Verification", "Risk Score +50"]
  },
  {
    id: "RS-002",
    name: "Geographic Anomaly Detection",
    description: "Detect unusual location patterns",
    category: "Location Based",
    status: "Active",
    rules: 8,
    lastModified: "2024-11-28",
    priority: "Medium",
    conditions: [
      "Location different from usual pattern",
      "IP geolocation mismatch",
      "VPN/Proxy detected"
    ],
    actions: ["Flag Transaction", "SMS Verification", "Risk Score +30"]
  },
  {
    id: "RS-003",
    name: "Velocity Checks",
    description: "Monitor transaction frequency patterns",
    category: "Behavioral",
    status: "Active",
    rules: 12,
    lastModified: "2024-11-30",
    priority: "High",
    conditions: [
      "More than 5 transactions in 1 hour",
      "Total daily amount > $50,000",
      "Multiple failed attempts"
    ],
    actions: ["Temporary Block", "Manual Review", "Risk Score +75"]
  },
  {
    id: "RS-004",
    name: "Device Fingerprinting",
    description: "Track device and browser patterns",
    category: "Device Based",
    status: "Draft",
    rules: 6,
    lastModified: "2024-12-02",
    priority: "Low",
    conditions: [
      "New device detected",
      "Browser fingerprint mismatch",
      "Suspicious user agent"
    ],
    actions: ["Device Verification", "Risk Score +20"]
  },
  {
    id: "RS-005",
    name: "Known Fraud Patterns",
    description: "Detect patterns from fraud database",
    category: "Pattern Matching",
    status: "Inactive",
    rules: 20,
    lastModified: "2024-11-25",
    priority: "Critical",
    conditions: [
      "Email in fraud database",
      "Phone number blacklisted",
      "Card BIN flagged"
    ],
    actions: ["Immediate Block", "Fraud Investigation", "Risk Score +100"]
  }
];

const getStatusBadge = (status: string) => {
  const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
    "Active": "default",
    "Draft": "secondary",
    "Inactive": "outline"
  };
  return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
};

const getPriorityBadge = (priority: string) => {
  const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
    "Critical": "destructive",
    "High": "destructive",
    "Medium": "secondary",
    "Low": "outline"
  };
  return <Badge variant={variants[priority] || "outline"}>{priority}</Badge>;
};

export default function RuleSets() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredRuleSets = mockRuleSets.filter(ruleSet => {
    const matchesSearch = ruleSet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ruleSet.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || ruleSet.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || ruleSet.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const stats = {
    totalRuleSets: mockRuleSets.length,
    activeRuleSets: mockRuleSets.filter(r => r.status === "Active").length,
    totalRules: mockRuleSets.reduce((sum, r) => sum + r.rules, 0),
    lastUpdate: "2024-12-02"
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Rule Sets Management</h1>
          <p className="text-muted-foreground">Configure and manage fraud detection rules</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Import Rules
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Rule Set
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Rule Set</DialogTitle>
                <DialogDescription>Define a new set of fraud detection rules</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Rule Set Name</Label>
                  <Input id="name" placeholder="Enter rule set name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="amount">Amount Based</SelectItem>
                      <SelectItem value="location">Location Based</SelectItem>
                      <SelectItem value="behavioral">Behavioral</SelectItem>
                      <SelectItem value="device">Device Based</SelectItem>
                      <SelectItem value="pattern">Pattern Matching</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" placeholder="Describe the rule set purpose" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="active" />
                  <Label htmlFor="active">Activate immediately</Label>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Create Rule Set</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rule Sets</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRuleSets}</div>
            <p className="text-xs text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rules</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeRuleSets}</div>
            <p className="text-xs text-muted-foreground">Currently monitoring</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rules</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRules}</div>
            <p className="text-xs text-muted-foreground">Individual conditions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Update</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Today</div>
            <p className="text-xs text-muted-foreground">{stats.lastUpdate}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Rule Sets Overview</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search rule sets..."
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
                    <SelectItem value="Amount Based">Amount Based</SelectItem>
                    <SelectItem value="Location Based">Location Based</SelectItem>
                    <SelectItem value="Behavioral">Behavioral</SelectItem>
                    <SelectItem value="Device Based">Device Based</SelectItem>
                    <SelectItem value="Pattern Matching">Pattern Matching</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Rule Sets Table */}
          <Card>
            <CardHeader>
              <CardTitle>Rule Sets</CardTitle>
              <CardDescription>Manage your fraud detection rule configurations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rule Set</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Rules</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRuleSets.map((ruleSet) => (
                    <TableRow key={ruleSet.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{ruleSet.name}</div>
                          <div className="text-sm text-muted-foreground">{ruleSet.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>{ruleSet.category}</TableCell>
                      <TableCell>{getStatusBadge(ruleSet.status)}</TableCell>
                      <TableCell>{getPriorityBadge(ruleSet.priority)}</TableCell>
                      <TableCell>{ruleSet.rules}</TableCell>
                      <TableCell>{ruleSet.lastModified}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Copy className="h-4 w-4" />
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

        <TabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {["Amount Based", "Location Based", "Behavioral", "Device Based", "Pattern Matching"].map((category) => {
              const categoryRules = mockRuleSets.filter(r => r.category === category);
              const activeCount = categoryRules.filter(r => r.status === "Active").length;
              
              return (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="text-lg">{category}</CardTitle>
                    <CardDescription>{categoryRules.length} rule sets</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Active:</span>
                        <span className="font-medium">{activeCount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Total Rules:</span>
                        <span className="font-medium">
                          {categoryRules.reduce((sum, r) => sum + r.rules, 0)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Rule Performance Metrics</CardTitle>
                <CardDescription>Last 30 days</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Rules Triggered:</span>
                    <span className="font-medium">2,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span>True Positives:</span>
                    <span className="font-medium text-accent">1,923</span>
                  </div>
                  <div className="flex justify-between">
                    <span>False Positives:</span>
                    <span className="font-medium text-red-600">924</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Accuracy Rate:</span>
                    <span className="font-medium">67.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Rules</CardTitle>
                <CardDescription>Highest accuracy rates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockRuleSets.slice(0, 3).map((ruleSet, index) => (
                  <div key={ruleSet.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{ruleSet.name}</div>
                      <div className="text-xs text-muted-foreground">{ruleSet.category}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-sm">{95 - index * 3}%</div>
                      <div className="text-xs text-muted-foreground">accuracy</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}