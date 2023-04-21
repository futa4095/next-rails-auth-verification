import { createSessionCookie, verifyIdToken } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log(`POST /login`);
  const res = NextResponse.next();
  const idToken = (request.headers.get('Authorization') ?? '').split(' ')[1]
  // console.log(idToken);
  const decodedIdToken = await verifyIdToken(idToken);
  console.info(`uid=${decodedIdToken.uid}`);
  const sessionCookie = await createSessionCookie(idToken);
  console.log(`sessionCookie: ${sessionCookie}`);
  // res.cookies.set('session', sessionCookie);
  const headers = new Headers();
  headers.set('Set-Cookie', `session_cookie=${sessionCookie}; HttpOnly; Path=/`)
  return NextResponse.json({ status : 'success'}, {
    headers
  });
}
