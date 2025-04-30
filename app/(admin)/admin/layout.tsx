import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Admin Portal - Law Manage",
  description: "Manage counterparty portal users and documents",
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={inter.className}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <div className="min-h-screen flex flex-col">
          <AdminHeader />
          <div className="flex-1 flex">
            <AdminSidebar />
            <main className="flex-1 p-6">{children}</main>
          </div>
        </div>
      </ThemeProvider>
    </div>
  )
}
