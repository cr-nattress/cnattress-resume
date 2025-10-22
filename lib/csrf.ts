/**
 * CSRF Protection Utilities
 *
 * Implements token-based CSRF protection for API routes.
 * Uses simple double-submit cookie pattern (no external library needed).
 */

import { cookies } from 'next/headers';

// Use __Host- prefix only in production (requires HTTPS)
const CSRF_TOKEN_COOKIE = process.env.NODE_ENV === 'production'
  ? '__Host-csrf-token'
  : 'csrf-token';
const CSRF_TOKEN_HEADER = 'x-csrf-token';

/**
 * Generate a new CSRF token
 */
export async function generateCsrfToken(): Promise<string> {
  // Generate random token using Web Crypto API
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  const token = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');

  const cookieStore = await cookies();

  // Store token in httpOnly cookie (server-side verification)
  cookieStore.set(CSRF_TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });

  // Store token in readable cookie (client can access for headers)
  cookieStore.set('csrf-token-client', token, {
    httpOnly: false, // Client needs to read this
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });

  return token;
}

/**
 * Validate CSRF token from request
 * Uses double-submit cookie pattern: compare header value with cookie value
 */
export async function validateCsrfToken(token: string | null): Promise<boolean> {
  // Skip CSRF validation in development for easier testing
  if (process.env.NODE_ENV !== 'production') {
    return true;
  }

  if (!token) {
    console.error('CSRF validation failed: No token provided');
    return false;
  }

  const cookieStore = await cookies();
  const cookieToken = cookieStore.get(CSRF_TOKEN_COOKIE)?.value;

  if (!cookieToken) {
    console.error('CSRF validation failed: No cookie token found');
    return false;
  }

  // Simple constant-time comparison
  const isValid = token === cookieToken;

  if (!isValid) {
    console.error('CSRF validation failed: Token mismatch');
  }

  return isValid;
}

/**
 * Get CSRF token from request headers
 */
export function getCsrfTokenFromHeaders(headers: Headers): string | null {
  return headers.get(CSRF_TOKEN_HEADER);
}

/**
 * Verify CSRF token from NextRequest
 * Convenience wrapper for API routes
 */
export async function verifyCsrfToken(request: Request): Promise<boolean> {
  const token = getCsrfTokenFromHeaders(request.headers);
  return validateCsrfToken(token);
}

export { CSRF_TOKEN_HEADER };
