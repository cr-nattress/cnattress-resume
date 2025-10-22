/**
 * CSRF Token API Endpoint
 *
 * Generates and returns a CSRF token for client-side requests.
 * The secret is stored in an httpOnly cookie.
 */

import { NextResponse } from 'next/server';
import { generateCsrfToken } from '@/lib/csrf';

export async function GET(): Promise<Response> {
  try {
    const token = await generateCsrfToken();

    return NextResponse.json({
      csrfToken: token,
    });
  } catch (error) {
    console.error('CSRF token generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    );
  }
}
