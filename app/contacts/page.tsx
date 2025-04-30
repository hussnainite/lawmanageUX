import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, ArrowUpRight, Users, Building, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { NewContactDialog } from "@/components/new-contact-dialog"

export default function ContactsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <NewContactDialog />
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input placeholder="Search contacts..." className="pl-8" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Contact Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="client">Clients</SelectItem>
            <SelectItem value="opposing">Other Party</SelectItem>
            <SelectItem value="witness">Witnesses</SelectItem>
            <SelectItem value="expert">Expert Witnesses</SelectItem>
            <SelectItem value="other">Other Contacts</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="individuals">
        <TabsList>
          <TabsTrigger value="individuals">Individuals</TabsTrigger>
          <TabsTrigger value="businesses">Businesses</TabsTrigger>
          <TabsTrigger value="all">All Contacts</TabsTrigger>
        </TabsList>
        <TabsContent value="individuals" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                id: 1,
                name: "John Smith",
                type: "Client",
                email: "john.smith@example.com",
                phone: "(555) 123-4567",
                address: "123 Main St, Anytown, USA",
                matters: 1,
                hasAlert: false,
              },
              {
                id: 2,
                name: "Jane Smith",
                type: "Other Party",
                email: "jane.smith@example.com",
                phone: "(555) 765-4321",
                address: "456 Oak Ave, Anytown, USA",
                matters: 1,
                hasAlert: true,
              },
              {
                id: 3,
                name: "Michael Johnson",
                type: "Client",
                email: "michael.johnson@example.com",
                phone: "(555) 987-6543",
                address: "789 Pine Rd, Anytown, USA",
                matters: 1,
                hasAlert: false,
              },
              {
                id: 4,
                name: "Sarah Johnson",
                type: "Other Party",
                email: "sarah.johnson@example.com",
                phone: "(555) 345-6789",
                address: "321 Elm St, Anytown, USA",
                matters: 1,
                hasAlert: false,
              },
              {
                id: 5,
                name: "Dr. Robert Williams",
                type: "Expert Witness",
                email: "robert.williams@example.com",
                phone: "(555) 234-5678",
                address: "567 Maple Dr, Anytown, USA",
                matters: 2,
                hasAlert: false,
              },
              {
                id: 6,
                name: "Judge Thomas Davis",
                type: "Judge",
                email: "thomas.davis@courts.gov",
                phone: "(555) 876-5432",
                address: "Anytown Courthouse, Anytown, USA",
                matters: 3,
                hasAlert: false,
              },
            ].map((contact) => (
              <Link href={`/contacts/${contact.id}`} key={contact.id}>
                <Card className="hover:border-gray-300 transition-colors h-full">
                  <CardContent className="p-0">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium">{contact.name}</h3>
                              {contact.hasAlert && (
                                <Badge variant="destructive" className="h-1.5 w-1.5 rounded-full p-0" />
                              )}
                            </div>
                            <Badge variant="outline" className="text-xs font-normal">
                              {contact.type}
                            </Badge>
                          </div>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start space-x-2">
                          <Mail className="h-4 w-4 text-gray-400 mt-0.5" />
                          <span className="text-gray-600">{contact.email}</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Phone className="h-4 w-4 text-gray-400 mt-0.5" />
                          <span className="text-gray-600">{contact.phone}</span>
                        </div>
                      </div>
                    </div>
                    <div className="border-t px-4 py-2 bg-gray-50 flex justify-between text-xs">
                      <span className="text-gray-500">
                        {contact.matters} {contact.matters === 1 ? "matter" : "matters"}
                      </span>
                      <span className="text-gray-500">{contact.hasAlert ? "DV Alert" : "No alerts"}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="businesses" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                id: 101,
                name: "Johnson & Partners",
                type: "Law Firm",
                email: "info@johnsonpartners.com",
                phone: "(555) 111-2222",
                address: "100 Legal Ave, Anytown, USA",
                matters: 15,
                contactPerson: "William Johnson",
              },
              {
                id: 102,
                name: "Smith Appraisal Services",
                type: "Appraiser",
                email: "info@smithappraisal.com",
                phone: "(555) 333-4444",
                address: "200 Value St, Anytown, USA",
                matters: 8,
                contactPerson: "James Smith",
              },
              {
                id: 103,
                name: "Family Mediation Center",
                type: "Mediation Service",
                email: "info@familymediation.com",
                phone: "(555) 555-6666",
                address: "300 Resolution Rd, Anytown, USA",
                matters: 12,
                contactPerson: "Maria Rodriguez",
              },
            ].map((business) => (
              <Link href={`/contacts/${business.id}`} key={business.id}>
                <Card className="hover:border-gray-300 transition-colors h-full">
                  <CardContent className="p-0">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <Building className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{business.name}</h3>
                            <Badge variant="outline" className="text-xs font-normal">
                              {business.type}
                            </Badge>
                          </div>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start space-x-2">
                          <Mail className="h-4 w-4 text-gray-400 mt-0.5" />
                          <span className="text-gray-600">{business.email}</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Phone className="h-4 w-4 text-gray-400 mt-0.5" />
                          <span className="text-gray-600">{business.phone}</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Users className="h-4 w-4 text-gray-400 mt-0.5" />
                          <span className="text-gray-600">Contact: {business.contactPerson}</span>
                        </div>
                      </div>
                    </div>
                    <div className="border-t px-4 py-2 bg-gray-50 flex justify-between text-xs">
                      <span className="text-gray-500">
                        {business.matters} {business.matters === 1 ? "matter" : "matters"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="all" className="mt-4">
          <div className="p-8 text-center text-gray-500">
            <p>All contacts view would show both individuals and businesses together.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
