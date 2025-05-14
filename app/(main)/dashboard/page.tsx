import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Search, ArrowUpRight, AlertTriangle, Calendar, FileText } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import NewMatterDialog from "@/components/new-matter-dialog"

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
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
          </SelectContent>
        </Select>
      </div>

      {/* Redesigned layout with primary and secondary sections */}
      <div className="grid grid-cols-1 gap-6">
        {/* Primary Section - Recent Matters */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Matters</h2>
            <Button variant="outline" size="sm" asChild>
              <Link href="/matters">View All</Link>
            </Button>
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
                lawyer: "SJ",
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
                lawyer: "MB",
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
                lawyer: "JD",
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
                lawyer: "SJ",
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
                lawyer: "MB",
              },
            ].map((matter) => (
              <Link href={`/matters/${matter.id}`} key={matter.id}>
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
                            <div className="h-5 w-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                              {matter.lawyer}
                            </div>
                          </div>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    <div className="border-t px-4 py-2 bg-gray-50 flex justify-between text-sm">
                      <div>
                        <span className="text-gray-500">Client:</span>{" "}
                        <span className="font-medium">{matter.client}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Other Side:</span>{" "}
                        <span className="font-medium">{matter.opposing}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Secondary Sections in a grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Statutory Limitation Dates Section */}
          <Card className="md:col-span-3">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Upcoming Statutory Limitation Dates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left font-medium py-2 pl-2">Task</th>
                      <th className="text-left font-medium py-2">Matter</th>
                      <th className="text-left font-medium py-2">Due Date</th>
                      <th className="text-left font-medium py-2">Days Remaining</th>
                      <th className="text-left font-medium py-2">Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        id: 1,
                        title: "File Response to Application",
                        matter: "Smith vs. Smith",
                        matterId: 1,
                        dueDate: "Apr 15, 2023",
                        daysRemaining: 5,
                        priority: "high",
                      },
                      {
                        id: 2,
                        title: "Lodge Financial Statement",
                        matter: "Johnson Divorce",
                        matterId: 2,
                        dueDate: "Apr 20, 2023",
                        daysRemaining: 10,
                        priority: "medium",
                      },
                      {
                        id: 3,
                        title: "Appeal Period Expiry",
                        matter: "Williams Child Support",
                        matterId: 3,
                        dueDate: "Apr 30, 2023",
                        daysRemaining: 20,
                        priority: "low",
                      },
                      {
                        id: 4,
                        title: "File Affidavit",
                        matter: "Davis Property Settlement",
                        matterId: 4,
                        dueDate: "May 5, 2023",
                        daysRemaining: 25,
                        priority: "medium",
                      },
                      {
                        id: 5,
                        title: "Court Hearing Preparation",
                        matter: "Brown Financial Agreement",
                        matterId: 5,
                        dueDate: "May 10, 2023",
                        daysRemaining: 30,
                        priority: "high",
                      },
                    ].map((limitation) => (
                      <tr key={limitation.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 pl-2">{limitation.title}</td>
                        <td className="py-2">{limitation.matter}</td>
                        <td className="py-2">{limitation.dueDate}</td>
                        <td
                          className={`py-2 ${
                            limitation.daysRemaining <= 7
                              ? "text-red-600 font-medium"
                              : limitation.daysRemaining <= 14
                                ? "text-yellow-600"
                                : "text-gray-500"
                          }`}
                        >
                          {limitation.daysRemaining} days
                        </td>
                        <td className="py-2">
                          <Badge
                            variant={
                              limitation.priority === "high"
                                ? "destructive"
                                : limitation.priority === "medium"
                                  ? "default"
                                  : "outline"
                            }
                          >
                            {limitation.priority}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Meetings Section */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Upcoming Meetings</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    id: 1,
                    title: "Initial Hearing",
                    matter: "Smith vs. Smith",
                    matterId: 1,
                    date: "Mar 15, 2023",
                    time: "9:30 AM",
                    location: "Family Court, Room 302",
                  },
                  {
                    id: 2,
                    title: "Mediation Session",
                    matter: "Smith vs. Smith",
                    matterId: 1,
                    date: "Apr 5, 2023",
                    time: "10:00 AM",
                    location: "Mediation Center",
                  },
                  {
                    id: 3,
                    title: "Status Conference",
                    matter: "Johnson Divorce",
                    matterId: 2,
                    date: "Apr 12, 2023",
                    time: "11:00 AM",
                    location: "Family Court, Room 201",
                  },
                ].map((meeting) => (
                  <Link href={`/matters/${meeting.matterId}?tab=hearings`} key={meeting.id} className="block">
                    <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                      <div className="bg-gray-100 p-2 rounded-md mt-1">
                        <Calendar className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-sm">{meeting.title}</h3>
                          <span className="text-xs text-gray-500">{meeting.date}</span>
                        </div>
                        <p className="text-xs text-gray-500">{meeting.matter}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {meeting.time} • {meeting.location}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Documents Section */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Recent Documents</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    id: 1,
                    name: "Petition for Divorce",
                    type: "Legal Document",
                    matter: "Smith vs. Smith",
                    matterId: 1,
                    date: "Jan 15, 2023",
                    status: "Filed",
                  },
                  {
                    id: 2,
                    name: "Financial Disclosure",
                    type: "Financial",
                    matter: "Smith vs. Smith",
                    matterId: 1,
                    date: "Feb 2, 2023",
                    status: "Draft",
                  },
                  {
                    id: 3,
                    name: "Parenting Plan",
                    type: "Agreement",
                    matter: "Smith vs. Smith",
                    matterId: 1,
                    date: "Feb 10, 2023",
                    status: "Draft",
                  },
                ].map((document) => (
                  <Link href={`/matters/${document.matterId}?tab=documents`} key={document.id} className="block">
                    <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                      <div className="bg-gray-100 p-2 rounded-md mt-1">
                        <FileText className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-sm">{document.name}</h3>
                          <Badge variant={document.status === "Filed" ? "default" : "outline"} className="text-xs">
                            {document.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500">{document.matter}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {document.type} • {document.date}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
