import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function MatterChronologyLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-6 w-16" />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <Skeleton className="h-6 w-48" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-9 w-[180px]" />
            <Skeleton className="h-9 w-32" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[1, 2].map((date) => (
              <div key={date} className="space-y-4">
                <Skeleton className="h-5 w-24" />
                <div className="space-y-4">
                  {[1, 2, 3].map((entry) => (
                    <div key={entry} className="relative pl-14">
                      <Skeleton className="absolute left-0 top-0 h-10 w-10 rounded-full" />
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Skeleton className="h-5 w-40" />
                            <Skeleton className="h-4 w-16" />
                          </div>
                          <Skeleton className="h-7 w-16" />
                        </div>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
