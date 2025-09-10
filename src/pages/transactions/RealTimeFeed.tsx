import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, Pause, Play, Settings, Filter, Download, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  sessionId: string;
  timestamp: string;
  name: string;
  userId: string;
  type: string;
  status: string;
  country: string;
  riskScore: number;
  stage: string;
}

const liveTransactions: Transaction[] = [
  {
    id: "txn_live_001",
    sessionId: "sess_98765_001",
    timestamp: "2024-01-22 15:42:33",
    name: "John Smith",
    userId: "usr_98765",
    type: "Full Identity Verification",
    status: "Under Review",
    country: "US",
    riskScore: 25,
    stage: "Document Analysis"
  },
  {
    id: "txn_live_002",
    sessionId: "sess_54321_002", 
    timestamp: "2024-01-22 15:42:31",
    name: "Emma Johnson",
    userId: "usr_54321",
    type: "Age Verification",
    status: "Accepted",
    country: "GB",
    riskScore: 15,
    stage: "Final Review"
  },
  {
    id: "txn_live_003",
    sessionId: "sess_13579_003",
    timestamp: "2024-01-22 15:42:28",
    name: "Hans Mueller",
    userId: "usr_13579",
    type: "OCR", 
    status: "Rejected",
    country: "DE",
    riskScore: 85,
    stage: "Quality Check"
  },
  {
    id: "txn_live_004",
    sessionId: "sess_24680_004",
    timestamp: "2024-01-22 15:42:26",
    name: "Marie Dubois",
    userId: "usr_24680",
    type: "Passive Liveness Check",
    status: "Under Review",
    country: "FR",
    riskScore: 72,
    stage: "Manual Review"
  },
  {
    id: "txn_live_005",
    sessionId: "sess_11223_005",
    timestamp: "2024-01-22 15:42:23",
    name: "Sarah Wilson",
    userId: "usr_11223",
    type: "Full Identity Verification",
    status: "Accepted",
    country: "CA", 
    riskScore: 18,
    stage: "Final Review"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Accepted":
      return <Badge variant="success">Accepted</Badge>;
    case "Under Review":
      return <Badge variant="warning">Under Review</Badge>;
    case "Rejected":
      return <Badge variant="destructive">Rejected</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getRiskColor = (score: number) => {
  if (score < 30) return "text-accent";
  if (score < 70) return "text-yellow-600"; 
  return "text-red-600";
};

export default function RealTimeFeed() {
  const navigate = useNavigate();
  const [isLive, setIsLive] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>(liveTransactions);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // Simulate new transaction
      const names = ["Alex Morgan", "David Chen", "Lisa Garcia", "Michael Brown", "Sophie Anderson", "James Taylor"];
      const userId = Math.floor(Math.random() * 100000);
      const newTransaction: Transaction = {
        id: `txn_live_${Date.now()}`,
        sessionId: `sess_${userId}_${Date.now().toString().slice(-3)}`,
        timestamp: new Date().toLocaleString('sv-SE').replace(' ', ' '),
        name: names[Math.floor(Math.random() * names.length)],
        userId: `usr_${userId}`,
        type: ["Full Identity Verification", "Age Verification", "Passive Liveness Check", "OCR"][Math.floor(Math.random() * 4)],
        status: ["Under Review", "Accepted", "Rejected"][Math.floor(Math.random() * 3)],
        country: ["US", "GB", "DE", "FR", "CA", "AU"][Math.floor(Math.random() * 6)],
        riskScore: Math.floor(Math.random() * 100),
        stage: ["Document Analysis", "Face Match", "Liveness Detection", "Final Review", "Quality Check", "Manual Review"][Math.floor(Math.random() * 6)]
      };
      
      setTransactions(prev => [newTransaction, ...prev.slice(0, 49)]); // Keep up to 50 transactions
    }, 3000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Pagination logic
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);
  const startIndex = (currentPage - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;
  const displayedTransactions = transactions.slice(startIndex, endIndex);

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Reset to first page when new transactions arrive
  useEffect(() => {
    if (autoRefresh && currentPage > 1) {
      setCurrentPage(1);
    }
  }, [transactions.length, autoRefresh]); // Remove currentPage from dependencies to avoid infinite loop

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">Real-time Transaction Feed</h1>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-accent animate-pulse' : 'bg-error'}`} />
            <span className="text-sm text-muted-foreground">{isLive ? 'Live' : 'Paused'}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {setIsLive(!isLive); setAutoRefresh(!autoRefresh);}}
          >
            {isLive ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isLive ? 'Pause' : 'Resume'}
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Transactions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Throughput</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45/min</div>
            <p className="text-xs text-muted-foreground">Transactions per minute</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Queue Depth</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Pending transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1s</div>
            <p className="text-xs text-muted-foreground">Real-time average</p>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Feed Controls</CardTitle>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="identity">Full Identity Verification</SelectItem>
                  <SelectItem value="age">Age Verification</SelectItem>
                  <SelectItem value="liveness">Passive Liveness Check</SelectItem>
                  <SelectItem value="ocr">OCR</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all-status">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-status">All Status</SelectItem>
                  <SelectItem value="under-review">Under Review</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
                <label className="text-sm">Auto-refresh</label>
              </div>
              <div className="flex items-center gap-2">
                <Switch defaultChecked />
                <label className="text-sm">Sound alerts</label>
              </div>
              <div className="flex items-center gap-2">
                <Switch />
                <label className="text-sm">High-risk only</label>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Feed
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transaction List */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction list</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-96 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Last Update</TableHead>
                  <TableHead>Verification type</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Session ID</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedTransactions.map((transaction, index) => (
                  <TableRow 
                    key={transaction.id}
                    className={cn(
                      "cursor-pointer hover:bg-muted/50",
                      index === 0 && autoRefresh && "bg-primary/5",
                      transaction.status === 'Rejected' && "bg-error/10 border-l-4 border-l-error hover:bg-error/15"
                    )}
                    onClick={() => navigate(`/transactions/${transaction.id}`)}
                  >
                    <TableCell className="font-medium">
                      {transaction.timestamp}
                    </TableCell>
                    <TableCell>
                      {transaction.type}
                    </TableCell>
                    <TableCell>
                      {transaction.name}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-sm">{transaction.sessionId}</div>
                        <div className="text-xs text-muted-foreground">{transaction.userId}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(transaction.status)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(endIndex, transactions.length)} of {transactions.length} transactions
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                <div className="flex items-center gap-1">
                  {/* Show page numbers */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => goToPage(pageNum)}
                        className="w-8 h-8 p-0"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                  
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <>
                      <span className="text-muted-foreground">...</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => goToPage(totalPages)}
                        className="w-8 h-8 p-0"
                      >
                        {totalPages}
                      </Button>
                    </>
                  )}
                </div>

                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          <div className="flex justify-center pt-2 text-xs text-muted-foreground">
            Page {currentPage} of {totalPages} • {transactions.length} total transactions
          </div>
        </CardContent>
      </Card>
    </div>
  );
}