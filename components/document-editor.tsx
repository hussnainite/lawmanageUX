"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState, useRef, useEffect } from "react"
import { Save, Variable, Eye } from "lucide-react"

interface DocumentEditorProps {
  isOpen: boolean
  onClose: () => void
  matterId: number
  documentName: string
  initialContent?: string
  isPrecedent?: boolean
  documentId?: number
  precedentVariables?: PrecedentVariable[]
}

interface PrecedentVariable {
  name: string
  type: "text" | "select" | "boolean"
  label: string
  options?: string[]
  defaultValue?: string | boolean
  value?: string | boolean
}

// Sample precedent content
const SAMPLE_PRECEDENT = `Dear <<IF (Dear Colleagues?) Equal (Name) THEN>>Mr Smith<<ELSE>>Colleagues<<END IF>>

RE: YOUR FAMILY LAW - CHILDREN AND PROPERTY MATTER

We confirm that we have now <<IF (Disclosure) Equal (Full disclosure from both parties) THEN>>received full disclosure from you and Mary.<<ELSE>><<IF (Disclosure) Equal (Full disclosure from your client and partial disclosure from the other party) THEN>>received your financial disclosure however are still waiting on further disclosure from <<Other Side 1/Person/Informal Name (first name)>>.<<ELSE>><<IF (Disclosure) Equal (Partial disclosure from both parties) THEN>>received partial disclosure from you and <<Other Side 1/Person/Informal Name (first name)>> and we are still waiting on further disclosure documents for complete disclosure.<<ELSE>><<END IF>><<END IF>><<END IF>>

Please let us know if you have any questions or concerns.

Regards,
<<Client Name>>
`

export default function DocumentEditor({
  isOpen,
  onClose,
  matterId,
  documentName,
  initialContent = "",
  isPrecedent = false,
  documentId,
  precedentVariables,
}: DocumentEditorProps) {
  const [name, setName] = useState(documentName)
  const [documentType, setDocumentType] = useState("legal")
  const [documentStatus, setDocumentStatus] = useState("draft")
  const documentRef = useRef<HTMLDivElement>(null)
  const [font, setFont] = useState("Arial")
  const [fontSize, setFontSize] = useState("12")
  const [editorContent, setEditorContent] = useState(initialContent || (isPrecedent ? SAMPLE_PRECEDENT : ""))

  // For precedent variables
  const [precedentVars, setPrecedentVars] = useState<{
    [key: string]: string | boolean
  }>({
    clientName: "john-smith",
    clientAddress: "sydney-address",
    salutation: "mr-smith",
    dearColleagues: "no",
    otherPartyName: "mary-johnson",
    otherPartyInformal: "mary",
    disclosure: "full-both",
    matterType: "family-law",
    matterReference: "fm-2023-0042",
  })

  // Add a simpler approach to precedent processing for the most critical variables
  const processPrecedent = (content: string): string => {
    if (!isPrecedent) return content

    let processedContent = content

    // Replace simple variables based on selected options
    const clientNameMap: { [key: string]: string } = {
      "john-smith": "John Smith",
      "jane-doe": "Jane Doe",
      "robert-jones": "Robert Jones",
      custom: "Custom Client Name",
    }

    processedContent = processedContent.replace(
      /<<Client Name>>/g,
      clientNameMap[precedentVars.clientName as string] || "Client Name",
    )

    // Handle Dear Colleagues toggle directly
    if (precedentVars.dearColleagues === "yes") {
      processedContent = processedContent.replace(/Dear.*?Mr Smith|Dear.*?Colleagues/g, "Dear Colleagues")
    } else {
      processedContent = processedContent.replace(/Dear.*?Mr Smith|Dear.*?Colleagues/g, "Dear Mr Smith")
    }

    // Handle other party informal name
    const otherPartyInformalMap: { [key: string]: string } = {
      mary: "Mary",
      john: "John",
      jane: "Jane",
      custom: "Custom Name",
    }
    const otherPartyInformal = otherPartyInformalMap[precedentVars.otherPartyInformal as string] || "Other Party"

    // Handle disclosure status with simpler approach
    if (precedentVars.disclosure === "full-both") {
      processedContent = processedContent.replace(
        /We confirm that we have now.*?\./,
        `We confirm that we have now received full disclosure from you and ${otherPartyInformal}.`,
      )
    } else if (precedentVars.disclosure === "full-client") {
      processedContent = processedContent.replace(
        /We confirm that we have now.*?\./,
        `We confirm that we have now received your financial disclosure however are still waiting on further disclosure from ${otherPartyInformal}.`,
      )
    } else if (precedentVars.disclosure === "partial-both") {
      processedContent = processedContent.replace(
        /We confirm that we have now.*?\./,
        `We confirm that we have now received partial disclosure from you and ${otherPartyInformal} and we are still waiting on further disclosure documents for complete disclosure.`,
      )
    }

    return processedContent
  }

  // Update editor content when initialContent changes
  useEffect(() => {
    if (initialContent) {
      setEditorContent(initialContent)
    } else if (isPrecedent) {
      setEditorContent(SAMPLE_PRECEDENT)
    }
  }, [initialContent, isPrecedent])

  // Update document display when variables change
  useEffect(() => {
    if (documentRef.current && isPrecedent) {
      const processedContent = processPrecedent(editorContent)
      documentRef.current.innerHTML = processedContent
    }
  }, [editorContent, precedentVars, isPrecedent])

  const handleSave = () => {
    // In a real application, this would save the document to the database
    const content = documentRef.current?.innerHTML || ""
    console.log("Saving document:", {
      name,
      type: documentType,
      status: documentStatus,
      content,
      matterId,
      documentId,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90vw] sm:max-h-[90vh] sm:h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>{isPrecedent ? "Create Document from Precedent" : "Edit Document"}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="border-b p-4 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="document-name">Document Name</Label>
                <Input
                  id="document-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter document name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="document-type">Document Type</Label>
                <Select value={documentType} onValueChange={setDocumentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="legal">Legal Document</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="agreement">Agreement</SelectItem>
                    <SelectItem value="correspondence">Correspondence</SelectItem>
                    <SelectItem value="court">Court Form</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="document-status">Status</Label>
                <Select value={documentStatus} onValueChange={setDocumentStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="final">Final</SelectItem>
                    <SelectItem value="filed">Filed</SelectItem>
                    <SelectItem value="received">Received</SelectItem>
                    <SelectItem value="pending">Pending Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {isPrecedent && (
            <div className="border-b px-6 py-2 bg-gray-50">
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-2" />
                <h3 className="text-sm font-medium">Document Preview</h3>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-auto flex">
            {/* Precedent Variables Panel */}
            {isPrecedent && (
              <div className="w-1/2 border-r overflow-y-auto p-4 bg-gray-50">
                <div className="flex items-center mb-4">
                  <Variable className="h-5 w-5 mr-2 text-gray-600" />
                  <h3 className="font-medium text-sm">Precedent Variables</h3>
                </div>

                <Accordion type="multiple" defaultValue={["client-details", "other-party", "disclosure"]}>
                  <AccordionItem value="client-details">
                    <AccordionTrigger className="text-sm py-2">Client Details</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <Label htmlFor="client-name" className="text-xs">
                            Client Name
                          </Label>
                          <Select
                            value={precedentVars.clientName as string}
                            onValueChange={(value) => setPrecedentVars({ ...precedentVars, clientName: value })}
                          >
                            <SelectTrigger className="h-8 text-sm">
                              <SelectValue placeholder="Select client name" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="john-smith">John Smith</SelectItem>
                              <SelectItem value="jane-doe">Jane Doe</SelectItem>
                              <SelectItem value="robert-jones">Robert Jones</SelectItem>
                              <SelectItem value="custom">Custom Client Name</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="client-address" className="text-xs">
                            Client Address
                          </Label>
                          <Select
                            value={precedentVars.clientAddress as string}
                            onValueChange={(value) => setPrecedentVars({ ...precedentVars, clientAddress: value })}
                          >
                            <SelectTrigger className="h-8 text-sm">
                              <SelectValue placeholder="Select client address" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sydney-address">123 Main St, Sydney</SelectItem>
                              <SelectItem value="melbourne-address">456 High St, Melbourne</SelectItem>
                              <SelectItem value="brisbane-address">789 Queen St, Brisbane</SelectItem>
                              <SelectItem value="custom">Custom Address</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="salutation" className="text-xs">
                            Salutation
                          </Label>
                          <Select
                            value={precedentVars.salutation as string}
                            onValueChange={(value) => setPrecedentVars({ ...precedentVars, salutation: value })}
                          >
                            <SelectTrigger className="h-8 text-sm">
                              <SelectValue placeholder="Select salutation" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mr-smith">Mr Smith</SelectItem>
                              <SelectItem value="colleagues">Colleagues</SelectItem>
                              <SelectItem value="john">John</SelectItem>
                              <SelectItem value="custom">Custom Salutation</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="dear-colleagues" className="text-xs">
                            Use "Dear Colleagues"
                          </Label>
                          <Select
                            value={precedentVars.dearColleagues as string}
                            onValueChange={(value) => setPrecedentVars({ ...precedentVars, dearColleagues: value })}
                          >
                            <SelectTrigger className="h-8 text-sm">
                              <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="other-party">
                    <AccordionTrigger className="text-sm py-2">Other Party</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <Label htmlFor="other-party-name" className="text-xs">
                            Name
                          </Label>
                          <Select
                            value={precedentVars.otherPartyName as string}
                            onValueChange={(value) => setPrecedentVars({ ...precedentVars, otherPartyName: value })}
                          >
                            <SelectTrigger className="h-8 text-sm">
                              <SelectValue placeholder="Select other party name" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mary-johnson">Mary Johnson</SelectItem>
                              <SelectItem value="john-doe">John Doe</SelectItem>
                              <SelectItem value="jane-smith">Jane Smith</SelectItem>
                              <SelectItem value="custom">Custom Name</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="other-party-informal" className="text-xs">
                            Informal Name
                          </Label>
                          <Select
                            value={precedentVars.otherPartyInformal as string}
                            onValueChange={(value) => setPrecedentVars({ ...precedentVars, otherPartyInformal: value })}
                          >
                            <SelectTrigger className="h-8 text-sm">
                              <SelectValue placeholder="Select informal name" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mary">Mary</SelectItem>
                              <SelectItem value="john">John</SelectItem>
                              <SelectItem value="jane">Jane</SelectItem>
                              <SelectItem value="custom">Custom Name</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="disclosure">
                    <AccordionTrigger className="text-sm py-2">Disclosure Status</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <Label htmlFor="disclosure-status" className="text-xs">
                            Disclosure Status
                          </Label>
                          <Select
                            value={precedentVars.disclosure as string}
                            onValueChange={(value) => setPrecedentVars({ ...precedentVars, disclosure: value })}
                          >
                            <SelectTrigger className="h-8 text-sm">
                              <SelectValue placeholder="Select disclosure status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="full-both">Full disclosure from both parties</SelectItem>
                              <SelectItem value="full-client">
                                Full disclosure from your client and partial disclosure from the other party
                              </SelectItem>
                              <SelectItem value="partial-both">Partial disclosure from both parties</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="matter-details">
                    <AccordionTrigger className="text-sm py-2">Matter Details</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <Label htmlFor="matter-type" className="text-xs">
                            Matter Type
                          </Label>
                          <Select
                            value={precedentVars.matterType as string}
                            onValueChange={(value) => setPrecedentVars({ ...precedentVars, matterType: value })}
                          >
                            <SelectTrigger className="h-8 text-sm">
                              <SelectValue placeholder="Select matter type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="family-law">Family Law</SelectItem>
                              <SelectItem value="divorce">Divorce</SelectItem>
                              <SelectItem value="property">Property Settlement</SelectItem>
                              <SelectItem value="children">Children's Matters</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="matter-reference" className="text-xs">
                            Matter Reference
                          </Label>
                          <Select
                            value={precedentVars.matterReference as string}
                            onValueChange={(value) => setPrecedentVars({ ...precedentVars, matterReference: value })}
                          >
                            <SelectTrigger className="h-8 text-sm">
                              <SelectValue placeholder="Select matter reference" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fm-2023-0042">FM-2023-0042</SelectItem>
                              <SelectItem value="fm-2023-0098">FM-2023-0098</SelectItem>
                              <SelectItem value="fm-2023-0123">FM-2023-0123</SelectItem>
                              <SelectItem value="custom">Custom Reference</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}

            {/* Document Preview */}
            <div className="w-1/2 p-6 bg-white">
              <div className="max-w-4xl mx-auto bg-white shadow-sm border rounded-md min-h-[800px] p-8">
                <div
                  ref={documentRef}
                  className="w-full h-full min-h-[800px] focus:outline-none"
                  style={{
                    fontFamily:
                      font === "Arial"
                        ? "Arial, sans-serif"
                        : font === "Times New Roman"
                          ? "Times New Roman, serif"
                          : font === "Calibri"
                            ? "Calibri, sans-serif"
                            : "Georgia, serif",
                    fontSize: `${fontSize}pt`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            {isPrecedent ? "Create Document" : "Save Document"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
