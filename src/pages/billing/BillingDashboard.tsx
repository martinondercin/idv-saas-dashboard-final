import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Download, Plus, Edit, Trash2, DollarSign, Activity, FileText, Calendar } from "lucide-react";

// Mock data - replace with your backend integration
const mockUsageData = {
  thisMonth: {
    identityVerification: { count: 450, price: 1.10, currency: "EUR" },
    documentVerification: { count: 320, price: 0.35, currency: "EUR" },
    livenessCheck: { count: 280, price: 0.30, currency: "EUR" },
    ageVerification: { count: 197, price: 0.50, currency: "USD" }
  },
  totalTransactions: 1247,
  totalCost: 498.80,
  outstandingBalance: 0.00,
  nextInvoiceDate: "February 1, 2025"
};

const mockPaymentMethods = [
  {
    id: "pm_1",
    type: "visa",
    last4: "4242",
    isPrimary: true,
    expiryMonth: 12,
    expiryYear: 2025
  }
];

const mockInvoices = [
  {
    id: "INV-2024-12",
    period: "Dec 2024",
    amount: 456.30,
    currency: "EUR",
    status: "Paid",
    date: "2025-01-01",
    downloadUrl: "#"
  },
  {
    id: "INV-2024-11",
    period: "Nov 2024", 
    amount: 389.45,
    currency: "EUR",
    status: "Paid",
    date: "2024-12-01",
    downloadUrl: "#"
  },
  {
    id: "INV-2024-10",
    period: "Oct 2024",
    amount: 512.20,
    currency: "EUR", 
    status: "Paid",
    date: "2024-11-01",
    downloadUrl: "#"
  }
];

export default function BillingDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [autoPayEnabled, setAutoPayEnabled] = useState(true);
  const [invoiceFilter, setInvoiceFilter] = useState("all");

  // Determine active tab based on current route
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === "/billing/payment-methods") return "payment-methods";
    if (path === "/billing/invoices") return "invoices";
    return "usage"; // default
  };

  const handleTabChange = (value: string) => {
    switch (value) {
      case "usage":
        navigate("/billing/usage");
        break;
      case "payment-methods":
        navigate("/billing/payment-methods");
        break;
      case "invoices":
        navigate("/billing/invoices");
        break;
    }
  };

  const activeTab = getActiveTab();

  const calculateTotalCost = () => {
    const { identityVerification, documentVerification, livenessCheck, ageVerification } = mockUsageData.thisMonth;
    const eurTotal = (identityVerification.count * identityVerification.price) + 
                    (documentVerification.count * documentVerification.price) + 
                    (livenessCheck.count * livenessCheck.price);
    const usdTotal = ageVerification.count * ageVerification.price;
    return { eurTotal, usdTotal };
  };

  const { eurTotal, usdTotal } = calculateTotalCost();

  const filteredInvoices = invoiceFilter === "all" ? mockInvoices : 
    mockInvoices.filter(invoice => invoice.status.toLowerCase() === invoiceFilter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing & Usage</h1>
          <p className="text-muted-foreground">
            Manage your usage, payments, and billing information
          </p>
        </div>
      </div>

      {/* Usage Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month's Usage</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUsageData.totalTransactions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Charges</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{eurTotal.toFixed(2)}</div>
            {usdTotal > 0 && (
              <p className="text-xs text-muted-foreground">+ ${usdTotal.toFixed(2)} USD</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Balance</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{mockUsageData.outstandingBalance.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">no pending charges</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Invoice</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUsageData.nextInvoiceDate}</div>
            <p className="text-xs text-muted-foreground">monthly billing cycle</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList>
          <TabsTrigger value="usage">Usage & Pricing</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="invoices">Invoice History</TabsTrigger>
        </TabsList>

        {/* Usage & Pricing Tab */}
        <TabsContent value="usage" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Current Usage Breakdown</CardTitle>
                <CardDescription>This month's transaction counts and costs</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Verification Type</TableHead>
                      <TableHead>Count</TableHead>
                      <TableHead>Unit Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Identity Verification</TableCell>
                      <TableCell>{mockUsageData.thisMonth.identityVerification.count}</TableCell>
                      <TableCell>€{mockUsageData.thisMonth.identityVerification.price}</TableCell>
                      <TableCell className="text-right">€{(mockUsageData.thisMonth.identityVerification.count * mockUsageData.thisMonth.identityVerification.price).toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Document Verification</TableCell>
                      <TableCell>{mockUsageData.thisMonth.documentVerification.count}</TableCell>
                      <TableCell>€{mockUsageData.thisMonth.documentVerification.price}</TableCell>
                      <TableCell className="text-right">€{(mockUsageData.thisMonth.documentVerification.count * mockUsageData.thisMonth.documentVerification.price).toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Liveness Check</TableCell>
                      <TableCell>{mockUsageData.thisMonth.livenessCheck.count}</TableCell>
                      <TableCell>€{mockUsageData.thisMonth.livenessCheck.price}</TableCell>
                      <TableCell className="text-right">€{(mockUsageData.thisMonth.livenessCheck.count * mockUsageData.thisMonth.livenessCheck.price).toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Age Verification</TableCell>
                      <TableCell>{mockUsageData.thisMonth.ageVerification.count}</TableCell>
                      <TableCell>${mockUsageData.thisMonth.ageVerification.price}</TableCell>
                      <TableCell className="text-right">${(mockUsageData.thisMonth.ageVerification.count * mockUsageData.thisMonth.ageVerification.price).toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pricing Information</CardTitle>
                <CardDescription>Current per-transaction pricing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Identity Verification</span>
                    <Badge variant="secondary">€1.10 per transaction</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Document Verification</span>
                    <Badge variant="secondary">€0.35 per transaction</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Liveness Check</span>
                    <Badge variant="secondary">€0.30 per transaction</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Age Verification</span>
                    <Badge variant="secondary">$0.50 per transaction</Badge>
                  </div>
                </div>
                <Separator />
                <div className="text-sm text-muted-foreground">
                  Pricing is charged monthly in arrears. Volume discounts available for enterprise customers.
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payment Methods Tab */}
        <TabsContent value="payment-methods" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment methods and billing preferences</CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {mockPaymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <div className="font-medium">
                        Visa ending in {method.last4}
                        {method.isPrimary && <Badge className="ml-2" variant="default">Primary</Badge>}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Expires {method.expiryMonth}/{method.expiryYear}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Update
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              ))}

              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium">Billing Preferences</h4>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Auto-pay</div>
                    <div className="text-sm text-muted-foreground">
                      Automatically charge your primary payment method monthly
                    </div>
                  </div>
                  <Switch
                    checked={autoPayEnabled}
                    onCheckedChange={setAutoPayEnabled}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Invoice History Tab */}
        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Invoice History</CardTitle>
                <CardDescription>View and download your billing invoices</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Select value={invoiceFilter} onValueChange={setInvoiceFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Invoices</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.period}</TableCell>
                      <TableCell>{invoice.currency === "EUR" ? "€" : "$"}{invoice.amount}</TableCell>
                      <TableCell>
                        <Badge
                          variant={invoice.status === "Paid" ? "default" : "secondary"}
                        >
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          PDF
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}