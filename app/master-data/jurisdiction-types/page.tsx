"use client"

import { useState } from "react"
import { MasterDataManager } from "@/components/master-data-manager"

// Mock data - in a real app, this would come from an API
const initialJurisdictionTypes = [
  { id: "1", name: "Federal", description: "Federal jurisdiction matters", isActive: true },
  { id: "2", name: "State", description: "State jurisdiction matters", isActive: true },
  { id: "3", name: "Local", description: "Local jurisdiction matters", isActive: true },
  { id: "4", name: "International", description: "International jurisdiction matters", isActive: true },
]

export default function JurisdictionTypesPage() {
  const [jurisdictionTypes, setJurisdictionTypes] = useState(initialJurisdictionTypes)

  const handleAdd = (newItem: Omit<(typeof jurisdictionTypes)[0], "id">) => {
    const id = Math.max(...jurisdictionTypes.map((item) => Number.parseInt(item.id)), 0) + 1
    setJurisdictionTypes([...jurisdictionTypes, { ...newItem, id: id.toString() }])
  }

  const handleUpdate = (updatedItem: (typeof jurisdictionTypes)[0]) => {
    setJurisdictionTypes(jurisdictionTypes.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
  }

  const handleDelete = (id: string) => {
    setJurisdictionTypes(jurisdictionTypes.filter((item) => item.id !== id))
  }

  const handleToggleActive = (id: string, isActive: boolean) => {
    setJurisdictionTypes(jurisdictionTypes.map((item) => (item.id === id ? { ...item, isActive } : item)))
  }

  return (
    <MasterDataManager
      title="Jurisdiction Types"
      description="Manage jurisdiction types for legal matters"
      items={jurisdictionTypes}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      onToggleActive={handleToggleActive}
    />
  )
}
