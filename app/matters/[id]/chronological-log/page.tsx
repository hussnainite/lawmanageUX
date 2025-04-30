"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Calendar,
  Clock,
  FileText,
  Mail,
  MessageSquare,
  Phone,
  PlusCircle,
  RefreshCw,
  StickyNote,
  Tag,
} from "lucide-react"
import EmailComposeDialog from "@/components/email-compose-dialog"

export default function ChronologicalLogPage({ params }: { params: { id: string } }) {
  const matterId = Number.parseInt(params.id)
  const [selectedEntry, setSelectedEntry] = useState<any | null>(null)
  const [filterType, setFilterType] = useState<string | null>(null)
  const [composeEmail, setComposeEmail] = useState(false)
  const [emailMode, setEmailMode] = useState<"new" | "reply" | "replyAll" | "forward">("new")

  // This would normally be fetched from an API
  // Combined log entries from documents, emails, notes, etc.
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
      title: "Initial Consultation Note",
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
      title: "Re: Initial Consultation",
      description: "Email received from John Smith with requested documents",
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
      title: "Petition for Divorce",
      description: "Petition for Divorce was created and filed",
      user: "Sarah Johnson",
      status: "Filed",
    },
    {
      id: 5,
      date: "Jan 18, 2023",
      time: "4:30 PM",
      type: "email" as const,
      title: "Financial Disclosure Requirements",
      description: "Email sent to John Smith regarding financial disclosure requirements",
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
    },
    {
      id: 6,
      date: "Jan 20, 2023",
      time: "2:00 PM",
      type: "note" as const,
      title: "Financial Documents Note",
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
      title: "Smith vs. Smith - Initial Disclosure",
      description: "Email received from opposing counsel with initial disclosure documents",
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
    },
    {
      id: 8,
      date: "Feb 2, 2023",
      time: "3:20 PM",
      type: "document" as const,
      title: "Financial Disclosure",
      description: "Financial Disclosure document was created",
      user: "Sarah Johnson",
      status: "Draft",
    },
    {
      id: 9,
      date: "Feb 10, 2023",
      time: "10:15 AM",
      type: "document" as const,
      title: "Parenting Plan",
      description: "Parenting Plan document was created",
      user: "Sarah Johnson",
      status: "Draft",
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
      type: "meeting" as const,
      title: "Initial Hearing Scheduled",
      description: "Initial Hearing scheduled for March 15, 2023 at 9:30 AM in Family Court, Room 302",
      user: "Sarah Johnson",
    },
    {
      id: 12,
      date: "Mar 10, 2023",
      time: "2:45 PM",
      type: "call" as const,
      title: "Client Call",
      description: "Phone call with client to prepare for upcoming hearing",
      user: "Sarah Johnson",
      content:
        "Spoke with John for 45 minutes to prepare for the upcoming hearing. Reviewed key points to address, potential questions from the judge, and proper courtroom etiquette. Client seems well-prepared but anxious about facing ex-spouse in court. Reassured him about the process and our preparation.",
    },
  ]

  const filteredEntries = filterType ? logEntries.filter((entry) => entry.type === filterType) : logEntries

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-4 w-4" />
      case "email":
        return <Mail className="h-4 w-4" />
      case "note":
        return <StickyNote className="h-4 w-4" />
      case "call":
        return <Phone className="h-4 w-4" />
      case "meeting":
        return <Calendar className="h-4 w-4" />
      case "matter":
        return <Tag className="h-4 w-4" />
      case "status":
        return <RefreshCw className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "document":
        return "bg-blue-100 text-blue-800"
      case "email":
        return "bg-purple-100 text-purple-800"
      case "note":
        return "bg-yellow-100 text-yellow-800"
      case "call":
        return "bg-green-100 text-green-800"
      case "meeting":
        return "bg-indigo-100 text-indigo-800"
      case "matter":
        return "bg-gray-100 text-gray-800"
      case "status":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Chronological Matter Log</h1>
          <p className="text-muted-foreground">
            A complete timeline of all matter activities, communications, and documents
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Entry
          </Button>
          <Button variant="outline" size="sm">
            Export Log
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Button variant={filterType === null ? "default" : "outline"} size="sm" onClick={() => setFilterType(null)}>
          All
        </Button>
        <Button
          variant={filterType === "document" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterType("document")}
        >
          <FileText className="mr-2 h-4 w-4" />
          Documents
        </Button>
        <Button
          variant={filterType === "email" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterType("email")}
        >
          <Mail className="mr-2 h-4 w-4" />
          Emails
        </Button>
        <Button variant={filterType === "note" ? "default" : "outline"} size="sm" onClick={() => setFilterType("note")}>
          <StickyNote className="mr-2 h-4 w-4" />
          Notes
        </Button>
        <Button variant={filterType === "call" ? "default" : "outline"} size="sm" onClick={() => setFilterType("call")}>
          <Phone className="mr-2 h-4 w-4" />
          Calls
        </Button>
        <Button
          variant={filterType === "meeting" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterType("meeting")}
        >
          <Calendar className="mr-2 h-4 w-4" />
          Meetings
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className="p-4 hover:bg-muted/50 cursor-pointer"
                onClick={() => setSelectedEntry(entry)}
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center">
                    <Badge variant="outline" className={`mr-2 ${getTypeColor(entry.type)}`}>
                      <span className="flex items-center">
                        {getTypeIcon(entry.type)}
                        <span className="ml-1 capitalize">{entry.type}</span>
                      </span>
                    </Badge>
                    <h3 className="font-medium">{entry.title}</h3>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {entry.date}
                    <Clock className="h-3 w-3 ml-2 mr-1" />
                    {entry.time}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{entry.description}</p>
                <div className="mt-2 text-sm flex justify-between">
                  <span>{entry.user}</span>
                  {entry.hasAttachments && (
                    <span className="text-muted-foreground flex items-center">
                      <FileText className="h-3 w-3 mr-1" />
                      Attachments
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedEntry && (
        <Dialog open={!!selectedEntry} onOpenChange={() => setSelectedEntry(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Badge variant="outline" className={`mr-2 ${getTypeColor(selectedEntry.type)}`}>
                  <span className="flex items-center">
                    {getTypeIcon(selectedEntry.type)}
                    <span className="ml-1 capitalize">{selectedEntry.type}</span>
                  </span>
                </Badge>
                {selectedEntry.title}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <div>
                  <span className="text-muted-foreground">Date:</span> {selectedEntry.date} at {selectedEntry.time}
                </div>
                <div>
                  <span className="text-muted-foreground">User:</span> {selectedEntry.user}
                </div>
              </div>

              {selectedEntry.type === "email" && (
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">From:</span> {selectedEntry.from}
                  </div>
                  <div>
                    <span className="text-muted-foreground">To:</span> {selectedEntry.to}
                  </div>
                </div>
              )}

              <div className="border rounded-md p-4 bg-muted/50">
                {selectedEntry.content ? (
                  selectedEntry.type === "email" ? (
                    <div dangerouslySetInnerHTML={{ __html: selectedEntry.content }} />
                  ) : (
                    <p>{selectedEntry.content}</p>
                  )
                ) : (
                  <p>{selectedEntry.description}</p>
                )}
              </div>

              {selectedEntry.attachments && selectedEntry.attachments.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Attachments</h4>
                  <div className="space-y-2">
                    {selectedEntry.attachments.map((attachment: any) => (
                      <div key={attachment.id} className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          <span>{attachment.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">{attachment.size}</span>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedEntry.type === "email" && (
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEmailMode("reply")
                      setComposeEmail(true)
                    }}
                  >
                    Reply
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEmailMode("replyAll")
                      setComposeEmail(true)
                    }}
                  >
                    Reply All
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEmailMode("forward")
                      setComposeEmail(true)
                    }}
                  >
                    Forward
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Email Compose Dialog */}
      {composeEmail && (
        <EmailComposeDialog
          isOpen={composeEmail}
          onClose={() => setComposeEmail(false)}
          matterId={matterId}
          mode={emailMode}
          originalEmail={selectedEntry?.type === "email" ? selectedEntry : undefined}
          documents={[]} // This would be populated with actual matter documents in a real app
        />
      )}
    </div>
  )
}
