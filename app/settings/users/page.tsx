"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Search, UserPlus } from "lucide-react"

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // This would be fetched from an API in a real implementation
  const users = [
    {
      id: "user-1",
      name: "Sarah Johnson",
      email: "sarah.johnson@lawmanage.com",
      role: "Admin",
      status: "Active",
      lastActive: "2023-04-18T11:05:00Z",
      avatar: "/javascript-code-abstract.png",
      initials: "SJ",
    },
    {
      id: "user-2",
      name: "Michael Brown",
      email: "michael.brown@lawmanage.com",
      role: "Lawyer",
      status: "Active",
      lastActive: "2023-04-17T14:20:00Z",
      avatar: "/stylized-ej-initials.png",
      initials: "MB",
    },
    {
      id: "user-3",
      name: "Jennifer Davis",
      email: "jennifer.davis@lawmanage.com",
      role: "Lawyer",
      status: "Active",
      lastActive: "2023-04-16T09:15:00Z",
      avatar: "/abstract-blue-burst.png",
      initials: "JD",
    },
    {
      id: "user-4",
      name: "Robert Wilson",
      email: "robert.wilson@lawmanage.com",
      role: "Support Staff",
      status: "Active",
      lastActive: "2023-04-15T10:30:00Z",
      avatar: "/abstract-southwest.png",
      initials: "RW",
    },
    {
      id: "user-5",
      name: "Emily Thompson",
      email: "emily.thompson@lawmanage.com",
      role: "Support Staff",
      status: "Inactive",
      lastActive: "2023-04-10T15:45:00Z",
      avatar: "/abstract-dl.png",
      initials: "ET",
    },
  ]

  const filteredUsers = users.filter(
    (user) =>
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (roleFilter === "all" || user.role.toLowerCase() === roleFilter.toLowerCase()) &&
      (statusFilter === "all" || user.status.toLowerCase() === statusFilter.toLowerCase()),
  )

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-muted-foreground mt-1">Manage users and their access permissions</p>
        </div>
        <Button asChild>
          <Link href="/settings/users/new">
            <UserPlus className="mr-2 h-4 w-4" />
            Add New User
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="lawyer">Lawyer</SelectItem>
            <SelectItem value="support staff">Support Staff</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={user.role === "Admin" ? "default" : user.role === "Lawyer" ? "secondary" : "outline"}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={user.status === "Active" ? "success" : "destructive"}
                    className={user.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(user.lastActive).toLocaleDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/settings/users/${user.id}`}>View Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/settings/users/${user.id}/edit`}>Edit User</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/settings/users/${user.id}/permissions`}>Manage Permissions</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {user.status === "Active" ? (
                        <DropdownMenuItem className="text-red-600">Deactivate User</DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="text-green-600">Activate User</DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
