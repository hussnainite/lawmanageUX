import { Search, User } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function Header() {
  return (
    <header className="border-b bg-white px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="relative w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input placeholder="Search matters, contacts, documents..." className="pl-8" />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-5 w-5 text-gray-500" />
            </div>
            <span className="text-sm font-medium">Sarah Johnson</span>
          </div>
        </div>
      </div>
    </header>
  )
}
