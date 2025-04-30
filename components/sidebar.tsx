"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Briefcase, Users, Settings, Home } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Matters", href: "/matters", icon: Briefcase },
  { name: "Contacts", href: "/contacts", icon: Users },
  // { name: "Documents", href: "/documents", icon: FileText },
  // { name: "Court Hearings", href: "/hearings", icon: Calendar },
  // { name: "Reports", href: "/reports", icon: BarChart },
  // { name: "Time & Billing", href: "/billing", icon: Clock },
]

const secondaryNavigation = [{ name: "Settings", href: "/settings", icon: Settings }]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 bg-gray-800 text-white">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Law Manage</h1>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = item.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(item.href)

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                )}
              >
                <item.icon
                  className={cn(isActive ? "text-white" : "text-gray-400 group-hover:text-white", "mr-3 h-5 w-5")}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Support</h3>
          <nav className="mt-2 px-2 space-y-1">
            {secondaryNavigation.map((item) => {
              const isActive = pathname.startsWith(item.href)

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                  )}
                >
                  <item.icon
                    className={cn(isActive ? "text-white" : "text-gray-400 group-hover:text-white", "mr-3 h-5 w-5")}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}
