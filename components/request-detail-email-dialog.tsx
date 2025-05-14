"use client"

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
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { FileText } from "lucide-react"

interface RequestDetailEmailDialogProps {
  isOpen: boolean
  onClose: () => void
  onSend: () => void
  clientEmail: string
  matterReference: string
  clientName: string
}

export default function RequestDetailEmailDialog({
  isOpen,
  onClose,
  onSend,
  clientEmail,
  matterReference,
  clientName,
}: RequestDetailEmailDialogProps) {
  const [subject, setSubject] = useState(`Further information required for matter ${matterReference}`)
  const [content, setContent] = useState(
    `Dear ${clientName},\n\nWe require some additional information for your matter. Please complete the intake form using the link below.\n\nThank you for your cooperation.\n\nKind regards,`,
  )

  const handleSend = () => {
    // In a real app, this would send the email via an API
    console.log({
      to: clientEmail,
      subject,
      content,
      attachment: "Intake Form Link",
    })

    // Close the dialog and notify parent component
    onSend()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Request Further Details</DialogTitle>
          <DialogDescription>
            Send an email to the client requesting additional information for this matter.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          <div className="space-y-4">
            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
              <Label htmlFor="to">To:</Label>
              <Input id="to" value={clientEmail} disabled />
            </div>

            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
              <Label htmlFor="subject">Subject:</Label>
              <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Message:</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[300px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Included Links</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 border rounded-md bg-gray-50">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-blue-500" />
                    <span>Intake Form</span>
                    <Badge variant="outline" className="ml-2 text-xs bg-blue-50 text-blue-700 border-blue-200">
                      URL
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">https://lawmanage.com/intake/form/123</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
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
