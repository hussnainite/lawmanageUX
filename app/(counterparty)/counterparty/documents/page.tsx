import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, FileText, MessageSquare, Search } from "lucide-react"

export default function CounterpartyDocumentsPage() {
  // This would be fetched from an API in a real implementation
  const documents = [
    {
      id: "doc-1",
      title: "Settlement Agreement - Draft",
      date: "2023-04-15T10:30:00Z",
      status: "Pending Review",
      comments: 3,
      category: "Agreements",
    },
    {
      id: "doc-2",
      title: "Financial Disclosure Form",
      date: "2023-04-12T14:45:00Z",
      status: "Awaiting Signature",
      comments: 0,
      category: "Forms",
    },
    {
      id: "doc-3",
      title: "Custody Arrangement Proposal",
      date: "2023-04-10T09:15:00Z",
      status: "Under Review",
      comments: 5,
      category: "Proposals",
    },
    {
      id: "doc-4",
      title: "Mediation Summary",
      date: "2023-04-05T11:20:00Z",
      status: "Reviewed",
      comments: 2,
      category: "Summaries",
    },
    {
      id: "doc-5",
      title: "Property Division Agreement",
      date: "2023-04-01T16:00:00Z",
      status: "Approved",
      comments: 7,
      category: "Agreements",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shared Documents</h1>
          <p className="text-muted-foreground mt-1">View and manage documents shared with you</p>
        </div>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search documents..." className="pl-8" />
            </div>
            <div className="flex gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="awaiting">Awaiting Signature</SelectItem>
                  <SelectItem value="review">Under Review</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="agreements">Agreements</SelectItem>
                  <SelectItem value="forms">Forms</SelectItem>
                  <SelectItem value="proposals">Proposals</SelectItem>
                  <SelectItem value="summaries">Summaries</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {documents.map((doc) => (
          <Card key={doc.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between p-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <Link href={`/counterparty/documents/${doc.id}`} className="font-medium text-lg hover:underline">
                    {doc.title}
                  </Link>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{new Date(doc.date).toLocaleDateString()}</span>
                  </div>
                  <div>Category: {doc.category}</div>
                  {doc.comments > 0 && (
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>{doc.comments} comments</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <Badge
                  variant={
                    doc.status === "Pending Review"
                      ? "outline"
                      : doc.status === "Awaiting Signature"
                        ? "secondary"
                        : doc.status === "Under Review"
                          ? "default"
                          : doc.status === "Reviewed"
                            ? "success"
                            : "success"
                  }
                >
                  {doc.status}
                </Badge>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/counterparty/documents/${doc.id}`}>View Document</Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
