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

export default function AddHearingDialog({ matterId }: { matterId: number }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="h-3 w-3 mr-1" /> Add Meeting
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Meeting</DialogTitle>
          <DialogDescription>
            Schedule a new meeting for Matter #{matterId.toString().padStart(5, "0")}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hearing-title" className="text-right">
              Hearing Title
            </Label>
            <Input id="hearing-title" placeholder="e.g. Initial Hearing" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hearing-type" className="text-right">
              Hearing Type
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select hearing type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="initial">Initial Hearing</SelectItem>
                <SelectItem value="status">Status Conference</SelectItem>
                <SelectItem value="motion">Motion Hearing</SelectItem>
                <SelectItem value="trial">Trial</SelectItem>
                <SelectItem value="mediation">Mediation</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hearing-date" className="text-right">
              Date
            </Label>
            <Input id="hearing-date" type="date" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hearing-time" className="text-right">
              Time
            </Label>
            <Input id="hearing-time" type="time" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hearing-location" className="text-right">
              Location
            </Label>
            <Input id="hearing-location" placeholder="e.g. Family Court, Room 302" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hearing-judge" className="text-right">
              Judge
            </Label>
            <Input id="hearing-judge" placeholder="e.g. Hon. Robert Wilson" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hearing-format" className="text-right">
              Format
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in-person">In-Person</SelectItem>
                <SelectItem value="virtual">Virtual</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hearing-documents" className="text-right">
              Attach Documents
            </Label>
            <div className="col-span-3 flex space-x-2">
              <Select>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select document to attach" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="petition">Petition for Divorce</SelectItem>
                  <SelectItem value="financial">Financial Disclosure</SelectItem>
                  <SelectItem value="parenting">Parenting Plan</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hearing-notes" className="text-right">
              Notes
            </Label>
            <textarea
              className="col-span-3 min-h-[60px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter any notes about this hearing..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Schedule Meeting</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
