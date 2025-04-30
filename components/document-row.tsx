"use client"

import { useState } from "react"
import { FileText, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import DocumentEditor from "./document-editor"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface DocumentRowProps {
  document: {
    id: number
    name: string
    type: string
    date: string
    status: string
  }
  matterId: number
}

export default function DocumentRow({ document, matterId }: DocumentRowProps) {
  const [showEditor, setShowEditor] = useState(false)
  const [publishDialogOpen, setPublishDialogOpen] = useState(false)

  const handleOpenDocument = () => {
    setShowEditor(true)
  }

  const handlePublishClick = () => {
    setPublishDialogOpen(true)
  }

  // Mock document content based on document name
  const getDocumentContent = () => {
    return `This is the content of "${document.name}" (ID: ${document.id}).\n\nThis document was created on ${document.date} and is currently marked as "${document.status}".\n\nIn a real application, this content would be fetched from a database or document management system.`
  }

  return (
    <>
      <div
        className="px-4 py-3 grid grid-cols-12 items-center hover:bg-gray-50 cursor-pointer"
        onClick={handleOpenDocument}
      >
        <div className="col-span-5 flex items-center space-x-3">
          <FileText className="h-5 w-5 text-gray-400" />
          <span className="font-medium">{document.name}</span>
        </div>
        <div className="col-span-2 text-sm text-gray-500">{document.type}</div>
        <div className="col-span-2 text-sm text-gray-500">{document.date}</div>
        <div className="col-span-2">
          <Badge variant={document.status === "Filed" ? "default" : "outline"}>{document.status}</Badge>
        </div>
        <div className="col-span-1 text-right" onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleOpenDocument}>Open Document</DropdownMenuItem>
              <DropdownMenuItem>Download</DropdownMenuItem>
              <DropdownMenuItem>Edit Details</DropdownMenuItem>
              <DropdownMenuItem>Attach to Hearing</DropdownMenuItem>
              <DropdownMenuItem onClick={handlePublishClick}>Publish Document</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {showEditor && (
        <DocumentEditor
          isOpen={showEditor}
          onClose={() => setShowEditor(false)}
          matterId={matterId}
          documentName={document.name}
          initialContent={getDocumentContent()}
          documentId={document.id}
        />
      )}

      {/* Publish Confirmation Dialog */}
      <AlertDialog open={publishDialogOpen} onOpenChange={setPublishDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Publish Document</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to publish the document "{document.name}" to the counterparty portal?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                // Here you would add the actual publish logic
                // For now, just close the dialog
                setPublishDialogOpen(false)
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
