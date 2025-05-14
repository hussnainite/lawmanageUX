"use client"

import { useState } from "react"
import { MasterDataManager } from "@/components/master-data-manager"

// Mock data - in a real app, this would come from an API
const initialInstitutions = [
  { id: "1", name: "Commonwealth Bank", description: "Banking institution", isActive: true },
  { id: "2", name: "NRMA Insurance", description: "Insurance provider", isActive: true },
  { id: "3", name: "Department of Justice", description: "Government department", isActive: true },
  { id: "4", name: "University of Sydney", description: "Educational institution", isActive: true },
  { id: "5", name: "St Vincent's Hospital", description: "Healthcare provider", isActive: true },
  { id: "6", name: "Red Cross Australia", description: "Non-profit organization", isActive: true },
]

export default function InstitutionListPage() {
  const [institutions, setInstitutions] = useState(initialInstitutions)

  const handleAdd = (newItem: Omit<(typeof institutions)[0], "id">) => {
    const id = Math.max(...institutions.map((item) => Number.parseInt(item.id)), 0) + 1
    setInstitutions([...institutions, { ...newItem, id: id.toString() }])
  }

  const handleUpdate = (updatedItem: (typeof institutions)[0]) => {
    setInstitutions(institutions.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
  }

  const handleDelete = (id: string) => {
    setInstitutions(institutions.filter((item) => item.id !== id))
  }

  const handleToggleActive = (id: string, isActive: boolean) => {
    setInstitutions(institutions.map((item) => (item.id === id ? { ...item, isActive } : item)))
  }

  return (
    <MasterDataManager
      title="Institution List"
      description="Manage institutions for organizational contacts"
      items={institutions}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      onToggleActive={handleToggleActive}
    />
  )
}
