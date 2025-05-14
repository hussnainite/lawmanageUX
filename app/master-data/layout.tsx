"use client"

import type React from "react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Briefcase, FileText, Calendar, Building, Home, Tag, Shield } from "lucide-react"

export default function MasterDataLayout({
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
              <h1 className="text-3xl font-bold">Master Data</h1>
              <p className="text-muted-foreground">Manage dropdown values used throughout the application</p>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <aside className="w-full md:w-72 shrink-0">
                <MasterDataNav />
              </aside>
              <div className="flex-1">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function MasterDataNav() {
  const pathname = usePathname()

  const navGroups = [
    {
      title: "Matter Data",
      icon: <Briefcase className="h-5 w-5 mr-2" />,
      items: [
        { name: "Matter Types", href: "/master-data/matter-types" },
        { name: "Matter Status", href: "/master-data/matter-status" },
        { name: "Jurisdiction Types", href: "/master-data/jurisdiction-types" },
      ],
    },
    {
      title: "Document Data",
      icon: <FileText className="h-5 w-5 mr-2" />,
      items: [
        { name: "Document Types", href: "/master-data/document-types" },
        { name: "Document Status", href: "/master-data/document-status" },
      ],
    },
    {
      title: "Hearing Data",
      icon: <Calendar className="h-5 w-5 mr-2" />,
      items: [
        { name: "Hearing Types", href: "/master-data/hearing-types" },
        { name: "Courts", href: "/master-data/courts" },
      ],
    },
    {
      title: "Address Data",
      icon: <Home className="h-5 w-5 mr-2" />,
      items: [
        { name: "Unit Types", href: "/master-data/unit-types" },
        { name: "Street Types", href: "/master-data/street-types" },
        { name: "Tenancy Types", href: "/master-data/tenancy-types" },
      ],
    },
    {
      title: "Organization Data",
      icon: <Building className="h-5 w-5 mr-2" />,
      items: [
        { name: "Institution List", href: "/master-data/institution-list" },
        { name: "Business Types", href: "/master-data/business-types" },
      ],
    },
    {
      title: "Insurance Data",
      icon: <Shield className="h-5 w-5 mr-2" />,
      items: [{ name: "Policy Types", href: "/master-data/policy-types" }],
    },
    {
      title: "Contact Data",
      icon: <Tag className="h-5 w-5 mr-2" />,
      items: [{ name: "Contact Tags", href: "/master-data/contact-tags" }],
    },
  ]

  return (
    <div className="space-y-6">
      {navGroups.map((group) => (
        <div key={group.title} className="space-y-2">
          <div className="flex items-center px-3 text-sm font-semibold text-gray-900">
            {group.icon}
            {group.title}
          </div>
          <nav className="space-y-1">
            {group.items.map((item) => {
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block pl-10 pr-3 py-2 rounded-md text-sm font-medium ${
                    isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      ))}
    </div>
  )
}
