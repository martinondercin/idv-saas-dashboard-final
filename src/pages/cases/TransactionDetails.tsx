import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  CreditCard, 
  MapPin, 
  Clock, 
  DollarSign, 
  AlertTriangle,
  Shield,
  Eye,
  Download,
  MessageSquare
} from "lucide-react";
import userSelfie from "@/assets/user-selfie.jpg";
import nationalIdFront from "@/assets/national-id-front.jpg";
import nationalIdBack from "@/assets/national-id-back.jpg";
import passport from "@/assets/passport.jpg";

const mockTransaction = {
  id: "TXN-2024-001234",
  userId: "USR-789456",
  userInfo: {
    name: "John Anderson",
    email: "john.anderson@email.com",
    phone: "+1-555-0123",
    verified: true,
    memberSince: "2022-03-15",
    riskProfile: "Low"
  },
  amount: 2500.00,
  currency: "USD",
  type: "Identity Verification",
  status: "Under Review",
  riskScore: 75,
  timestamp: "2024-12-04 14:23:15",
  location: {
    country: "United States",
    city: "New York",
    ip: "192.168.1.100"
  },
  idDocument: {
    type: "National ID",
    frontImage: nationalIdFront,
    backImage: nationalIdBack,
    documentNumber: "123456789"
  },
  flags: [
    { type: "High Amount", severity: "Medium", description: "Transaction amount exceeds normal pattern" },
    { type: "New Location", severity: "Low", description: "Transaction from new geographic location" },
    { type: "Velocity Check", severity: "High", description: "Multiple transactions in short timeframe" }
  ],
  timeline: [
    { time: "14:23:15", event: "Transaction initiated", status: "success" },
    { time: "14:23:18", event: "Risk scoring completed", status: "warning" },
    { time: "14:23:20", event: "Flagged for manual review", status: "pending" },
    { time: "14:25:00", event: "Assigned to analyst", status: "info" }
  ]
};

const getRiskBadge = (score: number) => {
  if (score >= 80) return <Badge variant="destructive">High Risk</Badge>;
  if (score >= 50) return <Badge variant="secondary">Medium Risk</Badge>;
  return <Badge variant="outline">Low Risk</Badge>;
};

const getStatusBadge = (status: string) => {
  const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
    "Completed": "default",
    "Approved": "default",
    "Under Review": "secondary",
    "Failed": "destructive",
    "Rejected": "destructive",
    "Pending": "outline"
  };
  return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
};

export default function TransactionDetails() {
  const { id } = useParams<{ id: string }>();
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(mockTransaction.status);
  const [notes, setNotes] = useState<Array<{id: string; text: string; timestamp: string; author: string}>>([]);
  const [currentNote, setCurrentNote] = useState("");
  const { toast } = useToast();

  const handleApproveIdentity = () => {
    console.log(`Approving identity for transaction ${id}`);
    setTransactionStatus("Approved");
    setShowApproveDialog(false);
    toast({
      title: "Identity Approved",
      description: `Identity for transaction ${id || mockTransaction.id} has been approved successfully.`,
    });
  };

  const handleRejectIdentity = () => {
    console.log(`Rejecting identity for transaction ${id}`);
    setTransactionStatus("Rejected");
    setShowRejectDialog(false);
    toast({
      title: "Identity Rejected",
      description: `Identity for transaction ${id || mockTransaction.id} has been rejected.`,
      variant: "destructive",
    });
  };

  const handleAddNote = () => {
    if (currentNote.trim()) {
      const newNote = {
        id: Math.random().toString(36).substr(2, 9),
        text: currentNote.trim(),
        timestamp: new Date().toLocaleString(),
        author: "Current User"
      };
      setNotes(prev => [...prev, newNote]);
      setCurrentNote("");
      setShowNoteDialog(false);
      toast({
        title: "Note Added",
        description: "Note has been added to the transaction record.",
      });
    }
  };

  const handleExportReport = () => {
    const reportData = {
      transactionId: id || mockTransaction.id,
      userInfo: mockTransaction.userInfo,
      transaction: {
        amount: mockTransaction.amount,
        currency: mockTransaction.currency,
        type: mockTransaction.type,
        status: transactionStatus,
        riskScore: mockTransaction.riskScore,
        timestamp: mockTransaction.timestamp
      },
      location: mockTransaction.location,
      flags: mockTransaction.flags,
      notes: notes
    };

    const reportContent = `
TRANSACTION REPORT
==================

Transaction ID: ${reportData.transactionId}
Generated: ${new Date().toLocaleString()}

USER INFORMATION
----------------
Name: ${reportData.userInfo.name}
Email: ${reportData.userInfo.email}
Phone: ${reportData.userInfo.phone}
Verification Status: ${reportData.userInfo.verified ? 'Verified' : 'Unverified'}
Member Since: ${reportData.userInfo.memberSince}
Risk Profile: ${reportData.userInfo.riskProfile}

TRANSACTION OVERVIEW
--------------------
Amount: ${reportData.transaction.amount} ${reportData.transaction.currency}
Type: ${reportData.transaction.type}
Status: ${reportData.transaction.status}
Risk Score: ${reportData.transaction.riskScore}
Timestamp: ${reportData.transaction.timestamp}

LOCATION DATA
-------------
Country: ${reportData.location.country}
City: ${reportData.location.city}
IP Address: ${reportData.location.ip}

RISK FLAGS
----------
${reportData.flags.map(flag => `- ${flag.type} (${flag.severity}): ${flag.description}`).join('\n')}

NOTES
-----
${reportData.notes.length > 0 ? reportData.notes.map(note => `[${note.timestamp}] ${note.author}: ${note.text}`).join('\n') : 'No notes added'}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transaction-report-${reportData.transactionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Report Exported",
      description: `Transaction report for ${reportData.transactionId} has been downloaded.`,
    });
  };
  
  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Transaction Details</h1>
          <p className="text-muted-foreground">
            Comprehensive transaction analysis and review {id && `- Transaction ID: ${id}`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleExportReport}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          
          <Dialog open={showNoteDialog} onOpenChange={setShowNoteDialog}>
            <DialogTrigger asChild>
              <Button size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Add Note
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add Note</DialogTitle>
                <DialogDescription>
                  Add a note to this transaction for future reference.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Textarea
                  placeholder="Enter your note here..."
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowNoteDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddNote} disabled={!currentNote.trim()}>
                  Save Note
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Transaction Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Transaction Overview
              </CardTitle>
              <CardDescription>Core transaction information and status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Transaction ID</label>
                  <p className="font-mono text-sm bg-muted p-2 rounded">{id || mockTransaction.id}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Type</label>
                  <p className="text-lg font-semibold">{mockTransaction.type}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  {getStatusBadge(transactionStatus)}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Risk Level</label>
                  {getRiskBadge(mockTransaction.riskScore)}
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                User Information
              </CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4">
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="font-medium">{mockTransaction.userInfo.name}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-sm">{mockTransaction.userInfo.email}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p className="text-sm">{mockTransaction.userInfo.phone}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Verification Status</label>
                  <Badge variant={mockTransaction.userInfo.verified ? "default" : "destructive"}>
                    {mockTransaction.userInfo.verified ? "Verified" : "Unverified"}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                  <p className="text-sm">{mockTransaction.userInfo.memberSince}</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-32">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Verification Selfie</label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="cursor-pointer hover:opacity-80 transition-opacity">
                        <img 
                          src={userSelfie} 
                          alt="Identity verification selfie"
                          className="w-full h-40 rounded-lg object-cover border-2 border-muted hover:border-primary transition-colors bg-muted/20"
                        />
                        <p className="text-xs text-muted-foreground mt-1 text-center">Click to enlarge</p>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <img 
                        src={userSelfie} 
                        alt="Identity verification selfie - enlarged view"
                        className="w-full h-auto rounded-lg object-contain"
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                ID Document
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Document Type</label>
                <p>{mockTransaction.idDocument.type}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Document Number</label>
                <p className="font-mono">{mockTransaction.idDocument.documentNumber}</p>
              </div>
              
              {/* Document Images */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Front Side</label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="cursor-pointer hover:opacity-80 transition-opacity">
                        <div className="w-full aspect-[1.6/1] rounded-lg border-2 border-muted hover:border-primary transition-colors bg-muted/20 overflow-hidden">
                          <img 
                            src={mockTransaction.idDocument.frontImage} 
                            alt="ID document front side"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 text-center">Click to enlarge</p>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <img 
                        src={mockTransaction.idDocument.frontImage} 
                        alt="ID document front side - enlarged view"
                        className="w-full h-auto rounded-lg object-contain"
                      />
                    </DialogContent>
                  </Dialog>
                </div>
                
                {mockTransaction.idDocument.backImage && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Back Side</label>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="cursor-pointer hover:opacity-80 transition-opacity">
                          <div className="w-full aspect-[1.6/1] rounded-lg border-2 border-muted hover:border-primary transition-colors bg-muted/20 overflow-hidden">
                            <img 
                              src={mockTransaction.idDocument.backImage} 
                              alt="ID document back side"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 text-center">Click to enlarge</p>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <img 
                          src={mockTransaction.idDocument.backImage} 
                          alt="ID document back side - enlarged view"
                          className="w-full h-auto rounded-lg object-contain"
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Notes Section */}
          {notes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Transaction Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notes.map((note) => (
                  <div key={note.id} className="border rounded-lg p-3 bg-muted/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{note.author}</span>
                      <span className="text-xs text-muted-foreground">{note.timestamp}</span>
                    </div>
                    <p className="text-sm text-foreground">{note.text}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {transactionStatus !== "Approved" && transactionStatus !== "Rejected" ? (
                <>
                  <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" variant="default">
                        Approve Identity
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Approve Identity</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to approve this identity verification? This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowApproveDialog(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleApproveIdentity} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                          Approve Identity
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
                    <DialogTrigger asChild>
                      <Button className="w-full" variant="destructive">
                        Reject Identity
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reject Identity</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to reject this identity verification? This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleRejectIdentity}>
                          Reject Identity
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </>
              ) : (
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">
                    Identity has been {transactionStatus.toLowerCase()}. Only supervisors can modify this status.
                  </p>
                </div>
              )}

              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => {
                  toast({
                    title: "Transaction Escalated",
                    description: `Transaction ${id || mockTransaction.id} has been escalated to supervisor for review.`,
                  });
                }}
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Escalate to Supervisor
              </Button>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => {
                  toast({
                    title: "Information Request Sent",
                    description: "A request for additional information has been sent to the user.",
                  });
                }}
              >
                Request More Info
              </Button>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => {
                  toast({
                    title: "Opening User Profile",
                    description: `Redirecting to user profile for ${mockTransaction.userInfo.name}`,
                  });
                }}
              >
                <Eye className="h-4 w-4 mr-2" />
                View User Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}