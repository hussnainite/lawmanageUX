"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Copy, Download, ExternalLink, Plus, QrCode, Share2 } from "lucide-react"
import Link from "next/link"

// Mock data for intake forms
const mockForms = [
  {
    id: "family-law",
    name: "Family Law Intake Form",
    slug: "family-law-intake",
    status: "active",
    submissions: 24,
    lastUpdated: "2023-05-15T10:30:00Z",
  },
  {
    id: "criminal-law",
    name: "Criminal Law Intake Form",
    slug: "criminal-law-intake",
    status: "draft",
    submissions: 0,
    lastUpdated: "2023-05-10T14:20:00Z",
  },
  {
    id: "property-law",
    name: "Property Law Intake Form",
    slug: "property-law-intake",
    status: "archived",
    submissions: 12,
    lastUpdated: "2023-04-22T09:15:00Z",
  },
]

export default function IntakeFormsPage() {
  const [activeTab, setActiveTab] = useState("active")
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [selectedForm, setSelectedForm] = useState<any>(null)

  const filteredForms = mockForms.filter((form) => {
    if (activeTab === "active") return form.status === "active"
    if (activeTab === "draft") return form.status === "draft"
    if (activeTab === "archived") return form.status === "archived"
    return true
  })

  const handleShare = (form: any) => {
    setSelectedForm(form)
    setShareDialogOpen(true)
  }

  const formattedDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Intake Forms</h1>
          <p className="text-muted-foreground">Manage your client intake forms</p>
        </div>
      </div>

      <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {filteredForms.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">No active forms found</p>
                <Button variant="outline" className="mt-4">
                  <Plus className="mr-2 h-4 w-4" /> Create New Form
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredForms.map((form) => (
              <Card key={form.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{form.name}</CardTitle>
                      <CardDescription>Last updated: {formattedDate(form.lastUpdated)}</CardDescription>
                    </div>
                    <Badge>{form.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm">
                    <span className="text-muted-foreground">Submissions:</span>
                    <span className="ml-1 font-medium">{form.submissions}</span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-muted-foreground">Public URL:</span>
                    <span className="ml-1 font-medium truncate max-w-[200px]">/intake/{form.slug}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/intake/${form.slug}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Open Public Form
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleShare(form)}>
                    <Share2 className="mr-2 h-4 w-4" /> Share
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="draft" className="space-y-4">
          {filteredForms.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">No draft forms found</p>
                <Button variant="outline" className="mt-4">
                  <Plus className="mr-2 h-4 w-4" /> Create New Form
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredForms.map((form) => (
              <Card key={form.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{form.name}</CardTitle>
                      <CardDescription>Last updated: {formattedDate(form.lastUpdated)}</CardDescription>
                    </div>
                    <Badge variant="outline">{form.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm">
                    <span className="text-muted-foreground">Submissions:</span>
                    <span className="ml-1 font-medium">{form.submissions}</span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-muted-foreground">Public URL:</span>
                    <span className="ml-1 font-medium truncate max-w-[200px]">/intake/{form.slug}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/intake/${form.slug}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Open Public Form
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleShare(form)}>
                    <Share2 className="mr-2 h-4 w-4" /> Share
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="archived" className="space-y-4">
          {filteredForms.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">No archived forms found</p>
              </CardContent>
            </Card>
          ) : (
            filteredForms.map((form) => (
              <Card key={form.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{form.name}</CardTitle>
                      <CardDescription>Last updated: {formattedDate(form.lastUpdated)}</CardDescription>
                    </div>
                    <Badge variant="secondary">{form.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm">
                    <span className="text-muted-foreground">Submissions:</span>
                    <span className="ml-1 font-medium">{form.submissions}</span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-muted-foreground">Public URL:</span>
                    <span className="ml-1 font-medium truncate max-w-[200px]">/intake/{form.slug}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/intake/${form.slug}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Open Public Form
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleShare(form)}>
                    <Share2 className="mr-2 h-4 w-4" /> Share
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Intake Form</DialogTitle>
            <DialogDescription>Share this form with clients via direct link, embed code, or QR code.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="share-link">Direct Link</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="share-link"
                  value={selectedForm ? `https://lawmanage.com/intake/${selectedForm.slug}` : ""}
                  readOnly
                />
                <Button size="sm" variant="outline">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                This link opens the public form that clients can access without logging in.
              </p>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>Embed Code</Label>
              <div className="bg-muted p-3 rounded-md text-xs overflow-x-auto">
                <code>
                  {selectedForm
                    ? `<iframe src="https://lawmanage.com/intake/${selectedForm.slug}" width="100%" height="600" frameborder="0"></iframe>`
                    : ""}
                </code>
              </div>
              <Button size="sm" variant="outline" className="mt-2">
                <Copy className="h-4 w-4 mr-2" /> Copy Code
              </Button>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>QR Code</Label>
              <div className="flex justify-center p-4 bg-white rounded-md">
                <QrCode size={150} />
              </div>
              <Button size="sm" variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" /> Download QR Code
              </Button>
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button type="button" variant="secondary" onClick={() => setShareDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
