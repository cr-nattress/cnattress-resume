import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { verifyCsrfToken } from '@/lib/csrf';
import { z } from 'zod';

// Request validation schema
const SuggestMessageSchema = z.object({
  context: z.enum(['general', 'job-opportunity', 'collaboration', 'question']).optional().default('general'),
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Validate API key
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'Anthropic API key not configured' },
        { status: 500 }
      );
    }

    // Verify CSRF token
    const isValidCsrf = await verifyCsrfToken(req);
    if (!isValidCsrf) {
      return NextResponse.json(
        {
          error: 'Invalid CSRF token',
          message: 'Request appears to be unauthorized. Please refresh the page and try again.'
        },
        { status: 403 }
      );
    }

    // Parse and validate request body
    const body = await req.json();
    const validatedData = SuggestMessageSchema.parse(body);
    const { context } = validatedData;

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    // Create context-specific prompt
    const prompt = createSuggestionPrompt(context);

    // Call Claude API
    const message = await anthropic.messages.create({
      model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514',
      max_tokens: 500,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    // Extract response
    const response = message.content[0];
    const suggestions = response.type === 'text' ? response.text : '';

    // Parse suggestions (expecting JSON array)
    const parsedSuggestions = JSON.parse(suggestions);

    return NextResponse.json({
      success: true,
      suggestions: parsedSuggestions,
      context,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
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

    console.error('Message suggestion error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate suggestions',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}

function createSuggestionPrompt(context: string): string {
  const contextInfo = {
    'general': {
      description: 'general inquiry or introduction',
      tone: 'friendly and professional',
      focus: 'expressing interest in connecting'
    },
    'job-opportunity': {
      description: 'job opportunity or recruitment',
      tone: 'professional and concise',
      focus: 'discussing a specific role or opportunity'
    },
    'collaboration': {
      description: 'project collaboration or partnership',
      tone: 'collaborative and enthusiastic',
      focus: 'proposing a collaboration or partnership'
    },
    'question': {
      description: 'technical question or consulting inquiry',
      tone: 'curious and respectful',
      focus: 'asking for advice or expertise'
    }
  };

  const info = contextInfo[context as keyof typeof contextInfo];

  return `You are helping someone write a professional contact message to Chris Nattress, a Technical Lead and Senior Software Engineer.

CONTEXT: The sender wants to reach out regarding ${info.description}.
TONE: ${info.tone}
FOCUS: ${info.focus}

Generate 3 different message suggestions that:
1. Are concise (50-100 words each)
2. Are professional but personable
3. Include specific hooks that would be relevant (mentioning tech stack, experience, or skills)
4. Each has a different angle or approach
5. Are ready to customize with specific details

Return ONLY a JSON array of 3 strings, no other text:
["Suggestion 1...", "Suggestion 2...", "Suggestion 3..."]`;
}
