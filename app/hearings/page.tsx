import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  Plus,
  Calendar,
  Clock,
  MapPin,
  ArrowUpRight,
  FileText,
  MoreHorizontal,
  Briefcase,
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function HearingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Court Hearings</h1>
        <Button>
          <Plus className="h-4 w-4 mr-1" /> Add Hearing
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input placeholder="Search hearings..." className="pl-8" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Hearing Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="initial">Initial Hearing</SelectItem>
            <SelectItem value="status">Status Conference</SelectItem>
            <SelectItem value="motion">Motion Hearing</SelectItem>
            <SelectItem value="trial">Trial</SelectItem>
            <SelectItem value="mediation">Mediation</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Matter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Matters</SelectItem>
            <SelectItem value="1">Smith vs. Smith</SelectItem>
            <SelectItem value="2">Johnson Divorce</SelectItem>
            <SelectItem value="3">Williams Child Support</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="all">All Hearings</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-4">
          <div className="space-y-4">
            {[
              {
                id: 1,
                title: "Initial Hearing",
                matter: "Smith vs. Smith",
                date: "Mar 15, 2023",
                time: "9:30 AM",
                location: "Family Court, Room 302",
                judge: "Hon. Robert Wilson",
                documents: 1,
              },
              {
                id: 2,
                title: "Mediation Session",
                matter: "Smith vs. Smith",
                date: "Apr 5, 2023",
                time: "10:00 AM",
                location: "Mediation Center",
                judge: "N/A",
                documents: 2,
              },
              {
                id: 3,
                title: "Status Conference",
                matter: "Johnson Divorce",
                date: "Apr 12, 2023",
                time: "11:00 AM",
                location: "Family Court, Room 201",
                judge: "Hon. Sarah Miller",
                documents: 0,
              },
              {
                id: 4,
                title: "Child Support Hearing",
                matter: "Williams Child Support",
                date: "Apr 20, 2023",
                time: "2:00 PM",
                location: "Family Court, Room 305",
                judge: "Hon. James Thompson",
                documents: 3,
              },
            ].map((hearing) => (
              <Card key={hearing.id} className="hover:border-gray-300 transition-colors">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gray-100 p-2 rounded-md">
                          <Calendar className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{hearing.title}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Briefcase className="h-3 w-3" />
                            <span>{hearing.matter}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Plus className="h-3 w-3 mr-1" /> Add to Calendar
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Hearing</DropdownMenuItem>
                            <DropdownMenuItem>Attach Document</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Cancel Hearing</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>
                          {hearing.date} at {hearing.time}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{hearing.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span>
                          {hearing.documents} attached document{hearing.documents !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t px-4 py-2 bg-gray-50 flex justify-between text-sm">
                    <span className="text-gray-500">Judge: {hearing.judge}</span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/matters/1`}>
                        <ArrowUpRight className="h-4 w-4 mr-1" /> View Matter
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="past" className="mt-4">
          <div className="space-y-4">
            {[
              {
                id: 5,
                title: "Initial Consultation",
                matter: "Johnson Divorce",
                date: "Feb 10, 2023",
                time: "1:00 PM",
                location: "Law Office",
                judge: "N/A",
                documents: 2,
                outcome: "Completed",
              },
              {
                id: 6,
                title: "Temporary Orders Hearing",
                matter: "Williams Child Support",
                date: "Feb 15, 2023",
                time: "10:30 AM",
                location: "Family Court, Room 305",
                judge: "Hon. James Thompson",
                documents: 4,
                outcome: "Order Granted",
              },
            ].map((hearing) => (
              <Card key={hearing.id} className="hover:border-gray-300 transition-colors">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gray-100 p-2 rounded-md">
                          <Calendar className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{hearing.title}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Briefcase className="h-3 w-3" />
                            <span>{hearing.matter}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline">{hearing.outcome}</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>
                          {hearing.date} at {hearing.time}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{hearing.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span>
                          {hearing.documents} attached document{hearing.documents !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t px-4 py-2 bg-gray-50 flex justify-between text-sm">
                    <span className="text-gray-500">Judge: {hearing.judge}</span>
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4 mr-1" /> View Notes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="all" className="mt-4">
          <div className="p-8 text-center text-gray-500">
            <p>All hearings view would show both upcoming and past hearings together.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
