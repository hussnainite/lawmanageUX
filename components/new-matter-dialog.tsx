"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewMatterDialog() {
  const [contactType, setContactType] = useState<"client" | "additional" | "opposing" | "lawyer">("client")
  const router = useRouter()

  const handleAddContact = (type: "client" | "additional" | "opposing" | "lawyer") => {
    setContactType(type)
    // Navigate to the new contact page with a query parameter to indicate the contact type
    router.push(`/contacts/new?type=${type}`)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-1" /> New Matter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Matter</DialogTitle>
          <DialogDescription>Enter the details for the new family law matter.</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="basic">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="parties">Parties</TabsTrigger>
            <TabsTrigger value="details">Matter Details</TabsTrigger>
          </TabsList>
          <TabsContent value="basic" className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="matter-name" className="text-right">
                Matter Name
              </Label>
              <Input id="matter-name" placeholder="e.g. Smith vs. Smith" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="matter-type" className="text-right">
                Matter Type
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select matter type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="children">Children</SelectItem>
                  <SelectItem value="children-property">Children & Property</SelectItem>
                  <SelectItem value="property">Property</SelectItem>
                  <SelectItem value="divorce">Divorce</SelectItem>
                  <SelectItem value="financial">Financial Agreement</SelectItem>
                  <SelectItem value="child-support">Child Support</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="billing-type" className="text-right">
                Billing Type
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select billing type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Fixed Fee</SelectItem>
                  <SelectItem value="value">Value Based</SelectItem>
                  <SelectItem value="time">Time Based</SelectItem>
                  <SelectItem value="contingency">Contingency</SelectItem>
                  <SelectItem value="not-billed">Not Billed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="matter-opened" className="text-right">
                Matter Opened
              </Label>
              <div className="col-span-3">
                <Input id="matter-opened" type="date" className="w-full" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="matter-closed" className="text-right">
                Matter Closed
              </Label>
              <div className="col-span-3">
                <Input id="matter-closed" type="date" className="w-full" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="partner" className="text-right">
                Partner Supervising
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select partner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="robert">Robert Wilson</SelectItem>
                  <SelectItem value="elizabeth">Elizabeth Taylor</SelectItem>
                  <SelectItem value="james">James Anderson</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="attorney" className="text-right">
                Assigned Lawyer
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select lawyer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sarah">Sarah Johnson</SelectItem>
                  <SelectItem value="michael">Michael Brown</SelectItem>
                  <SelectItem value="jennifer">Jennifer Davis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="assisting" className="text-right">
                Assisting Lawyer
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select assisting lawyer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="david">David Miller</SelectItem>
                  <SelectItem value="susan">Susan White</SelectItem>
                  <SelectItem value="thomas">Thomas Clark</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
          <TabsContent value="parties" className="space-y-4 py-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Client Information</h3>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="client" className="text-right">
                  Primary Client
                </Label>
                <div className="col-span-3 flex space-x-2">
                  <Select>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select existing client" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Smith</SelectItem>
                      <SelectItem value="michael">Michael Johnson</SelectItem>
                      <SelectItem value="robert">Robert Williams</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon" onClick={() => handleAddContact("client")}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="additional-client" className="text-right">
                  Additional Client
                </Label>
                <div className="col-span-3 flex space-x-2">
                  <Select>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select additional client (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jane">Jane Smith</SelectItem>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="emily">Emily Williams</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon" onClick={() => handleAddContact("additional")}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="space-y-4 pt-4">
              <h3 className="text-sm font-medium">Opposing Party Information</h3>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="opposing" className="text-right">
                  Other Side
                </Label>
                <div className="col-span-3 flex space-x-2">
                  <Select>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select existing contact" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jane">Jane Smith</SelectItem>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="emily">Emily Williams</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon" onClick={() => handleAddContact("opposing")}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="opposing-counsel" className="text-right">
                  Opposing Lawyer
                </Label>
                <div className="col-span-3 flex space-x-2">
                  <Select>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select opposing lawyer (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="james">James Brown, Esq.</SelectItem>
                      <SelectItem value="patricia">Patricia Wilson, Esq.</SelectItem>
                      <SelectItem value="david">David Miller, Esq.</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon" onClick={() => handleAddContact("lawyer")}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="details" className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dv-flag" className="text-right">
                Domestic Violence
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No DV concerns</SelectItem>
                  <SelectItem value="yes">Flag for DV concerns</SelectItem>
                  <SelectItem value="restraining">Restraining order in place</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="children" className="text-right">
                Children Involved
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No children</SelectItem>
                  <SelectItem value="yes">Yes, children involved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="property" className="text-right">
                Property Division
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No property to divide</SelectItem>
                  <SelectItem value="simple">Simple property division</SelectItem>
                  <SelectItem value="complex">Complex property division</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Initial Notes
              </Label>
              <textarea
                className="col-span-3 min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter any initial notes about this matter..."
              />
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Create Matter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
