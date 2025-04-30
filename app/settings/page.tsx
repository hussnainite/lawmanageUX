import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Manage your general application settings</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Configure your application settings here. Use the navigation on the left to access different settings
            sections.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
