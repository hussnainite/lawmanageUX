"use client"

import { useState } from "react"
import { MasterDataManager } from "@/components/master-data-manager"

// Mock data - in a real app, this would come from an API
const initialDocumentTypes = [
  { id: "1", name: "Contract", description: "Legal agreements between parties", isActive: true },
  { id: "2", name: "Pleading", description: "Court filings and pleadings", isActive: true },
  { id: "3", name: "Correspondence", description: "Letters and emails", isActive: true },
  { id: "4", name: "Affidavit", description: "Sworn statements", isActive: true },
  { id: "5", name: "Brief", description: "Legal briefs and memoranda", isActive: true },
  { id: "6", name: "Court Order", description: "Orders issued by courts", isActive: true },
]

export default function DocumentTypesPage() {
  const [documentTypes, setDocumentTypes] = useState(initialDocumentTypes)

  const handleAdd = (newItem: Omit<(typeof documentTypes)[0], "id">) => {
    const id = Math.max(...documentTypes.map((item) => Number.parseInt(item.id)), 0) + 1
    setDocumentTypes([...documentTypes, { ...newItem, id: id.toString() }])
  }

  const handleUpdate = (updatedItem: (typeof documentTypes)[0]) => {
    setDocumentTypes(documentTypes.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
  }

  const handleDelete = (id: string) => {
    setDocumentTypes(documentTypes.filter((item) => item.id !== id))
  }

  const handleToggleActive = (id: string, isActive: boolean) => {
    setDocumentTypes(documentTypes.map((item) => (item.id === id ? { ...item, isActive } : item)))
  }

  return (
    <MasterDataManager
      title="Document Types"
      description="Manage the types of documents that can be created in the system"
      items={documentTypes}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      onToggleActive={handleToggleActive}
    />
  )
}
