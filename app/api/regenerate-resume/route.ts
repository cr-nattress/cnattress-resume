import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { resumeData } from '@/lib/ai/resume-context';
import { verifyCsrfToken } from '@/lib/csrf';
import { z } from 'zod';

// Request validation schema
const RegenerateResumeSchema = z.object({
  roleType: z.enum(['frontend', 'backend', 'fullstack', 'devops', 'ai-ml'], {
    errorMap: () => ({ message: 'Role type must be one of: frontend, backend, fullstack, devops, ai-ml' })
  }),
});

type RegenerateResumeRequest = z.infer<typeof RegenerateResumeSchema>;

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
    const validatedData = RegenerateResumeSchema.parse(body);
    const { roleType } = validatedData;

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    // Create role-specific prompt
    const prompt = createRoleSpecificPrompt(roleType);

    // Call Claude API
    const message = await anthropic.messages.create({
      model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    // Extract response
    const response = message.content[0];
    const regeneratedContent = response.type === 'text' ? response.text : '';

    return NextResponse.json({
      success: true,
      roleType,
      content: regeneratedContent,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message,
            code: e.code
          }))
        },
        { status: 400 }
      );
    }

    console.error('Resume regeneration error:', error);
    return NextResponse.json(
      {
        error: 'Failed to regenerate resume',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}

function createRoleSpecificPrompt(roleType: string): string {
  const roleConfig = {
    frontend: {
      title: 'Frontend Developer',
      emphasis: 'Angular, React, Vue.js, TypeScript, UI/UX design, responsive design, micro-frontend architecture',
      projects: 'frontend frameworks, component libraries, user interfaces',
      skills: 'JavaScript/TypeScript, modern frontend frameworks, CSS/styling'
    },
    backend: {
      title: 'Backend Developer',
      emphasis: 'C#/.NET Core, API design, microservices, database design, cloud architecture',
      projects: 'backend APIs, microservices, data processing systems',
      skills: 'C#, .NET, SQL, API development, cloud services'
    },
    fullstack: {
      title: 'Full-Stack Developer',
      emphasis: 'end-to-end development, Angular + .NET stack, full system architecture, DevOps',
      projects: 'complete applications spanning frontend to backend',
      skills: 'both frontend (Angular/React) and backend (C#/.NET) technologies'
    },
    devops: {
      title: 'DevOps Engineer',
      emphasis: 'CI/CD pipelines, Azure/AWS cloud, infrastructure, deployment automation, monitoring',
      projects: 'deployment pipelines, infrastructure automation, cloud migration',
      skills: 'Azure, AWS, CI/CD, DevOps practices, infrastructure as code'
    },
    'ai-ml': {
      title: 'AI/ML Developer',
      emphasis: 'LLM integrations, AI IDEs (Windsurf, Cursor), coding agents, AI-powered automation',
      projects: 'AI integrations, LLM applications, intelligent automation',
      skills: 'LLM APIs, AI development tools, Python/TypeScript for AI'
    }
  };

  const config = roleConfig[roleType as keyof typeof roleConfig];

  return `You are helping tailor a resume for a ${config.title} position.

ORIGINAL RESUME DATA:
${JSON.stringify(resumeData, null, 2)}

Your task is to rewrite the professional summary and restructure the experience highlights to emphasize ${config.emphasis}.

Guidelines:
1. Keep all factual information accurate - don't invent experiences
2. Reorder and emphasize the most relevant ${config.projects} from the experience
3. Highlight ${config.skills} prominently
4. Adjust the professional summary to focus on ${config.title} expertise
5. Keep the same experience entries but reorder achievements to put most relevant ones first
6. Maintain professional tone and clarity

Return a JSON object with this structure:
{
  "summary": "Rewritten professional summary emphasizing ${config.title} skills",
  "topHighlights": ["3-4 most relevant highlights for ${config.title} role"],
  "focusSkills": ["Top 5-7 skills most relevant to ${config.title}"]
}`;
}
