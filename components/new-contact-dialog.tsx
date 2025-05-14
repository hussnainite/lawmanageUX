"use client"

import type React from "react"

import { useState } from "react"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, User, Building2, X, Gavel, Briefcase, Building, Users } from "lucide-react"
import { cn } from "@/lib/utils"

export function NewContactDialog() {
  const [open, setOpen] = useState(false)
  const [contactType, setContactType] = useState("person")
  const [personType, setPersonType] = useState("adult")
  const [birthDate, setBirthDate] = useState<Date | undefined>()
  const [deathDate, setDeathDate] = useState<Date | undefined>()
  const [passportIssueDate, setPassportIssueDate] = useState<Date | undefined>()
  const [passportExpiryDate, setPassportExpiryDate] = useState<Date | undefined>()
  const [voiDate, setVoiDate] = useState<Date | undefined>()
  const [poaDate, setPoaDate] = useState<Date | undefined>()
  const [salutation, setSalutation] = useState("informal")
  const [addressType, setAddressType] = useState("street")
  const [director1VoiDate, setDirector1VoiDate] = useState<Date | undefined>()
  const [director2VoiDate, setDirector2VoiDate] = useState<Date | undefined>()
  const [sealType, setSealType] = useState("without")
  const [staffMembers, setStaffMembers] = useState([{ id: 1 }])
  const [childContacts, setChildContacts] = useState([{ id: 1 }])
  const [contactRole, setContactRole] = useState("client")
  const [organizationType, setOrganizationType] = useState("")
  const [step, setStep] = useState(1)

  const addStaffMember = () => {
    setStaffMembers([...staffMembers, { id: staffMembers.length + 1 }])
  }

  const removeStaffMember = (id: number) => {
    if (staffMembers.length > 1) {
      setStaffMembers(staffMembers.filter((member) => member.id !== id))
    }
  }

  const addChildContact = () => {
    setChildContacts([...childContacts, { id: childContacts.length + 1 }])
  }

  const removeChildContact = (id: number) => {
    if (childContacts.length > 1) {
      setChildContacts(childContacts.filter((child) => child.id !== id))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    setOpen(false)
  }

  const goToNextStep = () => {
    setStep(step + 1)
  }

  const goToPreviousStep = () => {
    setStep(step - 1)
  }

  const getOrganizationIcon = (type: string) => {
    switch (type) {
      case "court":
        return <Gavel className="h-6 w-6" />
      case "government":
        return <Building className="h-6 w-6" />
      case "company":
        return <Briefcase className="h-6 w-6" />
      case "expert":
        return <Users className="h-6 w-6" />
      default:
        return <Building2 className="h-6 w-6" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create New Contact</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create a contact</DialogTitle>
          <DialogDescription>Enter the contact details. Click save when you're done.</DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="py-6">
            <h2 className="text-lg font-medium mb-4">What type of contact are you creating?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card
                className={cn(
                  "cursor-pointer hover:border-primary transition-colors",
                  contactRole === "client" ? "border-primary bg-primary/5" : "",
                )}
                onClick={() => setContactRole("client")}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center mb-4",
                      contactRole === "client" ? "bg-primary text-primary-foreground" : "bg-muted",
                    )}
                  >
                    <User className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium">Client</h3>
                  <p className="text-sm text-muted-foreground text-center mt-2">
                    A person or organization that you represent
                  </p>
                </CardContent>
              </Card>

              <Card
                className={cn(
                  "cursor-pointer hover:border-primary transition-colors",
                  contactRole === "other-side" ? "border-primary bg-primary/5" : "",
                )}
                onClick={() => setContactRole("other-side")}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center mb-4",
                      contactRole === "other-side" ? "bg-primary text-primary-foreground" : "bg-muted",
                    )}
                  >
                    <Building2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium">Other Side</h3>
                  <p className="text-sm text-muted-foreground text-center mt-2">
                    A person or organization that you interact with but don't represent
                  </p>
                </CardContent>
              </Card>

              <Card
                className={cn(
                  "cursor-pointer hover:border-primary transition-colors",
                  contactRole === "additional-party" ? "border-primary bg-primary/5" : "",
                )}
                onClick={() => setContactRole("additional-party")}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center mb-4",
                      contactRole === "additional-party" ? "bg-primary text-primary-foreground" : "bg-muted",
                    )}
                  >
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium">Additional Party</h3>
                  <p className="text-sm text-muted-foreground text-center mt-2">A third party involved in the matter</p>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-lg font-medium mt-8 mb-4">What is the contact entity type?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card
                className={cn(
                  "cursor-pointer hover:border-primary transition-colors",
                  contactType === "person" ? "border-primary bg-primary/5" : "",
                )}
                onClick={() => {
                  setContactType("person")
                  setOrganizationType("")
                }}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center mb-4",
                      contactType === "person" ? "bg-primary text-primary-foreground" : "bg-muted",
                    )}
                  >
                    <User className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium">Person</h3>
                  <p className="text-sm text-muted-foreground text-center mt-2">An individual person</p>
                </CardContent>
              </Card>

              <Card
                className={cn(
                  "cursor-pointer hover:border-primary transition-colors",
                  contactType === "firm" ? "border-primary bg-primary/5" : "",
                )}
                onClick={() => setContactType("firm")}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center mb-4",
                      contactType === "firm" ? "bg-primary text-primary-foreground" : "bg-muted",
                    )}
                  >
                    <Building2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium">Firm/Business/Organisation</h3>
                  <p className="text-sm text-muted-foreground text-center mt-2">A company, business, or organization</p>
                </CardContent>
              </Card>
            </div>

            {contactType === "firm" && contactRole === "additional-party" && (
              <>
                <h2 className="text-lg font-medium mt-8 mb-4">What type of organization?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { id: "court", label: "Court", icon: <Gavel className="h-6 w-6" /> },
                    { id: "government", label: "Government/NGO", icon: <Building className="h-6 w-6" /> },
                    { id: "company", label: "Company", icon: <Briefcase className="h-6 w-6" /> },
                    { id: "expert", label: "Expert", icon: <Users className="h-6 w-6" /> },
                  ].map((org) => (
                    <Card
                      key={org.id}
                      className={cn(
                        "cursor-pointer hover:border-primary transition-colors",
                        organizationType === org.id ? "border-primary bg-primary/5" : "",
                      )}
                      onClick={() => setOrganizationType(org.id)}
                    >
                      <CardContent className="flex flex-col items-center justify-center p-4">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center mb-3",
                            organizationType === org.id ? "bg-primary text-primary-foreground" : "bg-muted",
                          )}
                        >
                          {org.icon}
                        </div>
                        <h3 className="font-medium">{org.label}</h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}

            {contactType === "person" && (
              <div className="mt-8">
                <h2 className="text-lg font-medium mb-4">Is this an adult or child?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card
                    className={cn(
                      "cursor-pointer hover:border-primary transition-colors",
                      personType === "adult" ? "border-primary bg-primary/5" : "",
                    )}
                    onClick={() => setPersonType("adult")}
                  >
                    <CardContent className="flex items-center p-4">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center mr-4",
                          personType === "adult" ? "bg-primary text-primary-foreground" : "bg-muted",
                        )}
                      >
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Adult</h3>
                        <p className="text-sm text-muted-foreground">Person 18 years or older</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className={cn(
                      "cursor-pointer hover:border-primary transition-colors",
                      personType === "child" ? "border-primary bg-primary/5" : "",
                    )}
                    onClick={() => setPersonType("child")}
                  >
                    <CardContent className="flex items-center p-4">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center mr-4",
                          personType === "child" ? "bg-primary text-primary-foreground" : "bg-muted",
                        )}
                      >
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Child</h3>
                        <p className="text-sm text-muted-foreground">Person under 18 years</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-end">
              <Button onClick={goToNextStep}>Continue</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <Tabs defaultValue="name-contact">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="name-contact">NAME & CONTACT DETAILS</TabsTrigger>
                  <TabsTrigger value="additional">ADDITIONAL DETAILS</TabsTrigger>
                  <TabsTrigger value="voi">VOI / EXECUTION OPTIONS</TabsTrigger>
                </TabsList>

                <TabsContent value="name-contact" className="space-y-6">
                  <div className="border-t pt-4">
                    {contactType === "person" ? (
                      personType === "adult" ? (
                        <>
                          <h3 className="text-lg font-medium mb-4">
                            {contactRole === "client"
                              ? "Client Details"
                              : contactRole === "other-side"
                                ? "Other Side"
                                : "Additional Party"}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="title">Title</Label>
                              <Select>
                                <SelectTrigger id="title">
                                  <SelectValue placeholder="Select title" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="mr">Mr</SelectItem>
                                  <SelectItem value="mrs">Mrs</SelectItem>
                                  <SelectItem value="ms">Ms</SelectItem>
                                  <SelectItem value="dr">Dr</SelectItem>
                                  <SelectItem value="prof">Prof</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="given-names">Given Name/s</Label>
                              <Input id="given-names" />
                            </div>
                            <div>
                              <Label htmlFor="last-name">Last Name</Label>
                              <Input id="last-name" />
                            </div>
                            <div>
                              <Label>Dear</Label>
                              <RadioGroup
                                value={salutation}
                                onValueChange={setSalutation}
                                className="flex space-x-4 mt-2"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="formal" id="formal" />
                                  <Label htmlFor="formal">Formal</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="informal" id="informal" />
                                  <Label htmlFor="informal">Informal</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="custom" id="custom" />
                                  <Label htmlFor="custom">Custom</Label>
                                </div>
                              </RadioGroup>
                            </div>
                            <div>
                              <Label htmlFor="home-phone">Home Phone</Label>
                              <Input id="home-phone" />
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <div className="col-span-2">
                                <Label htmlFor="work-phone">Work Phone</Label>
                                <Input id="work-phone" />
                              </div>
                              <div>
                                <Label htmlFor="extension">Ext.</Label>
                                <Input id="extension" />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="mobile">Mobile</Label>
                              <Input id="mobile" />
                            </div>
                            <div>
                              <Label htmlFor="email">Email</Label>
                              <Input id="email" type="email" />
                            </div>
                          </div>
                          <Button variant="link" className="mt-2 p-0 h-auto">
                            Add another person
                          </Button>
                        </>
                      ) : (
                        <>
                          <h3 className="text-lg font-medium mb-4">Child</h3>
                          {childContacts.map((child, index) => (
                            <div key={child.id} className={index > 0 ? "border-t pt-4 mt-4" : ""}>
                              {childContacts.length > 1 && (
                                <div className="flex justify-between items-center mb-3">
                                  <h4 className="font-medium">Child {index + 1}</h4>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeChildContact(child.id)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              )}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor={`child-title-${child.id}`}>Title</Label>
                                  <Select>
                                    <SelectTrigger id={`child-title-${child.id}`}>
                                      <SelectValue placeholder="Select title" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="master">Master</SelectItem>
                                      <SelectItem value="miss">Miss</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label htmlFor={`child-given-names-${child.id}`}>Given Name/s</Label>
                                  <Input id={`child-given-names-${child.id}`} />
                                </div>
                                <div>
                                  <Label htmlFor={`child-last-name-${child.id}`}>Last Name</Label>
                                  <Input id={`child-last-name-${child.id}`} />
                                </div>
                                <div>
                                  <Label>Dear</Label>
                                  <RadioGroup
                                    defaultValue="informal"
                                    className="flex space-x-4 mt-2"
                                    name={`child-salutation-${child.id}`}
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="formal" id={`child-formal-${child.id}`} />
                                      <Label htmlFor={`child-formal-${child.id}`}>Formal</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="informal" id={`child-informal-${child.id}`} />
                                      <Label htmlFor={`child-informal-${child.id}`}>Informal</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="custom" id={`child-custom-${child.id}`} />
                                      <Label htmlFor={`child-custom-${child.id}`}>Custom</Label>
                                    </div>
                                  </RadioGroup>
                                </div>
                                <div>
                                  <Label htmlFor={`child-home-phone-${child.id}`}>Home Phone</Label>
                                  <Input id={`child-home-phone-${child.id}`} />
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  <div className="col-span-2">
                                    <Label htmlFor={`child-work-phone-${child.id}`}>Work Phone</Label>
                                    <Input id={`child-work-phone-${child.id}`} />
                                  </div>
                                  <div>
                                    <Label htmlFor={`child-extension-${child.id}`}>Ext.</Label>
                                    <Input id={`child-extension-${child.id}`} />
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor={`child-mobile-${child.id}`}>Mobile</Label>
                                  <Input id={`child-mobile-${child.id}`} />
                                </div>
                                <div>
                                  <Label htmlFor={`child-email-${child.id}`}>Email</Label>
                                  <Input id={`child-email-${child.id}`} type="email" />
                                </div>
                              </div>
                            </div>
                          ))}
                          <Button type="button" variant="link" className="mt-2 p-0 h-auto" onClick={addChildContact}>
                            <Plus className="h-3 w-3 mr-1" /> Add another person
                          </Button>
                        </>
                      )
                    ) : (
                      <>
                        <h3 className="text-lg font-medium mb-4">
                          {contactRole === "client"
                            ? "Client Details"
                            : contactRole === "other-side"
                              ? "Other Side"
                              : `${organizationType.charAt(0).toUpperCase() + organizationType.slice(1)} Details`}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="business-name">Name</Label>
                            <Input id="business-name" />
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <Label htmlFor="abn">ABN</Label>
                              <Input id="abn" />
                            </div>
                            <div>
                              <Label htmlFor="acn-type">&nbsp;</Label>
                              <Select>
                                <SelectTrigger id="acn-type">
                                  <SelectValue placeholder="ACN/ARBN" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="acn">ACN</SelectItem>
                                  <SelectItem value="arbn">ARBN</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="acn">&nbsp;</Label>
                              <Input id="acn" />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="business-phone">Phone</Label>
                            <Input id="business-phone" />
                          </div>
                          <div>
                            <Label htmlFor="fax">Fax</Label>
                            <Input id="fax" />
                          </div>
                          <div>
                            <Label htmlFor="business-email">Email</Label>
                            <Input id="business-email" type="email" />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="mt-6">
                      {contactType === "firm" && (
                        <Tabs value={addressType} onValueChange={setAddressType} className="mb-4">
                          <TabsList>
                            <TabsTrigger value="street">Street Address</TabsTrigger>
                            <TabsTrigger value="po">PO Box Address</TabsTrigger>
                            <TabsTrigger value="dx">DX Address</TabsTrigger>
                          </TabsList>
                        </Tabs>
                      )}

                      <h3 className="text-lg font-medium mb-4">
                        {contactType === "person" ? "Residential Address" : "Address"}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="address">Address</Label>
                          <Input id="address" placeholder="Enter address" />
                        </div>
                        <div>
                          <Label htmlFor="care-of">Care of...</Label>
                          <Input id="care-of" placeholder="e.g. C/- XYZ Accounting" />
                        </div>
                        <div>
                          <Label htmlFor="building-level">Building/Level</Label>
                          <Input id="building-level" />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <Label htmlFor="unit-type">Unit Type, No.</Label>
                            <Select>
                              <SelectTrigger id="unit-type">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="unit">Unit</SelectItem>
                                <SelectItem value="apartment">Apartment</SelectItem>
                                <SelectItem value="suite">Suite</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="col-span-2">
                            <Label htmlFor="unit-number">&nbsp;</Label>
                            <Input id="unit-number" />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <Label htmlFor="street-number">Street</Label>
                            <Input id="street-number" placeholder="Number" />
                          </div>
                          <div>
                            <Label htmlFor="street-name">&nbsp;</Label>
                            <Input id="street-name" placeholder="Name" />
                          </div>
                          <div>
                            <Label htmlFor="street-type">&nbsp;</Label>
                            <Select>
                              <SelectTrigger id="street-type">
                                <SelectValue placeholder="Type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="street">Street</SelectItem>
                                <SelectItem value="road">Road</SelectItem>
                                <SelectItem value="avenue">Avenue</SelectItem>
                                <SelectItem value="boulevard">Boulevard</SelectItem>
                                <SelectItem value="drive">Drive</SelectItem>
                                <SelectItem value="crescent">Crescent</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="suburb">Suburb/Town</Label>
                          <Input id="suburb" />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <Label htmlFor="state">State, Postcode</Label>
                            <Select>
                              <SelectTrigger id="state">
                                <SelectValue placeholder="NSW" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="nsw">NSW</SelectItem>
                                <SelectItem value="vic">VIC</SelectItem>
                                <SelectItem value="qld">QLD</SelectItem>
                                <SelectItem value="wa">WA</SelectItem>
                                <SelectItem value="sa">SA</SelectItem>
                                <SelectItem value="tas">TAS</SelectItem>
                                <SelectItem value="act">ACT</SelectItem>
                                <SelectItem value="nt">NT</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="col-span-2">
                            <Label htmlFor="postcode">&nbsp;</Label>
                            <Input id="postcode" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {contactType === "firm" && (
                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-4">Contact</h3>
                        {staffMembers.map((member, index) => (
                          <div key={member.id} className="border p-4 rounded-md mb-4">
                            <div className="flex justify-between items-center mb-3">
                              <h4 className="font-medium">Staff Member {index + 1}</h4>
                              {staffMembers.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeStaffMember(member.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor={`staff-title-${member.id}`}>Title</Label>
                                <Select>
                                  <SelectTrigger id={`staff-title-${member.id}`}>
                                    <SelectValue placeholder="Select title" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="mr">Mr</SelectItem>
                                    <SelectItem value="mrs">Mrs</SelectItem>
                                    <SelectItem value="ms">Ms</SelectItem>
                                    <SelectItem value="dr">Dr</SelectItem>
                                    <SelectItem value="prof">Prof</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor={`staff-given-names-${member.id}`}>Given Name/s</Label>
                                <Input id={`staff-given-names-${member.id}`} />
                              </div>
                              <div>
                                <Label htmlFor={`staff-last-name-${member.id}`}>Last Name</Label>
                                <Input id={`staff-last-name-${member.id}`} />
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <div className="col-span-2">
                                  <Label htmlFor={`staff-work-${member.id}`}>Work</Label>
                                  <Input id={`staff-work-${member.id}`} />
                                </div>
                                <div>
                                  <Label htmlFor={`staff-ext-${member.id}`}>Ext.</Label>
                                  <Input id={`staff-ext-${member.id}`} />
                                </div>
                              </div>
                              <div>
                                <Label htmlFor={`staff-email-${member.id}`}>Email</Label>
                                <Input id={`staff-email-${member.id}`} type="email" />
                              </div>
                              <div>
                                <Label>Dear</Label>
                                <RadioGroup
                                  defaultValue="informal"
                                  className="flex space-x-4 mt-2"
                                  name={`staff-salutation-${member.id}`}
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="formal" id={`staff-formal-${member.id}`} />
                                    <Label htmlFor={`staff-formal-${member.id}`}>Formal</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="informal" id={`staff-informal-${member.id}`} />
                                    <Label htmlFor={`staff-informal-${member.id}`}>Informal</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="custom" id={`staff-custom-${member.id}`} />
                                    <Label htmlFor={`staff-custom-${member.id}`}>Custom</Label>
                                  </div>
                                </RadioGroup>
                              </div>
                              <div>
                                <Label htmlFor={`staff-role-${member.id}`}>Business Role</Label>
                                <Input id={`staff-role-${member.id}`} />
                              </div>
                            </div>
                          </div>
                        ))}
                        <Button type="button" variant="link" className="p-0 h-auto" onClick={addStaffMember}>
                          <Plus className="h-3 w-3 mr-1" /> Add another staff member
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="additional" className="space-y-6">
                  <div className="border-t pt-4">
                    {contactType === "person" ? (
                      <>
                        <h3 className="text-lg font-medium mb-4">Additional Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="birth-date">Date of Birth</Label>
                            <Input id="birth-date" type="date" />
                          </div>
                          <div>
                            <Label htmlFor="death-date">Date of Death</Label>
                            <Input id="death-date" type="date" />
                          </div>
                          <div>
                            <Label htmlFor="occupation">Occupation</Label>
                            <Input id="occupation" />
                          </div>
                          <div>
                            <Label htmlFor="employer">Employer</Label>
                            <Input id="employer" />
                          </div>
                          <div>
                            <Label htmlFor="passport-number">Passport Number</Label>
                            <Input id="passport-number" />
                          </div>
                          <div>
                            <Label htmlFor="passport-issue-date">Passport Issue Date</Label>
                            <Input id="passport-issue-date" type="date" />
                          </div>
                          <div>
                            <Label htmlFor="passport-expiry-date">Passport Expiry Date</Label>
                            <Input id="passport-expiry-date" type="date" />
                          </div>
                          <div>
                            <Label htmlFor="drivers-license">Driver's License</Label>
                            <Input id="drivers-license" />
                          </div>
                          <div>
                            <Label htmlFor="medicare-number">Medicare Number</Label>
                            <Input id="medicare-number" />
                          </div>
                          <div>
                            <Label htmlFor="tax-file-number">Tax File Number</Label>
                            <Input id="tax-file-number" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="text-lg font-medium mb-4">Additional Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="incorporation-date">Date of Incorporation</Label>
                            <Input id="incorporation-date" type="date" />
                          </div>
                          <div>
                            <Label htmlFor="business-number">Business Number</Label>
                            <Input id="business-number" />
                          </div>
                          <div>
                            <Label htmlFor="tax-number">Tax Number</Label>
                            <Input id="tax-number" />
                          </div>
                          <div>
                            <Label htmlFor="industry">Industry</Label>
                            <Input id="industry" />
                          </div>
                          <div>
                            <Label htmlFor="website">Website</Label>
                            <Input id="website" type="url" />
                          </div>
                          <div>
                            <Label htmlFor="linkedin">LinkedIn</Label>
                            <Input id="linkedin" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="voi" className="space-y-6">
                  <div className="border-t pt-4">
                    {contactType === "person" ? (
                      <>
                        <h3 className="text-lg font-medium mb-4">Verification of Identity</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="voi-date">VOI Date</Label>
                            <Input id="voi-date" type="date" />
                          </div>
                          <div>
                            <Label htmlFor="voi-method">VOI Method</Label>
                            <Select>
                              <SelectTrigger id="voi-method">
                                <SelectValue placeholder="Select method" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="face-to-face">Face to Face</SelectItem>
                                <SelectItem value="video">Video Conference</SelectItem>
                                <SelectItem value="third-party">Third Party</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="voi-notes">VOI Notes</Label>
                            <Input id="voi-notes" />
                          </div>
                          <div>
                            <Label htmlFor="poa-date">Power of Attorney Date</Label>
                            <Input id="poa-date" type="date" />
                          </div>
                          <div>
                            <Label htmlFor="poa-type">Power of Attorney Type</Label>
                            <Select>
                              <SelectTrigger id="poa-type">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="general">General</SelectItem>
                                <SelectItem value="enduring">Enduring</SelectItem>
                                <SelectItem value="limited">Limited</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="deed-packet">Deed Packet Information</Label>
                            <Input id="deed-packet" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="text-lg font-medium mb-4">Execution Options</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="director1-name">Director 1 Name</Label>
                            <Input id="director1-name" />
                          </div>
                          <div>
                            <Label htmlFor="director1-voi-date">Director 1 VOI Date</Label>
                            <Input id="director1-voi-date" type="date" />
                          </div>
                          <div>
                            <Label htmlFor="director2-name">Director 2 Name</Label>
                            <Input id="director2-name" />
                          </div>
                          <div>
                            <Label htmlFor="director2-voi-date">Director 2 VOI Date</Label>
                            <Input id="director2-voi-date" type="date" />
                          </div>
                          <div>
                            <Label htmlFor="secretary-name">Secretary Name</Label>
                            <Input id="secretary-name" />
                          </div>
                          <div>
                            <Label>Company Seal</Label>
                            <RadioGroup value={sealType} onValueChange={setSealType} className="flex space-x-4 mt-2">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="with" id="with-seal" />
                                <Label htmlFor="with-seal">With Seal</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="without" id="without-seal" />
                                <Label htmlFor="without-seal">Without Seal</Label>
                              </div>
                            </RadioGroup>
                          </div>
                          <div>
                            <Label htmlFor="deed-packet">Deed Packet Information</Label>
                            <Input id="deed-packet" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={goToPreviousStep}>
                Back
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
