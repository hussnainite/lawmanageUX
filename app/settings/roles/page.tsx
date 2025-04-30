import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Shield } from "lucide-react"

export default function RolesPage() {
  // This would be fetched from an API in a real implementation
  const roles = [
    {
      id: "admin",
      name: "Admin",
      description: "Full access to all features and settings",
      userCount: 2,
      isDefault: false,
      isSystem: true,
    },
    {
      id: "lawyer",
      name: "Lawyer",
      description: "Access to assigned matters and related features",
      userCount: 5,
      isDefault: true,
      isSystem: true,
    },
    {
      id: "support",
      name: "Support Staff",
      description: "Limited access to specific features",
      userCount: 3,
      isDefault: false,
      isSystem: true,
    },
    {
      id: "paralegal",
      name: "Paralegal",
      description: "Access to documents and matter preparation",
      userCount: 0,
      isDefault: false,
      isSystem: false,
    },
  ]

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Role Management</h1>
          <p className="text-muted-foreground mt-1">Manage user roles and permissions</p>
        </div>
        <Button asChild>
          <Link href="/settings/roles/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Role
          </Link>
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>System Roles</CardTitle>
          <CardDescription>Default roles with predefined permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles
                .filter((role) => role.isSystem)
                .map((role) => (
                  <TableRow key={role.id}>
                    <TableCell>
                      <div className="font-medium">{role.name}</div>
                    </TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell>{role.userCount} users</TableCell>
                    <TableCell>{role.isDefault && <Badge>Default</Badge>}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/settings/roles/${role.id}`}>
                          <Shield className="mr-2 h-4 w-4" />
                          View Permissions
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Custom Roles</CardTitle>
          <CardDescription>Custom roles created for specific needs</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles
                .filter((role) => !role.isSystem)
                .map((role) => (
                  <TableRow key={role.id}>
                    <TableCell>
                      <div className="font-medium">{role.name}</div>
                    </TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell>{role.userCount} users</TableCell>
                    <TableCell>{role.isDefault && <Badge>Default</Badge>}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/settings/roles/${role.id}`}>
                            <Shield className="mr-2 h-4 w-4" />
                            View Permissions
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/settings/roles/${role.id}/edit`}>Edit</Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              {roles.filter((role) => !role.isSystem).length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    No custom roles created yet.{" "}
                    <Link href="/settings/roles/new" className="text-primary hover:underline">
                      Create your first custom role
                    </Link>
                    .
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
