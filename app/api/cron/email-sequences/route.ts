import { NextRequest, NextResponse } from 'next/server';
import { processEmailSequences, getSequenceStats } from '@/lib/email-sequences';
import * as Sentry from '@sentry/nextjs';

/**
 * Email Sequences Cron Job
 * Triggered daily to process email sequences and send follow-up emails
 * This ensures leads receive timely follow-up communication
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
    
    // Get initial stats
    const initialStats = await getSequenceStats();
    
    // Process email sequences
    const results = await processEmailSequences();
    
    // Get final stats
    const finalStats = await getSequenceStats();
    
    const endTime = Date.now();
    const duration = endTime - startTime;

    // Log successful processing
    console.log(`Email sequences processed in ${duration}ms`);
    console.log(`Processed: ${results.processed}, Sent: ${results.sent}, Errors: ${results.errors}`);
    
    // Send success response
    return NextResponse.json({
      success: true,
      message: 'Email sequences processed successfully',
      timestamp: new Date().toISOString(),
      duration: `${duration}ms`,
      processing: {
        processed: results.processed,
        sent: results.sent,
        errors: results.errors,
        results: results.results
      },
      stats: {
        before: initialStats,
        after: finalStats
      }
    });

  } catch (error) {
    // Log error to Sentry
    Sentry.captureException(error, {
      tags: {
        component: 'email-sequences-cron',
        operation: 'sequence-processing'
      },
      extra: {
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    });

    console.error('Email sequences cron job failed:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Email sequences processing failed',
      timestamp: new Date().toISOString(),
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

/**
 * Handle GET requests for manual testing and status
 */
export async function GET(request: NextRequest) {
  try {
    // Allow manual testing in development
    if (process.env.NODE_ENV === 'development') {
      return POST(request);
    }
    
    // Get current stats for status check
    const stats = await getSequenceStats();
    
    return NextResponse.json({
      message: 'Email Sequences Cron Job',
      description: 'Processes email sequences and sends follow-up emails',
      schedule: 'Daily at 9 AM UTC (0 9 * * *)',
      nextRun: 'Managed by Vercel Cron',
      manual: 'POST to this endpoint to trigger manually',
      currentStats: stats,
      sequenceRules: {
        followUpDelay: '2 days after initial submission',
        maxFollowUps: 1,
        trackingMethod: 'File-based (tmp/email-sequences.json)'
      }
    });
  } catch (error) {
    console.error('Failed to get email sequences status:', error);
    return NextResponse.json({
      message: 'Email Sequences Cron Job',
      error: 'Failed to get current status',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 