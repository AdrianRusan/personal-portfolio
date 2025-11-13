import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend (only if API key is provided)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Simple in-memory rate limiter
const rateLimit = new Map<string, { count: number; resetTime: number }>();

// Rate limit: 3 requests per 15 minutes per IP
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes in milliseconds

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimit.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT_MAX) {
    return false;
  }

  userLimit.count++;
  return true;
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimit.entries()) {
    if (now > data.resetTime) {
      rateLimit.delete(ip);
    }
  }
}, 60 * 1000); // Clean up every minute

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    // Get IP address for rate limiting
    const ip = request.headers.get('x-forwarded-for') ||
                request.headers.get('x-real-ip') ||
                'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    // Validate name
    if (typeof name !== 'string' || name.trim().length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: 'Name must be between 2 and 100 characters.' },
        { status: 400 }
      );
    }

    // Validate email
    if (typeof email !== 'string' || !EMAIL_REGEX.test(email) || email.length > 255) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Validate message
    if (typeof message !== 'string' || message.trim().length < 10 || message.length > 1000) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 1000 characters.' },
        { status: 400 }
      );
    }

    // Sanitize inputs (basic XSS prevention)
    const sanitizedName = name.trim().replace(/[<>]/g, '');
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedMessage = message.trim().replace(/[<>]/g, '');

    // Send email using Resend
    if (resend) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
          to: process.env.CONTACT_EMAIL || 'rusan.adrian.ionut@gmail.com',
          replyTo: sanitizedEmail,
          subject: `Portfolio Contact from ${sanitizedName}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${sanitizedName} (${sanitizedEmail})</p>
            <p><strong>Message:</strong></p>
            <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><small>Submitted at: ${new Date().toISOString()}</small></p>
          `,
          text: `New Contact Form Submission\n\nFrom: ${sanitizedName} (${sanitizedEmail})\n\nMessage:\n${sanitizedMessage}\n\nSubmitted at: ${new Date().toISOString()}`,
        });

        // Log successful submission (for monitoring)
        console.log('Contact form email sent:', {
          name: sanitizedName,
          email: sanitizedEmail,
          timestamp: new Date().toISOString(),
        });
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
      }
    } else {
      // Log submission if Resend is not configured
      console.log('Contact form submission (email not configured):', {
        name: sanitizedName,
        email: sanitizedEmail,
        message: sanitizedMessage,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
