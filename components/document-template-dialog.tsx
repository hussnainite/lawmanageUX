"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search, FileText, Check, Star } from "lucide-react"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DocumentPrecedentDialogProps {
  isOpen: boolean
  onClose: () => void
  matterId: number
}

// Sample template content
const SAMPLE_TEMPLATE = `Dear <<IF (Dear Colleagues?) Equal (Name) THEN>>Mr Smith<<ELSE>>Colleagues<<END IF>>

RE: YOUR FAMILY LAW - CHILDREN AND PROPERTY MATTER

We confirm that we have now <<IF (Disclosure) Equal (Full disclosure from both parties) THEN>>received full disclosure from you and Mary.<<ELSE>><<IF (Disclosure) Equal (Full disclosure from your client and partial disclosure from the other party) THEN>>received your financial disclosure however are still waiting on further disclosure from <<Other Side 1/Person/Informal Name (first name)>>.<<ELSE>><<IF (Disclosure) Equal (Partial disclosure from both parties) THEN>>received partial disclosure from you and <<Other Side 1/Person/Informal Name (first name)>> and we are still waiting on further disclosure documents for complete disclosure.<<ELSE>><<END IF>><<END IF>><<END IF>>

Please let us know if you have any questions or concerns.

Regards,
<<Client Name>>
`

export default function DocumentPrecedentDialog({ isOpen, onClose, matterId }: DocumentPrecedentDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPrecedent, setSelectedPrecedent] = useState<null | {
    id: number
    name: string
    category: string
    lastUpdated: string
    content: string
  }>(null)
  const [showEditor, setShowEditor] = useState(false)

  // Mock templates data
  const precedents = [
    {
      id: 101,
      name: "Divorce Petition Precedent",
      type: "Legal Document",
      category: "Divorce",
      lastUpdated: "Jan 5, 2023",
      content: "This is a standard divorce petition precedent...",
      isFavorite: true,
    },
    {
      id: 102,
      name: "Financial Disclosure Form",
      type: "Financial",
      category: "All Family Law",
      lastUpdated: "Dec 15, 2022",
      content: "This financial disclosure form is required for all family law matters...",
      isFavorite: false,
    },
    {
      id: 103,
      name: "Parenting Plan Precedent",
      type: "Agreement",
      category: "Children",
      lastUpdated: "Feb 1, 2023",
      content: "This parenting plan outlines the custody and visitation arrangements...",
      isFavorite: true,
    },
    {
      id: 104,
      name: "Property Settlement Precedent",
      type: "Agreement",
      category: "Property",
      lastUpdated: "Jan 20, 2023",
      content: "This property settlement agreement addresses the division of assets and liabilities...",
      isFavorite: false,
    },
    {
      id: 105,
      name: "Child Support Calculation",
      type: "Financial",
      category: "Child Support",
      lastUpdated: "Feb 10, 2023",
      content: "This document provides the calculation of child support obligations...",
      isFavorite: false,
    },
    {
      id: 106,
      name: "Family Law Correspondence",
      type: "Correspondence",
      category: "All Family Law",
      lastUpdated: "Jan 25, 2023",
      content: SAMPLE_TEMPLATE,
      isFavorite: true,
    },
  ]

  const filteredPrecedents = precedents.filter((precedent) =>
    precedent.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSelectPrecedent = (precedent) => {
    setSelectedPrecedent(precedent)
  }

  const handleUsePrecedent = () => {
    if (selectedPrecedent) {
      onClose()
      // We need to pass the selected precedent back to the parent component
      if (typeof window !== "undefined") {
        // Use a small timeout to ensure the dialog is closed first
        setTimeout(() => {
          const event = new CustomEvent("use-precedent", {
            detail: {
              precedent: selectedPrecedent,
              matterId,
            },
          })
          window.dispatchEvent(event)
        }, 100)
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select Document Precedent</DialogTitle>
          <DialogDescription>Choose a precedent to create a new document for Matter #{matterId}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search precedents..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Precedents</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="recent">Recently Used</TabsTrigger>
              <TabsTrigger value="divorce">Divorce</TabsTrigger>
              <TabsTrigger value="children">Children</TabsTrigger>
              <TabsTrigger value="property">Property</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPrecedents.map((template) => (
                  <div
                    key={template.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedPrecedent?.id === template.id ? "border-primary bg-primary/5" : "hover:border-gray-300"
                    }`}
                    onClick={() => handleSelectPrecedent(template)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="bg-gray-100 p-2 rounded-md mt-1">
                          <FileText className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{template.name}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>{template.type}</span>
                            <span>•</span>
                            <span>{template.category}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Updated: {template.lastUpdated}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            // Toggle favorite logic would go here
                          }}
                        >
                          <Star
                            className={`h-4 w-4 ${template.isFavorite ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
                          />
                        </Button>
                        {selectedPrecedent?.id === template.id && (
                          <div className="bg-primary text-white p-1 rounded-full">
                            <Check className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="favorites" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPrecedents
                  .filter((t) => t.isFavorite)
                  .map((template) => (
                    <div
                      key={template.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedPrecedent?.id === template.id ? "border-primary bg-primary/5" : "hover:border-gray-300"
                      }`}
                      onClick={() => handleSelectPrecedent(template)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="bg-gray-100 p-2 rounded-md mt-1">
                            <FileText className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{template.name}</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <span>{template.type}</span>
                              <span>•</span>
                              <span>{template.category}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Updated: {template.lastUpdated}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              // Toggle favorite logic would go here
                            }}
                          >
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          </Button>
                          {selectedPrecedent?.id === template.id && (
                            <div className="bg-primary text-white p-1 rounded-full">
                              <Check className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="recent" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPrecedents
                  .slice(0, 5) // Just showing the first 5 as recently used for demo
                  .map((template) => (
                    <div
                      key={template.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedPrecedent?.id === template.id ? "border-primary bg-primary/5" : "hover:border-gray-300"
                      }`}
                      onClick={() => handleSelectPrecedent(template)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="bg-gray-100 p-2 rounded-md mt-1">
                            <FileText className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{template.name}</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <span>{template.type}</span>
                              <span>•</span>
                              <span>{template.category}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Updated: {template.lastUpdated}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              // Toggle favorite logic would go here
                            }}
                          >
                            <Star
                              className={`h-4 w-4 ${template.isFavorite ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
                            />
                          </Button>
                          {selectedPrecedent?.id === template.id && (
                            <div className="bg-primary text-white p-1 rounded-full">
                              <Check className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="divorce" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPrecedents
                  .filter((t) => t.category === "Divorce")
                  .map((template) => (
                    <div
                      key={template.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedPrecedent?.id === template.id ? "border-primary bg-primary/5" : "hover:border-gray-300"
                      }`}
                      onClick={() => handleSelectPrecedent(template)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="bg-gray-100 p-2 rounded-md mt-1">
                            <FileText className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{template.name}</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <span>{template.type}</span>
                              <span>•</span>
                              <span>{template.category}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Updated: {template.lastUpdated}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              // Toggle favorite logic would go here
                            }}
                          >
                            <Star
                              className={`h-4 w-4 ${template.isFavorite ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
                            />
                          </Button>
                          {selectedPrecedent?.id === template.id && (
                            <div className="bg-primary text-white p-1 rounded-full">
                              <Check className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
            {/* Similar TabsContent for other categories */}
          </Tabs>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUsePrecedent} disabled={!selectedPrecedent}>
            Use Precedent
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
