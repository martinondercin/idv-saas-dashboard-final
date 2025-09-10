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
import { Progress } from "@/components/ui/progress";
import { 
  Download, 
  Plus, 
  Search, 
  FileText,
  Database,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Trash2,
  Filter,
  Archive,
  Upload
} from "lucide-react";
import { format } from "date-fns";

const mockExports = [
  {
    id: "EXP-001",
    name: "Fraud Transactions Q4 2024",
    type: "Transaction Data",
    format: "Excel",
    size: "15.2 MB",
    status: "Completed",
    progress: 100,
    requestedBy: "john.doe@company.com",
    requestedAt: "2024-12-04 09:30:00",
    completedAt: "2024-12-04 09:35:22",
    expiresAt: "2024-12-11 09:35:22",
    filters: {
      dateRange: "2024-10-01 to 2024-12-31",
      riskLevel: "High",
      amount: "> $1,000"
    },
    recordCount: 2847
  },
  {
    id: "EXP-002",
    name: "User Activity Report",
    type: "User Data",
    format: "CSV", 
    size: "8.7 MB",
    status: "In Progress",
    progress: 65,
    requestedBy: "jane.smith@company.com",
    requestedAt: "2024-12-04 10:15:00",
    completedAt: null,
    expiresAt: null,
    filters: {
      dateRange: "Last 30 days",
      userType: "Active Users",
      includeMetadata: true
    },
    recordCount: 15420
  },
  {
    id: "EXP-003",
    name: "Risk Scoring Model Data",
    type: "Analytics Data",
    format: "JSON",
    size: "45.8 MB",
    status: "Failed",
    progress: 0,
    requestedBy: "data.team@company.com",
    requestedAt: "2024-12-04 08:00:00",
    completedAt: null,
    expiresAt: null,
    filters: {
      dateRange: "Last 6 months",
      includeFeatures: true,
      includeScores: true
    },
    recordCount: 0,
    errorMessage: "Database connection timeout"
  },
  {
    id: "EXP-004", 
    name: "Compliance Audit Data",
    type: "Compliance Data",
    format: "PDF",
    size: "12.3 MB",
    status: "Completed",
    progress: 100,
    requestedBy: "compliance@company.com", 
    requestedAt: "2024-12-03 16:45:00",
    completedAt: "2024-12-03 16:50:15",
    expiresAt: "2024-12-10 16:50:15",
    filters: {
      dateRange: "Q3 2024",
      includeDecisionLogs: true,
      includeUserActions: true
    },
    recordCount: 8932
  },
  {
    id: "EXP-005",
    name: "Geographic Transaction Analysis", 
    type: "Transaction Data",
    format: "Excel",
    size: "22.1 MB",
    status: "Queued",
    progress: 0,
    requestedBy: "analytics@company.com",
    requestedAt: "2024-12-04 11:00:00",
    completedAt: null,
    expiresAt: null,
    filters: {
      dateRange: "Last 90 days",
      groupBy: "Country",
      includeRiskData: true
    },
    recordCount: 0
  }
];

const exportTemplates = [
  {
    id: "TPL-001",
    name: "Transaction Export",
    description: "Standard transaction data export",
    fields: ["Transaction ID", "Amount", "Status", "Risk Score", "Timestamp", "User ID"],
    formats: ["CSV", "Excel", "JSON"]
  },
  {
    id: "TPL-002",
    name: "User Activity Export", 
    description: "User behavior and activity data",
    fields: ["User ID", "Login Time", "Actions", "Location", "Device Info"],
    formats: ["CSV", "Excel"]
  },
  {
    id: "TPL-003",
    name: "Risk Analysis Export",
    description: "Risk scoring and analysis data",
    fields: ["Transaction ID", "Risk Score", "Factors", "Model Version", "Decision"],
    formats: ["JSON", "Excel", "CSV"]
  },
  {
    id: "TPL-004",
    name: "Compliance Report Export",
    description: "Regulatory compliance data",
    fields: ["Audit ID", "User", "Action", "Result", "Timestamp", "Compliance Status"],
    formats: ["PDF", "Excel", "CSV"]
  }
];

const getStatusBadge = (status: string) => {
  const variants: { [key: string]: { variant: "default" | "secondary" | "destructive" | "outline", icon: React.ReactNode } } = {
    "Completed": { variant: "default", icon: <CheckCircle className="h-3 w-3" /> },
    "In Progress": { variant: "secondary", icon: <RefreshCw className="h-3 w-3 animate-spin" /> },
    "Queued": { variant: "outline", icon: <Clock className="h-3 w-3" /> },
    "Failed": { variant: "destructive", icon: <AlertCircle className="h-3 w-3" /> }
  };
  
  const statusConfig = variants[status] || variants["Queued"];
  
  return (
    <Badge variant={statusConfig.variant} className="flex items-center gap-1">
      {statusConfig.icon}
      {status}
    </Badge>
  );
};

const getTypeColor = (type: string) => {
  const colors: { [key: string]: string } = {
    "Transaction Data": "bg-blue-100 text-blue-800",
    "User Data": "bg-accent/10 text-accent", 
    "Analytics Data": "bg-purple-100 text-purple-800",
    "Compliance Data": "bg-orange-100 text-orange-800"
  };
  return colors[type] || "bg-gray-100 text-gray-800";
};

export default function ExportCenter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedFormat, setSelectedFormat] = useState("all");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const filteredExports = mockExports.filter(exportItem => {
    const matchesSearch = exportItem.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || exportItem.type === selectedType;
    const matchesStatus = selectedStatus === "all" || exportItem.status === selectedStatus;
    const matchesFormat = selectedFormat === "all" || exportItem.format === selectedFormat;
    
    return matchesSearch && matchesType && matchesStatus && matchesFormat;
  });

  const stats = {
    totalExports: mockExports.length,
    completed: mockExports.filter(e => e.status === "Completed").length,
    inProgress: mockExports.filter(e => e.status === "In Progress").length,
    failed: mockExports.filter(e => e.status === "Failed").length
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Export Center</h1>
          <p className="text-muted-foreground">Export and download your data in various formats</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Archive className="h-4 w-4 mr-2" />
            Bulk Export
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Export
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Export</DialogTitle>
                <DialogDescription>Configure your data export settings</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="exportName">Export Name</Label>
                  <Input id="exportName" placeholder="Enter export name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataType">Data Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select data type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="transactions">Transaction Data</SelectItem>
                      <SelectItem value="users">User Data</SelectItem>
                      <SelectItem value="analytics">Analytics Data</SelectItem>
                      <SelectItem value="compliance">Compliance Data</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Date Range</Label>
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="flex-1">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          {startDate ? format(startDate, "PPP") : "Start Date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                        />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="flex-1">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          {endDate ? format(endDate, "PPP") : "End Date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="format">Export Format</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="excel">Excel (XLSX)</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-3">
                  <Label>Data Fields to Include</Label>
                  <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                    {["Transaction ID", "Amount", "Risk Score", "User ID", "Timestamp", "Status", "Location", "Payment Method", "Metadata", "Decision Logs"].map((field) => (
                      <div key={field} className="flex items-center space-x-2">
                        <Checkbox id={field} defaultChecked />
                        <Label htmlFor={field} className="text-sm">{field}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Save as Template</Button>
                <Button variant="outline">Cancel</Button>
                <Button>Start Export</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Exports</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalExports}</div>
            <p className="text-xs text-muted-foreground">All time exports</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">Ready for download</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
            <p className="text-xs text-muted-foreground">Currently processing</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="exports" className="w-full">
        <TabsList>
          <TabsTrigger value="exports">Export History</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Exports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="exports" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search exports..."
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
                    <SelectItem value="Transaction Data">Transaction Data</SelectItem>
                    <SelectItem value="User Data">User Data</SelectItem>
                    <SelectItem value="Analytics Data">Analytics Data</SelectItem>
                    <SelectItem value="Compliance Data">Compliance Data</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Queued">Queued</SelectItem>
                    <SelectItem value="Failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Formats</SelectItem>
                    <SelectItem value="CSV">CSV</SelectItem>
                    <SelectItem value="Excel">Excel</SelectItem>
                    <SelectItem value="JSON">JSON</SelectItem>
                    <SelectItem value="PDF">PDF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Exports Table */}
          <Card>
            <CardHeader>
              <CardTitle>Export History</CardTitle>
              <CardDescription>Track your data export requests and downloads</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Export Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Requested</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExports.map((exportItem) => (
                    <TableRow key={exportItem.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{exportItem.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {exportItem.recordCount > 0 ? `${exportItem.recordCount.toLocaleString()} records` : ""}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(exportItem.type)}>
                          {exportItem.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{exportItem.format}</TableCell>
                      <TableCell>{getStatusBadge(exportItem.status)}</TableCell>
                      <TableCell>
                        {exportItem.status === "In Progress" ? (
                          <div className="space-y-1">
                            <Progress value={exportItem.progress} className="w-20" />
                            <div className="text-xs text-muted-foreground">{exportItem.progress}%</div>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            {exportItem.status === "Completed" ? "100%" : "-"}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{exportItem.size || "-"}</TableCell>
                      <TableCell>{exportItem.requestedAt}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {exportItem.status === "Completed" && (
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                          {exportItem.status === "Failed" && (
                            <Button variant="ghost" size="sm">
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          )}
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
            {exportTemplates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <CardTitle>{template.name}</CardTitle>
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
                    <h4 className="text-sm font-medium mb-2">Available Formats:</h4>
                    <div className="flex flex-wrap gap-1">
                      {template.formats.map((format) => (
                        <Badge key={format} variant="secondary" className="text-xs">
                          {format}
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
              <CardTitle>Scheduled Exports</CardTitle>
              <CardDescription>Automated export tasks and recurring data downloads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Scheduled Exports</h3>
                <p className="text-muted-foreground mb-4">
                  Set up automated exports to receive data regularly
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Export
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}