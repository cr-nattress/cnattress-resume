import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { verifyCsrfToken } from '@/lib/csrf';
import { z } from 'zod';

// Request validation schema
const ExplainProjectSchema = z.object({
  projectTitle: z.string().min(1, 'Project title is required').max(200),
  projectDescription: z.string().min(1, 'Project description is required').max(5000),
  technologies: z.array(z.string()).min(1, 'At least one technology is required'),
  category: z.string().optional(),
  explanationType: z.enum(['technical', 'executive', 'both']).default('both'),
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
    const validatedData = ExplainProjectSchema.parse(body);
    const { projectTitle, projectDescription, technologies, category, explanationType } = validatedData;

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    // Create prompt for project explanation
    const prompt = createProjectExplanationPrompt(
      projectTitle,
      projectDescription,
      technologies,
      category,
      explanationType
    );

    // Call Claude API
    const message = await anthropic.messages.create({
      model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514',
      max_tokens: 2500,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    // Extract response
    const response = message.content[0];
    const explanation = response.type === 'text' ? response.text : '';

    // Parse the JSON response
    const parsedExplanation = JSON.parse(explanation);

    return NextResponse.json({
      success: true,
      projectTitle,
      explanation: parsedExplanation,
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

    console.error('Project explanation error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate project explanation',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}

function createProjectExplanationPrompt(
  title: string,
  description: string,
  technologies: string[],
  category: string | undefined,
  explanationType: string
): string {
  return `You are a technical expert explaining a software project to different audiences.

PROJECT INFORMATION:
Title: ${title}
Description: ${description}
Technologies: ${technologies.join(', ')}
${category ? `Category: ${category}` : ''}

Your task is to provide ${explanationType === 'both' ? 'both technical and executive' : explanationType} explanations of this project.

${explanationType === 'technical' || explanationType === 'both' ? `
TECHNICAL EXPLANATION should include:
- Architecture overview (what patterns/approaches were used)
- Key technical decisions and why they were made
- Integration points and data flow
- Interesting technical challenges solved
- Technology stack justification
` : ''}

${explanationType === 'executive' || explanationType === 'both' ? `
EXECUTIVE SUMMARY should include:
- What problem does this solve? (in business terms)
- Who benefits from this project?
- What makes this solution effective?
- Key outcomes and impact
- Simple, jargon-free language
` : ''}

Return a JSON object with this structure:
{
  ${explanationType === 'technical' || explanationType === 'both' ? `
  "technicalExplanation": {
    "architecture": "Brief architecture overview",
    "keyDecisions": ["Decision 1", "Decision 2", "Decision 3"],
    "dataFlow": "How data moves through the system",
    "challenges": "Main technical challenges solved",
    "techStack": "Why these technologies were chosen"
  },` : ''}
  ${explanationType === 'executive' || explanationType === 'both' ? `
  "executiveSummary": {
    "problemStatement": "What problem this solves",
    "beneficiaries": "Who this helps",
    "solution": "How it solves the problem",
    "impact": "Results and outcomes",
    "valueProposition": "Why this matters"
  },` : ''}
  "keyHighlights": ["3-5 bullet points highlighting most impressive aspects"]
}

Be specific to THIS project. Don't use generic descriptions.`;
}
