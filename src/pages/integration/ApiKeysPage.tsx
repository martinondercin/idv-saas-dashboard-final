import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Key, Plus, RotateCw, Trash2 } from "lucide-react";
import { useState } from "react";

const apiKeys = [
  { id: "ak_live_1", name: "Production API Key", environment: "Live", status: "Active", created: "2024-01-15", lastUsed: "2024-01-22" },
  { id: "ak_test_1", name: "Test Environment", environment: "Test", status: "Active", created: "2024-01-10", lastUsed: "2024-01-21" },
  { id: "ak_dev_1", name: "Development Key", environment: "Dev", status: "Inactive", created: "2024-01-05", lastUsed: "Never" },
];

const webhooks = [
  { id: "wh_1", url: "https://api.company.com/webhooks/verify", events: ["transaction.completed", "review.required"], status: "Active" },
  { id: "wh_2", url: "https://staging.company.com/webhooks", events: ["transaction.failed"], status: "Failed" },
];

export default function ApiKeysPage() {
  const [isNewKeyDialogOpen, setIsNewKeyDialogOpen] = useState(false);
  const [newKeyData, setNewKeyData] = useState({
    name: "",
    environment: "test",
    description: "",
    permissions: [] as string[],
    expirationDate: "",
    rateLimit: "1000",
    ratePeriod: "hour",
    ipRestrictions: ""
  });

  const handleCreateKey = () => {
    // Here you would typically make an API call to create the key
    console.log("Creating new API key:", newKeyData);
    setIsNewKeyDialogOpen(false);
    setNewKeyData({ 
      name: "", 
      environment: "test", 
      description: "", 
      permissions: [], 
      expirationDate: "", 
      rateLimit: "1000", 
      ratePeriod: "hour", 
      ipRestrictions: "" 
    });
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">API Keys & Webhooks</h1>
          <Dialog open={isNewKeyDialogOpen} onOpenChange={setIsNewKeyDialogOpen}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New API Key
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create a new API key for integration</p>
              </TooltipContent>
            </Tooltip>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New API Key</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="key-name">Key Name *</Label>
                    <Input
                      id="key-name"
                      placeholder="Enter a descriptive name"
                      value={newKeyData.name}
                      onChange={(e) => setNewKeyData({ ...newKeyData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="environment">Environment *</Label>
                    <Select value={newKeyData.environment} onValueChange={(value) => setNewKeyData({ ...newKeyData, environment: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select environment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="live">Live</SelectItem>
                        <SelectItem value="test">Test</SelectItem>
                        <SelectItem value="dev">Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Brief description of this API key's purpose"
                    value={newKeyData.description}
                    onChange={(e) => setNewKeyData({ ...newKeyData, description: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Permissions</Label>
                  <div className="grid grid-cols-2 gap-2 p-3 border rounded-md">
                    {["verify:read", "verify:write", "cases:read", "cases:write", "reports:read", "admin:access"].map((permission) => (
                      <div key={permission} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={permission}
                          checked={newKeyData.permissions.includes(permission)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewKeyData({ ...newKeyData, permissions: [...newKeyData.permissions, permission] });
                            } else {
                              setNewKeyData({ ...newKeyData, permissions: newKeyData.permissions.filter(p => p !== permission) });
                            }
                          }}
                          className="rounded"
                        />
                        <Label htmlFor={permission} className="text-sm font-normal">{permission}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rate-limit">Rate Limit</Label>
                    <Input
                      id="rate-limit"
                      type="number"
                      placeholder="1000"
                      value={newKeyData.rateLimit}
                      onChange={(e) => setNewKeyData({ ...newKeyData, rateLimit: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rate-period">Per</Label>
                    <Select value={newKeyData.ratePeriod} onValueChange={(value) => setNewKeyData({ ...newKeyData, ratePeriod: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minute">Minute</SelectItem>
                        <SelectItem value="hour">Hour</SelectItem>
                        <SelectItem value="day">Day</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiration">Expiration Date (Optional)</Label>
                  <Input
                    id="expiration"
                    type="date"
                    value={newKeyData.expirationDate}
                    onChange={(e) => setNewKeyData({ ...newKeyData, expirationDate: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ip-restrictions">IP Restrictions (Optional)</Label>
                  <Input
                    id="ip-restrictions"
                    placeholder="192.168.1.0/24, 10.0.0.1 (comma separated)"
                    value={newKeyData.ipRestrictions}
                    onChange={(e) => setNewKeyData({ ...newKeyData, ipRestrictions: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">Leave empty to allow all IPs</p>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsNewKeyDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateKey} disabled={!newKeyData.name}>
                  Create Key
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

      <div className="grid gap-6">
        {/* API Keys Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              API Keys
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Key ID</TableHead>
                  <TableHead>Environment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Used</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.map((key) => (
                  <TableRow key={key.id}>
                    <TableCell className="font-medium">{key.name}</TableCell>
                    <TableCell className="font-mono text-sm">{key.id}</TableCell>
                    <TableCell>
                      <Badge variant={key.environment === "Live" ? "default" : "secondary"}>
                        {key.environment}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={key.status === "Active" ? "default" : "secondary"}>
                        {key.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{key.created}</TableCell>
                    <TableCell>{key.lastUsed}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <RotateCw className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Regenerate API key</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete API key</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Webhooks Section */}
        <Card>
          <CardHeader>
            <CardTitle>Webhook Endpoints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {webhooks.map((webhook) => (
                <div key={webhook.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{webhook.url}</span>
                      <Badge variant={webhook.status === "Active" ? "default" : "destructive"}>
                        {webhook.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit webhook configuration</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm">Test</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Send test webhook payload</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Events: {webhook.events.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </TooltipProvider>
  );
}