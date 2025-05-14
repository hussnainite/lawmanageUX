"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface DocumentShareDialogProps {
  isOpen: boolean
  onClose: () => void
  documentName: string
  documentId: number
}

export default function DocumentShareDialog({ isOpen, onClose, documentName, documentId }: DocumentShareDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

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
    console.log("Sharing document:", documentId, "with users:", selectedUsers)
    // Close the dialog
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Share Document</DialogTitle>
            <DialogDescription>Share this document with other side users</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="document">Document</Label>
              <Input id="document" value={documentName} disabled className="bg-gray-50" />
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
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={selectedUsers.length === 0}>
              Share Document
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
