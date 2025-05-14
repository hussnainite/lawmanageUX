"use client"

import { useState } from "react"
import { MasterDataManager } from "@/components/master-data-manager"

// Mock data - in a real app, this would come from an API
const initialCourts = [
  { id: "1", name: "Supreme Court", description: "Highest court in the jurisdiction", isActive: true },
  { id: "2", name: "Federal Court", description: "Federal jurisdiction matters", isActive: true },
  { id: "3", name: "District Court", description: "District level jurisdiction", isActive: true },
  { id: "4", name: "Local Court", description: "Local jurisdiction matters", isActive: true },
  { id: "5", name: "Family Court", description: "Family law jurisdiction", isActive: true },
  { id: "6", name: "Tribunal", description: "Administrative tribunals", isActive: true },
]

export default function CourtsPage() {
  const [courts, setCourts] = useState(initialCourts)

  const handleAdd = (newItem: Omit<(typeof courts)[0], "id">) => {
    const id = Math.max(...courts.map((item) => Number.parseInt(item.id)), 0) + 1
    setCourts([...courts, { ...newItem, id: id.toString() }])
  }

  const handleUpdate = (updatedItem: (typeof courts)[0]) => {
    setCourts(courts.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
  }

  const handleDelete = (id: string) => {
    setCourts(courts.filter((item) => item.id !== id))
  }

  const handleToggleActive = (id: string, isActive: boolean) => {
    setCourts(courts.map((item) => (item.id === id ? { ...item, isActive } : item)))
  }

  return (
    <MasterDataManager
      title="Courts"
      description="Manage the courts and jurisdictions for legal matters"
      items={courts}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      onToggleActive={handleToggleActive}
    />
  )
}
