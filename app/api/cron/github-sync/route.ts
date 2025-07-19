import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import * as Sentry from '@sentry/nextjs';

/**
 * GitHub Sync Cron Job
 * Triggered every 6 hours to refresh GitHub data via ISR
 * This ensures GitHub data stays fresh without manual intervention
 */
export async function POST(request: NextRequest) {
  try {
    // Verify this is a cron job request (Vercel adds special headers)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      // For development, allow requests without auth
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const startTime = Date.now();
    
    // Revalidate the main page that contains GitHub showcase
    revalidatePath('/');
    
    // Revalidate the GitHub data cache specifically
    revalidatePath('/api/github');
    
    const endTime = Date.now();
    const duration = endTime - startTime;

    // Log successful sync
    console.log(`GitHub sync completed in ${duration}ms`);
    
    // Send success response
    return NextResponse.json({
      success: true,
      message: 'GitHub data sync completed successfully',
      timestamp: new Date().toISOString(),
      duration: `${duration}ms`,
      revalidatedPaths: ['/', '/api/github']
    });

  } catch (error) {
    // Log error to Sentry
    Sentry.captureException(error, {
      tags: {
        component: 'github-sync-cron',
        operation: 'data-revalidation'
      },
      extra: {
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    });

    console.error('GitHub sync cron job failed:', error);
    
    return NextResponse.json({
      success: false,
      error: 'GitHub sync failed',
      timestamp: new Date().toISOString(),
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

/**
 * Handle GET requests for manual testing
 */
export async function GET(request: NextRequest) {
  // Allow manual testing in development
  if (process.env.NODE_ENV === 'development') {
    return POST(request);
  }
  
  return NextResponse.json({
    message: 'GitHub Sync Cron Job',
    schedule: 'Every 6 hours (0 */6 * * *)',
    nextRun: 'Managed by Vercel Cron',
    manual: 'POST to this endpoint to trigger manually'
  });
} 