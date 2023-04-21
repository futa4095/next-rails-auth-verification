import { apps } from 'firebase-admin';
import { initializeApp, cert, ServiceAccount, getApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const serviceAccount: ServiceAccount = {
  projectId: "next-rails-proto5959",
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY!.replace(
    /\\n/g,
    '\n'
  )
};

const app = apps[0] || initializeApp({
  credential: cert(serviceAccount)
});

export async function verifyIdToken(idToken: string) {
  return getAuth().verifyIdToken(idToken);
}

export async function createSessionCookie(idToken: string) {
  const expiresIn = 5 * 60 * 60 * 24 * 1000;
  return getAuth().createSessionCookie(idToken, { expiresIn })
}

export async function verifySessionCookie(sessionCookie: string) {
  return getAuth().verifySessionCookie(sessionCookie);
}
