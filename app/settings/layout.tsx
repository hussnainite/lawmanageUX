"use client"

import type React from "react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="container mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground">Manage your application settings</p>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <aside className="w-full md:w-64 shrink-0">
                <SettingsNav />
              </aside>
              <div className="flex-1">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function SettingsNav() {
  const pathname = usePathname()

  const navItems = [
    { name: "General", href: "/settings" },
    { name: "Intake Forms", href: "/settings/intake-forms" },
    { name: "Users", href: "/settings/users" },
    { name: "Billing", href: "/settings/billing" },
  ]

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const isActive = item.href === "/settings" ? pathname === "/settings" : pathname.startsWith(item.href)

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`block px-3 py-2 rounded-md text-sm font-medium ${
              isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}
