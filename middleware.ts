import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// We don't need any special middleware logic anymore
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
