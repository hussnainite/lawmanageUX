"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState, useRef, useEffect } from "react"
import { Variable, Eye, Save } from "lucide-react"

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
  const previewRef = useRef<HTMLDivElement>(null)
  const [font, setFont] = useState("Arial")
  const [fontSize, setFontSize] = useState("12")
  const [showPreview, setShowPreview] = useState(false)
  const [editorContent, setEditorContent] = useState(initialContent || (isPrecedent ? SAMPLE_PRECEDENT : ""))

  // For precedent variables
  const [precedentVars, setPrecedentVars] = useState<{
    [key: string]: string | boolean
  }>({
    salutation: "mr-smith",
    dearColleagues: "no",
    clientName: "john-smith",
    clientAddress: "sydney-address",
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

    // Map client names to display values
    const clientNameMap: { [key: string]: string } = {
      "john-smith": "John Smith",
      "jane-doe": "Jane Doe",
      "robert-jones": "Robert Jones",
      "custom-client": "Custom Client Name",
    }

    // Map addresses to display values
    const addressMap: { [key: string]: string } = {
      "sydney-address": "123 Main St, Sydney",
      "melbourne-address": "456 High St, Melbourne",
      "brisbane-address": "789 Queen St, Brisbane",
      "custom-address": "Custom Address",
    }

    // Map other party names to display values
    const otherPartyMap: { [key: string]: string } = {
      "mary-johnson": "Mary Johnson",
      "john-doe": "John Doe",
      "sarah-williams": "Sarah Williams",
      "custom-party": "Custom Party Name",
    }

    // Map informal names to display values
    const informalNameMap: { [key: string]: string } = {
      mary: "Mary",
      john: "John",
      sarah: "Sarah",
      "custom-informal": "Custom Informal Name",
    }

    // Map reference numbers to display values
    const referenceMap: { [key: string]: string } = {
      "fm-2023-0042": "FM-2023-0042",
      "fm-2023-0043": "FM-2023-0043",
      "fm-2023-0044": "FM-2023-0044",
      "custom-reference": "Custom Reference",
    }

    // Replace simple variables
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

    // Handle disclosure status with simpler approach
    if (precedentVars.disclosure === "full-both") {
      processedContent = processedContent.replace(
        /We confirm that we have now.*?\./,
        `We confirm that we have now received full disclosure from you and ${informalNameMap[precedentVars.otherPartyInformal as string] || "the other party"}.`,
      )
    } else if (precedentVars.disclosure === "full-client") {
      processedContent = processedContent.replace(
        /We confirm that we have now.*?\./,
        `We confirm that we have now received your financial disclosure however are still waiting on further disclosure from ${informalNameMap[precedentVars.otherPartyInformal as string] || "the other party"}.`,
      )
    } else if (precedentVars.disclosure === "partial-both") {
      processedContent = processedContent.replace(
        /We confirm that we have now.*?\./,
        `We confirm that we have now received partial disclosure from you and ${informalNameMap[precedentVars.otherPartyInformal as string] || "the other party"} and we are still waiting on further disclosure documents for complete disclosure.`,
      )
    }

    return processedContent
  }

  // Update preview content when variables change
  useEffect(() => {
    if (isPrecedent && previewRef.current && showPreview) {
      const processedContent = processPrecedent(editorContent)
      previewRef.current.innerHTML = processedContent
    }
  }, [precedentVars, showPreview, editorContent, isPrecedent])

  const handleSave = () => {
    // In a real application, this would save the document to the database
    console.log("Saving document:", {
      name,
      type: documentType,
      status: documentStatus,
      content: processPrecedent(editorContent),
      matterId,
      documentId,
    })
    onClose()
  }

  const handleNext = () => {
    setShowPreview(true)
  }

  const handleBack = () => {
    setShowPreview(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90vw] sm:max-h-[90vh] sm:h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>{isPrecedent ? "Create Document from Precedent" : "Edit Document"}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col overflow-hidden">
          {!showPreview && (
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
          )}

          <div className="flex-1 overflow-auto flex">
            {/* Precedent Variables Panel - Now the main focus when not in preview mode */}
            {!showPreview ? (
              <div className="w-full p-6">
                <div className="max-w-3xl mx-auto">
                  <div className="flex items-center mb-6">
                    <Variable className="h-5 w-5 mr-2 text-gray-600" />
                    <h3 className="font-medium">Document Variables</h3>
                  </div>

                  <Accordion
                    type="multiple"
                    defaultValue={["client-details", "other-party", "disclosure", "matter-details"]}
                  >
                    <AccordionItem value="client-details">
                      <AccordionTrigger className="text-sm py-3">Client Details</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 py-2">
                          <div className="space-y-2">
                            <Label htmlFor="client-name">Client Name</Label>
                            <Select
                              value={precedentVars.clientName as string}
                              onValueChange={(value) => setPrecedentVars({ ...precedentVars, clientName: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select client name" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="john-smith">John Smith</SelectItem>
                                <SelectItem value="jane-doe">Jane Doe</SelectItem>
                                <SelectItem value="robert-jones">Robert Jones</SelectItem>
                                <SelectItem value="custom-client">Custom Client Name</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="client-address">Client Address</Label>
                            <Select
                              value={precedentVars.clientAddress as string}
                              onValueChange={(value) => setPrecedentVars({ ...precedentVars, clientAddress: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select client address" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sydney-address">123 Main St, Sydney</SelectItem>
                                <SelectItem value="melbourne-address">456 High St, Melbourne</SelectItem>
                                <SelectItem value="brisbane-address">789 Queen St, Brisbane</SelectItem>
                                <SelectItem value="custom-address">Custom Address</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="salutation">Salutation</Label>
                            <Select
                              value={precedentVars.salutation as string}
                              onValueChange={(value) => setPrecedentVars({ ...precedentVars, salutation: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select salutation" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="mr-smith">Mr Smith</SelectItem>
                                <SelectItem value="colleagues">Colleagues</SelectItem>
                                <SelectItem value="john">John</SelectItem>
                                <SelectItem value="custom-salutation">Custom Salutation</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dear-colleagues">Use "Dear Colleagues"</Label>
                            <Select
                              value={precedentVars.dearColleagues as string}
                              onValueChange={(value) => setPrecedentVars({ ...precedentVars, dearColleagues: value })}
                            >
                              <SelectTrigger>
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
                      <AccordionTrigger className="text-sm py-3">Other Party</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 py-2">
                          <div className="space-y-2">
                            <Label htmlFor="other-party-name">Name</Label>
                            <Select
                              value={precedentVars.otherPartyName as string}
                              onValueChange={(value) => setPrecedentVars({ ...precedentVars, otherPartyName: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select other party name" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="mary-johnson">Mary Johnson</SelectItem>
                                <SelectItem value="john-doe">John Doe</SelectItem>
                                <SelectItem value="sarah-williams">Sarah Williams</SelectItem>
                                <SelectItem value="custom-party">Custom Party Name</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="other-party-informal">Informal Name</Label>
                            <Select
                              value={precedentVars.otherPartyInformal as string}
                              onValueChange={(value) =>
                                setPrecedentVars({ ...precedentVars, otherPartyInformal: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select informal name" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="mary">Mary</SelectItem>
                                <SelectItem value="john">John</SelectItem>
                                <SelectItem value="sarah">Sarah</SelectItem>
                                <SelectItem value="custom-informal">Custom Informal Name</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="disclosure">
                      <AccordionTrigger className="text-sm py-3">Disclosure Status</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 py-2">
                          <div className="space-y-2">
                            <Label htmlFor="disclosure-status">Disclosure Status</Label>
                            <Select
                              value={precedentVars.disclosure as string}
                              onValueChange={(value) => setPrecedentVars({ ...precedentVars, disclosure: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select disclosure status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="full-both">Full disclosure from both parties</SelectItem>
                                <SelectItem value="full-client">
                                  Full disclosure from your client and partial disclosure from the other party
                                </SelectItem>
                                <SelectItem value="partial-both">Partial disclosure from both parties</SelectItem>
                                <SelectItem value="custom-disclosure">Custom disclosure status</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="matter-details">
                      <AccordionTrigger className="text-sm py-3">Matter Details</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 py-2">
                          <div className="space-y-2">
                            <Label htmlFor="matter-type">Matter Type</Label>
                            <Select
                              value={precedentVars.matterType as string}
                              onValueChange={(value) => setPrecedentVars({ ...precedentVars, matterType: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select matter type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="family-law">Family Law</SelectItem>
                                <SelectItem value="divorce">Divorce</SelectItem>
                                <SelectItem value="property">Property Settlement</SelectItem>
                                <SelectItem value="children">Children's Matters</SelectItem>
                                <SelectItem value="custom-matter">Custom Matter Type</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="matter-reference">Matter Reference</Label>
                            <Select
                              value={precedentVars.matterReference as string}
                              onValueChange={(value) => setPrecedentVars({ ...precedentVars, matterReference: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select matter reference" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="fm-2023-0042">FM-2023-0042</SelectItem>
                                <SelectItem value="fm-2023-0043">FM-2023-0043</SelectItem>
                                <SelectItem value="fm-2023-0044">FM-2023-0044</SelectItem>
                                <SelectItem value="custom-reference">Custom Reference</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            ) : (
              /* Document Preview */
              <div className="flex-1 p-6 bg-white">
                <div className="max-w-4xl mx-auto bg-white shadow-sm border rounded-md min-h-[800px] p-8">
                  <div
                    ref={previewRef}
                    className="w-full h-full min-h-[800px]"
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
            )}
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t">
          {showPreview ? (
            <>
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Create Document
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleNext}>
                <Eye className="h-4 w-4 mr-2" />
                Next
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
