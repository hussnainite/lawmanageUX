"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "John Smith",
    email: "john.smith@example.com",
    company: "Smith Enterprises",
    role: "CEO",
    avatar: "/javascript-code-abstract.png",
  })

  // This would be fetched from an API in a real implementation
  const accessHistory = [
    { id: 1, document: "Settlement Agreement - Draft", date: "2023-04-16T09:30:00Z", action: "Viewed" },
    { id: 2, document: "Settlement Agreement - Draft", date: "2023-04-16T09:35:00Z", action: "Commented" },
    { id: 3, document: "Financial Disclosure Form", date: "2023-04-12T14:45:00Z", action: "Downloaded" },
    { id: 4, document: "Custody Arrangement Proposal", date: "2023-04-10T09:15:00Z", action: "Status Updated" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">My Profile</h1>

      <div className="grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Your personal information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-bold">{user.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{user.email}</p>
            <div className="flex flex-col items-center gap-1">
              <p className="text-sm">{user.company}</p>
              <Badge variant="outline">{user.role}</Badge>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Tabs defaultValue="account">
            <TabsList className="mb-4">
              <TabsTrigger value="account">Account Settings</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="activity">Activity Log</TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Update your account information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={user.company}
                        onChange={(e) => setUser({ ...user, company: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input id="role" value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })} />
                    </div>
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>Manage your password and security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button>Update Password</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Log</CardTitle>
                  <CardDescription>Your recent activity in the portal</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {accessHistory.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0"
                      >
                        <div>
                          <p className="font-medium">{item.document}</p>
                          <p className="text-sm text-muted-foreground">Action: {item.action}</p>
                        </div>
                        <div className="text-sm text-muted-foreground">{new Date(item.date).toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
