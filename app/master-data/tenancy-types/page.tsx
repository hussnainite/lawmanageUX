"use client"

import { useState } from "react"
import { MasterDataManager } from "@/components/master-data-manager"

// Mock data - in a real app, this would come from an API
const initialTenancyTypes = [
  { id: "1", name: "Residential", description: "Residential tenancy", isActive: true },
  { id: "2", name: "Commercial", description: "Commercial tenancy", isActive: true },
  { id: "3", name: "Retail", description: "Retail tenancy", isActive: true },
  { id: "4", name: "Industrial", description: "Industrial tenancy", isActive: true },
  { id: "5", name: "Mixed Use", description: "Mixed use tenancy", isActive: true },
]

export default function TenancyTypesPage() {
  const [tenancyTypes, setTenancyTypes] = useState(initialTenancyTypes)

  const handleAdd = (newItem: Omit<(typeof tenancyTypes)[0], "id">) => {
    const id = Math.max(...tenancyTypes.map((item) => Number.parseInt(item.id)), 0) + 1
    setTenancyTypes([...tenancyTypes, { ...newItem, id: id.toString() }])
  }

  const handleUpdate = (updatedItem: (typeof tenancyTypes)[0]) => {
    setTenancyTypes(tenancyTypes.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
  }

  const handleDelete = (id: string) => {
    setTenancyTypes(tenancyTypes.filter((item) => item.id !== id))
  }

  const handleToggleActive = (id: string, isActive: boolean) => {
    setTenancyTypes(tenancyTypes.map((item) => (item.id === id ? { ...item, isActive } : item)))
  }

  return (
    <MasterDataManager
      title="Tenancy Types"
      description="Manage tenancy types for property matters"
      items={tenancyTypes}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      onToggleActive={handleToggleActive}
    />
  )
}
