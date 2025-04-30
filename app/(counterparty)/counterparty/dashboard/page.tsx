import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, FileText, MessageSquare } from "lucide-react"

export default function CounterpartyDashboardPage() {
  // This would be fetched from an API in a real implementation
  const recentDocuments = [
    {
      id: "doc-1",
      title: "Settlement Agreement - Draft",
      date: "2023-04-15T10:30:00Z",
      status: "Pending Review",
      comments: 3,
    },
    {
      id: "doc-2",
      title: "Financial Disclosure Form",
      date: "2023-04-12T14:45:00Z",
      status: "Awaiting Signature",
      comments: 0,
    },
    {
      id: "doc-3",
      title: "Custody Arrangement Proposal",
      date: "2023-04-10T09:15:00Z",
      status: "Under Review",
      comments: 5,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground mt-1">View and manage your shared legal documents</p>
        </div>
        <Button asChild>
          <Link href="/counterparty/documents">View All Documents</Link>
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
            <CardDescription>Documents shared with you that require attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <Link href={`/counterparty/documents/${doc.id}`} className="font-medium hover:underline">
                        {doc.title}
                      </Link>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{new Date(doc.date).toLocaleDateString()}</span>
                      </div>
                      {doc.comments > 0 && (
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span>{doc.comments} comments</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant={
                        doc.status === "Pending Review"
                          ? "outline"
                          : doc.status === "Awaiting Signature"
                            ? "secondary"
                            : "default"
                      }
                    >
                      {doc.status}
                    </Badge>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/counterparty/documents/${doc.id}`}>View</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
