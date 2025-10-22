import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { ZodError } from 'zod';
import { resumeData } from '@/lib/ai/resume-context';
import { JobAnalyzerRequestSchema } from '@/lib/schemas/job-analyzer.schema';
import { validateCsrfToken, getCsrfTokenFromHeaders } from '@/lib/csrf';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
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
    const validatedData = JobAnalyzerRequestSchema.parse(body);
    const { jobDescription } = validatedData;

    // Build prompt for Claude to analyze job fit
    const analysisPrompt = `You are a career matching expert. Analyze how well this candidate matches a job description.

CANDIDATE PROFILE:
Name: ${resumeData.name}
Title: ${resumeData.title}
Summary: ${resumeData.summary}

Experience:
${resumeData.experience.map(exp => `
- ${exp.role} at ${exp.company} (${exp.period})
  ${exp.description}
  Technologies: ${exp.technologies.join(', ')}
  Key Achievements:
  ${exp.achievements.map(a => `  * ${a}`).join('\n')}
`).join('\n')}

Skills:
${resumeData.skills.map(s => `${s.category}: ${s.items.join(', ')}`).join('\n')}

Career Highlights:
${resumeData.highlights.map((h, i) => `${i + 1}. ${h}`).join('\n')}

JOB DESCRIPTION TO ANALYZE:
${jobDescription}

Please analyze the job fit and provide a response in the following JSON format:
{
  "matchScore": <number 0-100>,
  "matchLevel": "<Excellent Match|Strong Match|Good Match|Moderate Match|Limited Match>",
  "relevantExperience": [
    "<specific experience that matches the job - be specific with company names and technologies>"
  ],
  "keyStrengths": [
    "<key strengths - short phrases like 'Microservices Architecture', 'Cloud Platforms', etc.>"
  ],
  "potentialGaps": [
    "<potential gaps or areas for discussion - be honest but constructive>"
  ],
  "recommendation": "<1-2 sentence recommendation about candidacy for this role>"
}

Guidelines:
- Be honest but constructive
- Focus on relevant experience from the candidate's background
- Match score should reflect genuine fit (80-100: excellent, 60-79: strong, 40-59: good, 20-39: moderate, 0-19: limited)
- Highlight specific projects and achievements that relate to the job requirements
- Keep arrays concise but meaningful (3-5 items each)
- For gaps, frame as discussion points rather than disqualifiers

Return ONLY valid JSON, no markdown or explanation.`;

    // Call Claude API
    const message = await anthropic.messages.create({
      model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: analysisPrompt,
        },
      ],
    });

    // Extract JSON from response
    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';

    // Try to parse JSON response
    let analysisResult;
    try {
      // Remove markdown code blocks if present
      const cleanedResponse = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      analysisResult = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('Failed to parse Claude response:', responseText);
      return NextResponse.json(
        { error: 'Failed to parse analysis results' },
        { status: 500 }
      );
    }

    // Validate response structure
    if (
      typeof analysisResult.matchScore !== 'number' ||
      !analysisResult.matchLevel ||
      !Array.isArray(analysisResult.relevantExperience) ||
      !Array.isArray(analysisResult.keyStrengths)
    ) {
      console.error('Invalid analysis result structure:', analysisResult);
      return NextResponse.json(
        { error: 'Invalid analysis format' },
        { status: 500 }
      );
    }

    return NextResponse.json(analysisResult);

  } catch (error) {
    console.error('Job analysis error:', error);

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
      { error: 'Failed to analyze job description' },
      { status: 500 }
    );
  }
}
