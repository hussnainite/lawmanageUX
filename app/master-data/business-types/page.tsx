"use client"

import { useState } from "react"
import { MasterDataManager } from "@/components/master-data-manager"

// Mock data - in a real app, this would come from an API
const initialBusinessTypes = [
  { id: "1", name: "Sole Proprietorship", description: "Business owned by one person", isActive: true },
  { id: "2", name: "Partnership", description: "Business with two or more owners", isActive: true },
  {
    id: "3",
    name: "Limited Liability Company (LLC)",
    description: "Limited liability business entity",
    isActive: true,
  },
  { id: "4", name: "Corporation", description: "Legal entity separate from its owners", isActive: true },
  {
    id: "5",
    name: "Non-Profit",
    description: "Organization for charitable, educational, or other purposes",
    isActive: true,
  },
  { id: "6", name: "Trust", description: "Legal arrangement for property management", isActive: true },
]

export default function BusinessTypesPage() {
  const [businessTypes, setBusinessTypes] = useState(initialBusinessTypes)

  const handleAdd = (newItem: Omit<(typeof businessTypes)[0], "id">) => {
    const id = Math.max(...businessTypes.map((item) => Number.parseInt(item.id)), 0) + 1
    setBusinessTypes([...businessTypes, { ...newItem, id: id.toString() }])
  }

  const handleUpdate = (updatedItem: (typeof businessTypes)[0]) => {
    setBusinessTypes(businessTypes.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
  }

  const handleDelete = (id: string) => {
    setBusinessTypes(businessTypes.filter((item) => item.id !== id))
  }

  const handleToggleActive = (id: string, isActive: boolean) => {
    setBusinessTypes(businessTypes.map((item) => (item.id === id ? { ...item, isActive } : item)))
  }

  return (
    <MasterDataManager
      title="Business Types"
      description="Manage business types for organizational contacts"
      items={businessTypes}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      onToggleActive={handleToggleActive}
    />
  )
}
