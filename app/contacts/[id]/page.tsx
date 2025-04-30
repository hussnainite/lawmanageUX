import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Briefcase,
  Edit,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  Plus,
  AlertTriangle,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ContactDetailPage({ params }: { params: { id: string } }) {
  // This would normally be fetched from an API
  const contact = {
    id: Number.parseInt(params.id),
    name: "Jane Smith",
    title: "Ms",
    givenName: "Jane",
    lastName: "Smith",
    type: "Opposing Party",
    email: "jane.smith@example.com",
    phone: "(555) 765-4321",
    homePhone: "(555) 765-4321",
    workPhone: "(555) 765-8765",
    workPhoneExt: "123",
    mobile: "(555) 765-9876",
    address: "456 Oak Ave, Anytown, USA",
    addressDetails: {
      careOf: "",
      buildingLevel: "",
      unitType: "",
      unitNumber: "",
      streetNumber: "456",
      streetName: "Oak",
      streetType: "Ave",
      suburb: "Anytown",
      state: "NSW",
      postcode: "2000",
    },
    matters: [{ id: 1, title: "Smith vs. Smith", type: "Children & Property", status: "Open", role: "Opposing Party" }],
    notes: [
      {
        id: 1,
        date: "Jan 15, 2023",
        author: "Sarah Johnson",
        content: "Initial contact regarding Smith divorce case.",
      },
      {
        id: 2,
        date: "Feb 5, 2023",
        author: "Sarah Johnson",
        content: "Received financial disclosure documents from opposing counsel.",
      },
    ],
    documents: [
      { id: 1, name: "Financial Disclosure", type: "Financial", date: "Feb 2, 2023", status: "Received" },
      { id: 2, name: "Proposed Parenting Plan", type: "Agreement", date: "Feb 15, 2023", status: "Received" },
    ],
    hasAlert: true,
    alertMessage: "Domestic violence flag - Exercise caution with joint meetings",
    tags: ["ESL", "Hard of Hearing"],
    dPacket: {
      number: "DP-2023-0042",
      contents: [
        { id: 1, name: "Identification Documents", status: "Received", date: "Jan 10, 2023" },
        { id: 2, name: "Financial Statements", status: "Pending", date: "Jan 15, 2023" },
        { id: 3, name: "Property Ownership Records", status: "Received", date: "Jan 20, 2023" },
      ],
    },
    // Additional details
    birthName: {
      first: "Jane",
      middle: "",
      last: "Johnson",
    },
    previousNames: "Jane Johnson",
    maritalStatus: "Divorced",
    occupation: "Accountant",
    specialNeeds: "Hard of Hearing",
    birthDetails: {
      date: "1980-05-15",
      suburb: "Sydney",
      state: "NSW",
      country: "Australia",
    },
    identificationNumbers: {
      driversLicense: "12345678",
      driversLicenseState: "NSW",
      taxFileNumber: "123456789",
      medicareNumber: "1234567890",
      centrelinkNumber: "123456789A",
      correctionsNumber: "",
    },
    citizenship: {
      country: "Australia",
      nationality: "Australian",
      interpreterLanguage: "",
    },
    passport: {
      number: "PA1234567",
      issueDate: "2018-06-20",
      issueCountry: "Australia",
      expiryDate: "2028-06-20",
    },
    voiDetails: {
      date: "2023-01-10",
      completed: true,
      source: "In Person",
      reference: "VOI-2023-001",
    },
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/contacts">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">{contact.name}</h1>
          <Badge variant="outline">{contact.type}</Badge>
          {contact.hasAlert && (
            <Badge variant="outline" className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3 text-gray-500" />
              DV Alert
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit Contact
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Add to Matter</DropdownMenuItem>
              <DropdownMenuItem>Send Email</DropdownMenuItem>
              <DropdownMenuItem>Print Contact Details</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Delete Contact</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {contact.hasAlert && (
        <div className="bg-gray-50 border border-gray-300 rounded-md p-4 flex items-start space-x-3">
          <div className="bg-gray-100 p-1.5 rounded-full">
            <AlertTriangle className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Domestic Violence Alert</h3>
            <p className="text-sm text-gray-600">{contact.alertMessage}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Contact Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center mb-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="text-2xl">{contact.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{contact.name}</h2>
              <Badge variant="outline" className="mt-1">
                {contact.type}
              </Badge>
              {contact.tags && contact.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2 justify-center">
                  {contact.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p>{contact.email}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p>{contact.phone}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p>{contact.address}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Related Matters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contact.matters.map((matter) => (
                  <Link href={`/matters/${matter.id}`} key={matter.id}>
                    <div className="flex items-center justify-between p-3 bg-white border rounded-lg hover:border-blue-200 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gray-100 p-2 rounded-md">
                          <Briefcase className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{matter.title}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>{matter.type}</span>
                            <span>•</span>
                            <span>Role: {matter.role}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant={matter.status === "Open" ? "default" : "secondary"}>{matter.status}</Badge>
                    </div>
                  </Link>
                ))}
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-1" /> Add to Matter
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Contact Tags</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-3 w-3 mr-1" /> Add Tag
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {contact.tags && contact.tags.length > 0 ? (
                    contact.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="px-3 py-1 text-sm flex items-center gap-1">
                        {tag}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 ml-1 text-gray-400 hover:text-gray-700"
                        >
                          ×
                        </Button>
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No tags assigned to this contact.</p>
                  )}
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="text-sm font-medium mb-2">Available Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {["ESL", "Illiterate", "Hard of Hearing", "Elderly", "Vulnerable"].map((tag, index) => (
                      <Badge
                        key={index}
                        variant={contact.tags && contact.tags.includes(tag) ? "secondary" : "outline"}
                        className="px-3 py-1 text-sm cursor-pointer hover:bg-gray-100"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">D-Packet Information</CardTitle>
              <Button variant="outline" size="sm">
                <Edit className="h-3 w-3 mr-1" /> Edit
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="text-sm font-medium text-gray-500">D-Packet Number</p>
                    <p className="font-medium">{contact.dPacket.number}</p>
                  </div>
                  <Badge variant="outline">Active</Badge>
                </div>

                <h4 className="text-sm font-medium text-gray-700">Contents</h4>
                <div className="space-y-2">
                  {contact.dPacket.contents.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-2 border rounded-md">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span>{item.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{item.date}</span>
                        <Badge variant={item.status === "Received" ? "default" : "outline"} className="text-xs">
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="h-3 w-3 mr-1" /> Add Item
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="notes">
            <TabsList>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="additional">Additional Details</TabsTrigger>
            </TabsList>
            <TabsContent value="notes" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg">Notes</CardTitle>
                  <Button>
                    <Plus className="h-4 w-4 mr-1" /> Add Note
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {contact.notes.map((note) => (
                      <div key={note.id} className="p-3 bg-white border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="text-sm font-medium">{note.author}</span>
                            <span className="text-xs text-gray-500 ml-2">{note.date}</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-sm">{note.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="additional" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Additional Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-md font-medium mb-2">General Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {contact.birthName && (
                          <div>
                            <p className="text-sm font-medium text-gray-500">Birth Name</p>
                            <p>
                              {`${contact.birthName.first} ${contact.birthName.middle} ${contact.birthName.last}`.trim()}
                            </p>
                          </div>
                        )}
                        {contact.previousNames && (
                          <div>
                            <p className="text-sm font-medium text-gray-500">Previous Names</p>
                            <p>{contact.previousNames}</p>
                          </div>
                        )}
                        {contact.maritalStatus && (
                          <div>
                            <p className="text-sm font-medium text-gray-500">Marital Status</p>
                            <p>{contact.maritalStatus}</p>
                          </div>
                        )}
                        {contact.occupation && (
                          <div>
                            <p className="text-sm font-medium text-gray-500">Occupation</p>
                            <p>{contact.occupation}</p>
                          </div>
                        )}
                        {contact.specialNeeds && (
                          <div>
                            <p className="text-sm font-medium text-gray-500">Special Needs</p>
                            <p>{contact.specialNeeds}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {contact.birthDetails && (
                      <div>
                        <h3 className="text-md font-medium mb-2">Birth Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                            <p>{new Date(contact.birthDetails.date).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Place of Birth</p>
                            <p>{`${contact.birthDetails.suburb}, ${contact.birthDetails.state}, ${contact.birthDetails.country}`}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {contact.identificationNumbers && (
                      <div>
                        <h3 className="text-md font-medium mb-2">Identification Numbers</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {contact.identificationNumbers.driversLicense && (
                            <div>
                              <p className="text-sm font-medium text-gray-500">Driver's License</p>
                              <p>{`${contact.identificationNumbers.driversLicense} (${contact.identificationNumbers.driversLicenseState})`}</p>
                            </div>
                          )}
                          {contact.identificationNumbers.taxFileNumber && (
                            <div>
                              <p className="text-sm font-medium text-gray-500">Tax File Number</p>
                              <p>{contact.identificationNumbers.taxFileNumber}</p>
                            </div>
                          )}
                          {contact.identificationNumbers.medicareNumber && (
                            <div>
                              <p className="text-sm font-medium text-gray-500">Medicare Number</p>
                              <p>{contact.identificationNumbers.medicareNumber}</p>
                            </div>
                          )}
                          {contact.identificationNumbers.centrelinkNumber && (
                            <div>
                              <p className="text-sm font-medium text-gray-500">Centrelink Reference Number</p>
                              <p>{contact.identificationNumbers.centrelinkNumber}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {contact.citizenship && (
                      <div>
                        <h3 className="text-md font-medium mb-2">Citizenship & Nationality</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Country of Citizenship</p>
                            <p>{contact.citizenship.country}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Nationality</p>
                            <p>{contact.citizenship.nationality}</p>
                          </div>
                          {contact.citizenship.interpreterLanguage && (
                            <div>
                              <p className="text-sm font-medium text-gray-500">Language of Interpreter</p>
                              <p>{contact.citizenship.interpreterLanguage}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {contact.passport && (
                      <div>
                        <h3 className="text-md font-medium mb-2">Passport Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Passport Number</p>
                            <p>{contact.passport.number}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Issue Date & Country</p>
                            <p>{`${new Date(contact.passport.issueDate).toLocaleDateString()} (${contact.passport.issueCountry})`}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Expiry Date</p>
                            <p>{new Date(contact.passport.expiryDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {contact.voiDetails && (
                      <div>
                        <h3 className="text-md font-medium mb-2">VOI Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500">VOI Date</p>
                            <p>{new Date(contact.voiDetails.date).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">VOI Status</p>
                            <p>{contact.voiDetails.completed ? "Completed" : "Pending"}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">VOI Source & Reference</p>
                            <p>{`${contact.voiDetails.source} (${contact.voiDetails.reference})`}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
