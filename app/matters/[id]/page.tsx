"use client"

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
  Trash2,
  Send,
  MapPin,
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import AddDocumentDialog from "@/components/add-document-dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DocumentRow from "@/components/document-row"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, ChevronUp, Filter, Tag } from "lucide-react"
import { Label } from "@/components/ui/label"
import PropertyFinancialTab from "@/components/property-financial-tab"
import RequestDetailEmailDialog from "@/components/request-detail-email-dialog"

// Helper function to format dates
function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString("en-AU", options)
}

// Define the Matter interface
interface Matter {
  // Keep existing fields
  id: number
  title: string
  type: string
  status: string
  billingType: string
  matterOpened: string
  matterClosed: string
  partnerSupervising: {
    id: number
    name: string
    email: string
    avatar: string
  } | null
  assistingLawyer: {
    id: number
    name: string
    email: string
    avatar: string
  } | null
  clients: {
    id: number
    name: string
    email: string
    phone: string
    tags: string[]
    role?: string
    relationship?: string
  }[]
  opposingParties: {
    id: number
    name: string
    email: string
    phone: string
    tags: string[]
    role?: string
    relationship?: string
  }[]
  otherParties: {
    id: number
    name: string
    email: string
    phone: string
    role: string
    tags: string[]
    relationship?: string
  }[]
  children: {
    id: number
    name: string
    age: number
    livingWith: string
    primaryCareGiver?: string
    school?: string
    grade?: string
  }[]
  property: {
    id: number
    type: string
    description: string
    value: string
    notes: string
  }[]
  financials: {
    id: number
    type: string
    description: string
    value: string
    notes: string
  }[]
  liabilities: {
    id: number
    type: string
    description: string
    value: string
    notes: string
  }[]
  documents: {
    id: number
    name: string
    type: string
    date: string
    status: string
    timestamp?: string
  }[]
  hearings: {
    id: number
    title: string
    date: string
    time: string
    location: string
    judge: string
  }[]
  notes: {
    id: number
    date: string
    time: string
    timestamp: string
    author: string
    content: string
  }[]
  calls: {
    id: number
    date: string
    time: string
    timestamp: string
    with: string
    duration: string
    notes: string
  }[]
  emails: {
    id: number
    date: string
    time: string
    timestamp: string
    from: string
    to: string
    subject: string
    preview: string
    content: string
    hasAttachments: boolean
    attachments: {
      id: number
      name: string
      type: string
      size: string
    }[]
    relatedDocumentId?: number
  }[]
  hasAlert: boolean
  alertMessage: string
  hasConflictAlert: boolean
  conflictAlertMessage: string
  conflictStatus: string
  timeline: {
    id: number
    date: string
    time: string
    type: string
    title: string
    description: string
    user: string
    icon: string
    relatedId?: number
    relatedName?: string
  }[]
  reference: string
  description: string
  client: {
    id: number
    name: string
    email: string
    phone: string
    avatar: string
  }
  otherParties: {
    id: number
    name: string
    email: string
    phone: string
    avatar: string
    role: string
  }[]
  assignedTo: {
    id: number
    name: string
    email: string
    avatar: string
  }
  createdAt: string
  updatedAt: string
  nextHearing: {
    date: string
    location: string
    type: string
  }
  createdByCurrentUser: boolean
  logEntries?: LogEntry[]

  // Family law specific fields
  jurisdiction?: string
  courtDetails?: {
    court: string
    fileNumber: string
    registry: string
    judicialOfficer: string
  }
  courtPleadings?: {
    type: string
    filed: string
    served: string
    response: string
  }[]
  courtListings?: {
    type: string
    date: string
    time: string
    location: string
  }[]
  relationshipDetails?: {
    cohabitationDate?: string
    cohabitationMonth?: string
    cohabitationYear?: string
    marriageDate?: string
    marriageTown?: string
    marriageCountry?: string
    separationDate?: string
    separationMonth?: string
    separationYear?: string
    divorceDate?: string
  }
  childSupport?: {
    referenceNumber?: string
    bindingAgreementDate?: string
    limitedAgreementDate?: string
  }
  realEstateDetails?: {
    properties: {
      buildingLevel?: string
      unit?: string
      street?: string
      suburb?: string
      titleReference?: string
      formerMatrimonialHome?: boolean
      tenancy?: string
      clientShare?: string
      valueOfShare?: number
      totalValue?: number
      mortgages?: {
        nameOfLender?: string
        clientShare?: string
        amountOfShare?: number
        totalAmount?: number
      }[]
    }[]
  }
  otherAssets?: {
    motorVehicles?: {
      make?: string
      model?: string
      year?: string
      registrationNo?: string
      clientShare?: string
      valueOfShare?: number
      totalValue?: number
    }[]
    householdContents?: {
      description?: string
      clientShare?: string
      valueOfShare?: number
      totalValue?: number
    }[]
    bankAccounts?: {
      institution?: string
      accountNo?: string
      bsb?: string
      clientShare?: string
      valueOfShare?: number
      totalValue?: number
    }[]
    businesses?: {
      name?: string
      type?: string
      address?: string
      clientShare?: string
      valueOfShare?: number
      totalValue?: number
    }[]
    investments?: {
      name?: string
      type?: string
      numberOfShares?: string
      clientShare?: string
      valueOfShare?: number
      totalValue?: number
    }[]
    lifeInsurance?: {
      nameOfCompany?: string
      policyType?: string
      policyNo?: string
      surrenderValue?: number
    }[]
    otherPersonalProperty?: {
      description?: string
      clientShare?: string
      valueOfShare?: number
      totalValue?: number
    }[]
    financialResources?: {
      description?: string
      clientShare?: string
      valueOfShare?: number
      totalValue?: number
    }[]
    addbacks?: {
      description?: string
      clientShare?: string
      valueOfShare?: number
      totalValue?: number
    }[]
  }
  liabilityDetails?: {
    creditCards?: {
      cardProvider?: string
      typeOfCard?: string
      clientShare?: string
      valueOfShare?: number
      totalAmount?: number
    }[]
    loans?: {
      nameOfLender?: string
      typeOfLoan?: string
      clientShare?: string
      valueOfShare?: number
      totalAmount?: number
    }[]
    hirePurchaseLeases?: {
      nameOfLender?: string
      descriptionOfProperty?: string
      finalPayment?: string
      clientShare?: string
      valueOfShare?: number
      totalAmount?: number
    }[]
    unpaidTax?: {
      lastFinancialYear?: {
        clientShare?: string
        valueOfShare?: number
        totalAmount?: number
      }
      previousFinancialYears?: {
        clientShare?: string
        valueOfShare?: number
        totalAmount?: number
      }
    }
    otherPersonalLiabilities?: {
      description?: string
      clientShare?: string
      valueOfShare?: number
      totalAmount?: number
    }[]
    otherBusinessLiabilities?: {
      description?: string
      clientShare?: string
      valueOfShare?: number
      totalAmount?: number
    }[]
  }
  superannuationFund?: {
    fund?: string
    dateOfNoticeGiven?: string
  }
  spousalMaintenance?: {
    agreed?: boolean
    dateOfAgreement?: string
    amount?: number
    period?: string
    nonPeriodicPayments?: string
    letterOfNoObjection?: {
      received?: boolean
      date?: string
    }
  }
}

// Define the LogEntry interface
interface LogEntry {
  id: string
  type: string
  date: string
  time: string
  timestamp: string
  title: string
  description: string
  user: string
  data: any
  relatedEntries: string[]
}

export default function MatterDetailPage({ params }: { params: { id: string } }) {
  // State variables
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
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [sortField, setSortField] = useState("date")

  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const [selectedEntries, setSelectedEntries] = useState<string[]>([])

  // State for client role and relationship
  const [clientRole, setClientRole] = useState<string>("Applicant")
  const [clientRelationship, setClientRelationship] = useState<string>("Father/Husband")
  const [otherPartyRole, setOtherPartyRole] = useState<string>("Respondent")
  const [otherPartyRelationship, setOtherPartyRelationship] = useState<string>("Mother/Wife")

  const [detailsRequested, setDetailsRequested] = useState(false)
  const [showDetailRequestDialog, setShowDetailRequestDialog] = useState(false)

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
        role: "Applicant",
        relationship: "Father/Husband",
      },
    ],
    opposingParties: [
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "(555) 765-4321",
        tags: [],
        role: "Respondent",
        relationship: "Mother/Wife",
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
        relationship: "Other",
      },
      {
        id: 4,
        name: "Sarah Wilson",
        email: "sarah.wilson@example.com",
        phone: "(555) 234-5678",
        role: "Second Respondent",
        tags: ["Elderly"],
        relationship: "Grandparent",
      },
    ],
    children: [
      {
        id: 1,
        name: "Michael Smith",
        age: 10,
        livingWith: "Mother",
        primaryCareGiver: "Mother",
        school: "Newtown Public School",
        grade: "4",
      },
      {
        id: 2,
        name: "Sarah Smith",
        age: 8,
        livingWith: "Mother",
        primaryCareGiver: "Mother",
        school: "Newtown Public School",
        grade: "2",
      },
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
    conflictStatus: "Manual Review Pending",
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
    createdByCurrentUser: true,
    jurisdiction: "NSW",
    courtDetails: {
      court: "Federal Circuit and Family Court of Australia",
      fileNumber: "FAM000123/2023",
      registry: "Sydney",
      judicialOfficer: "Judge Judy",
    },
    courtPleadings: [
      {
        type: "Initiating Application",
        filed: "2023-01-15",
        served: "2023-01-22",
        response: "Response filed 2023-02-01",
      },
      {
        type: "Financial Statement",
        filed: "2023-01-20",
        served: "2023-01-27",
        response: "N/A",
      },
    ],
    courtListings: [
      {
        type: "First Directions Hearing",
        date: "2023-02-10",
        time: "10:00 AM",
        location: "Courtroom 1",
      },
      {
        type: "Interim Hearing",
        date: "2023-03-01",
        time: "2:00 PM",
        location: "Courtroom 2",
      },
    ],
    relationshipDetails: {
      cohabitationDate: "2010-01-01",
      marriageDate: "2012-06-15",
      marriageTown: "Sydney",
      marriageCountry: "Australia",
      separationDate: "2022-12-31",
      divorceDate: "2024-01-01",
    },
    childSupport: {
      referenceNumber: "1234567890",
      bindingAgreementDate: "2023-03-15",
      limitedAgreementDate: "2023-04-01",
    },
    realEstateDetails: {
      properties: [
        {
          buildingLevel: "Level 3",
          unit: "301",
          street: "123 Main Street",
          suburb: "Sydney",
          titleReference: "1234567/890",
          formerMatrimonialHome: true,
          tenancy: "Owner Occupied",
          clientShare: "50",
          valueOfShare: 375000,
          totalValue: 750000,
          mortgages: [
            {
              nameOfLender: "Commonwealth Bank",
              clientShare: "50",
              amountOfShare: 175000,
              totalAmount: 350000,
            },
          ],
        },
      ],
    },
    otherAssets: {
      motorVehicles: [
        {
          make: "Toyota",
          model: "Camry",
          year: "2020",
          registrationNo: "ABC123",
          clientShare: "100",
          valueOfShare: 17500,
          totalValue: 35000,
        },
      ],
      householdContents: [
        {
          description: "Furniture and Appliances",
          clientShare: "50",
          valueOfShare: 25000,
          totalValue: 50000,
        },
      ],
      bankAccounts: [
        {
          institution: "Westpac",
          accountNo: "1234567890",
          bsb: "032000",
          clientShare: "50",
          valueOfShare: 62500,
          totalValue: 125000,
        },
      ],
      businesses: [
        {
          name: "Smith & Co",
          type: "Consulting",
          address: "456 Business Street",
          clientShare: "50",
          valueOfShare: 150000,
          totalValue: 300000,
        },
      ],
      investments: [
        {
          name: "Shares",
          type: "ASX",
          numberOfShares: "1000",
          clientShare: "50",
          valueOfShare: 50000,
          totalValue: 100000,
        },
      ],
      lifeInsurance: [
        {
          nameOfCompany: "AMP",
          policyType: "Term Life",
          policyNo: "L123456",
          surrenderValue: 10000,
        },
      ],
      otherPersonalProperty: [
        {
          description: "Jewellery",
          clientShare: "50",
          valueOfShare: 2500,
          totalValue: 5000,
        },
      ],
      financialResources: [
        {
          description: "Tax Refund",
          clientShare: "100",
          valueOfShare: 1000,
          totalValue: 1000,
        },
      ],
      addbacks: [
        {
          description: "Gambling Losses",
          clientShare: "100",
          valueOfShare: 5000,
          totalValue: 5000,
        },
      ],
    },
    liabilityDetails: {
      creditCards: [
        {
          cardProvider: "ANZ",
          typeOfCard: "Visa",
          clientShare: "50",
          valueOfShare: 7500,
          totalAmount: 15000,
        },
      ],
      loans: [
        {
          nameOfLender: "NAB",
          typeOfLoan: "Personal Loan",
          clientShare: "50",
          valueOfShare: 10000,
          totalAmount: 20000,
        },
      ],
      hirePurchaseLeases: [
        {
          nameOfLender: "Latitude",
          descriptionOfProperty: "Car",
          finalPayment: "2024-01-01",
          clientShare: "50",
          valueOfShare: 2500,
          totalAmount: 5000,
        },
      ],
      unpaidTax: {
        lastFinancialYear: {
          clientShare: "50",
          valueOfShare: 2500,
          totalAmount: 5000,
        },
        previousFinancialYears: {
          clientShare: "50",
          valueOfShare: 5000,
          totalAmount: 10000,
        },
      },
      otherPersonalLiabilities: [
        {
          description: "Personal Debt",
          clientShare: "50",
          valueOfShare: 2500,
          totalAmount: 5000,
        },
      ],
      otherBusinessLiabilities: [
        {
          description: "Business Loan",
          clientShare: "50",
          valueOfShare: 5000,
          totalAmount: 10000,
        },
      ],
    },
    superannuationFund: {
      fund: "AustralianSuper",
      dateOfNoticeGiven: "2023-01-01",
    },
    spousalMaintenance: {
      agreed: true,
      dateOfAgreement: "2023-01-01",
      amount: 1000,
      period: "month",
      nonPeriodicPayments: "N/A",
      letterOfNoObjection: {
        received: true,
        date: "2023-01-01",
      },
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

  // Handle checkbox selection
  const toggleEntrySelection = (id: string) => {
    setSelectedEntries((prev) => (prev.includes(id) ? prev.filter((entryId) => entryId !== id) : [...prev, id]))
  }

  // Handle select all
  const toggleSelectAll = () => {
    if (selectedEntries.length === filteredLogEntries.length) {
      setSelectedEntries([])
    } else {
      setSelectedEntries(filteredLogEntries.map((entry) => entry.id))
    }
  }

  // Filter and sort entries
  const filteredLogEntries =
    matter.logEntries
      ?.filter((entry) => {
        const matchesType = filterType === "all" || entry.type === filterType
        const matchesSearch =
          searchQuery === "" ||
          entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (entry.data.from && entry.data.from.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (entry.data.to && entry.data.to.toLowerCase().includes(searchQuery.toLowerCase()))

        return matchesType && matchesSearch
      })
      .sort((a, b) => {
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
      }) || []

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

  // Handle request further detail
  const handleRequestFurtherDetail = () => {
    setShowDetailRequestDialog(true)
  }

  const handleDetailRequestSent = () => {
    setDetailsRequested(true)
    // In a real app, this would update the matter status in the database
  }

  const sendFurtherDetailRequest = () => {
    // In a real app, this would send an email or notification to the client
    alert("Further detail request has been sent to the client")
    setShowConfirmDialog(false)
  }

  // Handle role and relationship changes
  const handleClientRoleChange = (value: string) => {
    setClientRole(value)
    // Update the client's role in the matter object
    matter.clients[0].role = value
  }

  const handleClientRelationshipChange = (value: string) => {
    setClientRelationship(value)
    // Update the client's relationship in the matter object
    matter.clients[0].relationship = value
  }

  const handleOtherSideRoleChange = (value: string) => {
    setOtherPartyRole(value)
    // Update the other side's role in the matter object
    matter.opposingParties[0].role = value
  }

  const handleOtherSideRelationshipChange = (value: string) => {
    setOtherPartyRelationship(value)
    // Update the other side's relationship in the matter object
    matter.opposingParties[0].relationship = value
  }

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
              Conflict: {matter.conflictStatus}
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit Matter
          </Button>
          {matter.createdByCurrentUser && (
            <Button
              variant={detailsRequested ? "outline" : "outline"}
              className={detailsRequested ? "border-amber-500 text-amber-700 bg-amber-50" : ""}
              onClick={handleRequestFurtherDetail}
            >
              <Send className="mr-2 h-4 w-4" />
              {detailsRequested ? "Further detail requested" : "Request Further Detail"}
            </Button>
          )}
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
                      <div className="flex flex-wrap gap-1 mt-1">
                        <Badge variant="secondary" className="text-xs py-0 px-1">
                          {client.role || clientRole}
                        </Badge>
                        <Badge variant="secondary" className="text-xs py-0 px-1">
                          {client.relationship || clientRelationship}
                        </Badge>
                      </div>
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
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="clientRole">Role</Label>
                    <Select value={clientRole} onValueChange={handleClientRoleChange}>
                      <SelectTrigger id="clientRole">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Applicant">Applicant</SelectItem>
                        <SelectItem value="Respondent">Respondent</SelectItem>
                        <SelectItem value="First Respondent">First Respondent</SelectItem>
                        <SelectItem value="Second Respondent">Second Respondent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="clientRelationship">Relationship</Label>
                    <Select value={clientRelationship} onValueChange={handleClientRelationshipChange}>
                      <SelectTrigger id="clientRelationship">
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mother">Mother</SelectItem>
                        <SelectItem value="Father">Father</SelectItem>
                        <SelectItem value="Husband">Husband</SelectItem>
                        <SelectItem value="Wife">Wife</SelectItem>
                        <SelectItem value="Defacto Husband">Defacto Husband</SelectItem>
                        <SelectItem value="Defacto Wife">Defacto Wife</SelectItem>
                        <SelectItem value="Defacto Spouse">Defacto Spouse</SelectItem>
                        <SelectItem value="Mother/Wife">Mother/Wife</SelectItem>
                        <SelectItem value="Father/Husband">Father/Husband</SelectItem>
                        <SelectItem value="Grandparent">Grandparent</SelectItem>
                        <SelectItem value="Aunt">Aunt</SelectItem>
                        <SelectItem value="Uncle">Uncle</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  <Plus className="h-3 w-3 mr-1" /> Add Client
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Other Sides</CardTitle>
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
                      <div className="flex flex-wrap gap-1 mt-1">
                        <Badge variant="secondary" className="text-xs py-0 px-1">
                          {party.role || otherPartyRole}
                        </Badge>
                        <Badge variant="secondary" className="text-xs py-0 px-1">
                          {party.relationship || otherPartyRelationship}
                        </Badge>
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
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="otherSideRole">Role</Label>
                    <Select value={otherPartyRole} onValueChange={handleOtherSideRoleChange}>
                      <SelectTrigger id="otherSideRole">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Applicant">Applicant</SelectItem>
                        <SelectItem value="Respondent">Respondent</SelectItem>
                        <SelectItem value="First Respondent">First Respondent</SelectItem>
                        <SelectItem value="Second Respondent">Second Respondent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="otherSideRelationship">Relationship</Label>
                    <Select value={otherPartyRelationship} onValueChange={handleOtherSideRelationshipChange}>
                      <SelectTrigger id="otherSideRelationship">
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mother">Mother</SelectItem>
                        <SelectItem value="Father">Father</SelectItem>
                        <SelectItem value="Husband">Husband</SelectItem>
                        <SelectItem value="Wife">Wife</SelectItem>
                        <SelectItem value="Defacto Husband">Defacto Husband</SelectItem>
                        <SelectItem value="Defacto Wife">Defacto Wife</SelectItem>
                        <SelectItem value="Defacto Spouse">Defacto Spouse</SelectItem>
                        <SelectItem value="Mother/Wife">Mother/Wife</SelectItem>
                        <SelectItem value="Father/Husband">Father/Husband</SelectItem>
                        <SelectItem value="Grandparent">Grandparent</SelectItem>
                        <SelectItem value="Aunt">Aunt</SelectItem>
                        <SelectItem value="Uncle">Uncle</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  <Plus className="h-3 w-3 mr-1" /> Add Other Side
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

      <Tabs defaultValue="matter-detail">
        <TabsList>
          <TabsTrigger value="matter-detail">Matter Detail</TabsTrigger>
          <TabsTrigger value="chronology">Matter Chronology</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="hearings">Court Hearings</TabsTrigger>
          <TabsTrigger value="children">Children</TabsTrigger>
          <TabsTrigger value="property">Property & Financials</TabsTrigger>
          <TabsTrigger value="relationship">Relationship Details</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="matter-detail" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Matter Details</CardTitle>
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" /> Edit Details
              </Button>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="case-detail">
                <TabsList className="mb-4">
                  <TabsTrigger value="case-detail">Case Detail</TabsTrigger>
                  <TabsTrigger value="jurisdiction">Jurisdiction</TabsTrigger>
                  <TabsTrigger value="court-details">Court Details</TabsTrigger>
                  <TabsTrigger value="court-pleadings">Court Pleadings</TabsTrigger>
                  <TabsTrigger value="court-listings">Court Listings</TabsTrigger>
                  <TabsTrigger value="statutory">Statutory Limitations</TabsTrigger>
                </TabsList>

                <TabsContent value="case-detail">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Matter Information</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="matter-type">Matter Type</Label>
                          <Select defaultValue={matter.type}>
                            <SelectTrigger id="matter-type">
                              <SelectValue placeholder="Select matter type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Children & Property">Children & Property</SelectItem>
                              <SelectItem value="Property Only">Property Only</SelectItem>
                              <SelectItem value="Children Only">Children Only</SelectItem>
                              <SelectItem value="Divorce">Divorce</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="jurisdiction">Jurisdiction</Label>
                          <Select defaultValue="Family Law Act 1975 (Cth)">
                            <SelectTrigger id="jurisdiction">
                              <SelectValue placeholder="Select jurisdiction" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Family Law Act 1975 (Cth)">Family Law Act 1975 (Cth)</SelectItem>
                              <SelectItem value="Family Court Act 1997 (WA)">Family Court Act 1997 (WA)</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="billing-type">Billing Type</Label>
                          <Select defaultValue={matter.billingType}>
                            <SelectTrigger id="billing-type">
                              <SelectValue placeholder="Select billing type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Time Based">Time Based</SelectItem>
                              <SelectItem value="Fixed Fee">Fixed Fee</SelectItem>
                              <SelectItem value="No Win No Fee">No Win No Fee</SelectItem>
                              <SelectItem value="Legal Aid">Legal Aid</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="opened-date">Opened Date</Label>
                          <Input type="date" id="opened-date" defaultValue={matter.matterOpened} />
                        </div>

                        {matter.matterClosed && (
                          <div>
                            <Label htmlFor="closed-date">Closed Date</Label>
                            <Input type="date" id="closed-date" defaultValue={matter.matterClosed} />
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Staff Assignment</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="partner-supervising">Partner Supervising</Label>
                          <Select defaultValue={matter.partnerSupervising?.id.toString() || ""}>
                            <SelectTrigger id="partner-supervising">
                              <SelectValue placeholder="Select partner" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="302">Michael Roberts</SelectItem>
                              <SelectItem value="303">Jessica Adams</SelectItem>
                              <SelectItem value="304">David Wilson</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="assigned-lawyer">Assigned Lawyer</Label>
                          <Select defaultValue={matter.assignedTo?.id.toString() || ""}>
                            <SelectTrigger id="assigned-lawyer">
                              <SelectValue placeholder="Select lawyer" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="301">Sarah Williams</SelectItem>
                              <SelectItem value="302">Michael Roberts</SelectItem>
                              <SelectItem value="303">Jessica Adams</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="assisting-lawyer">Assisting Lawyer</Label>
                          <Select defaultValue={matter.assistingLawyer?.id.toString() || ""}>
                            <SelectTrigger id="assisting-lawyer">
                              <SelectValue placeholder="Select assisting lawyer" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="303">Jessica Adams</SelectItem>
                              <SelectItem value="304">David Wilson</SelectItem>
                              <SelectItem value="305">Emily Johnson</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="jurisdiction">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Jurisdiction Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="jurisdiction-type">Jurisdiction Type</Label>
                          <Select defaultValue="Family Law Act 1975 (Cth)">
                            <SelectTrigger id="jurisdiction-type">
                              <SelectValue placeholder="Select jurisdiction" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Family Law Act 1975 (Cth)">Family Law Act 1975 (Cth)</SelectItem>
                              <SelectItem value="Family Court Act 1997 (WA)">Family Court Act 1997 (WA)</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="state">State/Territory</Label>
                          <Select defaultValue={matter.jurisdiction || "NSW"}>
                            <SelectTrigger id="state">
                              <SelectValue placeholder="Select state/territory" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="NSW">New South Wales</SelectItem>
                              <SelectItem value="VIC">Victoria</SelectItem>
                              <SelectItem value="QLD">Queensland</SelectItem>
                              <SelectItem value="WA">Western Australia</SelectItem>
                              <SelectItem value="SA">South Australia</SelectItem>
                              <SelectItem value="TAS">Tasmania</SelectItem>
                              <SelectItem value="ACT">Australian Capital Territory</SelectItem>
                              <SelectItem value="NT">Northern Territory</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="court-details">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium mb-4">Court Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="court">Court</Label>
                        <Select defaultValue={matter.courtDetails?.court || ""}>
                          <SelectTrigger id="court">
                            <SelectValue placeholder="Select court" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Federal Circuit and Family Court of Australia">
                              Federal Circuit and Family Court of Australia
                            </SelectItem>
                            <SelectItem value="Family Court of Western Australia">
                              Family Court of Western Australia
                            </SelectItem>
                            <SelectItem value="Local Court">Local Court</SelectItem>
                            <SelectItem value="District Court">District Court</SelectItem>
                            <SelectItem value="Supreme Court">Supreme Court</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="file-number">File Number</Label>
                        <Input
                          type="text"
                          id="file-number"
                          placeholder="Enter file number"
                          defaultValue={matter.courtDetails?.fileNumber || ""}
                        />
                      </div>
                      <div>
                        <Label htmlFor="registry">Registry</Label>
                        <Select defaultValue={matter.courtDetails?.registry || ""}>
                          <SelectTrigger id="registry">
                            <SelectValue placeholder="Select registry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Sydney">Sydney</SelectItem>
                            <SelectItem value="Melbourne">Melbourne</SelectItem>
                            <SelectItem value="Brisbane">Brisbane</SelectItem>
                            <SelectItem value="Perth">Perth</SelectItem>
                            <SelectItem value="Adelaide">Adelaide</SelectItem>
                            <SelectItem value="Hobart">Hobart</SelectItem>
                            <SelectItem value="Darwin">Darwin</SelectItem>
                            <SelectItem value="Canberra">Canberra</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="judicial-officer">Judicial Officer</Label>
                        <Input
                          type="text"
                          id="judicial-officer"
                          placeholder="Enter judicial officer"
                          defaultValue={matter.courtDetails?.judicialOfficer || ""}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="court-pleadings">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Court Pleadings</h3>
                      <Button size="sm">
                        <Plus className="h-3 w-3 mr-1" /> Add Pleading
                      </Button>
                    </div>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Pleading</TableHead>
                            <TableHead>Filed</TableHead>
                            <TableHead>Served</TableHead>
                            <TableHead>Response</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {matter.courtPleadings && matter.courtPleadings.length > 0 ? (
                            matter.courtPleadings.map((pleading, index) => (
                              <TableRow key={index}>
                                <TableCell>{pleading.type}</TableCell>
                                <TableCell>{pleading.filed || "Not filed"}</TableCell>
                                <TableCell>{pleading.served || "Not served"}</TableCell>
                                <TableCell>{pleading.response || "No response"}</TableCell>
                                <TableCell>
                                  <div className="flex space-x-1">
                                    <Button variant="ghost" size="sm">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                                No court pleadings recorded
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="court-listings">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Court Listings</h3>
                      <Button size="sm">
                        <Plus className="h-3 w-3 mr-1" /> Add Court Listing
                      </Button>
                    </div>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Court Listing</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {matter.courtListings && matter.courtListings.length > 0 ? (
                            matter.courtListings.map((listing, index) => (
                              <TableRow key={index}>
                                <TableCell>{listing.type}</TableCell>
                                <TableCell>{listing.date || "Not scheduled"}</TableCell>
                                <TableCell>{listing.time || "Not specified"}</TableCell>
                                <TableCell>{listing.location || "Not specified"}</TableCell>
                                <TableCell>
                                  <div className="flex space-x-1">
                                    <Button variant="ghost" size="sm">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                                No court listings recorded
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="statutory">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium mb-4">Statutory Limitation Period</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="limitation-date">Limitation Date</Label>
                        <Input type="date" id="limitation-date" placeholder="Select a date" />
                      </div>
                      <div>
                        <Label htmlFor="limitation-notes">Notes</Label>
                        <Input type="text" id="limitation-notes" placeholder="Enter notes about limitation period" />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chronology" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Matter Chronology</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-3 w-3 mr-1" /> Advanced Filter
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" /> Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
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
                </div>

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
                            checked={
                              selectedEntries.length === filteredLogEntries.length && filteredLogEntries.length > 0
                            }
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
                      {filteredLogEntries.length > 0 ? (
                        filteredLogEntries.map((entry) => (
                          <TableRow key={entry.id} className="hover:bg-gray-50">
                            <TableCell className="p-2">
                              <Checkbox
                                checked={selectedEntries.includes(entry.id)}
                                onCheckedChange={() => toggleEntrySelection(entry.id)}
                                aria-label={`Select ${entry.title}`}
                                onClick={(e) => e.stopPropagation()}
                              />
                            </TableCell>
                            <TableCell className="font-medium p-2" onClick={() => setSelectedLogEntry(entry)}>
                              <div>{entry.date}</div>
                              <div className="text-xs text-gray-500">{entry.time}</div>
                            </TableCell>
                            <TableCell className="p-2" onClick={() => setSelectedLogEntry(entry)}>
                              <div className="flex items-center space-x-2">
                                <div
                                  className={`h-6 w-6 rounded-full ${getActivityColor(entry.type)} flex items-center justify-center`}
                                >
                                  {getLogEntryIcon(entry.type)}
                                </div>
                                <span className="text-xs capitalize">{entry.type}</span>
                              </div>
                            </TableCell>
                            <TableCell className="p-2" onClick={() => setSelectedLogEntry(entry)}>
                              <div className="font-medium">{entry.title}</div>
                              {entry.type === "email" && entry.data.hasAttachments && (
                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                  <Paperclip className="h-3 w-3 mr-1" />
                                  <span>Attachments</span>
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="p-2" onClick={() => setSelectedLogEntry(entry)}>
                              {entry.user}
                            </TableCell>
                            <TableCell className="p-2" onClick={() => setSelectedLogEntry(entry)}>
                              {entry.type === "email" && (
                                <div className="text-xs">
                                  <div>From: {entry.data.from?.split("@")[0]}</div>
                                  <div>To: {entry.data.to?.split("@")[0]}</div>
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
                                  <DropdownMenuItem onClick={() => setSelectedLogEntry(entry)}>
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
              </div>
            </CardContent>
          </Card>
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

        <TabsContent value="hearings" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Court Hearings</CardTitle>
              <Button>
                <Plus className="h-4 w-4 mr-1" /> Add Hearing
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {matter.hearings.map((hearing) => (
                  <div key={hearing.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-lg">{hearing.title}</h3>
                          <Badge variant="outline">{hearing.date}</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span>{hearing.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span>{hearing.location}</span>
                          </div>
                          {hearing.judge && (
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-gray-500" />
                              <span>Judge: {hearing.judge}</span>
                            </div>
                          )}
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
          <PropertyFinancialTab />
        </TabsContent>

        <TabsContent value="relationship" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Relationship Details</CardTitle>
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" /> Edit Details
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Cohabitation</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Date:</p>
                      <p>{matter.relationshipDetails?.cohabitationDate || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Month/Year:</p>
                      <p>
                        {matter.relationshipDetails?.cohabitationMonth
                          ? `${matter.relationshipDetails?.cohabitationMonth}/${matter.relationshipDetails?.cohabitationYear}`
                          : "Not specified"}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium pt-4">Marriage</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Date:</p>
                      <p>{matter.relationshipDetails?.marriageDate || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Location:</p>
                      <p>
                        {matter.relationshipDetails?.marriageTown && matter.relationshipDetails?.marriageCountry
                          ? `${matter.relationshipDetails?.marriageTown}, ${matter.relationshipDetails?.marriageCountry}`
                          : "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Separation</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Date:</p>
                      <p>{matter.relationshipDetails?.separationDate || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Month/Year:</p>
                      <p>
                        {matter.relationshipDetails?.separationMonth
                          ? `${matter.relationshipDetails?.separationMonth}/${matter.relationshipDetails?.separationYear}`
                          : "Not specified"}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium pt-4">Divorce</h3>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date:</p>
                    <p>{matter.relationshipDetails?.divorceDate || "Not specified"}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Child Support</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Reference Number:</p>
                    <p>{matter.childSupport?.referenceNumber || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Binding Agreement Date:</p>
                    <p>{matter.childSupport?.bindingAgreementDate || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Binding Agreement Date:</p>
                    <p>{matter.childSupport?.bindingAgreementDate || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Limited Agreement Date:</p>
                    <p>{matter.childSupport?.limitedAgreementDate || "Not specified"}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Spousal Maintenance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Agreed:</p>
                    <p>{matter.spousalMaintenance?.agreed ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Agreement Date:</p>
                    <p>{matter.spousalMaintenance?.dateOfAgreement || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Amount:</p>
                    <p>
                      {matter.spousalMaintenance?.amount
                        ? `$${matter.spousalMaintenance?.amount} ${matter.spousalMaintenance?.period || "per period"}`
                        : "Not specified"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Non-periodic Payments:</p>
                    <p>{matter.spousalMaintenance?.nonPeriodicPayments || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Letter of No Objection:</p>
                    <p>
                      {matter.spousalMaintenance?.letterOfNoObjection?.received
                        ? `Yes - ${matter.spousalMaintenance?.letterOfNoObjection?.date}`
                        : "No"}
                    </p>
                  </div>
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
                <Plus className="h-4 w-4 mr-1" /> Add Child
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span>Living with: {child.livingWith}</span>
                          </div>
                          {child.primaryCareGiver && (
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-gray-500" />
                              <span>Primary Care Giver: {child.primaryCareGiver}</span>
                            </div>
                          )}
                          {child.school && (
                            <div className="flex items-center gap-1">
                              <FileText className="h-4 w-4 text-gray-500" />
                              <span>School: {child.school}</span>
                            </div>
                          )}
                          {child.grade && (
                            <div className="flex items-center gap-1">
                              <FileText className="h-4 w-4 text-gray-500" />
                              <span>Grade: {child.grade}</span>
                            </div>
                          )}
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

        <TabsContent value="notes" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Notes</CardTitle>
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
                          <h3 className="font-medium text-lg">
                            {note.content.substring(0, 50)}
                            {note.content.length > 50 ? "..." : ""}
                          </h3>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span>{note.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span>{note.time}</span>
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
      </Tabs>
      {/* Request Detail Email Dialog */}
      <RequestDetailEmailDialog
        isOpen={showDetailRequestDialog}
        onClose={() => setShowDetailRequestDialog(false)}
        onSend={handleDetailRequestSent}
        clientEmail={matter.client.email}
        matterReference={matter.reference}
        clientName={matter.client.name}
      />
    </div>
  )
}
