"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Search, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function ShareDocumentPage() {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  // This would be fetched from an API in a real implementation
  const documents = [
    { id: "doc-1", title: "Settlement Agreement - Draft", category: "Agreements" },
    { id: "doc-2", title: "Financial Disclosure Form", category: "Forms" },
    { id: "doc-3", title: "Custody Arrangement Proposal", category: "Proposals" },
    { id: "doc-4", title: "Mediation Summary", category: "Summaries" },
    { id: "doc-5", title: "Property Division Agreement", category: "Agreements" },
  ]

  // This would be fetched from an API in a real implementation
  const users = [
    {
      id: "user-1",
      name: "John Smith",
      email: "john.smith@example.com",
      company: "Smith Enterprises",
      avatar: "/javascript-code-abstract.png",
    },
    {
      id: "user-2",
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      company: "Johnson Legal",
      avatar: "/stylized-ej-initials.png",
    },
    {
      id: "user-3",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      company: "Brown Consulting",
      avatar: "/abstract-blue-burst.png",
    },
    {
      id: "user-4",
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      company: "Wilson & Partners",
      avatar: "/abstract-southwest.png",
    },
    {
      id: "user-5",
      name: "David Lee",
      email: "david.lee@example.com",
      company: "Lee Associates",
      avatar: "/abstract-dl.png",
    },
  ]

  const filteredUsers = users.filter(
    (user) =>
      !selectedUsers.includes(user.id) &&
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.company.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleSelectUser = (userId: string) => {
    setSelectedUsers((prev) => [...prev, userId])
    setSearchQuery("")
  }

  const handleRemoveUser = (userId: string) => {
    setSelectedUsers((prev) => prev.filter((id) => id !== userId))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, this would make an API call to share the document
    console.log("Sharing document:", selectedDocument, "with users:", selectedUsers)
    // Then redirect to the documents list
  }

  return (
    <div>
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/admin/documents">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Documents
        </Link>
      </Button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Share Document</h1>
          <p className="text-muted-foreground mt-1">Share a document with counterparty users</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Document Sharing</CardTitle>
            <CardDescription>Select a document and users to share it with</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="document">Document</Label>
              <Select value={selectedDocument || ""} onValueChange={setSelectedDocument} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a document to share" />
                </SelectTrigger>
                <SelectContent>
                  {documents.map((doc) => (
                    <SelectItem key={doc.id} value={doc.id}>
                      {doc.title} ({doc.category})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Access Level</Label>
              <Select defaultValue="standard">
                <SelectTrigger>
                  <SelectValue placeholder="Select access level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="readonly">Read Only</SelectItem>
                  <SelectItem value="standard">Standard (Read & Comment)</SelectItem>
                  <SelectItem value="extended">Extended (Read, Comment & Update)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Share With</Label>

              {selectedUsers.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedUsers.map((userId) => {
                    const user = users.find((u) => u.id === userId)
                    if (!user) return null

                    return (
                      <Badge key={userId} variant="secondary" className="flex items-center gap-1 pl-1">
                        <Avatar className="h-5 w-5 mr-1">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {user.name}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 ml-1 hover:bg-transparent"
                          onClick={() => handleRemoveUser(userId)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    )
                  })}
                </div>
              )}

              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search users..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {searchQuery && filteredUsers.length > 0 && (
                <div className="border rounded-md mt-1 max-h-60 overflow-auto">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-3 p-2 hover:bg-muted cursor-pointer"
                      onClick={() => handleSelectUser(user.id)}
                    >
                      <Avatar>
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <Input id="message" placeholder="Add a message to the recipients" />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="notify" defaultChecked />
              <Label htmlFor="notify">Send email notification to users</Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/admin/documents">Cancel</Link>
            </Button>
            <Button type="submit" disabled={!selectedDocument || selectedUsers.length === 0}>
              Share Document
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
