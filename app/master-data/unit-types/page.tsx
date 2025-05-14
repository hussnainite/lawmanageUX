"use client"

import { useState } from "react"
import { MasterDataManager } from "@/components/master-data-manager"

// Mock data - in a real app, this would come from an API
const initialUnitTypes = [
  { id: "1", name: "Apartment", description: "Residential apartment unit", isActive: true },
  { id: "2", name: "Unit", description: "Standard unit", isActive: true },
  { id: "3", name: "Suite", description: "Office or business suite", isActive: true },
  { id: "4", name: "Shop", description: "Retail shop unit", isActive: true },
  { id: "5", name: "Flat", description: "Residential flat", isActive: true },
]

export default function UnitTypesPage() {
  const [unitTypes, setUnitTypes] = useState(initialUnitTypes)

  const handleAdd = (newItem: Omit<(typeof unitTypes)[0], "id">) => {
    const id = Math.max(...unitTypes.map((item) => Number.parseInt(item.id)), 0) + 1
    setUnitTypes([...unitTypes, { ...newItem, id: id.toString() }])
  }

  const handleUpdate = (updatedItem: (typeof unitTypes)[0]) => {
    setUnitTypes(unitTypes.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
  }

  const handleDelete = (id: string) => {
    setUnitTypes(unitTypes.filter((item) => item.id !== id))
  }

  const handleToggleActive = (id: string, isActive: boolean) => {
    setUnitTypes(unitTypes.map((item) => (item.id === id ? { ...item, isActive } : item)))
  }

  return (
    <MasterDataManager
      title="Unit Types"
      description="Manage unit types for property addresses"
      items={unitTypes}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      onToggleActive={handleToggleActive}
    />
  )
}
