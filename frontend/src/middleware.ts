import type { NextRequest } from "next/server";
import { auth } from "./lib/firebase";

export function middleware(request: NextRequest) {
  console.log(`middleware ${request.nextUrl} ${auth().currentUser ? "logged in": "not login"}`);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
