"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Upload, FileText } from "lucide-react"
import { useState, useEffect } from "react"
import DocumentPrecedentDialog from "./document-template-dialog"
import DocumentEditor from "./document-editor"

export default function AddDocumentDialog({ matterId }: { matterId: number }) {
  const [open, setOpen] = useState(false)
  const [showPrecedentDialog, setShowPrecedentDialog] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const [documentName, setDocumentName] = useState("")
  const [selectedPrecedent, setSelectedPrecedent] = useState(null)

  useEffect(() => {
    const handleUsePrecedent = (event) => {
      const { precedent, matterId } = event.detail
      setSelectedPrecedent(precedent)
      setShowEditor(true)
    }

    window.addEventListener("use-precedent", handleUsePrecedent)

    return () => {
      window.removeEventListener("use-precedent", handleUsePrecedent)
    }
  }, [])

  const handleCreateNew = () => {
    if (documentName.trim()) {
      setOpen(false)
      setShowEditor(true)
    }
  }

  const handleOpenPrecedentDialog = () => {
    setOpen(false)
    setShowPrecedentDialog(true)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Plus className="h-3 w-3 mr-1" /> Add Document
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Document</DialogTitle>
            <DialogDescription>Upload a document to Matter #{matterId.toString().padStart(5, "0")}</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div
                className="border rounded-lg p-4 hover:border-gray-300 transition-colors cursor-pointer"
                onClick={handleOpenPrecedentDialog}
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-100 p-2 rounded-md">
                    <FileText className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Select from Precedents</h3>
                    <p className="text-sm text-gray-500">Choose from pre-defined document precedents</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4 hover:border-gray-300 transition-colors">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-gray-100 p-2 rounded-md">
                    <FileText className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Create New Document</h3>
                    <p className="text-sm text-gray-500">Create a new document from scratch</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="document-name">Document Name</Label>
                    <Input
                      id="document-name"
                      placeholder="e.g. Financial Disclosure"
                      value={documentName}
                      onChange={(e) => setDocumentName(e.target.value)}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={handleCreateNew}
                    disabled={!documentName.trim()}
                  >
                    Create New
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-4 hover:border-gray-300 transition-colors">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-gray-100 p-2 rounded-md">
                    <Upload className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Upload Document</h3>
                    <p className="text-sm text-gray-500">Upload an existing document file</p>
                  </div>
                </div>
                <div className="border-2 border-dashed rounded-md p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">Drag and drop your file here, or click to browse</p>
                  <p className="mt-1 text-xs text-gray-400">PDF, DOCX, XLSX, JPG, PNG (Max 20MB)</p>
                  <Button variant="outline" size="sm" className="mt-4">
                    Browse Files
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {showPrecedentDialog && (
        <DocumentPrecedentDialog
          isOpen={showPrecedentDialog}
          onClose={() => setShowPrecedentDialog(false)}
          matterId={matterId}
        />
      )}

      {showEditor && (
        <DocumentEditor
          isOpen={showEditor}
          onClose={() => {
            setShowEditor(false)
            setSelectedPrecedent(null)
          }}
          matterId={matterId}
          documentName={selectedPrecedent ? selectedPrecedent.name : documentName}
          initialContent={selectedPrecedent ? selectedPrecedent.content : ""}
          isPrecedent={!!selectedPrecedent}
        />
      )}
    </>
  )
}
