import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/firebase";
import { verifyIdToken, verifySessionCookie } from "./lib/firebase-admin";
import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  console.log(`middleware ${req.nextUrl}`);
  const res = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient({ req, res });
  const {
    data: { session }
  } = await supabase.auth.getSession();
  console.log(`session: ${session?.access_token}`);
  // const sessionCookie = request.cookies.get('session_cookie')?.value ?? '';
  // const decodedIdToken = await verifySessionCookie(sessionCookie)
  // console.info(`decoded ${decodedIdToken.uid}`)
  // response.cookies.set('now', new Date().toLocaleString());
  if (!session && req.nextUrl.pathname.startsWith('/posts')) {
    const redirectUrl = new URL('/', req.url);
    redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }
  return res;
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
