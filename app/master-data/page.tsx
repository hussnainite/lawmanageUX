import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database } from "lucide-react"

export default function MasterDataPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Master Data Management</CardTitle>
          <CardDescription>Manage dropdown values and reference data used throughout the application</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40 text-gray-500">
            <div className="text-center">
              <Database className="mx-auto h-12 w-12 mb-4" />
              <p>Select a category from the sidebar to manage master data</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
