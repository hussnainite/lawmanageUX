import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText } from "lucide-react"

export default function AccessControlPage() {
  // This would be fetched from an API in a real implementation
  const accessRequests = [
    {
      id: "req-1",
      user: {
        name: "Robert Johnson",
        email: "robert.johnson@example.com",
        company: "Johnson Consulting",
        avatar: "/stylized-rj.png",
      },
      document: "Settlement Agreement - Draft",
      requestedBy: "Sarah Wilson",
      requestDate: "2023-04-18T09:30:00Z",
      status: "Pending",
    },
    {
      id: "req-2",
      user: {
        name: "Jennifer Adams",
        email: "jennifer.adams@example.com",
        company: "Adams Legal",
        avatar: "/abstract-geometric-ja.png",
      },
      document: "Financial Disclosure Form",
      requestedBy: "David Lee",
      requestDate: "2023-04-17T14:15:00Z",
      status: "Pending",
    },
    {
      id: "req-3",
      user: {
        name: "Thomas Wilson",
        email: "thomas.wilson@example.com",
        company: "Wilson & Partners",
        avatar: "/Abstract Geometric Shapes.png",
      },
      document: "Custody Arrangement Proposal",
      requestedBy: "Emily Johnson",
      requestDate: "2023-04-16T11:45:00Z",
      status: "Approved",
    },
  ]

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Access Control</h1>
          <p className="text-muted-foreground mt-1">Manage access requests and permissions</p>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Access Requests</CardTitle>
          <CardDescription>Pending and recent access requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Document</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accessRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={request.user.avatar || "/placeholder.svg"} alt={request.user.name} />
                        <AvatarFallback>
                          {request.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{request.user.name}</div>
                        <div className="text-sm text-muted-foreground">{request.user.company}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {request.document}
                    </div>
                  </TableCell>
                  <TableCell>{request.requestedBy}</TableCell>
                  <TableCell>{new Date(request.requestDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={request.status === "Pending" ? "outline" : "success"}>{request.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {request.status === "Pending" ? (
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline">
                          Deny
                        </Button>
                        <Button size="sm">Approve</Button>
                      </div>
                    ) : (
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Document Access Policies</CardTitle>
            <CardDescription>Default access settings for document types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <p className="font-medium">Agreements</p>
                  <p className="text-sm text-muted-foreground">Default access level for agreement documents</p>
                </div>
                <Badge>Standard</Badge>
              </div>
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <p className="font-medium">Forms</p>
                  <p className="text-sm text-muted-foreground">Default access level for form documents</p>
                </div>
                <Badge>Extended</Badge>
              </div>
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <p className="font-medium">Proposals</p>
                  <p className="text-sm text-muted-foreground">Default access level for proposal documents</p>
                </div>
                <Badge>Standard</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Summaries</p>
                  <p className="text-sm text-muted-foreground">Default access level for summary documents</p>
                </div>
                <Badge>Read Only</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Configure security options for the portal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Require 2FA for all users</p>
                </div>
                <Badge variant="outline">Optional</Badge>
              </div>
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <p className="font-medium">Session Timeout</p>
                  <p className="text-sm text-muted-foreground">Automatically log out inactive users</p>
                </div>
                <Badge>30 minutes</Badge>
              </div>
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <p className="font-medium">Password Policy</p>
                  <p className="text-sm text-muted-foreground">Minimum requirements for passwords</p>
                </div>
                <Badge>Strong</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">IP Restrictions</p>
                  <p className="text-sm text-muted-foreground">Limit access to specific IP addresses</p>
                </div>
                <Badge variant="outline">Disabled</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
