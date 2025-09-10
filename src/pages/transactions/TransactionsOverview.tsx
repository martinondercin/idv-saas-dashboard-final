import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const transactions = [
  { 
    id: "txn_001", 
    userId: "user_12345", 
    type: "Full Identity Verification", 
    status: "Completed", 
    riskScore: 12, 
    amount: "$0.50", 
    timestamp: "2024-01-22 14:30:15",
    country: "US"
  },
  { 
    id: "txn_002", 
    userId: "user_67890", 
    type: "OCR", 
    status: "Under Review", 
    riskScore: 78, 
    amount: "$0.75", 
    timestamp: "2024-01-22 14:28:42",
    country: "GB"
  },
  { 
    id: "txn_003", 
    userId: "user_11111", 
    type: "Passive Liveness Check", 
    status: "Failed", 
    riskScore: 95, 
    amount: "$0.25", 
    timestamp: "2024-01-22 14:25:33",
    country: "DE"
  },
  { 
    id: "txn_004", 
    userId: "user_22222", 
    type: "Age Verification", 
    status: "Completed", 
    riskScore: 25, 
    amount: "$0.30", 
    timestamp: "2024-01-22 14:22:18",
    country: "FR"
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Completed":
      return <Badge variant="default">Completed</Badge>;
    case "Under Review":
      return <Badge variant="secondary">Under Review</Badge>;
    case "Failed":
      return <Badge variant="destructive">Failed</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getRiskBadge = (score: number) => {
  if (score < 30) return <Badge variant="default">Low</Badge>;
  if (score < 70) return <Badge variant="secondary">Medium</Badge>;
  return <Badge variant="destructive">High</Badge>;
};

export default function TransactionsOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Transactions Overview</h1>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,543</div>
            <p className="text-xs text-muted-foreground">+12.5% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">+2.1% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Processing Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4s</div>
            <p className="text-xs text-muted-foreground">-0.3s from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Manual Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">-8 from yesterday</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <Input placeholder="Search by transaction ID or user ID..." />
            </div>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="review">Under Review</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-mono text-sm">
                    <Link to={`/transactions/${transaction.id}`} className="block w-full">
                      {transaction.id}
                    </Link>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    <Link to={`/transactions/${transaction.id}`} className="block w-full">
                      {transaction.userId}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link to={`/transactions/${transaction.id}`} className="block w-full">
                      {transaction.type}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link to={`/transactions/${transaction.id}`} className="block w-full">
                      {getStatusBadge(transaction.status)}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link to={`/transactions/${transaction.id}`} className="block w-full">
                      {getRiskBadge(transaction.riskScore)}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link to={`/transactions/${transaction.id}`} className="block w-full">
                      {transaction.amount}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link to={`/transactions/${transaction.id}`} className="block w-full">
                      {transaction.country}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link to={`/transactions/${transaction.id}`} className="block w-full">
                      {transaction.timestamp}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link to={`/transactions/${transaction.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}