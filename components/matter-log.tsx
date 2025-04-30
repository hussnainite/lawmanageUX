"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  FileText,
  Mail,
  MessageSquare,
  Calendar,
  Clock,
  PenTool,
  Paperclip,
  Download,
  Eye,
  Plus,
  MoreHorizontal,
  Filter,
} from "lucide-react"

// Define types for our log entries
interface LogEntry {
  id: number
  date: string
  time: string
  type: "document" | "email" | "note" | "meeting" | "call" | "status" | "matter"
  title: string
  description: string
  user: string
  hasAttachments?: boolean
  attachments?: {
    id: number
    name: string
    type: string
    size: string
  }[]
  content?: string
  from?: string
  to?: string
  status?: string
}

interface MatterLogProps {
  matterId: number
  entries: LogEntry[]
}

export default function MatterLog({ matterId, entries }: MatterLogProps) {
  const [selectedEntry, setSelectedEntry] = useState<LogEntry | null>(null)
  const [filterType, setFilterType] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")

  // Sort entries by date and time (newest first)
  const sortedEntries = [...entries].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`).getTime()
    const dateB = new Date(`${b.date} ${b.time}`).getTime()
    return dateB - dateA // Descending order (newest first)
  })

  // Filter entries based on type and search query
  const filteredEntries = sortedEntries.filter((entry) => {
    const matchesType = filterType === "all" || entry.type === filterType
    const matchesSearch =
      searchQuery === "" ||
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  // Function to get the appropriate icon for each entry type
  const getEntryIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-5 w-5" />
      case "email":
        return <Mail className="h-5 w-5" />
      case "note":
        return <PenTool className="h-5 w-5" />
      case "meeting":
        return <Calendar className="h-5 w-5" />
      case "call":
        return <MessageSquare className="h-5 w-5" />
      case "status":
        return <Clock className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  // Function to get the appropriate background color for each entry type
  const getEntryColor = (type: string) => {
    switch (type) {
      case "document":
        return "bg-amber-100 text-amber-600"
      case "email":
        return "bg-purple-100 text-purple-600"
      case "note":
        return "bg-green-100 text-green-600"
      case "meeting":
        return "bg-indigo-100 text-indigo-600"
      case "call":
        return "bg-rose-100 text-rose-600"
      case "status":
        return "bg-gray-100 text-gray-600"
      case "matter":
        return "bg-blue-100 text-blue-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  // Group entries by date for better organization
  const entriesByDate = filteredEntries.reduce(
    (groups, entry) => {
      if (!groups[entry.date]) {
        groups[entry.date] = []
      }
      groups[entry.date].push(entry)
      return groups
    },
    {} as Record<string, LogEntry[]>,
  )

  // Convert date string to more readable format
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (dateStr === today.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })) {
      return "Today"
    } else if (dateStr === yesterday.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })) {
      return "Yesterday"
    } else {
      return dateStr
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Matter Log</CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-3 w-3 mr-1" /> Advanced Filter
          </Button>
          <Button size="sm">
            <Plus className="h-3 w-3 mr-1" /> Add Entry
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search matter log..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Entries</SelectItem>
                <SelectItem value="document">Documents</SelectItem>
                <SelectItem value="email">Emails</SelectItem>
                <SelectItem value="note">Notes</SelectItem>
                <SelectItem value="meeting">Meetings</SelectItem>
                <SelectItem value="call">Calls</SelectItem>
                <SelectItem value="status">Status Changes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-6">
            {Object.keys(entriesByDate).length > 0 ? (
              Object.keys(entriesByDate).map((date) => (
                <div key={date} className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500 sticky top-0 bg-white py-1">{formatDate(date)}</h3>
                  <div className="space-y-4">
                    {entriesByDate[date].map((entry) => (
                      <div
                        key={entry.id}
                        className="flex space-x-4 p-4 border rounded-lg hover:border-gray-300 cursor-pointer transition-colors"
                        onClick={() => setSelectedEntry(entry)}
                      >
                        <div
                          className={`h-10 w-10 rounded-full ${getEntryColor(
                            entry.type,
                          )} flex items-center justify-center shrink-0`}
                        >
                          {getEntryIcon(entry.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium">{entry.title}</h4>
                              <span className="text-xs text-gray-500">{entry.time}</span>
                            </div>
                            <Badge variant="outline" className="capitalize">
                              {entry.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-700 line-clamp-2">{entry.description}</p>
                          <div className="mt-2 flex justify-between items-center">
                            <span className="text-xs text-gray-500">By: {entry.user}</span>
                            {entry.hasAttachments && (
                              <Badge variant="outline" className="flex items-center">
                                <Paperclip className="h-3 w-3 mr-1" />
                                {entry.attachments?.length || ""}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                <h3 className="text-lg font-medium">No entries found</h3>
                <p className="text-sm">Try adjusting your filters or search query</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      {/* Entry Detail Dialog */}
      {selectedEntry && (
        <Dialog open={!!selectedEntry} onOpenChange={() => setSelectedEntry(null)}>
          <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedEntry.title}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="flex items-center space-x-3">
                <div
                  className={`h-8 w-8 rounded-full ${getEntryColor(selectedEntry.type)} flex items-center justify-center`}
                >
                  {getEntryIcon(selectedEntry.type)}
                </div>
                <div>
                  <Badge variant="outline" className="capitalize">
                    {selectedEntry.type}
                  </Badge>
                  <span className="text-sm text-gray-500 ml-2">
                    {selectedEntry.date} at {selectedEntry.time}
                  </span>
                </div>
              </div>

              {selectedEntry.type === "email" && (
                <>
                  <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                    <div className="font-medium text-gray-500">From:</div>
                    <div>{selectedEntry.from}</div>

                    <div className="font-medium text-gray-500">To:</div>
                    <div>{selectedEntry.to}</div>

                    <div className="font-medium text-gray-500">Subject:</div>
                    <div>{selectedEntry.title}</div>
                  </div>

                  <Separator />
                </>
              )}

              {selectedEntry.type === "document" && selectedEntry.status && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Status: </span>
                  <Badge variant={selectedEntry.status === "Filed" ? "default" : "outline"}>
                    {selectedEntry.status}
                  </Badge>
                </div>
              )}

              <div className="prose prose-sm max-w-none">
                {selectedEntry.content ? (
                  <div dangerouslySetInnerHTML={{ __html: selectedEntry.content }} />
                ) : (
                  <p>{selectedEntry.description}</p>
                )}
              </div>

              {selectedEntry.hasAttachments && selectedEntry.attachments && selectedEntry.attachments.length > 0 && (
                <>
                  <Separator />

                  <div>
                    <h4 className="text-sm font-medium mb-2">Attachments ({selectedEntry.attachments.length})</h4>
                    <div className="space-y-2">
                      {selectedEntry.attachments.map((attachment) => (
                        <div
                          key={attachment.id}
                          className="flex items-center justify-between p-2 border rounded-md hover:bg-gray-50"
                        >
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-gray-400" />
                            <span>{attachment.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {attachment.type}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">{attachment.size}</span>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-between items-center pt-2">
                <span className="text-sm text-gray-500">Added by: {selectedEntry.user}</span>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4 mr-1" /> Actions
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  )
}
