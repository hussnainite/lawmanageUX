"use client"

import { useState, useEffect } from "react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Paperclip, X, FileText, ChevronDown, Search } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface Document {
  id: number
  name: string
  type: string
  date: string
  status: string
}

interface EmailComposeDialogProps {
  isOpen: boolean
  onClose: () => void
  matterId: number
  mode: "new" | "reply" | "replyAll" | "forward"
  originalEmail?: {
    id: number
    from: string
    to: string
    cc?: string
    subject: string
    content: string
    date: string
    time: string
    hasAttachments: boolean
    attachments?: {
      id: number
      name: string
      type: string
      size: string
    }[]
  }
  documents?: Document[]
}

export default function EmailComposeDialog({
  isOpen,
  onClose,
  matterId,
  mode,
  originalEmail,
  documents = [],
}: EmailComposeDialogProps) {
  const [to, setTo] = useState("")
  const [cc, setCc] = useState("")
  const [bcc, setBcc] = useState("")
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")
  const [attachments, setAttachments] = useState<{ id: number; name: string; type: string; size: string }[]>([])
  const [showCc, setShowCc] = useState(false)
  const [showBcc, setShowBcc] = useState(false)
  const [showDocumentSelector, setShowDocumentSelector] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Initialize email fields based on mode
  useEffect(() => {
    if (originalEmail) {
      if (mode === "reply") {
        setTo(originalEmail.from)
        setSubject(`Re: ${originalEmail.subject}`)
        setContent(
          `\n\n-------- Original Message --------\nFrom: ${originalEmail.from}\nDate: ${originalEmail.date} at ${originalEmail.time}\nSubject: ${originalEmail.subject}\n\n${originalEmail.content.replace(/<[^>]*>/g, "")}\n\n`,
        )
      } else if (mode === "replyAll") {
        // Extract the current user's email (assuming it's in the "from" field of the original email)
        const currentUserEmail = "sarah.johnson@lawmanage.com" // This would be dynamically set in a real app

        // Set "to" field to include original sender and all recipients except current user
        const allRecipients = [originalEmail.from, originalEmail.to]
          .flatMap((email) => email.split(",").map((e) => e.trim()))
          .filter((email) => email !== currentUserEmail)

        setTo(allRecipients.join(", "))
        if (originalEmail.cc) {
          setCc(originalEmail.cc)
          setShowCc(true)
        }

        setSubject(`Re: ${originalEmail.subject}`)
        setContent(
          `\n\n-------- Original Message --------\nFrom: ${originalEmail.from}\nDate: ${originalEmail.date} at ${originalEmail.time}\nSubject: ${originalEmail.subject}\n\n${originalEmail.content.replace(/<[^>]*>/g, "")}\n\n`,
        )
      } else if (mode === "forward") {
        setSubject(`Fwd: ${originalEmail.subject}`)
        setContent(
          `\n\n-------- Forwarded Message --------\nFrom: ${originalEmail.from}\nDate: ${originalEmail.date} at ${originalEmail.time}\nSubject: ${originalEmail.subject}\nTo: ${originalEmail.to}\n\n${originalEmail.content.replace(/<[^>]*>/g, "")}\n\n`,
        )

        // Include original attachments when forwarding
        if (originalEmail.attachments) {
          setAttachments(originalEmail.attachments)
        }
      }
    }
  }, [mode, originalEmail])

  const handleSend = () => {
    // In a real app, this would send the email via an API
    console.log({
      to,
      cc,
      bcc,
      subject,
      content,
      attachments,
      matterId,
    })

    // Close the dialog
    onClose()
  }

  const handleAttachFile = () => {
    // In a real app, this would open a file picker
    const mockAttachment = {
      id: Math.floor(Math.random() * 1000),
      name: "New_Attachment.pdf",
      type: "PDF",
      size: "1.2 MB",
    }
    setAttachments([...attachments, mockAttachment])
  }

  const handleRemoveAttachment = (id: number) => {
    setAttachments(attachments.filter((attachment) => attachment.id !== id))
  }

  const handleAttachDocument = (document: Document) => {
    const newAttachment = {
      id: document.id,
      name: document.name,
      type: document.type,
      size: "1.2 MB", // This would be actual file size in a real app
    }

    // Check if document is already attached
    if (!attachments.some((att) => att.id === document.id)) {
      setAttachments([...attachments, newAttachment])
    }

    setShowDocumentSelector(false)
  }

  const filteredDocuments = documents.filter((doc) => doc.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {mode === "new" && "New Email"}
            {mode === "reply" && "Reply"}
            {mode === "replyAll" && "Reply All"}
            {mode === "forward" && "Forward Email"}
          </DialogTitle>
          <DialogDescription>
            {mode === "new" && `Compose a new email related to Matter #${matterId.toString().padStart(5, "0")}`}
            {mode === "reply" && "Reply to the sender of this email"}
            {mode === "replyAll" && "Reply to the sender and all recipients"}
            {mode === "forward" && "Forward this email to someone else"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          <div className="space-y-4">
            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
              <Label htmlFor="to">To:</Label>
              <div className="flex items-center space-x-2">
                <Input id="to" value={to} onChange={(e) => setTo(e.target.value)} placeholder="recipient@example.com" />
                {!showCc && !showBcc && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setShowCc(true)}>Add Cc</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setShowBcc(true)}>Add Bcc</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>

            {showCc && (
              <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                <Label htmlFor="cc">Cc:</Label>
                <div className="flex items-center space-x-2">
                  <Input id="cc" value={cc} onChange={(e) => setCc(e.target.value)} placeholder="cc@example.com" />
                  <Button variant="ghost" size="sm" onClick={() => setShowCc(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {showBcc && (
              <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                <Label htmlFor="bcc">Bcc:</Label>
                <div className="flex items-center space-x-2">
                  <Input id="bcc" value={bcc} onChange={(e) => setBcc(e.target.value)} placeholder="bcc@example.com" />
                  <Button variant="ghost" size="sm" onClick={() => setShowBcc(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
              <Label htmlFor="subject">Subject:</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Email subject"
              />
            </div>

            <Tabs defaultValue="compose">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="compose">Compose</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="compose" className="border rounded-md p-4 min-h-[300px]">
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Compose your email here..."
                  className="min-h-[300px] border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </TabsContent>
              <TabsContent value="preview" className="border rounded-md p-4 min-h-[300px]">
                <div className="prose prose-sm max-w-none">
                  {content.split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {attachments.length > 0 && (
              <div className="space-y-2">
                <Label>Attachments ({attachments.length})</Label>
                <div className="space-y-2">
                  {attachments.map((attachment) => (
                    <div key={attachment.id} className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{attachment.name}</span>
                        <Badge variant="outline" className="ml-2 text-xs">
                          {attachment.type}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{attachment.size}</span>
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveAttachment(attachment.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleAttachFile}>
              <Paperclip className="h-4 w-4 mr-1" /> Attach File
            </Button>

            <Popover open={showDocumentSelector} onOpenChange={setShowDocumentSelector}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-1" /> Matter Documents
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-0" align="start">
                <div className="p-4 border-b">
                  <h4 className="font-medium mb-2">Select Document to Attach</h4>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search documents..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {filteredDocuments.length > 0 ? (
                    <div className="divide-y">
                      {filteredDocuments.map((doc) => (
                        <div
                          key={doc.id}
                          className="p-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                          onClick={() => handleAttachDocument(doc)}
                        >
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-gray-400" />
                            <div>
                              <div className="font-medium">{doc.name}</div>
                              <div className="text-xs text-gray-500">
                                {doc.type} • {doc.date}
                              </div>
                            </div>
                          </div>
                          <Badge variant={doc.status === "Filed" ? "default" : "outline"}>{doc.status}</Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">No documents found</div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSend}>Send Email</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
