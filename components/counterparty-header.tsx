"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function CounterpartyHeader() {
  const pathname = usePathname()

  // This would be replaced with actual auth logic
  const isLoggedIn = pathname !== "/counterparty/login"

  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/counterparty/dashboard" className="flex items-center gap-2">
              <span className="text-xl font-bold">Counterparty Portal</span>
            </Link>

            {isLoggedIn && (
              <nav className="hidden md:flex gap-6">
                <Link
                  href="/counterparty/dashboard"
                  className={`text-sm font-medium transition-colors ${
                    pathname === "/counterparty/dashboard" ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/counterparty/documents"
                  className={`text-sm font-medium transition-colors ${
                    pathname.startsWith("/counterparty/documents")
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  Documents
                </Link>
              </nav>
            )}
          </div>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/counterparty/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/counterparty/login">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button asChild>
              <Link href="/counterparty/login">Log in</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
