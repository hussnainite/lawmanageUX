"use client"

import { useState } from "react"
import { MasterDataManager } from "@/components/master-data-manager"

// Mock data - in a real app, this would come from an API
const initialContactTags = [
  { id: "1", name: "VIP", description: "Very important contact", isActive: true },
  { id: "2", name: "Potential Client", description: "Prospective client", isActive: true },
  { id: "3", name: "Expert Witness", description: "Professional witness for court cases", isActive: true },
  { id: "4", name: "Referral Source", description: "Source of client referrals", isActive: true },
  { id: "5", name: "Opposing Counsel", description: "Attorney representing opposing party", isActive: true },
  { id: "6", name: "Court Official", description: "Judge, clerk, or other court personnel", isActive: true },
]

export default function ContactTagsPage() {
  const [contactTags, setContactTags] = useState(initialContactTags)

  const handleAdd = (newItem: Omit<(typeof contactTags)[0], "id">) => {
    const id = Math.max(...contactTags.map((item) => Number.parseInt(item.id)), 0) + 1
    setContactTags([...contactTags, { ...newItem, id: id.toString() }])
  }

  const handleUpdate = (updatedItem: (typeof contactTags)[0]) => {
    setContactTags(contactTags.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
  }

  const handleDelete = (id: string) => {
    setContactTags(contactTags.filter((item) => item.id !== id))
  }

  const handleToggleActive = (id: string, isActive: boolean) => {
    setContactTags(contactTags.map((item) => (item.id === id ? { ...item, isActive } : item)))
  }

  return (
    <MasterDataManager
      title="Contact Tags"
      description="Manage tags for categorizing and filtering contacts"
      items={contactTags}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      onToggleActive={handleToggleActive}
    />
  )
}
