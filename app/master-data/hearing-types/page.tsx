"use client"

import { useState } from "react"
import { MasterDataManager } from "@/components/master-data-manager"

// Mock data - in a real app, this would come from an API
const initialHearingTypes = [
  { id: "1", name: "Status Conference", description: "Procedural hearing to check case status", isActive: true },
  { id: "2", name: "Motion Hearing", description: "Hearing on a specific motion", isActive: true },
  { id: "3", name: "Trial", description: "Full trial proceeding", isActive: true },
  { id: "4", name: "Deposition", description: "Witness testimony recording", isActive: true },
  { id: "5", name: "Mediation", description: "Alternative dispute resolution", isActive: true },
  { id: "6", name: "Settlement Conference", description: "Conference to discuss settlement", isActive: true },
]

export default function HearingTypesPage() {
  const [hearingTypes, setHearingTypes] = useState(initialHearingTypes)

  const handleAdd = (newItem: Omit<(typeof hearingTypes)[0], "id">) => {
    const id = Math.max(...hearingTypes.map((item) => Number.parseInt(item.id)), 0) + 1
    setHearingTypes([...hearingTypes, { ...newItem, id: id.toString() }])
  }

  const handleUpdate = (updatedItem: (typeof hearingTypes)[0]) => {
    setHearingTypes(hearingTypes.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
  }

  const handleDelete = (id: string) => {
    setHearingTypes(hearingTypes.filter((item) => item.id !== id))
  }

  const handleToggleActive = (id: string, isActive: boolean) => {
    setHearingTypes(hearingTypes.map((item) => (item.id === id ? { ...item, isActive } : item)))
  }

  return (
    <MasterDataManager
      title="Hearing Types"
      description="Manage the types of court hearings and proceedings"
      items={hearingTypes}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      onToggleActive={handleToggleActive}
    />
  )
}
