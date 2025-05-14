"use client"

import { useState } from "react"
import { MasterDataManager } from "@/components/master-data-manager"

// Mock data - in a real app, this would come from an API
const initialMatterStatus = [
  { id: "1", name: "Open", description: "Active matter", isActive: true },
  { id: "2", name: "Closed", description: "Completed matter", isActive: true },
  { id: "3", name: "Pending", description: "Awaiting further action", isActive: true },
  { id: "4", name: "On Hold", description: "Temporarily suspended", isActive: true },
  { id: "5", name: "Archived", description: "Historical matter", isActive: false },
]

export default function MatterStatusPage() {
  const [matterStatus, setMatterStatus] = useState(initialMatterStatus)

  const handleAdd = (newItem: Omit<(typeof matterStatus)[0], "id">) => {
    const id = Math.max(...matterStatus.map((item) => Number.parseInt(item.id)), 0) + 1
    setMatterStatus([...matterStatus, { ...newItem, id: id.toString() }])
  }

  const handleUpdate = (updatedItem: (typeof matterStatus)[0]) => {
    setMatterStatus(matterStatus.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
  }

  const handleDelete = (id: string) => {
    setMatterStatus(matterStatus.filter((item) => item.id !== id))
  }

  const handleToggleActive = (id: string, isActive: boolean) => {
    setMatterStatus(matterStatus.map((item) => (item.id === id ? { ...item, isActive } : item)))
  }

  return (
    <MasterDataManager
      title="Matter Status"
      description="Manage the possible status values for matters"
      items={matterStatus}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      onToggleActive={handleToggleActive}
    />
  )
}
