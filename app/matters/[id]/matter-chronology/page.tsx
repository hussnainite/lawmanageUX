"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  FileText,
  Mail,
  MessageSquare,
  Calendar,
  Clock,
  PenTool,
  Paperclip,
  Download,
  Eye,
  MoreHorizontal,
  RefreshCw,
  Briefcase,
  Edit,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  Tag,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"

export default function MatterChronologyPage({ params }: { params: { id: string } }) {
  const matterId = Number.parseInt(params.id)
  const [selectedEntry, setSelectedEntry] = useState<any | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [sortField, setSortField] = useState("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [selectedEntries, setSelectedEntries] = useState<number[]>([])

  // This would normally be fetched from an API
  const logEntries = [
    {
      id: 1,
      date: "Jan 10, 2023",
      time: "9:00 AM",
      type: "matter" as const,
      title: "Matter Created",
      description: "Matter was created and assigned to Sarah Johnson",
      user: "System",
    },
    {
      id: 2,
      date: "Jan 10, 2023",
      time: "10:30 AM",
      type: "note" as const,
      title: "Note by Sarah Johnson",
      description: "Initial consultation with client. Discussed divorce process and custody concerns.",
      user: "Sarah Johnson",
      content:
        "Client John Smith came in for initial consultation. We discussed the divorce process, potential custody arrangements for their two children, and preliminary property division considerations. Client expressed concerns about wife's recent behavior and potential impact on children. Advised on documentation needed for next steps.",
    },
    {
      id: 3,
      date: "Jan 12, 2023",
      time: "2:15 PM",
      type: "email" as const,
      title: "Email from John Smith",
      description: "Re: Initial Consultation",
      from: "john.smith@example.com",
      to: "sarah.johnson@lawmanage.com",
      user: "John Smith",
      hasAttachments: true,
      content: `<p>Dear Sarah,</p>
      <p>Thank you for meeting with me yesterday. I've attached the documents you requested during our initial consultation.</p>
      <p>These include:</p>
      <ul>
        <li>Bank statements from the last 6 months</li>
        <li>Property deed for our family home</li>
        <li>Children's school enrollment information</li>
      </ul>
      <p>Please let me know if you need anything else from me at this time.</p>
      <p>Regards,<br>John Smith</p>`,
      attachments: [
        { id: 101, name: "Bank_Statements_July-Dec.pdf", type: "PDF", size: "2.4 MB" },
        { id: 102, name: "Property_Deed.pdf", type: "PDF", size: "1.1 MB" },
        { id: 103, name: "School_Enrollment.docx", type: "DOCX", size: "540 KB" },
      ],
    },
    {
      id: 4,
      date: "Jan 15, 2023",
      time: "11:00 AM",
      type: "document" as const,
      title: "Document Created: Petition for Divorce",
      description: "Petition for Divorce was created and filed",
      user: "Sarah Johnson",
      status: "Filed",
      documentType: "Legal Document",
    },
    {
      id: 5,
      date: "Jan 18, 2023",
      time: "4:30 PM",
      type: "email" as const,
      title: "Email from Sarah Johnson",
      description: "Financial Disclosure Requirements",
      from: "sarah.johnson@lawmanage.com",
      to: "john.smith@example.com",
      user: "Sarah Johnson",
      hasAttachments: true,
      content: `<p>Dear John,</p>
      <p>Following our recent meeting, I wanted to outline the financial documents we'll need to proceed with your case:</p>
      <ol>
        <li>Complete tax returns for the past 3 years</li>
        <li>Statements for all retirement and investment accounts</li>
        <li>Documentation of any outstanding loans or debts</li>
        <li>Recent pay stubs (last 3 months)</li>
      </ol>
      <p>I've attached our standard financial disclosure form for you to complete. Please return this at your earliest convenience.</p>
      <p>Best regards,<br>Sarah Johnson<br>Family Law Attorney</p>`,
      attachments: [{ id: 201, name: "Financial_Disclosure_Form.pdf", type: "PDF", size: "850 KB" }],
      relatedTo: 8, // Related to Financial Disclosure document
    },
    {
      id: 6,
      date: "Jan 20, 2023",
      time: "2:00 PM",
      type: "note" as const,
      title: "Note by Sarah Johnson",
      description: "Client provided financial documents. Need to follow up on missing bank statements.",
      user: "Sarah Johnson",
      content:
        "Client dropped off most of the requested financial documents today. Still missing bank statements from joint account and retirement account statements. Will follow up via email next week if not received.",
    },
    {
      id: 7,
      date: "Jan 25, 2023",
      time: "9:45 AM",
      type: "email" as const,
      title: "Email from Opposing Counsel",
      description: "Smith vs. Smith - Initial Disclosure",
      from: "opposing.counsel@example.com",
      to: "sarah.johnson@lawmanage.com",
      user: "Opposing Counsel",
      hasAttachments: true,
      content: `<p>Counselor Johnson,</p>
      <p>Please find attached the initial disclosure documents for our client, Jane Smith, in the matter of Smith vs. Smith.</p>
      <p>The documents include:</p>
      <ul>
        <li>Financial statement</li>
        <li>Asset inventory</li>
        <li>Proposed parenting plan</li>
      </ul>
      <p>We look forward to working with you to reach an amicable resolution in this matter.</p>
      <p>Regards,<br>James Wilson<br>Wilson Family Law</p>`,
      attachments: [
        { id: 301, name: "Jane_Smith_Financial_Statement.pdf", type: "PDF", size: "1.8 MB" },
        { id: 302, name: "Asset_Inventory.xlsx", type: "XLSX", size: "720 KB" },
        { id: 303, name: "Proposed_Parenting_Plan.pdf", type: "PDF", size: "950 KB" },
      ],
      relatedTo: 9, // Related to Parenting Plan document
    },
    {
      id: 8,
      date: "Feb 2, 2023",
      time: "3:20 PM",
      type: "document" as const,
      title: "Document Created: Financial Disclosure",
      description: "Financial Disclosure document was created",
      user: "Sarah Johnson",
      status: "Draft",
      documentType: "Financial",
    },
    {
      id: 9,
      date: "Feb 10, 2023",
      time: "10:15 AM",
      type: "document" as const,
      title: "Document Created: Parenting Plan",
      description: "Parenting Plan document was created",
      user: "Sarah Johnson",
      status: "Draft",
      documentType: "Agreement",
    },
    {
      id: 10,
      date: "Feb 15, 2023",
      time: "11:30 AM",
      type: "status" as const,
      title: "Status Update",
      description: "Matter status updated to 'In Progress'",
      user: "Sarah Johnson",
    },
    {
      id: 11,
      date: "Mar 1, 2023",
      time: "9:00 AM",
      type: "hearing" as const,
      title: "Initial Hearing Scheduled",
      description: "Initial Hearing scheduled for March 15, 2023 at 9:30 AM in Family Court, Room 302",
      user: "Sarah Johnson",
      hearingDetails: {
        date: "Mar 15, 2023",
        time: "9:30 AM",
        location: "Family Court, Room 302",
        judge: "Hon. Robert Wilson",
      },
    },
    {
      id: 12,
      date: "Mar 10, 2023",
      time: "2:45 PM",
      type: "call" as const,
      title: "Client Call",
      description: "Phone call with client to prepare for upcoming hearing",
      user: "Sarah Johnson",
      callDetails: {
        with: "John Smith",
        duration: "25 minutes",
      },
      content:
        "Spoke with John for 45 minutes to prepare for the upcoming hearing. Reviewed key points to address, potential questions from the judge, and proper courtroom etiquette. Client seems well-prepared but anxious about facing ex-spouse in court. Reassured him about the process and our preparation.",
    },
  ]

  // Filter entries based on type and search query
  const filteredEntries = logEntries.filter((entry) => {
    const matchesType = filterType === "all" || entry.type === filterType
    const matchesSearch =
      searchQuery === "" ||
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (entry.from && entry.from.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (entry.to && entry.to.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesType && matchesSearch
  })

  // Sort entries
  const sortedEntries = [...filteredEntries].sort((a, b) => {
    let aValue, bValue

    // Determine values to compare based on sort field
    switch (sortField) {
      case "date":
        aValue = new Date(`${a.date} ${a.time}`).getTime()
        bValue = new Date(`${b.date} ${b.time}`).getTime()
        break
      case "type":
        aValue = a.type
        bValue = b.type
        break
      case "title":
        aValue = a.title
        bValue = b.title
        break
      case "user":
        aValue = a.user
        bValue = b.user
        break
      default:
        aValue = new Date(`${a.date} ${a.time}`).getTime()
        bValue = new Date(`${b.date} ${b.time}`).getTime()
    }

    // Apply sort direction
    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  // Function to handle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      // Set new field and default to descending
      setSortField(field)
      setSortDirection("desc")
    }
  }

  // Function to get the appropriate icon for each entry type
  const getEntryIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-4 w-4" />
      case "email":
        return <Mail className="h-4 w-4" />
      case "note":
        return <PenTool className="h-4 w-4" />
      case "call":
        return <MessageSquare className="h-4 w-4" />
      case "hearing":
        return <Calendar className="h-4 w-4" />
      case "status":
        return <RefreshCw className="h-4 w-4" />
      case "matter":
        return <Briefcase className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
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
      case "call":
        return "bg-rose-100 text-rose-600"
      case "hearing":
        return "bg-indigo-100 text-indigo-600"
      case "status":
        return "bg-gray-100 text-gray-600"
      case "matter":
        return "bg-blue-100 text-blue-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  // Handle checkbox selection
  const toggleEntrySelection = (id: number) => {
    setSelectedEntries((prev) => (prev.includes(id) ? prev.filter((entryId) => entryId !== id) : [...prev, id]))
  }

  // Handle select all
  const toggleSelectAll = () => {
    if (selectedEntries.length === sortedEntries.length) {
      setSelectedEntries([])
    } else {
      setSelectedEntries(sortedEntries.map((entry) => entry.id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/matters/${matterId}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Smith vs. Smith</h1>
          <Badge variant="default">Open</Badge>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Matter Chronology</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search..."
                className="pl-8 w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4" />
            </Button>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Activities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Activities</SelectItem>
                <SelectItem value="document">Documents</SelectItem>
                <SelectItem value="email">Emails</SelectItem>
                <SelectItem value="note">Notes</SelectItem>
                <SelectItem value="call">Calls</SelectItem>
                <SelectItem value="hearing">Hearings</SelectItem>
                <SelectItem value="status">Status Updates</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showFilters && (
            <div className="mb-4 p-4 border rounded-md bg-gray-50">
              <div className="flex flex-wrap gap-4">
                <div className="w-[200px]">
                  <label className="text-sm font-medium mb-1 block">Date Range</label>
                  <Select defaultValue="all-time">
                    <SelectTrigger>
                      <SelectValue placeholder="All Time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-time">All Time</SelectItem>
                      <SelectItem value="last-week">Last Week</SelectItem>
                      <SelectItem value="last-month">Last Month</SelectItem>
                      <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                      <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                      <SelectItem value="last-year">Last Year</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-[200px]">
                  <label className="text-sm font-medium mb-1 block">User</label>
                  <Select defaultValue="all-users">
                    <SelectTrigger>
                      <SelectValue placeholder="All Users" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-users">All Users</SelectItem>
                      <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                      <SelectItem value="john-smith">John Smith</SelectItem>
                      <SelectItem value="opposing-counsel">Opposing Counsel</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox
                      checked={selectedEntries.length === sortedEntries.length && sortedEntries.length > 0}
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead className="w-[150px] cursor-pointer" onClick={() => handleSort("date")}>
                    <div className="flex items-center">
                      Date
                      {sortField === "date" && (
                        <span className="ml-1">
                          {sortDirection === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="w-[100px] cursor-pointer" onClick={() => handleSort("type")}>
                    <div className="flex items-center">
                      Type
                      {sortField === "type" && (
                        <span className="ml-1">
                          {sortDirection === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("title")}>
                    <div className="flex items-center">
                      Activity
                      {sortField === "title" && (
                        <span className="ml-1">
                          {sortDirection === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="w-[120px] cursor-pointer" onClick={() => handleSort("user")}>
                    <div className="flex items-center">
                      User
                      {sortField === "user" && (
                        <span className="ml-1">
                          {sortDirection === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="w-[150px]">From/To</TableHead>
                  <TableHead className="w-[80px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedEntries.length > 0 ? (
                  sortedEntries.map((entry) => (
                    <TableRow key={entry.id} className="hover:bg-gray-50">
                      <TableCell className="p-2">
                        <Checkbox
                          checked={selectedEntries.includes(entry.id)}
                          onCheckedChange={() => toggleEntrySelection(entry.id)}
                          aria-label={`Select ${entry.title}`}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </TableCell>
                      <TableCell className="font-medium p-2" onClick={() => setSelectedEntry(entry)}>
                        <div>{entry.date}</div>
                        <div className="text-xs text-gray-500">{entry.time}</div>
                      </TableCell>
                      <TableCell className="p-2" onClick={() => setSelectedEntry(entry)}>
                        <div className="flex items-center space-x-2">
                          <div
                            className={`h-6 w-6 rounded-full ${getEntryColor(entry.type)} flex items-center justify-center`}
                          >
                            {getEntryIcon(entry.type)}
                          </div>
                          <span className="text-xs capitalize">{entry.type}</span>
                        </div>
                      </TableCell>
                      <TableCell className="p-2" onClick={() => setSelectedEntry(entry)}>
                        <div className="font-medium">{entry.title}</div>
                        {entry.hasAttachments && (
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Paperclip className="h-3 w-3 mr-1" />
                            <span>Attachments</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="p-2" onClick={() => setSelectedEntry(entry)}>
                        {entry.user}
                      </TableCell>
                      <TableCell className="p-2" onClick={() => setSelectedEntry(entry)}>
                        {entry.type === "email" && (
                          <div className="text-xs">
                            <div>From: {entry.from?.split("@")[0]}</div>
                            <div>To: {entry.to?.split("@")[0]}</div>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right p-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedEntry(entry)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            {entry.type === "document" && (
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                            )}
                            {(entry.type === "note" || entry.type === "document") && (
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      <FileText className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                      <h3 className="text-lg font-medium">No entries found</h3>
                      <p className="text-sm">Try adjusting your filter</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {selectedEntries.length > 0 && (
            <div className="mt-4 flex items-center justify-between bg-gray-50 p-2 rounded-md">
              <span className="text-sm font-medium">{selectedEntries.length} items selected</span>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Tag className="h-4 w-4 mr-2" /> Tag
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" /> Export
                </Button>
                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedEntries([])}>
                  Clear
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

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
                    <div>{selectedEntry.description}</div>
                  </div>

                  <div className="border-t border-b py-4 my-2">
                    <div className="prose prose-sm max-w-none">
                      {selectedEntry.content ? (
                        <div dangerouslySetInnerHTML={{ __html: selectedEntry.content }} />
                      ) : (
                        <p>{selectedEntry.description}</p>
                      )}
                    </div>
                  </div>
                </>
              )}

              {selectedEntry.type === "document" && (
                <>
                  <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                    <div className="font-medium text-gray-500">Document Type:</div>
                    <div>{selectedEntry.documentType || "Legal Document"}</div>

                    <div className="font-medium text-gray-500">Status:</div>
                    <div>
                      <Badge variant={selectedEntry.status === "Filed" ? "default" : "outline"}>
                        {selectedEntry.status}
                      </Badge>
                    </div>

                    <div className="font-medium text-gray-500">Created Date:</div>
                    <div>{selectedEntry.date}</div>
                  </div>

                  <div className="border-t border-b py-4 my-2">
                    <div className="prose prose-sm max-w-none">
                      <p>{selectedEntry.description}</p>
                      <p className="text-gray-500 italic">
                        Document content would be displayed here in a real application.
                      </p>
                    </div>
                  </div>
                </>
              )}

              {selectedEntry.type === "note" && (
                <div className="border-t border-b py-4 my-2">
                  <div className="prose prose-sm max-w-none">
                    <p>{selectedEntry.content || selectedEntry.description}</p>
                  </div>
                </div>
              )}

              {selectedEntry.type === "call" && (
                <>
                  <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                    <div className="font-medium text-gray-500">Call With:</div>
                    <div>{selectedEntry.callDetails?.with || "Client"}</div>

                    <div className="font-medium text-gray-500">Duration:</div>
                    <div>{selectedEntry.callDetails?.duration || "Unknown"}</div>
                  </div>

                  <div className="border-t border-b py-4 my-2">
                    <div className="prose prose-sm max-w-none">
                      <p>{selectedEntry.content || selectedEntry.description}</p>
                    </div>
                  </div>
                </>
              )}

              {selectedEntry.hasAttachments && selectedEntry.attachments && selectedEntry.attachments.length > 0 && (
                <>
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

              {selectedEntry.relatedTo && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Related Entry</h4>
                  <div className="space-y-2">
                    {(() => {
                      const relatedEntry = logEntries.find((e) => e.id === selectedEntry.relatedTo)
                      return relatedEntry ? (
                        <div
                          className="flex items-center justify-between p-2 border rounded-md hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            setSelectedEntry(relatedEntry)
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            <div
                              className={`h-6 w-6 rounded-full ${getEntryColor(relatedEntry.type)} flex items-center justify-center`}
                            >
                              {getEntryIcon(relatedEntry.type)}
                            </div>
                            <div>
                              <span className="text-sm font-medium">{relatedEntry.title}</span>
                              <div className="text-xs text-gray-500">
                                {relatedEntry.date} at {relatedEntry.time}
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline" className="capitalize">
                            {relatedEntry.type}
                          </Badge>
                        </div>
                      ) : null
                    })()}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-2">
                <span className="text-sm text-gray-500">Added by: {selectedEntry.user}</span>
                <div className="flex space-x-2">
                  {selectedEntry.type === "document" && (
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" /> Download
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4 mr-1" /> Actions
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
