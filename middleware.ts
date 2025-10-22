/**
 * Next.js Middleware
 *
 * Sets CSRF tokens on every request to ensure client components
 * have access to tokens before making API calls.
 *
 * Uses simple double-submit cookie pattern (Edge Runtime compatible)
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Use __Host- prefix only in production (requires HTTPS)
const CSRF_TOKEN_COOKIE = process.env.NODE_ENV === 'production'
  ? '__Host-csrf-token'
  : 'csrf-token';

/**
 * Generate a random token using crypto (Edge Runtime compatible)
 */
function generateRandomToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Check if CSRF token already exists
  const existingToken = request.cookies.get(CSRF_TOKEN_COOKIE)?.value;

  // Only generate new token if it doesn't exist
  if (!existingToken) {
    const token = generateRandomToken();

    // Set token cookie (httpOnly for server, but also readable by client for header)
    // Using two cookies: one httpOnly for verification, one readable for sending
    response.cookies.set(CSRF_TOKEN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    // Set readable token cookie (client needs to read this for headers)
    response.cookies.set('csrf-token-client', token, {
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
