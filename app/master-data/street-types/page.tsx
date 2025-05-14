"use client"

import { useState } from "react"
import { MasterDataManager } from "@/components/master-data-manager"

// Mock data - in a real app, this would come from an API
const initialStreetTypes = [
  { id: "1", name: "Street", description: "Standard street", isActive: true },
  { id: "2", name: "Road", description: "Standard road", isActive: true },
  { id: "3", name: "Avenue", description: "Avenue", isActive: true },
  { id: "4", name: "Boulevard", description: "Boulevard", isActive: true },
  { id: "5", name: "Lane", description: "Lane", isActive: true },
  { id: "6", name: "Drive", description: "Drive", isActive: true },
  { id: "7", name: "Court", description: "Court", isActive: true },
  { id: "8", name: "Place", description: "Place", isActive: true },
  { id: "9", name: "Highway", description: "Highway", isActive: true },
]

export default function StreetTypesPage() {
  const [streetTypes, setStreetTypes] = useState(initialStreetTypes)

  const handleAdd = (newItem: Omit<(typeof streetTypes)[0], "id">) => {
    const id = Math.max(...streetTypes.map((item) => Number.parseInt(item.id)), 0) + 1
    setStreetTypes([...streetTypes, { ...newItem, id: id.toString() }])
  }

  const handleUpdate = (updatedItem: (typeof streetTypes)[0]) => {
    setStreetTypes(streetTypes.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
  }

  const handleDelete = (id: string) => {
    setStreetTypes(streetTypes.filter((item) => item.id !== id))
  }

  const handleToggleActive = (id: string, isActive: boolean) => {
    setStreetTypes(streetTypes.map((item) => (item.id === id ? { ...item, isActive } : item)))
  }

  return (
    <MasterDataManager
      title="Street Types"
      description="Manage street types for addresses"
      items={streetTypes}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      onToggleActive={handleToggleActive}
    />
  )
}
