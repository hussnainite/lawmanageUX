"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ChevronDown, ChevronRight, Grip, Plus, Save, Trash2 } from "lucide-react"
import Link from "next/link"
import { IntakeFormPreview } from "@/components/intake-form-preview"

export default function IntakeFormEditorPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("editor")

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Button variant="outline" size="sm" asChild className="mr-4">
          <Link href="/settings/intake-forms">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Forms
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit Intake Form</h1>
          <p className="text-muted-foreground">Customize your client intake form</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="editor" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="editor">Form Editor</TabsTrigger>
              <TabsTrigger value="settings">Form Settings</TabsTrigger>
              <TabsTrigger value="logic">Conditional Logic</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="editor">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Form Sections</h2>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" /> Add Section
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {/* Section 1 */}
                      <div className="border rounded-md">
                        <div className="flex items-center justify-between p-4 cursor-pointer bg-muted/50">
                          <div className="flex items-center">
                            <Grip className="h-5 w-5 text-muted-foreground mr-2" />
                            <span className="font-medium">Introduction</span>
                          </div>
                          <div className="flex items-center">
                            <Button variant="ghost" size="sm">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Section 2 (expanded) */}
                      <div className="border rounded-md">
                        <div className="flex items-center justify-between p-4 cursor-pointer">
                          <div className="flex items-center">
                            <Grip className="h-5 w-5 text-muted-foreground mr-2" />
                            <span className="font-medium">Other Party Details</span>
                          </div>
                          <div className="flex items-center">
                            <Button variant="ghost" size="sm">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Section 3 */}
                      <div className="border rounded-md">
                        <div className="flex items-center justify-between p-4 cursor-pointer">
                          <div className="flex items-center">
                            <Grip className="h-5 w-5 text-muted-foreground mr-2" />
                            <span className="font-medium">Relationship Details</span>
                          </div>
                          <div className="flex items-center">
                            <Button variant="ghost" size="sm">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* More sections would be listed here */}
                      <div className="border rounded-md border-dashed p-4 text-center">
                        <Button variant="outline">
                          <Plus className="mr-2 h-4 w-4" /> Add Section
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="form-name">Form Name</Label>
                      <Input id="form-name" defaultValue="Family Law Intake Form" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="form-slug">Form URL Slug</Label>
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">/intake/</span>
                        <Input id="form-slug" defaultValue="family-law-intake" className="flex-1" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        This will be used in the URL: https://lawmanage.com/intake/family-law-intake
                      </p>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label htmlFor="form-description">Form Description</Label>
                      <Textarea
                        id="form-description"
                        defaultValue="Please complete this form to provide us with information about your family law matter."
                        rows={3}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Form Settings</h3>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="save-progress">Allow Save Progress</Label>
                          <p className="text-sm text-muted-foreground">
                            Let users save their progress and return later
                          </p>
                        </div>
                        <Switch id="save-progress" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="require-login">Require Login</Label>
                          <p className="text-sm text-muted-foreground">Users must be logged in to submit the form</p>
                        </div>
                        <Switch id="require-login" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="confirmation-email">Send Confirmation Email</Label>
                          <p className="text-sm text-muted-foreground">
                            Send an email to the user after form submission
                          </p>
                        </div>
                        <Switch id="confirmation-email" defaultChecked />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label htmlFor="form-status">Form Status</Label>
                      <Select defaultValue="active">
                        <SelectTrigger id="form-status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="logic">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Conditional Logic Rules</h2>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" /> Add Rule
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {/* Rule 1 */}
                      <div className="border rounded-md p-4">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-medium">Rule 1: Show Lawyer Information</h3>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <Label>If Question</Label>
                              <Select defaultValue="other-lawyer">
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="other-lawyer">Do they have a lawyer?</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Condition</Label>
                              <Select defaultValue="equals">
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="equals">Equals</SelectItem>
                                  <SelectItem value="not-equals">Does not equal</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Value</Label>
                              <Select defaultValue="Yes">
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Yes">Yes</SelectItem>
                                  <SelectItem value="No">No</SelectItem>
                                  <SelectItem value="Unknown">Unknown</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div>
                            <Label>Then</Label>
                            <Select defaultValue="show-section">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="show-section">Show Section</SelectItem>
                                <SelectItem value="hide-section">Hide Section</SelectItem>
                                <SelectItem value="show-question">Show Question</SelectItem>
                                <SelectItem value="hide-question">Hide Question</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label>Section/Question</Label>
                            <Select defaultValue="lawyer">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="lawyer">Lawyer Information</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      {/* Rule 2 */}
                      <div className="border rounded-md p-4">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-medium">Rule 2: Show Children Details</h3>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <Label>If Question</Label>
                              <Select defaultValue="has-children">
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="has-children">Are there children of your relationship?</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Condition</Label>
                              <Select defaultValue="equals">
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="equals">Equals</SelectItem>
                                  <SelectItem value="not-equals">Does not equal</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Value</Label>
                              <Select defaultValue="Yes">
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Yes">Yes</SelectItem>
                                  <SelectItem value="No">No</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div>
                            <Label>Then</Label>
                            <Select defaultValue="show-section">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="show-section">Show Section</SelectItem>
                                <SelectItem value="hide-section">Hide Section</SelectItem>
                                <SelectItem value="show-question">Show Question</SelectItem>
                                <SelectItem value="hide-question">Hide Question</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label>Section/Question</Label>
                            <Select defaultValue="children">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="children">Children</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      {/* Add more rules button */}
                      <div className="border rounded-md border-dashed p-4 text-center">
                        <Button variant="outline">
                          <Plus className="mr-2 h-4 w-4" /> Add Rule
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium">Admin Notifications</h3>
                          <p className="text-sm text-muted-foreground">
                            Notifications sent to administrators when a form is submitted
                          </p>
                        </div>
                        <Switch id="admin-notifications" defaultChecked />
                      </div>

                      <div className="space-y-2 mt-4">
                        <Label htmlFor="admin-emails">Admin Email Addresses</Label>
                        <Textarea
                          id="admin-emails"
                          placeholder="Enter email addresses, one per line"
                          defaultValue="admin@lawmanage.com&#10;reception@amandalittleassociates.com.au"
                          rows={3}
                        />
                        <p className="text-sm text-muted-foreground">
                          Enter one email address per line. These addresses will receive notifications.
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium">User Confirmation Email</h3>
                          <p className="text-sm text-muted-foreground">Email sent to the user after form submission</p>
                        </div>
                        <Switch id="user-confirmation" defaultChecked />
                      </div>

                      <div className="space-y-2 mt-4">
                        <Label htmlFor="email-subject">Email Subject</Label>
                        <Input id="email-subject" defaultValue="Thank you for your Family Law Intake Form submission" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email-template">Email Template</Label>
                        <Textarea
                          id="email-template"
                          defaultValue="Dear {{name}},

Thank you for submitting your Family Law Intake Form. We have received your information and will be in touch shortly to confirm your appointment.

Your appointment details:
Date: {{appointment_date}}
Office: {{office_location}}

If you need to make any changes to your appointment, please contact us at reception@amandalittleassociates.com.au or call our office.

Best regards,
Amanda Little & Associates"
                          rows={10}
                        />
                        <p className="text-sm text-muted-foreground">
                          Use {{ field_name }} to insert form field values into the email.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-end">
            <Button variant="outline" className="mr-2">
              Cancel
            </Button>
            <Button>
              <Save className="mr-2 h-4 w-4" /> Save Form
            </Button>
          </div>
        </div>

        <div>
          <div className="sticky top-6">
            <h2 className="text-xl font-bold mb-4">Form Preview</h2>
            <IntakeFormPreview />
          </div>
        </div>
      </div>
    </div>
  )
}
