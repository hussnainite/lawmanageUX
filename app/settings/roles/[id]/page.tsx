import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Edit } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function RoleDetailPage({ params }: { params: { id: string } }) {
  // This would be fetched from an API in a real implementation
  const role = {
    id: params.id,
    name: params.id === "admin" ? "Admin" : params.id === "lawyer" ? "Lawyer" : "Support Staff",
    description:
      params.id === "admin"
        ? "Full access to all features and settings"
        : params.id === "lawyer"
          ? "Access to assigned matters and related features"
          : "Limited access to specific features",
    userCount: params.id === "admin" ? 2 : params.id === "lawyer" ? 5 : 3,
    isDefault: params.id === "lawyer",
    isSystem: true,
    permissions: [
      {
        category: "Matters",
        permissions: [
          {
            name: "View Matters",
            admin: "All Matters",
            lawyer: "Assigned Only",
            support: "List Only",
          },
          {
            name: "Create Matters",
            admin: "Yes",
            lawyer: "Yes",
            support: "No",
          },
          {
            name: "Edit Matters",
            admin: "All Matters",
            lawyer: "Assigned Only",
            support: "No",
          },
          {
            name: "Delete Matters",
            admin: "Yes",
            lawyer: "No",
            support: "No",
          },
          {
            name: "Matter Assignment",
            admin: "Yes",
            lawyer: "No",
            support: "Yes",
          },
        ],
      },
      {
        category: "Contacts",
        permissions: [
          {
            name: "View Contacts",
            admin: "All Contacts",
            lawyer: "All Contacts",
            support: "All Contacts",
          },
          {
            name: "Create Contacts",
            admin: "Yes",
            lawyer: "Yes",
            support: "Yes",
          },
          {
            name: "Edit Contacts",
            admin: "Yes",
            lawyer: "Yes",
            support: "Yes",
          },
          {
            name: "Delete Contacts",
            admin: "Yes",
            lawyer: "No",
            support: "No",
          },
        ],
      },
      {
        category: "Documents",
        permissions: [
          {
            name: "View Documents",
            admin: "All Documents",
            lawyer: "Assigned Matters",
            support: "No",
          },
          {
            name: "Create Documents",
            admin: "Yes",
            lawyer: "Yes",
            support: "No",
          },
          {
            name: "Edit Documents",
            admin: "All Documents",
            lawyer: "Assigned Matters",
            support: "No",
          },
          {
            name: "Delete Documents",
            admin: "Yes",
            lawyer: "No",
            support: "No",
          },
        ],
      },
      {
        category: "User Management",
        permissions: [
          {
            name: "View Users",
            admin: "Yes",
            lawyer: "No",
            support: "Yes",
          },
          {
            name: "Create Users",
            admin: "Yes",
            lawyer: "No",
            support: "No",
          },
          {
            name: "Edit Users",
            admin: "Yes",
            lawyer: "No",
            support: "No",
          },
          {
            name: "Manage Permissions",
            admin: "Yes",
            lawyer: "No",
            support: "No",
          },
        ],
      },
      {
        category: "Settings",
        permissions: [
          {
            name: "View Settings",
            admin: "Yes",
            lawyer: "No",
            support: "No",
          },
          {
            name: "Edit Settings",
            admin: "Yes",
            lawyer: "No",
            support: "No",
          },
        ],
      },
      {
        category: "Counterparty Portal",
        permissions: [
          {
            name: "View Portal",
            admin: "Yes",
            lawyer: "Assigned Matters",
            support: "No",
          },
          {
            name: "Manage Portal",
            admin: "Yes",
            lawyer: "No",
            support: "No",
          },
        ],
      },
    ],
  }

  return (
    <div>
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/settings/roles">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Roles
        </Link>
      </Button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{role.name}</h1>
            {role.isDefault && <Badge>Default</Badge>}
            {role.isSystem && <Badge variant="outline">System Role</Badge>}
          </div>
          <p className="text-muted-foreground mt-1">{role.description}</p>
        </div>
        {!role.isSystem && (
          <Button asChild>
            <Link href={`/settings/roles/${role.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Role
            </Link>
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>
            Permissions assigned to the {role.name} role. {role.isSystem && "System roles cannot be modified."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {role.permissions.map((category, index) => (
              <div key={index}>
                <h3 className="text-lg font-medium mb-4">{category.category}</h3>
                <div className="border rounded-lg">
                  <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b bg-muted">
                    <div>Permission</div>
                    <div className="text-center">Admin</div>
                    <div className="text-center">Lawyer</div>
                    <div className="text-center">Support Staff</div>
                  </div>
                  <div className="divide-y">
                    {category.permissions.map((permission, permIndex) => (
                      <div key={permIndex} className="grid grid-cols-4 gap-4 p-4">
                        <div>{permission.name}</div>
                        <div className="text-center">
                          <Badge
                            variant={
                              permission.admin === "Yes" ||
                              permission.admin === "All Matters" ||
                              permission.admin === "All Documents" ||
                              permission.admin === "All Contacts"
                                ? "default"
                                : "outline"
                            }
                            className={
                              permission.admin === "No"
                                ? "bg-red-100 text-red-800 hover:bg-red-100"
                                : permission.admin !== "Yes"
                                  ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                  : ""
                            }
                          >
                            {permission.admin}
                          </Badge>
                        </div>
                        <div className="text-center">
                          <Badge
                            variant={
                              permission.lawyer === "Yes" ||
                              permission.lawyer === "All Matters" ||
                              permission.lawyer === "All Documents" ||
                              permission.lawyer === "All Contacts"
                                ? "default"
                                : "outline"
                            }
                            className={
                              permission.lawyer === "No"
                                ? "bg-red-100 text-red-800 hover:bg-red-100"
                                : permission.lawyer !== "Yes"
                                  ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                  : ""
                            }
                          >
                            {permission.lawyer}
                          </Badge>
                        </div>
                        <div className="text-center">
                          <Badge
                            variant={
                              permission.support === "Yes" ||
                              permission.support === "All Matters" ||
                              permission.support === "All Documents" ||
                              permission.support === "All Contacts"
                                ? "default"
                                : "outline"
                            }
                            className={
                              permission.support === "No"
                                ? "bg-red-100 text-red-800 hover:bg-red-100"
                                : permission.support !== "Yes"
                                  ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                  : ""
                            }
                          >
                            {permission.support}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
