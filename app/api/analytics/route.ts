/**
 * Analytics API Route
 *
 * Handles visitor analytics tracking including page views, interactions, and project views.
 * All data is stored anonymously in Supabase for privacy.
 *
 * @route POST /api/analytics
 */

import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { analytics } from '@/lib/supabase/client';
import { AnalyticsEventSchema } from '@/lib/schemas/analytics.schema';
import { validateCsrfToken, getCsrfTokenFromHeaders } from '@/lib/csrf';

// Rate limiting
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 60;

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const requests = rateLimitMap.get(identifier) || [];
  const validRequests = requests.filter(time => now - time < RATE_LIMIT_WINDOW_MS);

  if (validRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  validRequests.push(now);
  rateLimitMap.set(identifier, validRequests);
  return true;
}

/**
 * POST handler for analytics tracking
 */
export async function POST(req: NextRequest): Promise<Response> {
  try {
    // Rate limiting
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    // CSRF Protection
    const csrfToken = getCsrfTokenFromHeaders(req.headers);
    const isValidCsrf = await validateCsrfToken(csrfToken);

    if (!isValidCsrf) {
      return NextResponse.json(
        { error: 'Invalid or missing CSRF token' },
        { status: 403 }
      );
    }

    // Parse and validate request body with Zod
    const body = await req.json();
    const validatedData = AnalyticsEventSchema.parse(body);

    // Handle different analytics types
    let result;

    switch (validatedData.type) {
      case 'visitor':
        result = await analytics.trackVisitor(validatedData.data);
        break;

      case 'project_view':
        result = await analytics.trackProjectView(validatedData.data);
        break;

      default:
        // Exhaustiveness check - TypeScript ensures all cases are handled
        // @ts-expect-error - intentionally unused for exhaustiveness checking
        const _exhaustive: never = validatedData;
        return NextResponse.json(
          { error: `Unknown analytics type` },
          { status: 400 }
        );
    }

    if (!result.success) {
      console.error('Analytics error:', result.error);
      return NextResponse.json(
        { error: 'Failed to track analytics' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Analytics API error:', error);

    // Handle Zod validation errors
    if (error instanceof ZodError) {
      // Type assertion needed due to catch clause typing
      const zodError = error as any;
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: zodError.errors.map((e: any) => ({
            field: e.path.join('.'),
            message: e.message,
            code: e.code
          }))
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET handler - retrieve analytics (admin only)
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Check for admin access key
    const authHeader = req.headers.get('authorization');
    const adminKey = process.env.ADMIN_ACCESS_KEY;

    if (!adminKey || authHeader !== `Bearer ${adminKey}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'conversations';

    let data;

    switch (type) {
      case 'conversations':
        data = await analytics.getConversationStats();
        break;

      case 'sections':
        data = await analytics.getPopularSections();
        break;

      default:
        return NextResponse.json(
          { error: `Unknown analytics type: ${type}` },
          { status: 400 }
        );
    }

    if (!data.success) {
      return NextResponse.json(
        { error: 'Failed to fetch analytics' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: data.data });

  } catch (error) {
    console.error('Analytics GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
