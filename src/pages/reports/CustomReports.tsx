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
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  FileText, 
  Plus, 
  Search, 
  Filter,
  Download,
  Edit,
  Trash2,
  Calendar as CalendarIcon,
  BarChart3,
  PieChart,
  TrendingUp,
  Clock,
  Eye
} from "lucide-react";
import { format } from "date-fns";

const mockReports = [
  {
    id: "RPT-001",
    name: "Monthly Fraud Detection Summary",
    description: "Comprehensive monthly overview of fraud detection activities",
    type: "Fraud Analysis",
    format: "PDF",
    schedule: "Monthly",
    lastGenerated: "2024-12-01",
    nextRun: "2025-01-01",
    status: "Active",
    recipients: ["fraud-team@company.com", "manager@company.com"],
    filters: {
      dateRange: "Last 30 days",
      riskLevel: "All",
      amount: "> $1,000"
    }
  },
  {
    id: "RPT-002",
    name: "High-Risk Transaction Report", 
    description: "Daily report of high-risk transactions requiring review",
    type: "Risk Assessment",
    format: "Excel",
    schedule: "Daily",
    lastGenerated: "2024-12-04",
    nextRun: "2024-12-05",
    status: "Active",
    recipients: ["security@company.com"],
    filters: {
      dateRange: "Yesterday",
      riskLevel: "High",
      amount: "All"
    }
  },
  {
    id: "RPT-003",
    name: "User Behavior Analytics",
    description: "Weekly analysis of user transaction patterns and behaviors",
    type: "User Analytics",
    format: "Dashboard",
    schedule: "Weekly",
    lastGenerated: "2024-11-30",
    nextRun: "2024-12-07",
    status: "Active",
    recipients: ["analytics@company.com", "product@company.com"],
    filters: {
      dateRange: "Last 7 days",
      riskLevel: "All",
      userSegment: "Active Users"
    }
  },
  {
    id: "RPT-004",
    name: "Compliance Audit Trail",
    description: "Quarterly compliance report for regulatory requirements",
    type: "Compliance",
    format: "PDF",
    schedule: "Quarterly",
    lastGenerated: "2024-10-01",
    nextRun: "2025-01-01", 
    status: "Active",
    recipients: ["compliance@company.com", "legal@company.com"],
    filters: {
      dateRange: "Last Quarter",
      includeAuditLogs: true,
      includeDecisionLogs: true
    }
  },
  {
    id: "RPT-005",
    name: "Transaction Volume Trends",
    description: "Analysis of transaction volume patterns and trends",
    type: "Business Intelligence",
    format: "Chart",
    schedule: "Weekly",
    lastGenerated: "2024-12-02",
    nextRun: "2024-12-09",
    status: "Draft",
    recipients: ["business@company.com"],
    filters: {
      dateRange: "Last 30 days",
      groupBy: "Daily",
      includeComparison: true
    }
  }
];

const reportTemplates = [
  {
    id: "TPL-001",
    name: "Fraud Detection Summary",
    description: "Standard fraud detection metrics and KPIs",
    category: "Security",
    fields: ["Transaction Count", "Fraud Rate", "False Positive Rate", "Risk Scores"],
    charts: ["Line Chart", "Bar Chart", "Pie Chart"]
  },
  {
    id: "TPL-002", 
    name: "Transaction Analysis",
    description: "Detailed transaction metrics and trends",
    category: "Business",
    fields: ["Volume", "Success Rate", "Processing Time", "Geographic Data"],
    charts: ["Time Series", "Heatmap", "Bar Chart"]
  },
  {
    id: "TPL-003",
    name: "User Engagement Report",
    description: "User activity and engagement metrics",
    category: "Analytics",
    fields: ["Active Users", "Session Duration", "Feature Usage", "Retention"],
    charts: ["Funnel Chart", "Cohort Analysis", "Line Chart"]
  },
  {
    id: "TPL-004",
    name: "Risk Assessment Report",
    description: "Risk scoring and assessment overview",
    category: "Risk",
    fields: ["Risk Distribution", "Score Accuracy", "Model Performance", "Trends"],
    charts: ["Distribution Chart", "ROC Curve", "Confusion Matrix"]
  }
];

const getStatusBadge = (status: string) => {
  const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
    "Active": "default",
    "Draft": "secondary",
    "Disabled": "outline"
  };
  return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
};

const getTypeBadge = (type: string) => {
  const colors: { [key: string]: string } = {
    "Fraud Analysis": "bg-red-100 text-red-800",
    "Risk Assessment": "bg-orange-100 text-orange-800",
    "User Analytics": "bg-blue-100 text-blue-800",
    "Compliance": "bg-purple-100 text-purple-800",
    "Business Intelligence": "bg-accent/10 text-accent"
  };
  return (
    <Badge className={colors[type] || "bg-gray-100 text-gray-800"}>
      {type}
    </Badge>
  );
};

export default function CustomReports() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [date, setDate] = useState<Date>();

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || report.type === selectedType;
    const matchesStatus = selectedStatus === "all" || report.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    totalReports: mockReports.length,
    activeReports: mockReports.filter(r => r.status === "Active").length,
    scheduledToday: mockReports.filter(r => r.nextRun === "2024-12-04").length,
    templates: reportTemplates.length
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Custom Reports</h1>
          <p className="text-muted-foreground">Create, manage, and schedule custom reports</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Import Template
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create Report
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Custom Report</DialogTitle>
                <DialogDescription>Design a new report with custom fields and scheduling</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="reportName">Report Name</Label>
                  <Input id="reportName" placeholder="Enter report name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reportType">Report Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fraud">Fraud Analysis</SelectItem>
                      <SelectItem value="risk">Risk Assessment</SelectItem>
                      <SelectItem value="user">User Analytics</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                      <SelectItem value="business">Business Intelligence</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" placeholder="Report description" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="format">Output Format</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="dashboard">Interactive Dashboard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schedule">Schedule</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Manual</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-3">
                  <Label>Data Fields</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Transaction ID", "Amount", "Risk Score", "User ID", "Timestamp", "Status", "Location", "Payment Method"].map((field) => (
                      <div key={field} className="flex items-center space-x-2">
                        <Checkbox id={field} />
                        <Label htmlFor={field} className="text-sm">{field}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-2 space-y-3">
                  <Label>Chart Types</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Line Chart", "Bar Chart", "Pie Chart", "Heatmap", "Time Series", "Distribution"].map((chart) => (
                      <div key={chart} className="flex items-center space-x-2">
                        <Checkbox id={chart} />
                        <Label htmlFor={chart} className="text-sm">{chart}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Save as Template</Button>
                <Button variant="outline">Cancel</Button>
                <Button>Create Report</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReports}</div>
            <p className="text-xs text-muted-foreground">Custom reports created</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Reports</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeReports}</div>
            <p className="text-xs text-muted-foreground">Currently scheduled</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Today</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.scheduledToday}</div>
            <p className="text-xs text-muted-foreground">Reports to generate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Templates</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.templates}</div>
            <p className="text-xs text-muted-foreground">Available templates</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="reports" className="w-full">
        <TabsList>
          <TabsTrigger value="reports">My Reports</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reports" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search reports..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Fraud Analysis">Fraud Analysis</SelectItem>
                    <SelectItem value="Risk Assessment">Risk Assessment</SelectItem>
                    <SelectItem value="User Analytics">User Analytics</SelectItem>
                    <SelectItem value="Compliance">Compliance</SelectItem>
                    <SelectItem value="Business Intelligence">Business Intelligence</SelectItem>
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
                    <SelectItem value="Disabled">Disabled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Reports Table */}
          <Card>
            <CardHeader>
              <CardTitle>Custom Reports</CardTitle>
              <CardDescription>Manage your personalized report configurations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Generated</TableHead>
                    <TableHead>Next Run</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{report.name}</div>
                          <div className="text-sm text-muted-foreground">{report.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getTypeBadge(report.type)}</TableCell>
                      <TableCell>{report.format}</TableCell>
                      <TableCell>{report.schedule}</TableCell>
                      <TableCell>{getStatusBadge(report.status)}</TableCell>
                      <TableCell>{report.lastGenerated}</TableCell>
                      <TableCell>{report.nextRun}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
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

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportTemplates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {template.name}
                    <Badge>{template.category}</Badge>
                  </CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Included Fields:</h4>
                    <div className="flex flex-wrap gap-1">
                      {template.fields.map((field) => (
                        <Badge key={field} variant="outline" className="text-xs">
                          {field}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Chart Options:</h4>
                    <div className="flex flex-wrap gap-1">
                      {template.charts.map((chart) => (
                        <Badge key={chart} variant="secondary" className="text-xs">
                          {chart}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full">Use Template</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Report Runs</CardTitle>
              <CardDescription>Upcoming automated report generations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockReports.filter(r => r.status === "Active").map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="font-medium">{report.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {report.schedule} • Next: {report.nextRun}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTypeBadge(report.type)}
                      <Button variant="outline" size="sm">
                        Run Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}