"use client"

import { useState } from "react"
import { MasterDataManager } from "@/components/master-data-manager"

// Mock data - in a real app, this would come from an API
const initialPolicyTypes = [
  { id: "1", name: "Home Insurance", description: "Insurance for residential properties", isActive: true },
  { id: "2", name: "Auto Insurance", description: "Insurance for vehicles", isActive: true },
  { id: "3", name: "Life Insurance", description: "Insurance covering death or disability", isActive: true },
  { id: "4", name: "Health Insurance", description: "Insurance for medical expenses", isActive: true },
  { id: "5", name: "Professional Liability", description: "Insurance for professional services", isActive: true },
  { id: "6", name: "Business Insurance", description: "Insurance for business operations", isActive: true },
]

export default function PolicyTypesPage() {
  const [policyTypes, setPolicyTypes] = useState(initialPolicyTypes)

  const handleAdd = (newItem: Omit<(typeof policyTypes)[0], "id">) => {
    const id = Math.max(...policyTypes.map((item) => Number.parseInt(item.id)), 0) + 1
    setPolicyTypes([...policyTypes, { ...newItem, id: id.toString() }])
  }

  const handleUpdate = (updatedItem: (typeof policyTypes)[0]) => {
    setPolicyTypes(policyTypes.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
  }

  const handleDelete = (id: string) => {
    setPolicyTypes(policyTypes.filter((item) => item.id !== id))
  }

  const handleToggleActive = (id: string, isActive: boolean) => {
    setPolicyTypes(policyTypes.map((item) => (item.id === id ? { ...item, isActive } : item)))
  }

  return (
    <MasterDataManager
      title="Policy Types"
      description="Manage insurance policy types for legal matters"
      items={policyTypes}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      onToggleActive={handleToggleActive}
    />
  )
}
