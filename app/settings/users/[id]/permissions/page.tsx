"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function UserPermissionsPage({ params }: { params: { id: string } }) {
  // This would be fetched from an API in a real implementation
  const user = {
    id: params.id,
    name: "Michael Brown",
    email: "michael.brown@lawmanage.com",
    role: "Lawyer",
    status: "Active",
    avatar: "/stylized-ej-initials.png",
    initials: "MB",
  }

  const [permissions, setPermissions] = useState({
    viewAllMatters: false,
    editAllMatters: false,
    viewAllContacts: true,
    editAllContacts: true,
    viewAllDocuments: false,
    editAllDocuments: false,
    viewAllHearings: true,
    editAllHearings: false,
    viewUserManagement: false,
    editUserManagement: false,
    viewSettings: false,
    editSettings: false,
    viewCounterpartyPortal: true,
    manageCounterpartyPortal: false,
    hasAssignment: true,
  })

  const handlePermissionChange = (permission: string, value: boolean) => {
    setPermissions((prev) => ({ ...prev, [permission]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, this would make an API call to update the user's permissions
    console.log("Permissions updated:", permissions)
    // Then show a success message or redirect
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
          <Avatar className="h-12 w-12">
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
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="permissions" className="space-y-6">
        <TabsList>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="permissions">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>User Permissions</CardTitle>
                <CardDescription>
                  Configure access permissions for {user.name}. These settings override the default role-based
                  permissions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Feature Access</h3>
                    <div className="border rounded-lg divide-y">
                      <div className="grid grid-cols-3 gap-4 p-4 font-medium bg-muted">
                        <div>Feature</div>
                        <div>View Access</div>
                        <div>Edit Access</div>
                      </div>

                      <div className="p-4 grid grid-cols-3 gap-4 items-center">
                        <div>
                          <p className="font-medium">Matters</p>
                          <p className="text-sm text-muted-foreground">Access to case matters</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="viewAllMatters"
                            checked={permissions.viewAllMatters}
                            onCheckedChange={(checked) => handlePermissionChange("viewAllMatters", checked)}
                          />
                          <Label htmlFor="viewAllMatters">View All Matters</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="editAllMatters"
                            checked={permissions.editAllMatters}
                            onCheckedChange={(checked) => handlePermissionChange("editAllMatters", checked)}
                          />
                          <Label htmlFor="editAllMatters">Edit All Matters</Label>
                        </div>
                      </div>
                      <div className="p-4 grid grid-cols-3 gap-4 items-center">
                        <div>
                          <p className="font-medium">Matter Assignment</p>
                          <p className="text-sm text-muted-foreground">Can assign matters to lawyers</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="hasAssignment"
                            checked={permissions.hasAssignment}
                            onCheckedChange={(checked) => handlePermissionChange("hasAssignment", checked)}
                          />
                          <Label htmlFor="hasAssignment">Can assign matters to lawyers</Label>
                        </div>
                        <div></div>
                      </div>

                      <div className="p-4 grid grid-cols-3 gap-4 items-center">
                        <div>
                          <p className="font-medium">Contacts</p>
                          <p className="text-sm text-muted-foreground">Access to contacts database</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="viewAllContacts"
                            checked={permissions.viewAllContacts}
                            onCheckedChange={(checked) => handlePermissionChange("viewAllContacts", checked)}
                          />
                          <Label htmlFor="viewAllContacts">View All Contacts</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="editAllContacts"
                            checked={permissions.editAllContacts}
                            onCheckedChange={(checked) => handlePermissionChange("editAllContacts", checked)}
                          />
                          <Label htmlFor="editAllContacts">Edit All Contacts</Label>
                        </div>
                      </div>

                      <div className="p-4 grid grid-cols-3 gap-4 items-center">
                        <div>
                          <p className="font-medium">Documents</p>
                          <p className="text-sm text-muted-foreground">Access to legal documents</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="viewAllDocuments"
                            checked={permissions.viewAllDocuments}
                            onCheckedChange={(checked) => handlePermissionChange("viewAllDocuments", checked)}
                          />
                          <Label htmlFor="viewAllDocuments">View All Documents</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="editAllDocuments"
                            checked={permissions.editAllDocuments}
                            onCheckedChange={(checked) => handlePermissionChange("editAllDocuments", checked)}
                          />
                          <Label htmlFor="editAllDocuments">Edit All Documents</Label>
                        </div>
                      </div>

                      <div className="p-4 grid grid-cols-3 gap-4 items-center">
                        <div>
                          <p className="font-medium">Court Hearings</p>
                          <p className="text-sm text-muted-foreground">Access to hearing schedules</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="viewAllHearings"
                            checked={permissions.viewAllHearings}
                            onCheckedChange={(checked) => handlePermissionChange("viewAllHearings", checked)}
                          />
                          <Label htmlFor="viewAllHearings">View All Hearings</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="editAllHearings"
                            checked={permissions.editAllHearings}
                            onCheckedChange={(checked) => handlePermissionChange("editAllHearings", checked)}
                          />
                          <Label htmlFor="editAllHearings">Edit All Hearings</Label>
                        </div>
                      </div>

                      <div className="p-4 grid grid-cols-3 gap-4 items-center">
                        <div>
                          <p className="font-medium">User Management</p>
                          <p className="text-sm text-muted-foreground">Access to user administration</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="viewUserManagement"
                            checked={permissions.viewUserManagement}
                            onCheckedChange={(checked) => handlePermissionChange("viewUserManagement", checked)}
                          />
                          <Label htmlFor="viewUserManagement">View Users</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="editUserManagement"
                            checked={permissions.editUserManagement}
                            onCheckedChange={(checked) => handlePermissionChange("editUserManagement", checked)}
                          />
                          <Label htmlFor="editUserManagement">Manage Users</Label>
                        </div>
                      </div>

                      <div className="p-4 grid grid-cols-3 gap-4 items-center">
                        <div>
                          <p className="font-medium">Settings</p>
                          <p className="text-sm text-muted-foreground">Access to system settings</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="viewSettings"
                            checked={permissions.viewSettings}
                            onCheckedChange={(checked) => handlePermissionChange("viewSettings", checked)}
                          />
                          <Label htmlFor="viewSettings">View Settings</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="editSettings"
                            checked={permissions.editSettings}
                            onCheckedChange={(checked) => handlePermissionChange("editSettings", checked)}
                          />
                          <Label htmlFor="editSettings">Modify Settings</Label>
                        </div>
                      </div>

                      <div className="p-4 grid grid-cols-3 gap-4 items-center">
                        <div>
                          <p className="font-medium">Counterparty Portal</p>
                          <p className="text-sm text-muted-foreground">Access to external portal management</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="viewCounterpartyPortal"
                            checked={permissions.viewCounterpartyPortal}
                            onCheckedChange={(checked) => handlePermissionChange("viewCounterpartyPortal", checked)}
                          />
                          <Label htmlFor="viewCounterpartyPortal">View Portal</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="manageCounterpartyPortal"
                            checked={permissions.manageCounterpartyPortal}
                            onCheckedChange={(checked) => handlePermissionChange("manageCounterpartyPortal", checked)}
                          />
                          <Label htmlFor="manageCounterpartyPortal">Manage Portal</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit">Save Permissions</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
