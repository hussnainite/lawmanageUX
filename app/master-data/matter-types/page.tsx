"use client"

import { useState } from "react"
import { MasterDataManager } from "@/components/master-data-manager"

// Mock data - in a real app, this would come from an API
const initialMatterTypes = [
  { id: "1", name: "Corporate", description: "Corporate legal matters", isActive: true },
  { id: "2", name: "Litigation", description: "Litigation and dispute resolution", isActive: true },
  { id: "3", name: "Property", description: "Real estate and property matters", isActive: true },
  { id: "4", name: "Family", description: "Family law matters", isActive: true },
  { id: "5", name: "Criminal", description: "Criminal law matters", isActive: false },
]

export default function MatterTypesPage() {
  const [matterTypes, setMatterTypes] = useState(initialMatterTypes)

  const handleAdd = (newItem: Omit<(typeof matterTypes)[0], "id">) => {
    const id = Math.max(...matterTypes.map((item) => Number.parseInt(item.id)), 0) + 1
    setMatterTypes([...matterTypes, { ...newItem, id: id.toString() }])
  }

  const handleUpdate = (updatedItem: (typeof matterTypes)[0]) => {
    setMatterTypes(matterTypes.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
  }

  const handleDelete = (id: string) => {
    setMatterTypes(matterTypes.filter((item) => item.id !== id))
  }

  const handleToggleActive = (id: string, isActive: boolean) => {
    setMatterTypes(matterTypes.map((item) => (item.id === id ? { ...item, isActive } : item)))
  }

  return (
    <MasterDataManager
      title="Matter Types"
      description="Manage the types of matters that can be created in the system"
      items={matterTypes}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      onToggleActive={handleToggleActive}
    />
  )
}
