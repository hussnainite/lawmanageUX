import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, Search, ArrowUpRight, AlertTriangle, Calendar, Clock } from "lucide-react"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Matters Section */}
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
                        <span className="text-gray-500">Opposing:</span>{" "}
                        <span className="font-medium">{matter.opposing}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Statutory Limitation Dates Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Upcoming Statutory Limitation Dates</h2>
            
          </div>
          <div className="space-y-4">
            {[
              {
                id: 1,
                title: "File Response to Application",
                matter: "Smith vs. Smith",
                dueDate: "Apr 15, 2023",
                daysRemaining: 5,
                priority: "high",
              },
              {
                id: 2,
                title: "Lodge Financial Statement",
                matter: "Johnson Divorce",
                dueDate: "Apr 20, 2023",
                daysRemaining: 10,
                priority: "medium",
              },
              {
                id: 3,
                title: "Appeal Period Expiry",
                matter: "Williams Child Support",
                dueDate: "Apr 30, 2023",
                daysRemaining: 20,
                priority: "low",
              },
              {
                id: 4,
                title: "File Affidavit",
                matter: "Davis Property Settlement",
                dueDate: "May 5, 2023",
                daysRemaining: 25,
                priority: "medium",
              },
              {
                id: 5,
                title: "Court Hearing Preparation",
                matter: "Brown Financial Agreement",
                dueDate: "May 10, 2023",
                daysRemaining: 30,
                priority: "high",
              },
            ].map((limitation) => (
              <Card key={limitation.id} className="hover:border-gray-300 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-md ${
                          limitation.priority === "high"
                            ? "bg-red-100"
                            : limitation.priority === "medium"
                              ? "bg-yellow-100"
                              : "bg-green-100"
                        }`}
                      >
                        <Clock
                          className={`h-5 w-5 ${
                            limitation.priority === "high"
                              ? "text-red-600"
                              : limitation.priority === "medium"
                                ? "text-yellow-600"
                                : "text-green-600"
                          }`}
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{limitation.title}</h3>
                        <p className="text-sm text-gray-500">{limitation.matter}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{limitation.dueDate}</p>
                      <p
                        className={`text-sm ${
                          limitation.daysRemaining <= 7
                            ? "text-red-600 font-medium"
                            : limitation.daysRemaining <= 14
                              ? "text-yellow-600"
                              : "text-gray-500"
                        }`}
                      >
                        {limitation.daysRemaining} days remaining
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Upcoming Meetings Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Upcoming Meetings</h2>
            <Button variant="outline" size="sm" asChild>
              <Link href="/hearings">View All</Link>
            </Button>
          </div>
          <div className="space-y-4">
            {[
              {
                id: 1,
                title: "Initial Hearing",
                matter: "Smith vs. Smith",
                date: "Mar 15, 2023",
                time: "9:30 AM",
                location: "Family Court, Room 302",
              },
              {
                id: 2,
                title: "Mediation Session",
                matter: "Smith vs. Smith",
                date: "Apr 5, 2023",
                time: "10:00 AM",
                location: "Mediation Center",
              },
              {
                id: 3,
                title: "Status Conference",
                matter: "Johnson Divorce",
                date: "Apr 12, 2023",
                time: "11:00 AM",
                location: "Family Court, Room 201",
              },
              {
                id: 4,
                title: "Client Meeting",
                matter: "Williams Child Support",
                date: "Apr 18, 2023",
                time: "2:00 PM",
                location: "Office Conference Room",
              },
              {
                id: 5,
                title: "Settlement Discussion",
                matter: "Davis Property Settlement",
                date: "Apr 25, 2023",
                time: "3:30 PM",
                location: "Opposing Counsel Office",
              },
            ].map((meeting) => (
              <Card key={meeting.id} className="hover:border-gray-300 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gray-100 p-2 rounded-md">
                        <Calendar className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{meeting.title}</h3>
                        <p className="text-sm text-gray-500">{meeting.matter}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{meeting.date}</p>
                      <p className="text-sm text-gray-500">{meeting.time}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{meeting.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Documents Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Documents</h2>
            <Button variant="outline" size="sm" asChild>
              <Link href="/documents">View All</Link>
            </Button>
          </div>
          <div className="space-y-4">
            {[
              {
                id: 1,
                name: "Petition for Divorce",
                type: "Legal Document",
                matter: "Smith vs. Smith",
                date: "Jan 15, 2023",
                status: "Filed",
              },
              {
                id: 2,
                name: "Financial Disclosure",
                type: "Financial",
                matter: "Smith vs. Smith",
                date: "Feb 2, 2023",
                status: "Draft",
              },
              {
                id: 3,
                name: "Parenting Plan",
                type: "Agreement",
                matter: "Smith vs. Smith",
                date: "Feb 10, 2023",
                status: "Draft",
              },
              {
                id: 4,
                name: "Affidavit of Service",
                type: "Legal Document",
                matter: "Johnson Divorce",
                date: "Feb 15, 2023",
                status: "Filed",
              },
              {
                id: 5,
                name: "Child Support Calculation",
                type: "Financial",
                matter: "Williams Child Support",
                date: "Feb 20, 2023",
                status: "Draft",
              },
            ].map((document) => (
              <Card key={document.id} className="hover:border-gray-300 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium">{document.name}</h3>
                      <p className="text-sm text-gray-500">{document.matter}</p>
                    </div>
                    <Badge variant={document.status === "Filed" ? "default" : "outline"}>{document.status}</Badge>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>{document.type}</span>
                    <span>{document.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
