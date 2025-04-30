"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Edit,
  FileText,
  MoreHorizontal,
  Plus,
  Users,
  Briefcase,
  AlertTriangle,
  Search,
  Mail,
  MessageSquare,
  CheckCircle,
  RefreshCw,
  PenTool,
  UploadCloud,
  Download,
  Eye,
  Paperclip,
  Phone,
  MapPin,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import AddDocumentDialog from "@/components/add-document-dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// Import the DocumentRow component at the top of the file
import DocumentRow from "@/components/document-row"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import EmailComposeDialog from "@/components/email-compose-dialog"

interface Document {
  id: number
  name: string
  type: string
  date: string
  status: string
  timestamp?: string // For sorting in chronological order
}

interface Email {
  id: number
  date: string
  time?: string
  timestamp?: string // For sorting in chronological order
  from: string
  to: string
  subject: string
  preview: string
  content?: string
  hasAttachments: boolean
  attachments?: {
    id: number
    name: string
    type: string
    size: string
  }[]
  relatedDocumentId?: number
}

interface Note {
  id: number
  date: string
  time?: string
  timestamp?: string // For sorting in chronological order
  author: string
  content: string
}

interface Call {
  id: number
  date: string
  time: string
  timestamp?: string // For sorting in chronological order
  with: string
  duration: string
  notes: string
}

interface LogEntry {
  id: number
  type: "document" | "email" | "note" | "call" | "hearing" | "status"
  date: string
  time: string
  timestamp: string // For sorting in chronological order
  title: string
  description: string
  user: string
  data: Document | Email | Note | Call | any // The actual data object
  relatedEntries?: number[] // IDs of related log entries
}

interface Matter {
  id: number
  title: string
  type: string
  status: string
  billingType: string
  matterOpened?: string
  matterClosed?: string
  partnerSupervising?: {
    id: number
    name: string
    email: string
    avatar: string
  }
  assistingLawyer?: {
    id: number
    name: string
    email: string
    avatar: string
  }
  clients: {
    id: number
    name: string
    email: string
    phone: string
    tags: string[]
  }[]
  opposingParties: {
    id: number
    name: string
    email: string
    phone: string
    tags: string[]
  }[]
  otherParties: {
    id: number
    name: string
    email: string
    phone: string
    role: string
    tags: string[]
  }[]
  children: { id: number; name: string; age: number; livingWith: string }[]
  property: { id: number; type: string; description: string; value: string; notes: string }[]
  financials: { id: number; type: string; description: string; value: string; notes: string }[]
  liabilities: { id: number; type: string; description: string; value: string; notes: string }[]
  documents: Document[]
  hearings: {
    id: number
    title: string
    date: string
    time: string
    location: string
    judge: string
  }[]
  notes: Note[]
  emails: Email[]
  calls: Call[]
  hasAlert: boolean
  alertMessage: string
  hasConflictAlert?: boolean
  conflictAlertMessage?: string
  timeline: {
    id: number
    date: string
    time: string
    type: string
    title: string
    description: string
    user: string
    icon?: string
    relatedId?: number
    relatedName?: string
  }[]
  logEntries?: LogEntry[] // Combined chronological log
  reference?: string
  description?: string
  client?: {
    id: number
    name: string
    email: string
    phone: string
    avatar: string
  }
  otherParties?: {
    id: number
    name: string
    email: string
    phone: string
    avatar: string
    role: string
  }[]
  assignedTo?: {
    id: number
    name: string
    email: string
    avatar: string
  }
  createdAt?: string
  updatedAt?: string
  nextHearing?: {
    date: string
    location: string
    type: string
  }
}

interface DocumentRowProps {
  document: Document
  matterId: number
}

const DocumentRowComponent: React.FC<DocumentRowProps> = ({ document, matterId }) => {
  return (
    <div className="px-4 py-3 grid grid-cols-12 items-center">
      <div className="col-span-5 flex items-center space-x-3">
        <FileText className="h-5 w-5 text-gray-400" />
        <span className="font-medium">{document.name}</span>
      </div>
      <div className="col-span-2 text-sm text-gray-500">{document.type}</div>
      <div className="col-span-2 text-sm text-gray-500">{document.date}</div>
      <div className="col-span-2">
        <Badge variant={document.status === "Filed" ? "default" : "outline"}>{document.status}</Badge>
      </div>
      <div className="col-span-1 text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Document</DropdownMenuItem>
            <DropdownMenuItem>Download</DropdownMenuItem>
            <DropdownMenuItem>Edit Details</DropdownMenuItem>
            <DropdownMenuItem>Attach to Hearing</DropdownMenuItem>
            <DropdownMenuItem>Publish Document</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

// Helper function to format dates
function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString("en-AU", options)
}

// Helper function to format times
function formatTime(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit" }
  return new Date(dateString).toLocaleTimeString("en-AU", options)
}

export default function MatterDetailPage({ params }: { params: { id: string } }) {
  // This would normally be fetched from an API
  const [selectedEmail, setSelectedEmail] = useState<(typeof matter.emails)[0] | null>(null)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [selectedLogEntry, setSelectedLogEntry] = useState<LogEntry | null>(null)
  const [logFilters, setLogFilters] = useState({
    documents: true,
    emails: true,
    notes: true,
    calls: true,
    hearings: true,
    status: true,
  })
  const [composeEmail, setComposeEmail] = useState(false)
  const [emailMode, setEmailMode] = useState<"new" | "reply" | "replyAll" | "forward">("new")

  // Mock data for the matter details
  const matter: Matter = {
    id: Number.parseInt(params.id),
    title: "Smith vs. Smith",
    type: "Children & Property",
    status: "Open",
    billingType: "Time Based",
    matterOpened: "2023-01-10",
    matterClosed: "",
    partnerSupervising: {
      id: 302,
      name: "Michael Roberts",
      email: "michael.roberts@lawfirm.com",
      avatar: "/stylized-rj.png",
    },
    assistingLawyer: {
      id: 303,
      name: "Jessica Adams",
      email: "jessica.adams@lawfirm.com",
      avatar: "/abstract-geometric-ja.png",
    },
    clients: [
      {
        id: 1,
        name: "John Smith",
        email: "john.smith@example.com",
        phone: "(555) 123-4567",
        tags: ["ESL", "Hard of Hearing"],
      },
    ],
    opposingParties: [
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "(555) 765-4321",
        tags: [],
      },
    ],
    otherParties: [
      {
        id: 3,
        name: "Michael Brown",
        email: "michael.brown@example.com",
        phone: "(555) 987-6543",
        role: "Independent Children's Lawyer",
        tags: [],
      },
      {
        id: 4,
        name: "Sarah Wilson",
        email: "sarah.wilson@example.com",
        phone: "(555) 234-5678",
        role: "Second Respondent",
        tags: ["Elderly"],
      },
    ],
    children: [
      { id: 1, name: "Michael Smith", age: 10, livingWith: "Mother" },
      { id: 2, name: "Sarah Smith", age: 8, livingWith: "Mother" },
    ],
    property: [
      { id: 1, type: "Real Estate", description: "Family Home", value: "$750,000", notes: "Joint ownership" },
      { id: 2, type: "Vehicle", description: "2020 SUV", value: "$35,000", notes: "Owned by husband" },
    ],
    financials: [
      { id: 1, type: "Bank Account", description: "Joint Savings", value: "$125,000", notes: "To be divided equally" },
      { id: 2, type: "Super", description: "Super Account", value: "$250,000", notes: "Husband's retirement account" },
    ],
    liabilities: [
      { id: 1, type: "Mortgage", description: "Family Home", value: "$350,000", notes: "Joint liability" },
      {
        id: 2,
        type: "Credit Card",
        description: "Joint Credit Card",
        value: "$15,000",
        notes: "To be divided equally",
      },
    ],
    documents: [
      {
        id: 1,
        name: "Petition for Divorce",
        type: "Legal Document",
        date: "Jan 15, 2023",
        status: "Filed",
        timestamp: "2023-01-15T11:00:00",
      },
      {
        id: 2,
        name: "Financial Disclosure",
        type: "Financial",
        date: "Feb 2, 2023",
        status: "Draft",
        timestamp: "2023-02-02T15:20:00",
      },
      {
        id: 3,
        name: "Parenting Plan",
        type: "Agreement",
        date: "Feb 10, 2023",
        status: "Draft",
        timestamp: "2023-02-10T10:15:00",
      },
      {
        id: 4,
        name: "Client Intake Form",
        type: "Administrative",
        date: "Jan 10, 2023",
        status: "Completed",
        timestamp: "2023-01-10T09:30:00",
      },
    ],
    hearings: [
      {
        id: 1,
        title: "Initial Hearing",
        date: "Mar 15, 2023",
        time: "9:30 AM",
        location: "Family Court, Room 302",
        judge: "Hon. Robert Wilson",
      },
      {
        id: 2,
        title: "Mediation Session",
        date: "Apr 5, 2023",
        time: "10:00 AM",
        location: "Mediation Center",
        judge: "N/A",
      },
    ],
    notes: [
      {
        id: 1,
        date: "Jan 10, 2023",
        time: "10:30 AM",
        timestamp: "2023-01-10T10:30:00",
        author: "Sarah Johnson",
        content: "Initial consultation with client. Discussed divorce process and custody concerns.",
      },
      {
        id: 2,
        date: "Jan 20, 2023",
        time: "14:00 PM",
        timestamp: "2023-01-20T14:00:00",
        author: "Sarah Johnson",
        content: "Client provided financial documents. Need to follow up on missing bank statements.",
      },
    ],
    calls: [
      {
        id: 1,
        date: "Mar 10, 2023",
        time: "2:45 PM",
        timestamp: "2023-03-10T14:45:00",
        with: "John Smith",
        duration: "25 minutes",
        notes:
          "Phone call with client to prepare for upcoming hearing. Discussed key points to address and documents to bring.",
      },
      {
        id: 2,
        date: "Jan 22, 2023",
        time: "11:15 AM",
        timestamp: "2023-01-22T11:15:00",
        with: "Opposing Counsel",
        duration: "15 minutes",
        notes: "Discussed timeline for document exchange and potential mediation dates.",
      },
    ],
    emails: [
      {
        id: 1,
        date: "Jan 12, 2023",
        time: "2:15 PM",
        timestamp: "2023-01-12T14:15:00",
        from: "john.smith@example.com",
        to: "sarah.johnson@lawmanage.com",
        subject: "Re: Initial Consultation",
        preview: "Thank you for meeting with me yesterday. I've attached the documents you requested...",
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
        hasAttachments: true,
        attachments: [
          { id: 101, name: "Bank_Statements_July-Dec.pdf", type: "PDF", size: "2.4 MB" },
          { id: 102, name: "Property_Deed.pdf", type: "PDF", size: "1.1 MB" },
          { id: 103, name: "School_Enrollment.docx", type: "DOCX", size: "540 KB" },
        ],
      },
      {
        id: 2,
        date: "Jan 18, 2023",
        time: "4:30 PM",
        timestamp: "2023-01-18T16:30:00",
        from: "sarah.johnson@lawmanage.com",
        to: "john.smith@example.com",
        subject: "Financial Disclosure Requirements",
        preview: "As discussed in our meeting, I need the following financial documents to proceed...",
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
        hasAttachments: true,
        attachments: [{ id: 201, name: "Financial_Disclosure_Form.pdf", type: "PDF", size: "850 KB" }],
        relatedDocumentId: 2,
      },
      {
        id: 3,
        date: "Jan 25, 2023",
        time: "9:45 AM",
        timestamp: "2023-01-25T09:45:00",
        from: "opposing.counsel@example.com",
        to: "sarah.johnson@lawmanage.com",
        subject: "Smith vs. Smith - Initial Disclosure",
        preview: "Please find attached the initial disclosure documents for our client, Jane Smith...",
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
        hasAttachments: true,
        attachments: [
          { id: 301, name: "Jane_Smith_Financial_Statement.pdf", type: "PDF", size: "1.8 MB" },
          { id: 302, name: "Asset_Inventory.xlsx", type: "XLSX", size: "720 KB" },
          { id: 303, name: "Proposed_Parenting_Plan.pdf", type: "PDF", size: "950 KB" },
        ],
      },
      {
        id: 4,
        date: "Feb 5, 2023",
        time: "3:20 PM",
        timestamp: "2023-02-05T15:20:00",
        from: "sarah.johnson@lawmanage.com",
        to: "john.smith@example.com",
        subject: "Draft Financial Disclosure for Review",
        preview: "I've prepared the financial disclosure based on the documents you provided...",
        content: `<p>Dear John,</p>
  <p>I've prepared the financial disclosure based on the documents you provided. Please review the attached draft and let me know if any changes are needed before we finalize it.</p>
  <p>I've highlighted a few areas where we might need additional information or clarification.</p>
  <p>Please review at your earliest convenience as we need to file this by next week.</p>
  <p>Best regards,<br>Sarah Johnson<br>Family Law Attorney</p>`,
        hasAttachments: true,
        attachments: [{ id: 401, name: "Draft_Financial_Disclosure.pdf", type: "PDF", size: "1.2 MB" }],
        relatedDocumentId: 2,
      },
    ],
    hasAlert: true,
    alertMessage: "Domestic violence flag on file - Exercise caution with joint meetings",
    hasConflictAlert: true,
    conflictAlertMessage:
      "Potential conflict of interest - Partner previously represented opposing party in unrelated matter",
    timeline: [
      {
        id: 1,
        date: "Jan 10, 2023",
        time: "9:00 AM",
        type: "matter",
        title: "Matter Created",
        description: "Matter was created and assigned to Sarah Johnson",
        user: "System",
        icon: "briefcase",
      },
      {
        id: 2,
        date: "Jan 10, 2023",
        time: "10:30 AM",
        type: "note",
        title: "Initial Consultation Note",
        description: "Initial consultation with client. Discussed divorce process and custody concerns.",
        user: "Sarah Johnson",
        icon: "pen-tool",
      },
      {
        id: 3,
        date: "Jan 12, 2023",
        time: "2:15 PM",
        type: "email",
        title: "Email Received",
        description: "Email received from John Smith: Re: Initial Consultation",
        user: "John Smith",
        icon: "mail",
        relatedId: 1,
        relatedName: "Re: Initial Consultation",
      },
      {
        id: 4,
        date: "Jan 15, 2023",
        time: "11:00 AM",
        type: "document",
        title: "Document Created",
        description: "Petition for Divorce was created and filed",
        user: "Sarah Johnson",
        icon: "file-text",
        relatedId: 1,
        relatedName: "Petition for Divorce",
      },
      {
        id: 5,
        date: "Jan 18, 2023",
        time: "4:30 PM",
        type: "email",
        title: "Email Sent",
        description: "Email sent to John Smith: Financial Disclosure Requirements",
        user: "Sarah Johnson",
        icon: "mail",
        relatedId: 2,
        relatedName: "Financial Disclosure Requirements",
      },
      {
        id: 6,
        date: "Jan 20, 2023",
        time: "2:00 PM",
        type: "note",
        title: "Financial Documents Note",
        description: "Client provided financial documents. Need to follow up on missing bank statements.",
        user: "Sarah Johnson",
        icon: "pen-tool",
      },
      {
        id: 7,
        date: "Jan 25, 2023",
        time: "9:45 AM",
        type: "email",
        title: "Email Received",
        description: "Email received from opposing counsel: Smith vs. Smith - Initial Disclosure",
        user: "Opposing Counsel",
        icon: "mail",
        relatedId: 3,
        relatedName: "Smith vs. Smith - Initial Disclosure",
      },
      {
        id: 8,
        date: "Feb 2, 2023",
        time: "3:20 PM",
        type: "document",
        title: "Document Created",
        description: "Financial Disclosure was created",
        user: "Sarah Johnson",
        icon: "file-text",
        relatedId: 2,
        relatedName: "Financial Disclosure",
      },
      {
        id: 9,
        date: "Feb 10, 2023",
        time: "10:15 AM",
        type: "document",
        title: "Document Created",
        description: "Parenting Plan was created",
        user: "Sarah Johnson",
        icon: "file-text",
        relatedId: 3,
        relatedName: "Parenting Plan",
      },
      {
        id: 10,
        date: "Feb 15, 2023",
        time: "11:30 AM",
        type: "status",
        title: "Status Update",
        description: "Matter status updated to 'In Progress'",
        user: "Sarah Johnson",
        icon: "refresh-cw",
      },
      {
        id: 11,
        date: "Mar 1, 2023",
        time: "9:00 AM",
        type: "meeting",
        title: "Meeting Scheduled",
        description: "Initial Hearing scheduled for March 15, 2023",
        user: "Sarah Johnson",
        icon: "calendar",
        relatedId: 1,
        relatedName: "Initial Hearing",
      },
      {
        id: 12,
        date: "Mar 10, 2023",
        time: "2:45 PM",
        type: "call",
        title: "Phone Call",
        description: "Phone call with client to prepare for upcoming hearing",
        user: "Sarah Johnson",
        icon: "phone",
      },
    ],
    reference: "FAM-2023-0042",
    description: "Divorce proceedings including property settlement and custody arrangements.",
    client: {
      id: 101,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+61 2 9876 5432",
      avatar: "/javascript-code-abstract.png",
    },
    otherParties: [
      {
        id: 201,
        name: "Mary Johnson",
        email: "mary.johnson@example.com",
        phone: "+61 2 8765 4321",
        avatar: "/musical-notes-flowing.png",
        role: "Respondent",
      },
    ],
    assignedTo: {
      id: 301,
      name: "Sarah Williams",
      email: "sarah.williams@lawfirm.com",
      avatar: "/abstract-southwest.png",
    },
    createdAt: "2023-01-10T09:00:00Z",
    updatedAt: "2023-04-15T14:30:00Z",
    nextHearing: {
      date: "2023-05-20T10:00:00Z",
      location: "Family Court Sydney",
      type: "Directions Hearing",
    },
  }

  // Create chronological log entries from all matter activities
  const createLogEntries = (matter: Matter): LogEntry[] => {
    const entries: LogEntry[] = []

    // Add documents to log
    matter.documents.forEach((doc) => {
      const timestamp = doc.timestamp || `2023-${doc.date.substring(0, 6)}T00:00:00`
      const time = doc.timestamp
        ? new Date(doc.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : "00:00"

      entries.push({
        id: `doc-${doc.id}` as any,
        type: "document",
        date: doc.date,
        time: time,
        timestamp: timestamp,
        title: `Document: ${doc.name}`,
        description: `${doc.name} (${doc.type}) was ${doc.status === "Filed" ? "filed" : "created"}`,
        user: "Sarah Johnson",
        data: doc,
        relatedEntries: [],
      })
    })

    // Add emails to log
    matter.emails.forEach((email) => {
      const timestamp = email.timestamp || `2023-${email.date.substring(0, 6)}T00:00:00`
      const time = email.time || "00:00"

      entries.push({
        id: `email-${email.id}` as any,
        type: "email",
        date: email.date,
        time: time,
        timestamp: timestamp,
        title: `Email: ${email.subject}`,
        description: `${email.from.includes("lawmanage") ? "Sent to" : "Received from"} ${email.from.includes("lawmanage") ? email.to : email.from}`,
        user: email.from.includes("lawmanage") ? "Sarah Johnson" : email.from.split("@")[0],
        data: email,
        relatedEntries: email.relatedDocumentId ? ([`doc-${email.relatedDocumentId}`] as any[]) : [],
      })
    })

    // Add notes to log
    matter.notes.forEach((note) => {
      const timestamp = note.timestamp || `2023-${note.date.substring(0, 6)}T00:00:00`
      const time = note.time || "00:00"

      entries.push({
        id: `note-${note.id}` as any,
        type: "note",
        date: note.date,
        time: time,
        timestamp: timestamp,
        title: `Note: ${note.content.substring(0, 30)}${note.content.length > 30 ? "..." : ""}`,
        description: note.content,
        user: note.author,
        data: note,
        relatedEntries: [],
      })
    })

    // Add calls to log
    matter.calls.forEach((call) => {
      const timestamp = call.timestamp || `2023-${call.date.substring(0, 6)}T00:00:00`

      entries.push({
        id: `call-${call.id}` as any,
        type: "call",
        date: call.date,
        time: call.time,
        timestamp: timestamp,
        title: `Call with ${call.with}`,
        description: call.notes,
        user: "Sarah Johnson",
        data: call,
        relatedEntries: [],
      })
    })

    // Add hearings to log
    matter.hearings.forEach((hearing) => {
      const timestamp = `2023-${hearing.date.substring(0, 6)}T00:00:00`

      entries.push({
        id: `hearing-${hearing.id}` as any,
        type: "hearing",
        date: hearing.date,
        time: hearing.time,
        timestamp: timestamp,
        title: `Hearing: ${hearing.title}`,
        description: `${hearing.title} at ${hearing.location}`,
        user: "System",
        data: hearing,
        relatedEntries: [],
      })
    })

    // Sort entries by timestamp
    return entries.sort((a, b) => {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    })
  }

  // Create the chronological log
  matter.logEntries = createLogEntries(matter)

  // Function to get the appropriate icon component based on the icon name
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "briefcase":
        return <Briefcase className="h-5 w-5" />
      case "mail":
        return <Mail className="h-5 w-5" />
      case "file-text":
        return <FileText className="h-5 w-5" />
      case "calendar":
        return <Calendar className="h-5 w-5" />
      case "clock":
        return <Clock className="h-5 w-5" />
      case "message-square":
        return <MessageSquare className="h-5 w-5" />
      case "check-circle":
        return <CheckCircle className="h-5 w-5" />
      case "refresh-cw":
        return <RefreshCw className="h-5 w-5" />
      case "pen-tool":
        return <PenTool className="h-5 w-5" />
      case "upload-cloud":
        return <UploadCloud className="h-5 w-5" />
      case "download":
        return <Download className="h-5 w-5" />
      case "eye":
        return <Eye className="h-5 w-5" />
      case "paperclip":
        return <Paperclip className="h-5 w-5" />
      case "phone":
        return <Phone className="h-5 w-5" />
      default:
        return <Clock className="h-5 w-5" />
    }
  }

  // Function to get the appropriate background color based on activity type
  const getActivityColor = (type: string) => {
    switch (type) {
      case "matter":
        return "bg-blue-100 text-blue-600"
      case "email":
        return "bg-purple-100 text-purple-600"
      case "document":
        return "bg-amber-100 text-amber-600"
      case "note":
        return "bg-green-100 text-green-600"
      case "status":
        return "bg-gray-100 text-gray-600"
      case "meeting":
      case "hearing":
        return "bg-indigo-100 text-indigo-600"
      case "call":
        return "bg-rose-100 text-rose-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  // Function to get the appropriate icon for log entry type
  const getLogEntryIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-5 w-5" />
      case "email":
        return <Mail className="h-5 w-5" />
      case "note":
        return <PenTool className="h-5 w-5" />
      case "call":
        return <Phone className="h-5 w-5" />
      case "hearing":
        return <Calendar className="h-5 w-5" />
      case "status":
        return <RefreshCw className="h-5 w-5" />
      default:
        return <Clock className="h-5 w-5" />
    }
  }

  // Filter log entries based on selected filters
  const filteredLogEntries = matter.logEntries?.filter((entry) => {
    if (entry.type === "document" && !logFilters.documents) return false
    if (entry.type === "email" && !logFilters.emails) return false
    if (entry.type === "note" && !logFilters.notes) return false
    if (entry.type === "call" && !logFilters.calls) return false
    if (entry.type === "hearing" && !logFilters.hearings) return false
    if (entry.type === "status" && !logFilters.status) return false
    return true
  })

  // Function to format date as "Month Day, Year"
  const formatDateOriginal = (dateString: string) => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return date.toLocaleDateString(undefined, options)
  }

  // Group log entries by date
  const entriesByDate = filteredLogEntries?.reduce((acc: { [key: string]: LogEntry[] }, entry) => {
    const date = entry.date
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(entry)
    return acc
  }, {})

  // Group timeline entries by date for the chronology
  const timelineByDate = matter.timeline.reduce((acc: Record<string, any[]>, entry) => {
    const date = new Date(entry.date).toISOString().split("T")[0]
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(entry)
    return acc
  }, {})

  // Sort dates in reverse chronological order (latest first)
  const sortedDates = Object.keys(timelineByDate).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/matters">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">{matter.title}</h1>
          <Badge variant={matter.status === "Open" ? "default" : "secondary"}>{matter.status}</Badge>
          {matter.hasAlert && (
            <Badge variant="outline" className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3 text-gray-500" />
              DV Alert
            </Badge>
          )}
          {matter.hasConflictAlert && (
            <Badge variant="outline" className="flex items-center gap-1 border-amber-300 text-amber-700">
              <AlertTriangle className="h-3 w-3 text-amber-500" />
              Conflict
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit Matter
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Change Status</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Close Matter</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {matter.hasAlert && (
        <div className="bg-gray-50 border border-gray-300 rounded-md p-4 flex items-start space-x-3">
          <div className="bg-gray-100 p-1.5 rounded-full">
            <AlertTriangle className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Domestic Violence Alert</h3>
            <p className="text-sm text-gray-600">{matter.alertMessage}</p>
          </div>
        </div>
      )}

      {matter.hasConflictAlert && (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex items-start space-x-3 mt-4">
          <div className="bg-amber-100 p-1.5 rounded-full">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h3 className="font-medium text-amber-800">Conflict Alert</h3>
            <p className="text-sm text-amber-700">{matter.conflictAlertMessage}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Matter Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Matter ID:</dt>
                <dd className="text-sm">#{matter.id.toString().padStart(5, "0")}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Matter Type:</dt>
                <dd className="text-sm">{matter.type}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Status:</dt>
                <dd className="text-sm">{matter.status}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Billing Type:</dt>
                <dd className="text-sm">{matter.billingType}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Opened Date:</dt>
                <dd className="text-sm">{matter.matterOpened ? formatDate(matter.matterOpened) : "Jan 10, 2023"}</dd>
              </div>
              {matter.matterClosed && (
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Closed Date:</dt>
                  <dd className="text-sm">{formatDate(matter.matterClosed)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Partner Supervising:</dt>
                <dd className="text-sm">{matter.partnerSupervising?.name || "N/A"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Assigned Lawyer:</dt>
                <dd className="text-sm">{matter.assignedTo?.name || "Sarah Johnson"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Assisting Lawyer:</dt>
                <dd className="text-sm">{matter.assistingLawyer?.name || "N/A"}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {matter.clients.map((client) => (
                <div key={client.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-xs text-gray-500">{client.email}</p>
                      {client.tags && client.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {client.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs py-0 px-1">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/contacts/${client.id}`}>
                      <Users className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  <Plus className="h-3 w-3 mr-1" /> Add Client
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Other Parties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {matter.opposingParties.map((party) => (
                <div key={party.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>{party.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{party.name}</p>
                      <p className="text-xs text-gray-500">{party.email}</p>
                      {party.tags && party.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {party.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs py-0 px-1">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/contacts/${party.id}`}>
                      <Users className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  <Plus className="h-3 w-3 mr-1" /> Add Other Party
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Additional Parties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {matter.otherParties.map((party) => (
                <div key={party.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>{party.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{party.name}</p>
                      <div className="flex items-center space-x-1">
                        <p className="text-xs text-gray-500">{party.role}</p>
                      </div>
                      {party.tags && party.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {party.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs py-0 px-1">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/contacts/${party.id}`}>
                      <Users className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  <Plus className="h-3 w-3 mr-1" /> Add Party
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="chronology">
        <TabsList>
          <TabsTrigger value="chronology">Matter Chronology</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="hearings">Court Hearings</TabsTrigger>
          <TabsTrigger value="children">Children</TabsTrigger>
          <TabsTrigger value="property">Property & Financials</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="chronology" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Matter Chronology</CardTitle>
              <div className="flex items-center space-x-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
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
                  <Download className="h-4 w-4 mr-2" /> Export Log
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(entriesByDate || {})
                  .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
                  .map(([date, entries]) => (
                    <div key={date} className="space-y-4">
                      <h3 className="text-sm font-medium text-gray-700 sticky top-0 bg-white py-1 border-b">{date}</h3>
                      <div className="relative">
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                        <div className="space-y-4">
                          {entries.map((entry) => (
                            <div key={entry.id} className="relative pl-14">
                              <div
                                className={`absolute left-0 top-0 h-10 w-10 rounded-full ${getActivityColor(entry.type)} flex items-center justify-center z-10`}
                              >
                                {getLogEntryIcon(entry.type)}
                              </div>
                              <div
                                className="bg-white border rounded-lg p-4 cursor-pointer hover:border-gray-300"
                                onClick={() => setSelectedLogEntry(entry)}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center">
                                    <span className="font-medium">{entry.title}</span>
                                    <span className="text-xs text-gray-500 ml-2">{entry.time}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    {entry.type === "document" && (
                                      <>
                                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                          <Download className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                          <Edit className="h-4 w-4" />
                                        </Button>
                                      </>
                                    )}
                                    {entry.type === "email" && (
                                      <>
                                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                          <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                          <Paperclip className="h-4 w-4" />
                                        </Button>
                                      </>
                                    )}
                                    {entry.type === "note" && (
                                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                    )}
                                  </div>
                                </div>
                                <p className="text-sm text-gray-700">{entry.description}</p>

                                {/* Show attachments for emails */}
                                {entry.type === "email" && entry.data.hasAttachments && (
                                  <div className="mt-2 pt-1">
                                    <div className="flex items-center text-xs text-gray-500">
                                      <Paperclip className="h-3 w-3 mr-1" />
                                      <span>Has attachments</span>
                                    </div>
                                  </div>
                                )}
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
        </TabsContent>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Meetings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {matter.hearings.slice(0, 5).map((hearing) => (
                    <div key={hearing.id} className="flex items-start space-x-3 p-3 bg-white border rounded-lg">
                      <div className="bg-gray-100 p-2 rounded-md">
                        <Calendar className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{hearing.title}</h4>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-500">
                          {hearing.date} at {hearing.time}
                        </p>
                        <p className="text-sm text-gray-500">{hearing.location}</p>
                      </div>
                    </div>
                  ))}
                  {matter.hearings.length > 5 && (
                    <div className="pt-2 text-center">
                      <Button variant="outline" size="sm">
                        View More
                      </Button>
                    </div>
                  )}
                  <div className="pt-2">
                    <Button variant="outline" size="sm">
                      <Plus className="h-3 w-3 mr-1" /> Add Meeting
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Emails</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {matter.emails.slice(0, 5).map((email) => (
                    <div
                      key={email.id}
                      className="flex items-start space-x-3 p-3 bg-white border rounded-lg cursor-pointer hover:border-gray-300"
                      onClick={() => {
                        setSelectedEmail(email)
                      }}
                    >
                      <div className="bg-gray-100 p-2 rounded-md">
                        <Mail className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{email.subject}</h4>
                          {email.hasAttachments && (
                            <Badge variant="outline" className="flex items-center">
                              <Paperclip className="h-3 w-3 mr-1" />
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          {email.from.includes("lawmanage") ? "To: " : "From: "}
                          {email.from.includes("lawmanage") ? email.to : email.from}
                        </p>
                        <p className="text-sm text-gray-500 truncate">{email.preview}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {email.date} at {email.time}
                        </p>
                      </div>
                    </div>
                  ))}
                  {matter.emails.length > 5 && (
                    <div className="pt-2 text-center">
                      <Button variant="outline" size="sm">
                        View More
                      </Button>
                    </div>
                  )}
                  <div className="pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEmailMode("new")
                        setComposeEmail(true)
                      }}
                    >
                      <Plus className="h-3 w-3 mr-1" /> Compose Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Documents</CardTitle>
              <AddDocumentDialog matterId={matter.id} />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search documents..." className="pl-8" />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Document Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="legal">Legal Documents</SelectItem>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="agreement">Agreements</SelectItem>
                      <SelectItem value="correspondence">Correspondence</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-md border">
                  <div className="bg-gray-50 px-4 py-2 text-sm font-medium text-gray-500 grid grid-cols-12">
                    <div className="col-span-5">Document Name</div>
                    <div className="col-span-2">Type</div>
                    <div className="col-span-2">Date</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-1"></div>
                  </div>
                  <div className="divide-y">
                    {matter.documents.map((document) => (
                      <DocumentRow key={document.id} document={document} matterId={matter.id} />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs remain the same */}
        <TabsContent value="hearings" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Court Hearings</CardTitle>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add Hearing
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search hearings..." className="pl-8" />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Hearing Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="initial">Initial Hearings</SelectItem>
                      <SelectItem value="mediation">Mediation</SelectItem>
                      <SelectItem value="trial">Trial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {matter.hearings.map((hearing) => (
                    <div key={hearing.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-lg">{hearing.title}</h3>
                            <Badge variant="outline">Upcoming</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span>{hearing.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span>{hearing.time}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span>{hearing.location}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span>Judge: {hearing.judge}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="children" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Children</CardTitle>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add Child
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {matter.children.map((child) => (
                  <div key={child.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-lg">{child.name}</h3>
                          <Badge variant="outline">{child.age} years old</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span>Living with: {child.livingWith}</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="property" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Real Estate Section */}
            <div className="bg-white rounded-lg border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Real Estate</h2>
                <Button variant="outline" className="gap-2">
                  <Plus size={16} /> Add Property
                </Button>
              </div>

              {/* Real Estate Items */}
              <div className="space-y-4">
                <div className="bg-white rounded-lg border p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-600"
                      >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Family Home</h3>
                      <p className="text-gray-500">Joint ownership</p>
                    </div>
                  </div>
                  <div className="text-xl font-bold">$750,000</div>
                </div>
              </div>
            </div>

            {/* Other Assets Section */}
            <div className="bg-white rounded-lg border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Other Assets</h2>
                <Button variant="outline" className="gap-2">
                  <Plus size={16} /> Add Asset
                </Button>
              </div>

              {/* Other Assets Items */}
              <div className="space-y-4">
                <div className="bg-white rounded-lg border p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-600"
                      >
                        <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                        <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                        <path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6"></path>
                        <path d="M9 17l0 -3l6 0l0 3"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">2020 SUV</h3>
                      <p className="text-gray-500">Vehicle • Owned by husband</p>
                    </div>
                  </div>
                  <div className="text-xl font-bold">$35,000</div>
                </div>

                <div className="bg-white rounded-lg border p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-600"
                      >
                        <path d="M12 2v20m-9 -10h18"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Joint Savings</h3>
                      <p className="text-gray-500">Bank Account • To be divided equally</p>
                    </div>
                  </div>
                  <div className="text-xl font-bold">$125,000</div>
                </div>

                <div className="bg-white rounded-lg border p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-600"
                      >
                        <path d="M12 2v20m-9 -10h18"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Super Account</h3>
                      <p className="text-gray-500">Super • Husband's retirement account</p>
                    </div>
                  </div>
                  <div className="text-xl font-bold">$250,000</div>
                </div>
              </div>
            </div>

            {/* Liabilities Section */}
            <div className="bg-white rounded-lg border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Liabilities</h2>
                <Button variant="outline" className="gap-2">
                  <Plus size={16} /> Add Liability
                </Button>
              </div>

              {/* Liabilities Items */}
              <div className="space-y-4">
                <div className="bg-white rounded-lg border p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-600"
                      >
                        <path d="M12 2v20m-9 -10h18"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Family Home</h3>
                      <p className="text-gray-500">Mortgage • Joint liability</p>
                    </div>
                  </div>
                  <div className="text-xl font-bold">$350,000</div>
                </div>

                <div className="bg-white rounded-lg border p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-600"
                      >
                        <path d="M12 2v20m-9 -10h18"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Joint Credit Card</h3>
                      <p className="text-gray-500">Credit Card • To be divided equally</p>
                    </div>
                  </div>
                  <div className="text-xl font-bold">$15,000</div>
                </div>
              </div>
            </div>

            {/* Financial Summary Section */}
            <div className="bg-white rounded-lg border p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold">Financial Summary</h2>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Total Assets:</h3>
                    <span className="text-xl font-bold">$1,160,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Total Liabilities:</h3>
                    <span className="text-xl font-bold">$365,000</span>
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Net Worth:</h3>
                      <span className="text-xl font-bold">$795,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notes" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Case Notes</CardTitle>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add Note
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {matter.notes.map((note) => (
                  <div key={note.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{note.author}</h3>
                          <span className="text-sm text-gray-500">
                            {note.date} at {note.time}
                          </span>
                        </div>
                        <p className="text-sm">{note.content}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Email Detail Dialog */}
      {selectedEmail && (
        <Dialog open={!!selectedEmail} onOpenChange={() => setSelectedEmail(null)}>
          <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedEmail.subject}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                <div className="font-medium text-gray-500">From:</div>
                <div>{selectedEmail.from}</div>

                <div className="font-medium text-gray-500">To:</div>
                <div>{selectedEmail.to}</div>

                <div className="font-medium text-gray-500">Date:</div>
                <div>
                  {selectedEmail.date} at {selectedEmail.time}
                </div>
              </div>

              <div className="border-t border-b py-4 my-2">
                <div className="prose prose-sm max-w-none">
                  {selectedEmail.content ? (
                    <div dangerouslySetInnerHTML={{ __html: selectedEmail.content }} />
                  ) : (
                    <p>{selectedEmail.preview}</p>
                  )}
                </div>
              </div>

              {selectedEmail.hasAttachments && selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
                <>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Attachments ({selectedEmail.attachments.length})</h4>
                    <div className="space-y-2">
                      {selectedEmail.attachments.map((attachment) => (
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

              {selectedEmail.relatedDocumentId && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Related Document</h4>
                  <div className="space-y-2">
                    {(() => {
                      const relatedDoc = matter.documents.find((doc) => doc.id === selectedEmail.relatedDocumentId)
                      return relatedDoc ? (
                        <div
                          className="flex items-center justify-between p-2 border rounded-md hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            setSelectedEmail(null)
                            setSelectedDocument(relatedDoc)
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-gray-400" />
                            <div>
                              <span className="text-sm font-medium">{relatedDoc.name}</span>
                              <div className="text-xs text-gray-500">
                                {relatedDoc.type} • {relatedDoc.date}
                              </div>
                            </div>
                          </div>
                          <Badge variant={relatedDoc.status === "Filed" ? "default" : "outline"}>
                            {relatedDoc.status}
                          </Badge>
                        </div>
                      ) : null
                    })()}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-2">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEmailMode("reply")
                      setComposeEmail(true)
                    }}
                  >
                    <Mail className="h-4 w-4 mr-1" /> Reply
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEmailMode("replyAll")
                      setComposeEmail(true)
                    }}
                  >
                    <Mail className="h-4 w-4 mr-1" /> Reply All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEmailMode("forward")
                      setComposeEmail(true)
                    }}
                  >
                    <Mail className="h-4 w-4 mr-1" /> Forward
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" /> Download
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Email Compose Dialog */}
      {composeEmail && (
        <EmailComposeDialog
          isOpen={composeEmail}
          onClose={() => setComposeEmail(false)}
          matterId={matter.id}
          mode={emailMode}
          originalEmail={selectedEmail || undefined}
          documents={matter.documents}
        />
      )}
    </div>
  )
}
