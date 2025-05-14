"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, MessageSquarePlus, Check, Minus, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"

interface DocumentViewerProps {
  documentId: string
  highlightedText?: string | null
  onAddComment?: (selectedText: string, comment: string) => void
  clauseAgreements?: {
    [key: string]: {
      status: "agree" | "partially-agree" | "disagree"
      notes?: string
    }
  }
  onAgreementChange?: (clause: string, status: "agree" | "partially-agree" | "disagree") => void
}

export function DocumentViewer({
  documentId,
  highlightedText,
  onAddComment,
  clauseAgreements,
  onAgreementChange,
}: DocumentViewerProps) {
  const [zoom, setZoom] = useState(100)
  const [selection, setSelection] = useState<{ text: string; x: number; y: number } | null>(null)
  const [commentText, setCommentText] = useState("")
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const documentRef = useRef<HTMLDivElement>(null)

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 10, 200))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 10, 50))
  }

  // Handle text selection in the document
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection()
      if (selection && selection.toString().trim().length > 0 && documentRef.current) {
        const range = selection.getRangeAt(0)
        const rect = range.getBoundingClientRect()
        const docRect = documentRef.current.getBoundingClientRect()

        // Calculate position relative to the document container
        const x = rect.left - docRect.left + rect.width / 2
        const y = rect.top - docRect.top

        setSelection({
          text: selection.toString(),
          x,
          y,
        })
      } else {
        // Don't clear selection immediately to allow clicking the comment button
        // We'll clear it when the popover closes
      }
    }

    document.addEventListener("selectionchange", handleSelectionChange)
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange)
    }
  }, [])

  const handleAddComment = () => {
    if (selection && commentText.trim() && onAddComment) {
      onAddComment(selection.text, commentText)
      setCommentText("")
      setIsPopoverOpen(false)
      setSelection(null)
      // Clear the text selection
      window.getSelection()?.removeAllRanges()
    }
  }

  // Function to highlight text in the document
  const highlightDocumentText = (content: string, textToHighlight: string | null) => {
    if (!textToHighlight) return content

    // Simple case-insensitive replacement with highlight
    const regex = new RegExp(`(${textToHighlight})`, "gi")
    return content.replace(regex, '<span class="bg-yellow-200">$1</span>')
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b p-2">
        <div className="text-sm text-muted-foreground">Document ID: {documentId}</div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleZoomOut} disabled={zoom <= 50}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm">{zoom}%</span>
          <Button variant="ghost" size="icon" onClick={handleZoomIn} disabled={zoom >= 200}>
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 p-6 min-h-[500px] overflow-auto bg-gray-50 relative" style={{ fontSize: `${zoom}%` }}>
        <div ref={documentRef} className="bg-white p-8 shadow-sm mx-auto max-w-4xl min-h-[800px] relative">
          {highlightedText ? (
            <div
              dangerouslySetInnerHTML={{
                __html: highlightDocumentText(
                  `
  <h1 class="text-2xl font-bold mb-6">Settlement Agreement</h1>

  <p class="mb-4">
    THIS SETTLEMENT AGREEMENT (the "Agreement") is made and entered into as of [DATE], by and between:
  </p>

  <p class="mb-4">
    <strong>PARTY A:</strong> [FULL LEGAL NAME], an individual residing at [ADDRESS] ("Party A"), and
  </p>

  <p class="mb-4">
    <strong>PARTY B:</strong> [FULL LEGAL NAME], an individual residing at [ADDRESS] ("Party B").
  </p>

  <p class="mb-4">
    Party A and Party B are sometimes referred to herein individually as a "Party" and collectively as the
    "Parties."
  </p>

  <h2 class="text-xl font-bold mt-6 mb-4">RECITALS</h2>

  <p class="mb-4">WHEREAS, [describe the dispute or matter being settled];</p>

  <p class="mb-4">
    WHEREAS, the Parties wish to resolve all claims and disputes between them without further legal proceedings;
  </p>

  <p class="mb-4">
    NOW, THEREFORE, in consideration of the mutual covenants and promises contained herein, and other good and
    valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Parties agree as
    follows:
  </p>

  <div class="relative">
    <h2 class="text-xl font-bold mt-6 mb-4">1. SETTLEMENT TERMS</h2>
  </div>

  <div class="relative ${clauseAgreements && clauseAgreements["1.1"]?.status === "disagree" ? "bg-red-50" : clauseAgreements && clauseAgreements["1.1"]?.status === "partially-agree" ? "bg-amber-50" : ""} p-2 -mx-2 rounded">
    <p class="mb-4">
      1.1 Settlement Payment. Party [A/B] agrees to pay Party [B/A] the total sum of [AMOUNT IN WORDS] dollars
      ($[AMOUNT IN NUMBERS]) (the "Settlement Amount"), payable as follows: [payment terms].
    </p>
    ${
      clauseAgreements["1.1"]?.notes
        ? `
    <div class="mt-2 p-2 bg-white border rounded text-sm">
      <strong>Comments:</strong> ${clauseAgreements["1.1"].notes}
    </div>
    `
        : ""
    }
  </div>

  <div class="relative ${clauseAgreements && clauseAgreements["1.2"]?.status === "disagree" ? "bg-red-50" : clauseAgreements && clauseAgreements["1.2"]?.status === "partially-agree" ? "bg-amber-50" : ""} p-2 -mx-2 rounded">
    <p class="mb-4">1.2 [Additional settlement terms as needed].</p>
    ${
      clauseAgreements["1.2"]?.notes
        ? `
    <div class="mt-2 p-2 bg-white border rounded text-sm">
      <strong>Comments:</strong> ${clauseAgreements["1.2"].notes}
    </div>
    `
        : ""
    }
  </div>

  <div class="relative">
    <h2 class="text-xl font-bold mt-6 mb-4">2. RELEASE OF CLAIMS</h2>
  </div>

  <div class="relative ${clauseAgreements && clauseAgreements["2.1"]?.status === "disagree" ? "bg-red-50" : clauseAgreements && clauseAgreements["2.1"]?.status === "partially-agree" ? "bg-amber-50" : ""} p-2 -mx-2 rounded">
    <p class="mb-4">
      2.1 Release by Party A. Party A hereby releases and forever discharges Party B from any and all claims,
      demands, damages, actions, causes of action, or suits of any kind or nature whatsoever, known or unknown,
      which Party A has or may have against Party B arising from or related to [subject matter of dispute].
    </p>
    ${
      clauseAgreements["2.1"]?.notes
        ? `
    <div class="mt-2 p-2 bg-white border rounded text-sm">
      <strong>Comments:</strong> ${clauseAgreements["2.1"].notes}
    </div>
    `
        : ""
    }
  </div>

  <div class="relative ${clauseAgreements && clauseAgreements["2.2"]?.status === "disagree" ? "bg-red-50" : clauseAgreements && clauseAgreements["2.2"]?.status === "partially-agree" ? "bg-amber-50" : ""} p-2 -mx-2 rounded">
    <p class="mb-4">
      2.2 Release by Party B. Party B hereby releases and forever discharges Party A from any and all claims,
      demands, damages, actions, causes of action, or suits of any kind or nature whatsoever, known or unknown,
      which Party B has or may have against Party A arising from or related to [subject matter of dispute].
    </p>
    ${
      clauseAgreements["2.2"]?.notes
        ? `
    <div class="mt-2 p-2 bg-white border rounded text-sm">
      <strong>Comments:</strong> ${clauseAgreements["2.2"].notes}
    </div>
    `
        : ""
    }
  </div>

  <div class="relative">
    <h2 class="text-xl font-bold mt-6 mb-4">3. CONFIDENTIALITY</h2>
  </div>

  <div class="relative ${clauseAgreements && clauseAgreements["3.1"]?.status === "disagree" ? "bg-red-50" : clauseAgreements && clauseAgreements["3.1"]?.status === "partially-agree" ? "bg-amber-50" : ""} p-2 -mx-2 rounded">
    <p class="mb-4">
      The Parties agree to keep the terms and conditions of this Agreement confidential and shall not disclose
      them to any third party except as required by law, for tax purposes, or as necessary to enforce the terms of
      this Agreement.
    </p>
    ${
      clauseAgreements["3.1"]?.notes
        ? `
    <div class="mt-2 p-2 bg-white border rounded text-sm">
      <strong>Comments:</strong> ${clauseAgreements["3.1"].notes}
    </div>
    `
        : ""
    }
  </div>

  <div class="mt-12 pt-8 border-t">
    <p class="mb-8">
      IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first above written.
    </p>

    <div class="grid grid-cols-2 gap-12">
      <div>
        <p class="mb-12">PARTY A:</p>
        <p>____________________________</p>
        <p>[FULL LEGAL NAME]</p>
      </div>

      <div>
        <p class="mb-12">PARTY B:</p>
        <p>____________________________</p>
        <p>[FULL LEGAL NAME]</p>
      </div>
    </div>
  </div>
      `,
                  highlightedText,
                ),
              }}
            />
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-6">Settlement Agreement</h1>

              <p className="mb-4">
                THIS SETTLEMENT AGREEMENT (the "Agreement") is made and entered into as of [DATE], by and between:
              </p>

              <p className="mb-4">
                <strong>PARTY A:</strong> [FULL LEGAL NAME], an individual residing at [ADDRESS] ("Party A"), and
              </p>

              <p className="mb-4">
                <strong>PARTY B:</strong> [FULL LEGAL NAME], an individual residing at [ADDRESS] ("Party B").
              </p>

              <p className="mb-4">
                Party A and Party B are sometimes referred to herein individually as a "Party" and collectively as the
                "Parties."
              </p>

              <h2 className="text-xl font-bold mt-6 mb-4">RECITALS</h2>

              <p className="mb-4">WHEREAS, [describe the dispute or matter being settled];</p>

              <p className="mb-4">
                WHEREAS, the Parties wish to resolve all claims and disputes between them without further legal
                proceedings;
              </p>

              <p className="mb-4">
                NOW, THEREFORE, in consideration of the mutual covenants and promises contained herein, and other good
                and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Parties
                agree as follows:
              </p>

              <div className="relative">
                <h2 className="text-xl font-bold mt-6 mb-4 pr-24">1. SETTLEMENT TERMS</h2>
                {clauseAgreements && onAgreementChange ? (
                  <div className="absolute right-0 top-6 flex space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`h-7 w-7 p-0 rounded-full ${
                        clauseAgreements["1"]?.status === "agree" ? "bg-green-100 text-green-700" : ""
                      }`}
                      onClick={() => onAgreementChange("1", "agree")}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`h-7 w-7 p-0 rounded-full ${
                        clauseAgreements["1"]?.status === "partially-agree" ? "bg-amber-100 text-amber-700" : ""
                      }`}
                      onClick={() => onAgreementChange("1", "partially-agree")}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`h-7 w-7 p-0 rounded-full ${
                        clauseAgreements["1"]?.status === "disagree" ? "bg-red-100 text-red-700" : ""
                      }`}
                      onClick={() => onAgreementChange("1", "disagree")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : null}
              </div>

              <div
                className={`relative ${
                  clauseAgreements && clauseAgreements["1.1"]?.status === "disagree"
                    ? "bg-red-50"
                    : clauseAgreements && clauseAgreements["1.1"]?.status === "partially-agree"
                      ? "bg-amber-50"
                      : ""
                } p-2 -mx-2 rounded mb-4`}
              >
                <div className="pr-24">
                  <p>
                    1.1 Settlement Payment. Party [A/B] agrees to pay Party [B/A] the total sum of [AMOUNT IN WORDS]
                    dollars ($[AMOUNT IN NUMBERS]) (the "Settlement Amount"), payable as follows: [payment terms].
                  </p>
                </div>
                {clauseAgreements && onAgreementChange ? (
                  <div className="absolute right-2 top-2 flex space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`h-7 w-7 p-0 rounded-full ${
                        clauseAgreements["1.1"]?.status === "agree" ? "bg-green-100 text-green-700" : ""
                      }`}
                      onClick={() => onAgreementChange("1.1", "agree")}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`h-7 w-7 p-0 rounded-full ${
                        clauseAgreements["1.1"]?.status === "partially-agree" ? "bg-amber-100 text-amber-700" : ""
                      }`}
                      onClick={() => onAgreementChange("1.1", "partially-agree")}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`h-7 w-7 p-0 rounded-full ${
                        clauseAgreements["1.1"]?.status === "disagree" ? "bg-red-100 text-red-700" : ""
                      }`}
                      onClick={() => onAgreementChange("1.1", "disagree")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : null}
                {clauseAgreements["1.1"]?.notes ? (
                  <div className="mt-2 p-2 bg-white border rounded text-sm">
                    <strong>Comments:</strong> {clauseAgreements["1.1"].notes}
                  </div>
                ) : null}
              </div>

              <div
                className={`relative ${
                  clauseAgreements && clauseAgreements["1.2"]?.status === "disagree"
                    ? "bg-red-50"
                    : clauseAgreements && clauseAgreements["1.2"]?.status === "partially-agree"
                      ? "bg-amber-50"
                      : ""
                } p-2 -mx-2 rounded mb-4`}
              >
                <div className="pr-24">
                  <p>1.2 [Additional settlement terms as needed].</p>
                </div>
                {clauseAgreements && onAgreementChange ? (
                  <div className="absolute right-2 top-2 flex space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`h-7 w-7 p-0 rounded-full ${
                        clauseAgreements["1.2"]?.status === "agree" ? "bg-green-100 text-green-700" : ""
                      }`}
                      onClick={() => onAgreementChange("1.2", "agree")}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`h-7 w-7 p-0 rounded-full ${
                        clauseAgreements["1.2"]?.status === "partially-agree" ? "bg-amber-100 text-amber-700" : ""
                      }`}
                      onClick={() => onAgreementChange("1.2", "partially-agree")}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`h-7 w-7 p-0 rounded-full ${
                        clauseAgreements["1.2"]?.status === "disagree" ? "bg-red-100 text-red-700" : ""
                      }`}
                      onClick={() => onAgreementChange("1.2", "disagree")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : null}
                {clauseAgreements["1.2"]?.notes ? (
                  <div className="mt-2 p-2 bg-white border rounded text-sm">
                    <strong>Comments:</strong> {clauseAgreements["1.2"].notes}
                  </div>
                ) : null}
              </div>

              <div className="relative">
                <h2 className="text-xl font-bold mt-6 mb-4 pr-24">2. RELEASE OF CLAIMS</h2>
                {clauseAgreements && onAgreementChange ? (
                  <div className="absolute right-0 top-6 flex space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`h-7 w-7 p-0 rounded-full ${
                        clauseAgreements["2"]?.status === "agree" ? "bg-green-100 text-green-700" : ""
                      }`}
                      onClick={() => onAgreementChange("2", "agree")}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`h-7 w-7 p-0 rounded-full ${
                        clauseAgreements["2"]?.status === "partially-agree" ? "bg-amber-100 text-amber-700" : ""
                      }`}
                      onClick={() => onAgreementChange("2", "partially-agree")}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`h-7 w-7 p-0 rounded-full ${
                        clauseAgreements["2"]?.status === "disagree" ? "bg-red-100 text-red-700" : ""
                      }`}
                      onClick={() => onAgreementChange("2", "disagree")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : null}
              </div>

              <div
                className={`relative ${
                  clauseAgreements && clauseAgreements["2.1"]?.status === "disagree"
                    ? "bg-red-50"
                    : clauseAgreements && clauseAgreements["2.1"]?.status === "partially-agree"
                      ? "bg-amber-50"
                      : ""
                } p-2 -mx-2 rounded mb-4`}
              >
                <div className="pr-24">
                  <p>
                    2.1 Release by Party A. Party A hereby releases and forever discharges Party B from any and all
                    claims, demands, damages, actions, causes of action, or suits of any kind or nature whatsoever,
                    known or unknown, which Party A has or may have against Party B arising from or related to [subject
                    matter of dispute].
                  </p>
                </div>
                {clauseAgreements && onAgreementChange ? (
                  <div className="absolute right-2 top-2 flex space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`h-7 w-7 p-0 rounded-full ${
                        clauseAgreements["2.1"]?.status === "agree" ? "bg-green-100 text-green-700" : ""
                      }`}
                      onClick={() => onAgreementChange("2.1", "agree")}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`h-7 w-7 p-0 rounded-full ${
                        clauseAgreements["2.1"]?.status === "partially-agree" ? "bg-amber-100 text-amber-700" : ""
                      }`}
                      onClick={() => onAgreementChange("2.1", "partially-agree")}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`h-7 w-7 p-0 rounded-full ${
                        clauseAgreements["2.1"]?.status === "disagree" ? "bg-red-100 text-red-700" : ""
                      }`}
                      onClick={() => onAgreementChange("2.1", "disagree")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : null}
                {clauseAgreements["2.1"]?.notes ? (
                  <div className="mt-2 p-2 bg-white border rounded text-sm">
                    <strong>Comments:</strong> {clauseAgreements["2.1"].notes}
                  </div>
                ) : null}
              </div>

              <div
                className={`relative ${
                  clauseAgreements && clauseAgreements["2.2"]?.status === "disagree"
                    ? "bg-red-50"
                    : clauseAgreements && clauseAgreements["2.2"]?.status === "partially-agree"
                      ? "bg-amber-50"
                      : ""
                } p-2 -mx-2 rounded mb-4`}
              >
                <div className="pr-24">
                  <p>
                    2.2 Release by Party B. Party B hereby releases and forever discharges Party A from any and all
                    claims, demands, damages, actions, causes of action, or suits of any kind or nature whatsoever,
                    known or unknown, which Party B has or may have against Party A arising from or related to [subject
                    matter of dispute].
                  </p>
                </div>
                {clauseAgreements && onAgreementChange ? (
                  <div className="absolute right-2 top-2 flex space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`h-7 w-7 p-0 rounded-full ${
                        clauseAgreements["2.2"]?.status === "agree" ? "bg-green-100 text-green-700" : ""
                      }`}
                      onClick={() => onAgreementChange("2.2", "agree")}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`h-7 w-7 p-0 rounded-full ${
                        clauseAgreements["2.2"]?.status === "partially-agree" ? "bg-amber-100 text-amber-700" : ""
                      }`}
                      onClick={() => onAgreementChange("2.2", "partially-agree")}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`h-7 w-7 p-0 rounded-full ${
                        clauseAgreements["2.2"]?.status === "disagree" ? "bg-red-100 text-red-700" : ""
                      }`}
                      onClick={() => onAgreementChange("2.2", "disagree")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : null}
                {clauseAgreements["2.2"]?.notes ? (
                  <div className="mt-2 p-2 bg-white border rounded text-sm">
                    <strong>Comments:</strong> {clauseAgreements["2.2"].notes}
                  </div>
                ) : null}
              </div>

              <div className="relative">
                <h2 className="text-xl font-bold mt-6 mb-4 pr-24">3. CONFIDENTIALITY</h2>
                {clauseAgreements && onAgreementChange ? (
                  <div className="absolute right-0 top-6 flex space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`h-7 w-7 p-0 rounded-full ${
                        clauseAgreements["3"]?.status === "agree" ? "bg-green-100 text-green-700" : ""
                      }`}
                      onClick={() => onAgreementChange("3", "agree")}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`h-7 w-7 p-0 rounded-full ${
                        clauseAgreements["3"]?.status === "partially-agree" ? "bg-amber-100 text-amber-700" : ""
                      }`}
                      onClick={() => onAgreementChange("3", "partially-agree")}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`h-7 w-7 p-0 rounded-full ${
                        clauseAgreements["3"]?.status === "disagree" ? "bg-red-100 text-red-700" : ""
                      }`}
                      onClick={() => onAgreementChange("3", "disagree")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : null}
              </div>

              <div
                className={`relative ${
                  clauseAgreements && clauseAgreements["3.1"]?.status === "disagree"
                    ? "bg-red-50"
                    : clauseAgreements && clauseAgreements["3.1"]?.status === "partially-agree"
                      ? "bg-amber-50"
                      : ""
                } p-2 -mx-2 rounded mb-4`}
              >
                <div className="pr-24">
                  <p>
                    The Parties agree to keep the terms and conditions of this Agreement confidential and shall not
                    disclose them to any third party except as required by law, for tax purposes, or as necessary to
                    enforce the terms of this Agreement.
                  </p>
                </div>
                {clauseAgreements && onAgreementChange ? (
                  <div className="absolute right-2 top-2 flex space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`h-7 w-7 p-0 rounded-full ${
                        clauseAgreements["3.1"]?.status === "agree" ? "bg-green-100 text-green-700" : ""
                      }`}
                      onClick={() => onAgreementChange("3.1", "agree")}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`h-7 w-7 p-0 rounded-full ${
                        clauseAgreements["3.1"]?.status === "partially-agree" ? "bg-amber-100 text-amber-700" : ""
                      }`}
                      onClick={() => onAgreementChange("3.1", "partially-agree")}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`h-7 w-7 p-0 rounded-full ${
                        clauseAgreements["3.1"]?.status === "disagree" ? "bg-red-100 text-red-700" : ""
                      }`}
                      onClick={() => onAgreementChange("3.1", "disagree")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : null}
                {clauseAgreements["3.1"]?.notes ? (
                  <div className="mt-2 p-2 bg-white border rounded text-sm">
                    <strong>Comments:</strong> {clauseAgreements["3.1"].notes}
                  </div>
                ) : null}
              </div>

              <div className="mt-12 pt-8 border-t">
                <p className="mb-8">
                  IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first above written.
                </p>

                <div className="grid grid-cols-2 gap-12">
                  <div>
                    <p className="mb-12">PARTY A:</p>
                    <p>____________________________</p>
                    <p>[FULL LEGAL NAME]</p>
                  </div>

                  <div>
                    <p className="mb-12">PARTY B:</p>
                    <p>____________________________</p>
                    <p>[FULL LEGAL NAME]</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Selection tooltip */}
        {selection && (
          <div
            className="absolute"
            style={{
              left: `${selection.x}px`,
              top: `${selection.y - 40}px`,
              transform: "translateX(-50%)",
            }}
          >
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  size="sm"
                  className="rounded-full h-8 w-8 p-0 bg-blue-500 hover:bg-blue-600 shadow-md"
                  onClick={() => setIsPopoverOpen(true)}
                >
                  <MessageSquarePlus className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Add Comment</h4>
                    <div className="bg-gray-100 p-2 rounded text-sm mb-2 italic">
                      "{selection.text.length > 100 ? selection.text.substring(0, 100) + "..." : selection.text}"
                    </div>
                    <Textarea
                      placeholder="Type your comment here..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsPopoverOpen(false)
                        setSelection(null)
                        window.getSelection()?.removeAllRanges()
                      }}
                    >
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleAddComment}>
                      Add Comment
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    </div>
  )
}
