import { NextRequest, NextResponse } from 'next/server';
import { verifyCsrfToken } from '@/lib/csrf';
import { z } from 'zod';

// Request validation schema
const ContactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address').max(255),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
  honeypot: z.string().max(0, 'Spam detected').optional(), // Should be empty if not spam
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
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
    const validatedData = ContactFormSchema.parse(body);
    const { name, email, message, honeypot } = validatedData;

    // Honeypot check for spam
    if (honeypot && honeypot.length > 0) {
      console.warn('Spam detected via honeypot:', { name, email });
      // Return success to not alert spammers
      return NextResponse.json({
        success: true,
        message: 'Message received successfully'
      });
    }

    // Log to Supabase for tracking (optional - implement later if needed)
    // try {
    //   await logContactSubmission({
    //     name,
    //     email,
    //     message,
    //     timestamp: new Date().toISOString()
    //   });
    // } catch (dbError) {
    //   console.error('Failed to log contact submission:', dbError);
    //   // Continue even if logging fails
    // }

    // For now, we'll just log the message
    // In production, integrate with SendGrid, AWS SES, or Netlify Forms
    console.log('Contact form submission:', { name, email, message });

    // TODO: Integrate email service
    // Example with SendGrid:
    // await sendEmail({
    //   to: process.env.CONTACT_EMAIL!,
    //   from: process.env.SENDGRID_FROM_EMAIL!,
    //   subject: `New contact from ${name}`,
    //   text: message,
    //   replyTo: email
    // });

    return NextResponse.json({
      success: true,
      message: 'Message received successfully'
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

    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        error: 'Failed to send message',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}
