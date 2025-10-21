/**
 * Claude AI Chat API Route
 *
 * This endpoint handles chat requests to Claude AI with streaming responses.
 * It includes resume context, conversation logging, and rate limiting.
 *
 * @route POST /api/chat
 */

import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { getSystemPrompt } from '@/lib/ai/resume-context';
import { analytics } from '@/lib/supabase/client';

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

// Configuration
const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514';
const MAX_TOKENS = 2048;

// Rate limiting (simple in-memory implementation)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100');

/**
 * Simple rate limiting check
 */
function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const requests = rateLimitMap.get(identifier) || [];

  // Remove old requests outside the window
  const validRequests = requests.filter(time => now - time < RATE_LIMIT_WINDOW_MS);

  if (validRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    return false; // Rate limit exceeded
  }

  // Add current request
  validRequests.push(now);
  rateLimitMap.set(identifier, validRequests);

  return true; // Within rate limit
}

/**
 * POST handler for chat messages
 */
export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    // Validate API key
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'Anthropic API key not configured' },
        { status: 500 }
      );
    }

    // Parse request body
    const body = await req.json();
    const { messages, sessionId } = body;

    // Validate request
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Rate limiting
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const rateLimitId = `${clientIp}:${sessionId}`;

    if (!checkRateLimit(rateLimitId)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    // Get the last user message for logging
    const lastUserMessage = messages[messages.length - 1];
    if (!lastUserMessage || lastUserMessage.role !== 'user') {
      return NextResponse.json(
        { error: 'Last message must be from user' },
        { status: 400 }
      );
    }

    // Create streaming response
    const stream = await anthropic.messages.stream({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: getSystemPrompt(),
      messages: messages
    });

    // Collect the full response for logging
    let fullResponse = '';

    // Create a ReadableStream for the response
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          // Stream the response
          for await (const chunk of stream) {
            if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
              const text = chunk.delta.text;
              fullResponse += text;

              // Send chunk to client
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
            }
          }

          // Send completion signal
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();

          // Log conversation to Supabase (async, don't block response)
          const responseTime = Date.now() - startTime;
          analytics.logConversation({
            session_id: sessionId,
            message: lastUserMessage.content,
            response: fullResponse,
            context: {
              model: MODEL,
              message_count: messages.length
            },
            response_time_ms: responseTime
          }).catch(error => {
            console.error('Failed to log conversation:', error);
          });

        } catch (error) {
          console.error('Streaming error:', error);
          controller.error(error);
        }
      }
    });

    // Return streaming response
    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Chat API error:', error);

    // Handle specific Anthropic errors
    if (error instanceof Anthropic.APIError) {
      return NextResponse.json(
        {
          error: 'AI service error',
          message: error.message,
          status: error.status
        },
        { status: error.status || 500 }
      );
    }

    // Generic error
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET handler - return API info
 */
export async function GET() {
  return NextResponse.json({
    service: 'Chris Nattress Portfolio - AI Chat API',
    status: 'operational',
    model: MODEL,
    endpoints: {
      POST: 'Send a message to the AI chatbot'
    }
  });
}
