import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Edit, Key, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function UserProfilePage({ params }: { params: { id: string } }) {
  // This would be fetched from an API in a real implementation
  const user = {
    id: params.id,
    firstName: "Michael",
    lastName: "Brown",
    name: "Michael Brown",
    email: "michael.brown@lawmanage.com",
    role: "Lawyer",
    status: "Active",
    avatar: "/stylized-ej-initials.png",
    initials: "MB",
    phone: "+1 (555) 123-4567",
    createdAt: "2023-01-15T10:30:00Z",
    lastActive: "2023-04-17T14:20:00Z",
    assignedMatters: 3,
    recentActivity: [
      {
        type: "document",
        action: "created",
        item: "Financial Disclosure",
        date: "2023-04-15T10:30:00Z",
      },
      {
        type: "matter",
        action: "updated",
        item: "Smith vs. Smith",
        date: "2023-04-14T15:45:00Z",
      },
      {
        type: "email",
        action: "sent",
        item: "Draft Agreement Review",
        date: "2023-04-13T09:20:00Z",
      },
      {
        type: "note",
        action: "added",
        item: "Client Meeting Notes",
        date: "2023-04-12T11:10:00Z",
      },
      {
        type: "hearing",
        action: "scheduled",
        item: "Initial Hearing",
        date: "2023-04-10T16:30:00Z",
      },
    ],
    assignedMattersList: [
      {
        id: 1,
        title: "Smith vs. Smith",
        type: "Children & Property",
        client: "John Smith",
      },
      {
        id: 2,
        title: "Johnson Divorce",
        type: "Divorce",
        client: "Michael Johnson",
      },
      {
        id: 4,
        title: "Davis Property Settlement",
        type: "Property",
        client: "Thomas Davis",
      },
    ],
  }

  return (
    <div>
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/settings/users">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Users
        </Link>
      </Button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>{user.initials}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground">{user.email}</p>
              <Badge variant={user.role === "Admin" ? "default" : user.role === "Lawyer" ? "secondary" : "outline"}>
                {user.role}
              </Badge>
              <Badge
                variant={user.status === "Active" ? "success" : "destructive"}
                className={user.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
              >
                {user.status}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/settings/users/${user.id}/permissions`}>
              <Shield className="mr-2 h-4 w-4" />
              Permissions
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="#">
              <Key className="mr-2 h-4 w-4" />
              Reset Password
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/settings/users/${user.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit User
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
                <CardDescription>Basic user details and contact information</CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div className="flex justify-between">
                    <dt className="font-medium text-muted-foreground">Full Name</dt>
                    <dd>{user.name}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-muted-foreground">Email</dt>
                    <dd>{user.email}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-muted-foreground">Phone</dt>
                    <dd>{user.phone}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-muted-foreground">Role</dt>
                    <dd>{user.role}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-muted-foreground">Status</dt>
                    <dd>{user.status}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-muted-foreground">Created</dt>
                    <dd>{new Date(user.createdAt).toLocaleDateString()}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-muted-foreground">Last Active</dt>
                    <dd>{new Date(user.lastActive).toLocaleDateString()}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
