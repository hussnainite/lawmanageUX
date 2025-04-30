import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CounterpartyLoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Counterparty Portal</h1>
          <p className="text-gray-500 mt-2">Secure document sharing and collaboration</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="space-y-2 text-center mb-6">
            <h2 className="text-2xl font-semibold">Sign in to your account</h2>
            <p className="text-sm text-gray-500">Enter your credentials to access shared documents</p>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/counterparty/forgot-password" className="text-xs text-gray-500 hover:text-gray-800">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" />
            </div>

            <Button className="w-full" asChild>
              <Link href="/counterparty/dashboard">Sign in</Link>
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-500">
              Don't have an account?{" "}
              <span className="text-gray-800 font-medium">Contact your legal representative for access</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
