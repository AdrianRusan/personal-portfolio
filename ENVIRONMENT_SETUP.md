# Environment Variables Setup

This document outlines the required environment variables for the portfolio application.

## Required for Contact Form (Task 3)

Create a `.env.local` file in the root directory with the following variables:

```bash
# Email Configuration (Resend) - Required for contact form
RESEND_API_KEY=your-resend-api-key-here
FROM_EMAIL=noreply@adrian-rusan.com
ADMIN_EMAIL=rusan.adrian.ionut@gmail.com
```

### Getting a Resend API Key

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain or use the development domain
3. Create an API key in the dashboard
4. Add the API key to your `.env.local` file

## Optional for Future V1 Tasks

```bash
# GitHub Integration (for Task 4)
GITHUB_TOKEN=your-github-personal-access-token
GITHUB_USERNAME=AdrianRusan

# Calendly Integration (for Task 5)
CALENDLY_API_KEY=your-calendly-api-key
CALENDLY_USERNAME=adrian-rusan

# Analytics & Monitoring
NEXT_PUBLIC_GA_ID=your-google-analytics-id
SENTRY_DSN=your-sentry-dsn

# Security
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=https://adrian-rusan.com
```

## Testing Without Resend

If you don't have a Resend API key yet, the contact form will still work but emails won't be sent. The application will:

1. Show appropriate error messages to the user
2. Log errors to Sentry (if configured)
3. Still validate the form data properly
4. Provide fallback error handling

## Production Deployment

For Vercel deployment, add these environment variables in the Vercel dashboard under:
Settings → Environment Variables

Make sure to set them for all environments (Production, Preview, Development) as needed. 