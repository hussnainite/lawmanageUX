"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NewUserPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    sendInvite: true,
  })

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, this would make an API call to create the user
    console.log("Form submitted:", formData)
    // Then redirect to the users list
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
        <div>
          <h1 className="text-2xl font-bold">Add New User</h1>
          <p className="text-muted-foreground mt-1">Create a new user account for Law Manage</p>
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList>
          <TabsTrigger value="details">User Details</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
                <CardDescription>Enter the details for the new user</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={formData.role} onValueChange={(value) => handleChange("role", value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="lawyer">Lawyer</SelectItem>
                      <SelectItem value="support">Support Staff</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formData.role === "admin"
                      ? "Admins have full access to all features and settings."
                      : formData.role === "lawyer"
                        ? "Lawyers have access to matters they are assigned to and related features."
                        : formData.role === "support"
                          ? "Support staff have limited access to specific features."
                          : "Select a role to see its description."}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sendInvite"
                    checked={formData.sendInvite}
                    onCheckedChange={(checked) => handleChange("sendInvite", checked as boolean)}
                  />
                  <Label htmlFor="sendInvite">Send invitation email to the user</Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/settings/users">Cancel</Link>
                </Button>
                <Button type="submit">Create User</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle>User Permissions</CardTitle>
              <CardDescription>Configure access permissions for the new user</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Role-Based Permissions</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Permissions are primarily determined by the user's role. You can customize specific permissions
                    after creating the user.
                  </p>

                  <div className="border rounded-lg">
                    <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b bg-muted">
                      <div>Feature</div>
                      <div className="text-center">Admin</div>
                      <div className="text-center">Lawyer</div>
                      <div className="text-center">Support Staff</div>
                    </div>
                    <div className="divide-y">
                      {[
                        {
                          feature: "Matters",
                          admin: "Full Access",
                          lawyer: "Assigned Only",
                          support: "View List Only",
                        },
                        {
                          feature: "Contacts",
                          admin: "Full Access",
                          lawyer: "Full Access",
                          support: "Full Access",
                        },
                        {
                          feature: "Documents",
                          admin: "Full Access",
                          lawyer: "Assigned Matters",
                          support: "No Access",
                        },
                        {
                          feature: "Court Hearings",
                          admin: "Full Access",
                          lawyer: "Assigned Matters",
                          support: "View Only",
                        },
                        {
                          feature: "User Management",
                          admin: "Full Access",
                          lawyer: "No Access",
                          support: "View Only",
                        },
                        {
                          feature: "Settings",
                          admin: "Full Access",
                          lawyer: "No Access",
                          support: "No Access",
                        },
                        {
                          feature: "Counterparty Portal",
                          admin: "Full Access",
                          lawyer: "Assigned Matters",
                          support: "No Access",
                        },
                      ].map((item, index) => (
                        <div key={index} className="grid grid-cols-4 gap-4 p-4">
                          <div>{item.feature}</div>
                          <div className="text-center">
                            <Badge
                              variant={item.admin === "Full Access" ? "default" : "outline"}
                              className={
                                item.admin === "Full Access"
                                  ? ""
                                  : item.admin === "No Access"
                                    ? "bg-red-100 text-red-800 hover:bg-red-100"
                                    : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              }
                            >
                              {item.admin}
                            </Badge>
                          </div>
                          <div className="text-center">
                            <Badge
                              variant={item.lawyer === "Full Access" ? "default" : "outline"}
                              className={
                                item.lawyer === "Full Access"
                                  ? ""
                                  : item.lawyer === "No Access"
                                    ? "bg-red-100 text-red-800 hover:bg-red-100"
                                    : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              }
                            >
                              {item.lawyer}
                            </Badge>
                          </div>
                          <div className="text-center">
                            <Badge
                              variant={item.support === "Full Access" ? "default" : "outline"}
                              className={
                                item.support === "Full Access"
                                  ? ""
                                  : item.support === "No Access"
                                    ? "bg-red-100 text-red-800 hover:bg-red-100"
                                    : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              }
                            >
                              {item.support}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/settings/users">Cancel</Link>
              </Button>
              <Button type="submit">Create User</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
