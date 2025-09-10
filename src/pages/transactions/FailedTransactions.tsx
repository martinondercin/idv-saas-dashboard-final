import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, RotateCw, Eye, Download, Filter, TrendingDown } from "lucide-react";

const failedTransactions = [
  {
    id: "txn_fail_001",
    userId: "usr_12345",
    type: "OCR", 
    failureReason: "Poor document quality - image too blurry",
    errorCode: "DOC_QUALITY_001",
    timestamp: "2024-01-22 14:15:32",
    country: "US",
    riskScore: 95,
    retryAttempts: 3,
    canRetry: false
  },
  {
    id: "txn_fail_002",
    userId: "usr_67890",
    type: "Passive Liveness Check",
    failureReason: "Multiple faces detected in frame",
    errorCode: "LIVENESS_002", 
    timestamp: "2024-01-22 13:42:18",
    country: "GB",
    riskScore: 88,
    retryAttempts: 1,
    canRetry: true
  },
  {
    id: "txn_fail_003",
    userId: "usr_24680",
    type: "Age Verification",
    failureReason: "Age verification failed - document not supported",
    errorCode: "AGE_VERIFY_001",
    timestamp: "2024-01-22 12:30:45",
    country: "DE", 
    riskScore: 92,
    retryAttempts: 2,
    canRetry: true
  },
  {
    id: "txn_fail_004",
    userId: "usr_13579",
    type: "Full Identity Verification",
    failureReason: "Document tampering detected",
    errorCode: "DOC_TAMPER_001", 
    timestamp: "2024-01-22 11:15:22",
    country: "FR",
    riskScore: 98,
    retryAttempts: 0,
    canRetry: false
  },
  {
    id: "txn_fail_005",
    userId: "usr_97531",
    type: "OCR", 
    failureReason: "Unsupported document type",
    errorCode: "DOC_TYPE_001",
    timestamp: "2024-01-22 10:45:12",
    country: "CA",
    riskScore: 65,
    retryAttempts: 1,
    canRetry: true
  }
];

const errorAnalysis = [
  { code: "DOC_QUALITY_001", description: "Poor document quality", count: 142, percentage: 35.5 },
  { code: "LIVENESS_002", description: "Liveness check failed", count: 89, percentage: 22.3 },
  { code: "FACE_MATCH_001", description: "Face match confidence low", count: 67, percentage: 16.8 },
  { code: "DOC_TAMPER_001", description: "Document tampering detected", count: 45, percentage: 11.3 },
  { code: "DOC_TYPE_001", description: "Unsupported document type", count: 34, percentage: 8.5 },
  { code: "NETWORK_001", description: "Network timeout", count: 23, percentage: 5.8 }
];

const getRetryBadge = (canRetry: boolean) => {
  return canRetry ? 
    <Badge variant="outline">Retryable</Badge> : 
    <Badge variant="destructive">Permanent Failure</Badge>;
};

export default function FailedTransactions() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Failed Transactions</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <RotateCw className="h-4 w-4 mr-2" />
            Bulk Retry
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Today</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+12 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failure Rate</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.8%</div>
            <p className="text-xs text-muted-foreground">-0.3% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Retryable</CardTitle>
            <RotateCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">70% of failures</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24m</div>
            <p className="text-xs text-muted-foreground">For retryable failures</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Failed Transactions</TabsTrigger>
          <TabsTrigger value="analysis">Error Analysis</TabsTrigger>
          <TabsTrigger value="trends">Trends & Patterns</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Failed Transaction Details</CardTitle>
                <div className="flex gap-2">
                  <Input placeholder="Search by transaction ID..." className="w-64" />
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Error Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Errors</SelectItem>
                      <SelectItem value="quality">Document Quality</SelectItem>
                      <SelectItem value="liveness">Liveness Failed</SelectItem>
                      <SelectItem value="age">Age Verification</SelectItem>
                      <SelectItem value="tamper">Document Tampering</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Retry Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="retryable">Retryable</SelectItem>
                      <SelectItem value="permanent">Permanent</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Failure Reason</TableHead>
                    <TableHead>Error Code</TableHead>
                    <TableHead>Risk Score</TableHead>
                    <TableHead>Retry Status</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {failedTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                      <TableCell className="font-mono text-sm">{transaction.userId}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell className="max-w-xs">
                        <div className="truncate" title={transaction.failureReason}>
                          {transaction.failureReason}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono text-xs">
                          {transaction.errorCode}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="destructive">{transaction.riskScore}</Badge>
                      </TableCell>
                      <TableCell>{getRetryBadge(transaction.canRetry)}</TableCell>
                      <TableCell>{transaction.timestamp}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {transaction.canRetry && (
                            <Button variant="ghost" size="sm">
                              <RotateCw className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle>Error Code Analysis (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {errorAnalysis.map((error) => (
                  <div key={error.code} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="font-mono text-xs">{error.code}</Badge>
                        <span className="font-medium">{error.description}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full" 
                          style={{ width: `${error.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-semibold">{error.count}</p>
                      <p className="text-xs text-muted-foreground">{error.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Failure Trends & Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4">
                  <div className="p-4 border rounded-lg bg-red-50 border-red-200">
                    <h4 className="font-semibold text-red-800 mb-2">🔴 Critical Issue</h4>
                    <p className="text-sm text-red-700 mb-2">
                      Document quality failures have increased by 25% in the last 3 days
                    </p>
                    <p className="text-xs text-red-600">
                      <strong>Recommendation:</strong> Review image capture guidelines and consider lowering quality thresholds temporarily
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-yellow-50 border-yellow-200">
                    <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Warning</h4>
                    <p className="text-sm text-yellow-700 mb-2">
                      Liveness check failures spike during 14:00-16:00 UTC
                    </p>
                    <p className="text-xs text-yellow-600">
                      <strong>Recommendation:</strong> Investigate if lighting conditions affect peak hour performance
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">ℹ️ Info</h4>
                    <p className="text-sm text-blue-700 mb-2">
                      Face match confidence has improved by 5% after model update
                    </p>
                    <p className="text-xs text-blue-600">
                      <strong>Note:</strong> Continue monitoring for the next 7 days to confirm sustained improvement
                    </p>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-4">Retry Success Rates by Error Type</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Document Quality Issues</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full">
                          <div className="w-16 h-2 bg-accent rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">78% success</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Liveness Check Failures</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full">
                          <div className="w-10 h-2 bg-yellow-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">45% success</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Face Match Issues</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full">
                          <div className="w-12 h-2 bg-accent rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">62% success</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}