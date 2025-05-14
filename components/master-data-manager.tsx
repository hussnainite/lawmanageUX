"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface MasterDataItem {
  id: string
  name: string
  description?: string
  isActive: boolean
}

interface MasterDataManagerProps {
  title: string
  description: string
  items: MasterDataItem[]
  onAdd: (item: Omit<MasterDataItem, "id">) => void
  onUpdate: (item: MasterDataItem) => void
  onDelete: (id: string) => void
  onToggleActive: (id: string, isActive: boolean) => void
}

export function MasterDataManager({
  title,
  description,
  items,
  onAdd,
  onUpdate,
  onDelete,
  onToggleActive,
}: MasterDataManagerProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState<MasterDataItem | null>(null)
  const [newItemName, setNewItemName] = useState("")
  const [newItemDescription, setNewItemDescription] = useState("")

  const handleAdd = () => {
    onAdd({
      name: newItemName,
      description: newItemDescription,
      isActive: true,
    })
    setNewItemName("")
    setNewItemDescription("")
    setIsAddDialogOpen(false)
  }

  const handleUpdate = () => {
    if (currentItem) {
      onUpdate({
        ...currentItem,
        name: newItemName,
        description: newItemDescription,
      })
      setIsEditDialogOpen(false)
    }
  }

  const handleDelete = () => {
    if (currentItem) {
      onDelete(currentItem.id)
      setIsDeleteDialogOpen(false)
    }
  }

  const openEditDialog = (item: MasterDataItem) => {
    setCurrentItem(item)
    setNewItemName(item.name)
    setNewItemDescription(item.description || "")
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (item: MasterDataItem) => {
    setCurrentItem(item)
    setIsDeleteDialogOpen(true)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New {title.slice(0, -1)}</DialogTitle>
              <DialogDescription>Enter the details for the new item</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="Enter name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description (optional)
                </label>
                <Input
                  id="description"
                  value={newItemDescription}
                  onChange={(e) => setNewItemDescription(e.target.value)}
                  placeholder="Enter description"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdd} disabled={!newItemName.trim()}>
                Add
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No items found. Click "Add New" to create one.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.description || "-"}</TableCell>
                  <TableCell>
                    <Badge
                      variant={item.isActive ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => onToggleActive(item.id, !item.isActive)}
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(item)}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(item)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit {title.slice(0, -1)}</DialogTitle>
              <DialogDescription>Update the details for this item</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="edit-name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="edit-name"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="Enter name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-description" className="text-sm font-medium">
                  Description (optional)
                </label>
                <Input
                  id="edit-description"
                  value={newItemDescription}
                  onChange={(e) => setNewItemDescription(e.target.value)}
                  placeholder="Enter description"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdate} disabled={!newItemName.trim()}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete {title.slice(0, -1)}</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{currentItem?.name}"? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
