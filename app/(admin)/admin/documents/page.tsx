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
import { FileText, MoreHorizontal, Search, Share2 } from "lucide-react"

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // This would be fetched from an API in a real implementation
  const documents = [
    {
      id: "doc-1",
      title: "Settlement Agreement - Draft",
      category: "Agreements",
      status: "Shared",
      sharedWith: 3,
      lastUpdated: "2023-04-15T10:30:00Z",
    },
    {
      id: "doc-2",
      title: "Financial Disclosure Form",
      category: "Forms",
      status: "Shared",
      sharedWith: 1,
      lastUpdated: "2023-04-12T14:45:00Z",
    },
    {
      id: "doc-3",
      title: "Custody Arrangement Proposal",
      category: "Proposals",
      status: "Shared",
      sharedWith: 2,
      lastUpdated: "2023-04-10T09:15:00Z",
    },
    {
      id: "doc-4",
      title: "Mediation Summary",
      category: "Summaries",
      status: "Not Shared",
      sharedWith: 0,
      lastUpdated: "2023-04-05T11:20:00Z",
    },
    {
      id: "doc-5",
      title: "Property Division Agreement",
      category: "Agreements",
      status: "Shared",
      sharedWith: 4,
      lastUpdated: "2023-04-01T16:00:00Z",
    },
  ]

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground mt-1">Manage documents shared with counterparties</p>
        </div>
        <Button asChild>
          <Link href="/admin/documents/share">
            <Share2 className="mr-2 h-4 w-4" />
            Share Document
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search documents..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="shared">Shared</SelectItem>
            <SelectItem value="not-shared">Not Shared</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="agreements">Agreements</SelectItem>
            <SelectItem value="forms">Forms</SelectItem>
            <SelectItem value="proposals">Proposals</SelectItem>
            <SelectItem value="summaries">Summaries</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Shared With</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocuments.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div className="font-medium">{doc.title}</div>
                  </div>
                </TableCell>
                <TableCell>{doc.category}</TableCell>
                <TableCell>
                  <Badge variant={doc.status === "Shared" ? "success" : "secondary"}>{doc.status}</Badge>
                </TableCell>
                <TableCell>{doc.sharedWith} users</TableCell>
                <TableCell>{new Date(doc.lastUpdated).toLocaleDateString()}</TableCell>
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
                        <Link href={`/admin/documents/${doc.id}`}>View Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/documents/${doc.id}/share`}>Share</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/documents/${doc.id}/access`}>Manage Access</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Remove Sharing</DropdownMenuItem>
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
