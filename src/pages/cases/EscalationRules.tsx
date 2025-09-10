import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { AlertTriangle, Clock, Users, Settings, Plus, Edit, Trash2 } from "lucide-react";

const escalationRules = [
  {
    id: "rule_001",
    name: "High Risk Transaction",
    description: "Escalate transactions with risk score > 85",
    condition: "Risk Score > 85",
    action: "Escalate to Supervisor",
    priority: "High",
    enabled: true,
    triggerCount: 45,
    avgResolutionTime: "2.5 hours"
  },
  {
    id: "rule_002", 
    name: "Long Processing Time",
    description: "Escalate cases pending more than 4 hours",
    condition: "Processing Time > 4 hours",
    action: "Notify Supervisor",
    priority: "Medium",
    enabled: true,
    triggerCount: 12,
    avgResolutionTime: "1.2 hours"
  },
  {
    id: "rule_003",
    name: "Multiple Failed Attempts", 
    description: "Escalate users with 3+ failed verifications",
    condition: "Failed Attempts ≥ 3",
    action: "Manual Review Required",
    priority: "High",
    enabled: true,
    triggerCount: 8,
    avgResolutionTime: "3.1 hours"
  },
  {
    id: "rule_004",
    name: "Suspicious Document Pattern",
    description: "Escalate documents from flagged regions",
    condition: "Document Region = High Risk",
    action: "Escalate to Administrator", 
    priority: "Critical",
    enabled: false,
    triggerCount: 23,
    avgResolutionTime: "4.2 hours"
  }
];

const escalationLevels = [
  { level: 1, name: "Operator", description: "Basic transaction review and case handling", users: 17, avgTime: "45m" },
  { level: 2, name: "Supervisor", description: "Advanced case management", users: 8, avgTime: "1.5h" },
  { level: 3, name: "Administrator", description: "Full system access and user management", users: 3, avgTime: "2.2h" }
];

const notifications = [
  { type: "Email", enabled: true, recipients: "team-leads@company.com" },
  { type: "Slack", enabled: true, channel: "#fraud-alerts" },
  { type: "SMS", enabled: false, recipients: "+1-555-0123" },
  { type: "Webhook", enabled: true, url: "https://api.company.com/alerts" }
];

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "Critical":
      return <Badge variant="destructive">Critical</Badge>;
    case "High":
      return <Badge variant="destructive">High</Badge>;
    case "Medium":
      return <Badge variant="secondary">Medium</Badge>;
    case "Low":
      return <Badge variant="outline">Low</Badge>;
    default:
      return <Badge variant="secondary">{priority}</Badge>;
  }
};

export default function EscalationRules() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Escalation Rules</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Rule
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rules</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">1 rule disabled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Escalations Today</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">+5 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.8h</div>
            <p className="text-xs text-muted-foreground">-0.3h from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Analysts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Across all levels</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="rules" className="space-y-4">
        <TabsList>
          <TabsTrigger value="rules">Escalation Rules</TabsTrigger>
          <TabsTrigger value="levels">Escalation Levels</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="create">Create Rule</TabsTrigger>
        </TabsList>

        <TabsContent value="rules">
          <Card>
            <CardHeader>
              <CardTitle>Active Escalation Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rule Name</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Triggers (7d)</TableHead>
                    <TableHead>Avg Resolution</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {escalationRules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{rule.name}</p>
                          <p className="text-xs text-muted-foreground">{rule.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>{rule.condition}</TableCell>
                      <TableCell>{rule.action}</TableCell>
                      <TableCell>{getPriorityBadge(rule.priority)}</TableCell>
                      <TableCell>{rule.triggerCount}</TableCell>
                      <TableCell>{rule.avgResolutionTime}</TableCell>
                      <TableCell>
                        <Switch checked={rule.enabled} />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
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

        <TabsContent value="levels">
          <Card>
            <CardHeader>
              <CardTitle>Escalation Hierarchy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {escalationLevels.map((level) => (
                  <div key={level.level} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                        {level.level}
                      </div>
                      <div>
                        <p className="font-medium">{level.name}</p>
                        <p className="text-sm text-muted-foreground">{level.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{level.users} analysts</p>
                      <p className="text-xs text-muted-foreground">Avg: {level.avgTime}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {notifications.map((notification) => (
                <div key={notification.type} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{notification.type} Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      {notification.type === "Email" && `Send to: ${notification.recipients}`}
                      {notification.type === "Slack" && `Channel: ${notification.channel}`}
                      {notification.type === "SMS" && `Number: ${notification.recipients}`}
                      {notification.type === "Webhook" && `URL: ${notification.url}`}
                    </p>
                  </div>
                  <Switch checked={notification.enabled} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create New Escalation Rule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rule-name">Rule Name</Label>
                    <Input id="rule-name" placeholder="Enter rule name" />
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" placeholder="Describe what this rule does" />
                </div>

                <div className="space-y-4 p-4 border rounded-lg">
                  <h4 className="font-medium">Trigger Conditions</h4>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Condition Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="risk-score">Risk Score</SelectItem>
                          <SelectItem value="processing-time">Processing Time</SelectItem>
                          <SelectItem value="failed-attempts">Failed Attempts</SelectItem>
                          <SelectItem value="document-type">Document Type</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Operator</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select operator" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="greater">Greater than</SelectItem>
                          <SelectItem value="less">Less than</SelectItem>
                          <SelectItem value="equals">Equals</SelectItem>
                          <SelectItem value="not-equals">Not equals</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Value</Label>
                      <Input placeholder="Enter threshold value" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 p-4 border rounded-lg">
                  <h4 className="font-medium">Escalation Action</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Action Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="escalate">Escalate to next level</SelectItem>
                          <SelectItem value="notify">Send notification</SelectItem>
                          <SelectItem value="assign">Assign to specific user</SelectItem>
                          <SelectItem value="flag">Flag for review</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Target Level/User</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select target" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="supervisor">Supervisor</SelectItem>
                          <SelectItem value="administrator">Administrator</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch id="auto-enable" />
                  <Label htmlFor="auto-enable">Enable rule immediately after creation</Label>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button>Create Escalation Rule</Button>
                  <Button variant="outline">Save as Draft</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}