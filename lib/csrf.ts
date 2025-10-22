/**
 * CSRF Protection Utilities
 *
 * Implements token-based CSRF protection for API routes.
 * Uses double-submit cookie pattern with secure, httpOnly cookies.
 */

import Tokens from 'csrf';
import { cookies } from 'next/headers';

const tokens = new Tokens();
const CSRF_SECRET_COOKIE = '__Host-csrf-secret';
const CSRF_TOKEN_HEADER = 'x-csrf-token';

/**
 * Generate a new CSRF token and secret
 */
export async function generateCsrfToken(): Promise<string> {
  const secret = tokens.secretSync();
  const token = tokens.create(secret);

  // Store secret in httpOnly cookie
  const cookieStore = await cookies();
  cookieStore.set(CSRF_SECRET_COOKIE, secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });

  return token;
}

/**
 * Validate CSRF token from request
 */
export async function validateCsrfToken(token: string | null): Promise<boolean> {
  if (!token) {
    return false;
  }

  const cookieStore = await cookies();
  const secret = cookieStore.get(CSRF_SECRET_COOKIE)?.value;

  if (!secret) {
    return false;
  }

  return tokens.verify(secret, token);
}

/**
 * Get CSRF token from request headers
 */
export function getCsrfTokenFromHeaders(headers: Headers): string | null {
  return headers.get(CSRF_TOKEN_HEADER);
}

export { CSRF_TOKEN_HEADER };
