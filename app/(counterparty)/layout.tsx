import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CounterpartyHeader } from "@/components/counterparty-header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Counterparty Portal - Law Manage",
  description: "Secure document sharing and collaboration for external parties",
}

export default function CounterpartyLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={inter.className}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <div className="min-h-screen flex flex-col">
          <CounterpartyHeader />
          <main className="flex-1">{children}</main>
          <footer className="py-6 border-t">
            <div className="container mx-auto px-4">
              <p className="text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Law Manage. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </ThemeProvider>
    </div>
  )
}
