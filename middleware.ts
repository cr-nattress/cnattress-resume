/**
 * Next.js Middleware
 *
 * Sets CSRF tokens on every request to ensure client components
 * have access to tokens before making API calls.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Use __Host- prefix only in production (requires HTTPS)
const CSRF_SECRET_COOKIE = process.env.NODE_ENV === 'production'
  ? '__Host-csrf-secret'
  : 'csrf-secret';

/**
 * Generate a random token using crypto (Edge Runtime compatible)
 */
function generateRandomToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Create a hash of the secret and token (Edge Runtime compatible)
 */
async function createTokenHash(secret: string, token: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(secret + token);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Check if CSRF token already exists
  const existingSecret = request.cookies.get(CSRF_SECRET_COOKIE)?.value;
  const existingToken = request.cookies.get('csrf-token')?.value;

  // Only generate new token if it doesn't exist
  if (!existingSecret || !existingToken) {
    const secret = generateRandomToken();
    const token = generateRandomToken();

    // Set secret cookie (httpOnly, server-side only)
    response.cookies.set(CSRF_SECRET_COOKIE, secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    // Set token cookie (readable by client)
    response.cookies.set('csrf-token', token, {
      httpOnly: false, // Client needs to read this
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });
  }

  return response;
}

// Only run middleware on page routes (not API routes or static files)
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
};
