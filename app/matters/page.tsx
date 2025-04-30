"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Briefcase, Search, ArrowUpRight, AlertTriangle, Clock, ArrowDown, ArrowUp, ChevronDown } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import NewMatterDialog from "@/components/new-matter-dialog"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export default function MattersPage() {
  const [selectedLawyers, setSelectedLawyers] = useState([])
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)
  const [currentMatterId, setCurrentMatterId] = useState(null)
  const [lawyerDropdownOpen, setLawyerDropdownOpen] = useState(false)

  const lawyers = [
    { id: "sj", name: "Sarah Johnson", initials: "SJ", matterCount: 12 },
    { id: "mb", name: "Michael Brown", initials: "MB", matterCount: 8 },
    { id: "jd", name: "Jennifer Davis", initials: "JD", matterCount: 15 },
    { id: "rw", name: "Robert Wilson", initials: "RW", matterCount: 6 },
    { id: "at", name: "Amanda Thompson", initials: "AT", matterCount: 10 },
  ]

  const openAssignDialog = (matterId) => {
    setCurrentMatterId(matterId)
    setAssignDialogOpen(true)
  }

  const toggleLawyer = (lawyerId) => {
    setSelectedLawyers((prev) => (prev.includes(lawyerId) ? prev.filter((id) => id !== lawyerId) : [...prev, lawyerId]))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Matters</h1>
        <NewMatterDialog />
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input placeholder="Search matters..." className="pl-8" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Matter Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="family">Family</SelectItem>
            <SelectItem value="family-mediation">Family Mediation</SelectItem>
            <SelectItem disabled className="font-semibold text-gray-500">
              Family:
            </SelectItem>
            <SelectItem value="agency-family">Agency - Family</SelectItem>
            <SelectItem value="children">Children</SelectItem>
            <SelectItem value="children-property">Children & Property</SelectItem>
            <SelectItem value="divorce">Divorce</SelectItem>
            <SelectItem value="fertility">Fertility</SelectItem>
            <SelectItem value="financial-agreement">Financial Agreement</SelectItem>
            <SelectItem value="independent-childrens-lawyer">Independent Children's Lawyer</SelectItem>
            <SelectItem value="property">Property</SelectItem>
            <SelectItem disabled className="font-semibold text-gray-500">
              Family Mediation:
            </SelectItem>
            <SelectItem value="children-property-mediation">Children & Property Mediation</SelectItem>
            <SelectItem value="children-mediation">Children Mediation</SelectItem>
            <SelectItem value="property-mediation">Property Mediation</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        <DropdownMenu open={lawyerDropdownOpen} onOpenChange={setLawyerDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <button className="flex h-10 w-[180px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <span>{selectedLawyers.length ? `${selectedLawyers.length} Lawyers` : "Assigned Lawyer"}</span>
              <ChevronDown
                className={cn("h-4 w-4 opacity-50 transition-transform", lawyerDropdownOpen && "rotate-180")}
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[180px]" onCloseAutoFocus={(e) => e.preventDefault()}>
            <DropdownMenuCheckboxItem
              checked={selectedLawyers.length === 0}
              onCheckedChange={() => setSelectedLawyers([])}
              onSelect={(e) => e.preventDefault()}
            >
              All Lawyers
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedLawyers.includes("unassigned")}
              onCheckedChange={() => toggleLawyer("unassigned")}
              onSelect={(e) => e.preventDefault()}
            >
              Unassigned
            </DropdownMenuCheckboxItem>
            {lawyers.map((lawyer) => (
              <DropdownMenuCheckboxItem
                key={lawyer.id}
                checked={selectedLawyers.includes(lawyer.id)}
                onCheckedChange={() => toggleLawyer(lawyer.id)}
                onSelect={(e) => e.preventDefault()}
              >
                {lawyer.name}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Sort Controls */}
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-500">Sort by:</span>
        <SortButton label="Client Last Name" />
        <SortButton label="Matter Number" />
        <SortButton label="Last Modified" defaultSort="desc" />
      </div>

      <div className="space-y-4">
        {[
          {
            id: 1,
            title: "Smith vs. Smith",
            type: "Children & Property",
            status: "Open",
            client: "John Smith",
            opposing: "Jane Smith",
            updated: "Today",
            hasAlert: true,
            lawyer: {
              id: "sj",
              name: "Sarah Johnson",
              initials: "SJ",
            },
            statutoryLimitation: {
              title: "File Response to Application",
              dueDate: "Apr 15, 2023",
              daysRemaining: 5,
              priority: "high",
            },
          },
          {
            id: 2,
            title: "Johnson Divorce",
            type: "Divorce",
            status: "Open",
            client: "Michael Johnson",
            opposing: "Sarah Johnson",
            updated: "Yesterday",
            hasAlert: false,
            lawyer: {
              id: "mb",
              name: "Michael Brown",
              initials: "MB",
            },
            statutoryLimitation: {
              title: "Lodge Financial Statement",
              dueDate: "Apr 20, 2023",
              daysRemaining: 10,
              priority: "medium",
            },
          },
          {
            id: 3,
            title: "Williams Child Support",
            type: "Children",
            status: "Open",
            client: "Robert Williams",
            opposing: "Emily Williams",
            updated: "2 days ago",
            hasAlert: false,
            lawyer: {
              id: "jd",
              name: "Jennifer Davis",
              initials: "JD",
            },
          },
          {
            id: 4,
            title: "Davis Property Settlement",
            type: "Property",
            status: "Open",
            client: "Thomas Davis",
            opposing: "Lisa Davis",
            updated: "3 days ago",
            hasAlert: true,
            lawyer: {
              id: "sj",
              name: "Sarah Johnson",
              initials: "SJ",
            },
            statutoryLimitation: {
              title: "Appeal Period Expiry",
              dueDate: "Apr 30, 2023",
              daysRemaining: 20,
              priority: "low",
            },
          },
          {
            id: 5,
            title: "Brown Financial Agreement",
            type: "Financial Agreement",
            status: "Open",
            client: "James Brown",
            opposing: "Patricia Brown",
            updated: "1 week ago",
            hasAlert: false,
            lawyer: null, // Unassigned
          },
          {
            id: 6,
            title: "Taylor Divorce",
            type: "Divorce",
            status: "Closed",
            client: "William Taylor",
            opposing: "Elizabeth Taylor",
            updated: "1 month ago",
            hasAlert: false,
            lawyer: {
              id: "jd",
              name: "Jennifer Davis",
              initials: "JD",
            },
          },
        ].map((matter) => (
          <div key={matter.id} className="relative">
            <Link href={`/matters/${matter.id}`} className="block">
              <Card className="hover:border-gray-300 transition-colors">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gray-100 p-2 rounded-md">
                        <Briefcase className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{matter.title}</h3>
                          {matter.hasAlert && <AlertTriangle className="h-4 w-4 text-gray-500" />}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>#{matter.id.toString().padStart(5, "0")}</span>
                          <span>•</span>
                          <span>{matter.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm">
                          <Badge variant={matter.status === "Open" ? "default" : "secondary"}>{matter.status}</Badge>
                        </div>
                        <div className="flex items-center justify-end space-x-2 mt-1">
                          <span className="text-xs text-gray-500">Updated {matter.updated}</span>
                          {matter.lawyer ? (
                            <div
                              className="h-5 w-5 rounded-full bg-primary text-white text-xs flex items-center justify-center"
                              title={matter.lawyer.name}
                            >
                              {matter.lawyer.initials}
                            </div>
                          ) : (
                            <div
                              className="h-5 w-5 rounded-full bg-gray-200 text-gray-500 text-xs flex items-center justify-center"
                              title="Unassigned"
                            >
                              ?
                            </div>
                          )}
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  {matter.statutoryLimitation && (
                    <div
                      className={`px-4 py-2 flex items-center justify-between text-sm ${
                        matter.statutoryLimitation.priority === "high"
                          ? "bg-red-50"
                          : matter.statutoryLimitation.priority === "medium"
                            ? "bg-yellow-50"
                            : "bg-green-50"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Clock
                          className={`h-4 w-4 ${
                            matter.statutoryLimitation.priority === "high"
                              ? "text-red-600"
                              : matter.statutoryLimitation.priority === "medium"
                                ? "text-yellow-600"
                                : "text-green-600"
                          }`}
                        />
                        <span
                          className={`${
                            matter.statutoryLimitation.priority === "high"
                              ? "text-red-700"
                              : matter.statutoryLimitation.priority === "medium"
                                ? "text-yellow-700"
                                : "text-green-700"
                          }`}
                        >
                          {matter.statutoryLimitation.title}
                        </span>
                      </div>
                      <div
                        className={`${
                          matter.statutoryLimitation.priority === "high"
                            ? "text-red-700"
                            : matter.statutoryLimitation.priority === "medium"
                              ? "text-yellow-700"
                              : "text-green-700"
                        }`}
                      >
                        Due: {matter.statutoryLimitation.dueDate} ({matter.statutoryLimitation.daysRemaining} days)
                      </div>
                    </div>
                  )}
                  <div className="border-t px-4 py-2 bg-gray-50 flex justify-between text-sm">
                    <div>
                      <span className="text-gray-500">Client:</span>{" "}
                      <span className="font-medium">{matter.client}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Opposing:</span>{" "}
                      <span className="font-medium">{matter.opposing}</span>
                    </div>
                  </div>
                  <div className="border-t px-4 py-2 flex justify-between text-sm">
                    <div>
                      <span className="text-gray-500">Lawyer:</span>{" "}
                      <span className="font-medium">{matter.lawyer ? matter.lawyer.name : "Unassigned"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
            {!matter.lawyer && (
              <div className="absolute top-2 right-2 z-10" onClick={(e) => e.preventDefault()}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    openAssignDialog(matter.id)
                  }}
                >
                  Assign Lawyer
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Assign Lawyer Dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Lawyer to Matter</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-gray-500">
              Select a lawyer to assign to this matter. The current workload for each lawyer is shown below.
            </p>
            <div className="space-y-2">
              {lawyers.map((lawyer) => (
                <div
                  key={lawyer.id}
                  className="flex items-center justify-between p-3 rounded-md border hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    // Here you would handle the assignment
                    console.log(`Assigning ${lawyer.name} to matter ${currentMatterId}`)
                    setAssignDialogOpen(false)
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                      {lawyer.initials}
                    </div>
                    <div>
                      <p className="font-medium">{lawyer.name}</p>
                      <p className="text-sm text-gray-500">Currently assigned to {lawyer.matterCount} matters</p>
                    </div>
                  </div>
                  <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                    {/* This would be checked when selected */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Sort Button Component
function SortButton({ label, defaultSort = "asc" }) {
  const [sortDirection, setSortDirection] = useState(defaultSort)

  const toggleSort = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc")
  }

  return (
    <Button variant="outline" size="sm" onClick={toggleSort} className="flex items-center space-x-1">
      <span>{label}</span>
      {sortDirection === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
    </Button>
  )
}
