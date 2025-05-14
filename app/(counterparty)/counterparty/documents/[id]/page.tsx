"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calendar, Download, User } from "lucide-react"
import { DocumentViewer } from "@/components/document-viewer"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface Comment {
  id: string
  user: {
    name: string
    avatar: string
    role: string
  }
  content: string
  date: string
  textReference: string
  replies: Array<{
    id: string
    user: {
      name: string
      avatar: string
      role: string
    }
    content: string
    date: string
  }>
}

export default function DocumentPage({ params }: { params: { id: string } }) {
  const [status, setStatus] = useState("Pending Review")
  const [highlightedText, setHighlightedText] = useState<string | null>(null)
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "comment-1",
      user: {
        name: "John Smith",
        avatar: "/javascript-code-abstract.png",
        role: "Counterparty",
      },
      content:
        "I have concerns about section 2.3 regarding the payment schedule. Can we discuss extending the timeline?",
      date: "2023-04-16T09:30:00Z",
      textReference: "payment terms",
      replies: [
        {
          id: "reply-1",
          user: {
            name: "Sarah Johnson",
            avatar: "/stylized-initials.png",
            role: "Lawyer",
          },
          content: "I've noted your concern. Let me discuss with my client and get back to you.",
          date: "2023-04-16T10:45:00Z",
        },
      ],
    },
    {
      id: "comment-2",
      user: {
        name: "John Smith",
        avatar: "/javascript-code-abstract.png",
        role: "Counterparty",
      },
      content:
        "The indemnification clause in section 5.2 seems overly broad. Can we narrow the scope to specific scenarios?",
      date: "2023-04-17T14:20:00Z",
      textReference: "indemnification",
      replies: [],
    },
    {
      id: "comment-3",
      user: {
        name: "John Smith",
        avatar: "/javascript-code-abstract.png",
        role: "Counterparty",
      },
      content: "I approve of the changes made to the confidentiality section.",
      date: "2023-04-18T11:05:00Z",
      textReference: "confidentiality",
      replies: [],
    },
  ])

  const [clauseAgreements, setClauseAgreements] = useState<{
    [key: string]: {
      status: "agree" | "partially-agree" | "disagree"
      notes?: string
    }
  }>({
    "1.1": { status: "agree" },
    "1.2": { status: "agree" },
    "2.1": { status: "agree" },
    "2.2": { status: "agree" },
    "3": { status: "agree" },
  })
  const [activeClause, setActiveClause] = useState<string | null>(null)
  const [clauseNote, setClauseNote] = useState("")
  const [showNoteDialog, setShowNoteDialog] = useState(false)

  const handleAgreementChange = (clause: string, status: "agree" | "partially-agree" | "disagree") => {
    setClauseAgreements({
      ...clauseAgreements,
      [clause]: {
        ...clauseAgreements[clause],
        status,
      },
    })

    if (status === "partially-agree" || status === "disagree") {
      setActiveClause(clause)
      setClauseNote(clauseAgreements[clause]?.notes || "")
      setShowNoteDialog(true)
    }
  }

  const saveClauseNote = () => {
    if (activeClause) {
      setClauseAgreements({
        ...clauseAgreements,
        [activeClause]: {
          ...clauseAgreements[activeClause],
          notes: clauseNote,
        },
      })
      setShowNoteDialog(false)
    }
  }

  // This would be fetched from an API in a real implementation
  const document = {
    id: params.id,
    title: "Settlement Agreement - Draft",
    date: "2023-04-15T10:30:00Z",
    status: status,
    category: "Agreements",
    sharedBy: {
      name: "Sarah Johnson",
      email: "sarah.johnson@lawmanage.com",
      avatar: "/stylized-initials.png",
    },
    content:
      "This is a placeholder for the document content. In a real implementation, this would be the actual document content that could be viewed in the document viewer component.",
  }

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus)
    // In a real implementation, this would make an API call to update the status
    console.log(`Status updated to: ${newStatus}`)
  }

  const handleAddComment = (selectedText: string, commentContent: string) => {
    const newComment: Comment = {
      id: `comment-${comments.length + 1}`,
      user: {
        name: "John Smith", // Current user
        avatar: "/javascript-code-abstract.png",
        role: "Counterparty",
      },
      content: commentContent,
      date: new Date().toISOString(),
      textReference: selectedText,
      replies: [],
    }

    setComments([...comments, newComment])
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/counterparty/documents">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Documents
          </Link>
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{document.title}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>{new Date(document.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-3.5 w-3.5" />
                <span>Shared by: {document.sharedBy.name}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Status:</span>
              <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Update status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending Review">Pending Review</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Reviewed">Reviewed</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // In a real app, this would send the document back to the lawyer
                alert("Document sent back to lawyer for review")
                setStatus("Under Review")
              }}
            >
              Send Back for Review
            </Button>

            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg overflow-hidden">
        <DocumentViewer
          documentId={params.id}
          highlightedText={highlightedText}
          onAddComment={handleAddComment}
          clauseAgreements={clauseAgreements}
          onAgreementChange={handleAgreementChange}
        />
      </div>

      {showNoteDialog && activeClause && (
        <Dialog open={showNoteDialog} onOpenChange={setShowNoteDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {clauseAgreements[activeClause]?.status === "partially-agree" ? "Partially Agree" : "Disagree"} with
                Clause {activeClause}
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="clause-note">Please explain your concerns:</Label>
              <Textarea
                id="clause-note"
                value={clauseNote}
                onChange={(e) => setClauseNote(e.target.value)}
                className="mt-2 min-h-[100px]"
                placeholder="Enter your comments about this clause..."
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNoteDialog(false)}>
                Cancel
              </Button>
              <Button onClick={saveClauseNote}>Save Comments</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
