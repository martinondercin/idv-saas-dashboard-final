import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, User, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const pendingCases = [
  {
    id: "case_001",
    transactionId: "txn_002",
    userId: "user_67890",
    type: "Document Verification",
    assignedTo: "John Doe",
    createdAt: "2024-01-22 14:28:42",
    reason: "Suspicious document features detected"
  },
  {
    id: "case_002",
    transactionId: "txn_005",
    userId: "user_33333",
    type: "Liveness Detection",
    assignedTo: "Sarah Smith",
    createdAt: "2024-01-22 13:45:12",
    reason: "Name mismatch between documents"
  },
  {
    id: "case_003",
    transactionId: "txn_007",
    userId: "user_44444",
    type: "OCR Verification",
    assignedTo: "Mike Johnson",
    createdAt: "2024-01-22 12:30:55",
    reason: "Multiple verification attempts"
  },
];

const completedCases = [
  {
    id: "case_004",
    transactionId: "txn_001",
    resolution: "Approved",
    resolvedBy: "John Doe",
    resolvedAt: "2024-01-22 15:20:30",
    timeToResolve: "45 minutes"
  },
  {
    id: "case_005",
    transactionId: "txn_003",
    resolution: "Rejected",
    resolvedBy: "Sarah Smith",
    resolvedAt: "2024-01-22 14:55:18",
    timeToResolve: "1 hour 20 minutes"
  },
];

const getResolutionBadge = (resolution: string) => {
  switch (resolution) {
    case "Approved":
      return <Badge variant="default">Approved</Badge>;
    case "Rejected":
      return <Badge variant="destructive">Rejected</Badge>;
    default:
      return <Badge variant="secondary">{resolution}</Badge>;
  }
};

export default function CaseManagement() {
  const { toast } = useToast();
  const [cases, setCases] = useState(pendingCases);
  const [escalatedCases, setEscalatedCases] = useState<any[]>([]);

  const handleEscalate = (caseItem: any) => {
    // Move case to escalated cases
    setEscalatedCases(prev => [...prev, {
      ...caseItem,
      escalatedAt: new Date().toLocaleString('sv-SE').replace(' ', ' '),
      escalatedBy: "Current User", // In real app, get from auth context
      supervisorAssigned: "Supervisor Team"
    }]);
    
    // Remove from pending cases
    setCases(prev => prev.filter(c => c.id !== caseItem.id));
    
    // Show success toast
    toast({
      title: "Case Escalated",
      description: `Case ${caseItem.id} has been escalated to supervisor for assessment.`,
    });
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Case Management</h1>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="document">Document Verification</SelectItem>
              <SelectItem value="liveness">Liveness Detection</SelectItem>
              <SelectItem value="ocr">OCR Verification</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Assigned To" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Analysts</SelectItem>
              <SelectItem value="john">John Doe</SelectItem>
              <SelectItem value="sarah">Sarah Smith</SelectItem>
              <SelectItem value="mike">Mike Johnson</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Cases</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">+3 since yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Review</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Currently being reviewed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4h</div>
            <p className="text-xs text-muted-foreground">-15min from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Analysts Active</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">of 12 total</p>
          </CardContent>
        </Card>
      </div>

      {/* Cases Tabs */}
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending Review</TabsTrigger>
          <TabsTrigger value="completed">Completed Cases</TabsTrigger>
          <TabsTrigger value="escalated">Escalated</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Manual Review Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Case ID</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cases.map((case_) => (
                    <TableRow key={case_.id}>
                      <TableCell className="font-mono text-sm">{case_.id}</TableCell>
                      <TableCell className="font-mono text-sm">{case_.transactionId}</TableCell>
                      <TableCell className="font-mono text-sm">{case_.userId}</TableCell>
                      <TableCell>{case_.type}</TableCell>
                      <TableCell>{case_.assignedTo}</TableCell>
                      <TableCell>{case_.createdAt}</TableCell>
                      <TableCell className="max-w-xs truncate">{case_.reason}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Link to={`/transactions/${case_.transactionId}`}>
                            <Button size="sm" variant="default">Review</Button>
                          </Link>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEscalate(case_)}
                          >
                            Escalate
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

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Case ID</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Resolution</TableHead>
                    <TableHead>Resolved By</TableHead>
                    <TableHead>Resolved At</TableHead>
                    <TableHead>Time to Resolve</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedCases.map((case_) => (
                    <TableRow key={case_.id}>
                      <TableCell className="font-mono text-sm">{case_.id}</TableCell>
                      <TableCell className="font-mono text-sm">{case_.transactionId}</TableCell>
                      <TableCell>{getResolutionBadge(case_.resolution)}</TableCell>
                      <TableCell>{case_.resolvedBy}</TableCell>
                      <TableCell>{case_.resolvedAt}</TableCell>
                      <TableCell>{case_.timeToResolve}</TableCell>
                      <TableCell>
                        <Link to={`/transactions/${case_.transactionId}`}>
                          <Button size="sm" variant="ghost">View Details</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="escalated">
          <Card>
            <CardHeader>
              <CardTitle>Escalated Cases</CardTitle>
            </CardHeader>
            <CardContent>
              {escalatedCases.length === 0 ? (
                <div className="text-center py-8">
                  <XCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No escalated cases at the moment</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Case ID</TableHead>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Escalated By</TableHead>
                      <TableHead>Escalated At</TableHead>
                      <TableHead>Supervisor Assigned</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {escalatedCases.map((case_) => (
                      <TableRow key={case_.id}>
                        <TableCell className="font-mono text-sm">{case_.id}</TableCell>
                        <TableCell className="font-mono text-sm">{case_.transactionId}</TableCell>
                        <TableCell>{case_.type}</TableCell>
                        <TableCell>{case_.escalatedBy}</TableCell>
                        <TableCell>{case_.escalatedAt}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{case_.supervisorAssigned}</Badge>
                        </TableCell>
                        <TableCell>
                          <Link to={`/transactions/${case_.transactionId}`}>
                            <Button size="sm" variant="ghost">View Details</Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}