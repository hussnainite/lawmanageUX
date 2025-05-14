"use client"

import { useState } from "react"
import { MasterDataManager } from "@/components/master-data-manager"

// Mock data - in a real app, this would come from an API
const initialDocumentStatus = [
  { id: "1", name: "Draft", description: "Document in draft stage", isActive: true },
  { id: "2", name: "Final", description: "Finalized document", isActive: true },
  { id: "3", name: "Signed", description: "Document has been signed", isActive: true },
  { id: "4", name: "Filed", description: "Document has been filed with court", isActive: true },
  { id: "5", name: "Archived", description: "Historical document", isActive: true },
]

export default function DocumentStatusPage() {
  const [documentStatus, setDocumentStatus] = useState(initialDocumentStatus)

  const handleAdd = (newItem: Omit<(typeof documentStatus)[0], "id">) => {
    const id = Math.max(...documentStatus.map((item) => Number.parseInt(item.id)), 0) + 1
    setDocumentStatus([...documentStatus, { ...newItem, id: id.toString() }])
  }

  const handleUpdate = (updatedItem: (typeof documentStatus)[0]) => {
    setDocumentStatus(documentStatus.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
  }

  const handleDelete = (id: string) => {
    setDocumentStatus(documentStatus.filter((item) => item.id !== id))
  }

  const handleToggleActive = (id: string, isActive: boolean) => {
    setDocumentStatus(documentStatus.map((item) => (item.id === id ? { ...item, isActive } : item)))
  }

  return (
    <MasterDataManager
      title="Document Status"
      description="Manage the possible status values for documents"
      items={documentStatus}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      onToggleActive={handleToggleActive}
    />
  )
}
