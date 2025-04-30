import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Plus, FileText, MoreHorizontal, Calendar, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Documents</h1>
        <Button>
          <Plus className="h-4 w-4 mr-1" /> Upload Document
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input placeholder="Search documents..." className="pl-8" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Document Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="legal">Legal Documents</SelectItem>
            <SelectItem value="financial">Financial</SelectItem>
            <SelectItem value="agreement">Agreements</SelectItem>
            <SelectItem value="correspondence">Correspondence</SelectItem>
            <SelectItem value="court">Court Forms</SelectItem>
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

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="bg-gray-50 px-4 py-2 text-sm font-medium text-gray-500 grid grid-cols-12">
                  <div className="col-span-5">Document Name</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-2">Matter</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-1"></div>
                </div>
                <div className="divide-y">
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
                      name: "Motion for Child Support",
                      type: "Legal Document",
                      matter: "Williams Child Support",
                      date: "Feb 15, 2023",
                      status: "Filed",
                    },
                    {
                      id: 5,
                      name: "Property Settlement Agreement",
                      type: "Agreement",
                      matter: "Johnson Divorce",
                      date: "Feb 20, 2023",
                      status: "Draft",
                    },
                    {
                      id: 6,
                      name: "Court Order",
                      type: "Court Document",
                      matter: "Williams Child Support",
                      date: "Mar 5, 2023",
                      status: "Received",
                    },
                    {
                      id: 7,
                      name: "Mediation Agreement",
                      type: "Agreement",
                      matter: "Smith vs. Smith",
                      date: "Mar 10, 2023",
                      status: "Draft",
                    },
                  ].map((document) => (
                    <div key={document.id} className="px-4 py-3 grid grid-cols-12 items-center hover:bg-gray-50">
                      <div className="col-span-5 flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <span className="font-medium">{document.name}</span>
                      </div>
                      <div className="col-span-2 text-sm text-gray-500">{document.type}</div>
                      <div className="col-span-2 text-sm text-gray-500">{document.matter}</div>
                      <div className="col-span-2 text-sm text-gray-500">{document.date}</div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Document</DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit Details</DropdownMenuItem>
                            <DropdownMenuItem>Attach to Hearing</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recent" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                id: 7,
                name: "Mediation Agreement",
                type: "Agreement",
                matter: "Smith vs. Smith",
                date: "Mar 10, 2023",
                status: "Draft",
              },
              {
                id: 6,
                name: "Court Order",
                type: "Court Document",
                matter: "Williams Child Support",
                date: "Mar 5, 2023",
                status: "Received",
              },
              {
                id: 5,
                name: "Property Settlement Agreement",
                type: "Agreement",
                matter: "Johnson Divorce",
                date: "Feb 20, 2023",
                status: "Draft",
              },
            ].map((document) => (
              <Card key={document.id} className="hover:border-gray-300 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      <div className="bg-gray-100 p-2 rounded-md mt-1">
                        <FileText className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{document.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>{document.type}</span>
                          <span>•</span>
                          <span>{document.matter}</span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={
                        document.status === "Filed" ? "default" : document.status === "Draft" ? "outline" : "secondary"
                      }
                    >
                      {document.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{document.date}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-1" /> Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="templates" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                id: 101,
                name: "Divorce Petition Template",
                type: "Legal Document",
                category: "Divorce",
                lastUpdated: "Jan 5, 2023",
              },
              {
                id: 102,
                name: "Financial Disclosure Form",
                type: "Financial",
                category: "All Family Law",
                lastUpdated: "Dec 15, 2022",
              },
              {
                id: 103,
                name: "Parenting Plan Template",
                type: "Agreement",
                category: "Children",
                lastUpdated: "Feb 1, 2023",
              },
              {
                id: 104,
                name: "Property Settlement Template",
                type: "Agreement",
                category: "Property",
                lastUpdated: "Jan 20, 2023",
              },
              {
                id: 105,
                name: "Child Support Calculation",
                type: "Financial",
                category: "Child Support",
                lastUpdated: "Feb 10, 2023",
              },
              {
                id: 106,
                name: "Joint Custody Agreement",
                type: "Agreement",
                category: "Children",
                lastUpdated: "Jan 25, 2023",
              },
            ].map((template) => (
              <Card key={template.id} className="hover:border-gray-300 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      <div className="bg-gray-100 p-2 rounded-md mt-1">
                        <FileText className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{template.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>{template.type}</span>
                          <span>•</span>
                          <span>{template.category}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">Template</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>Updated: {template.lastUpdated}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" /> Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
