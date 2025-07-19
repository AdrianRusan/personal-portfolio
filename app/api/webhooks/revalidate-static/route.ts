import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import * as Sentry from '@sentry/nextjs';

/**
 * Static Content Revalidation Webhook Handler
 * Triggered by Vercel Deploy Hooks after successful deployments
 * Revalidates static content paths to ensure new content is reflected
 */
export async function POST(request: NextRequest) {
  try {
    // Verify webhook authenticity using secret or specific headers
    const authHeader = request.headers.get('authorization');
    const webhookSecret = process.env.WEBHOOK_SECRET;
    
    // In production, verify the webhook secret
    if (process.env.NODE_ENV === 'production' && webhookSecret) {
      if (authHeader !== `Bearer ${webhookSecret}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    // Parse the request body to understand what to revalidate
    let body;
    try {
      body = await request.json();
    } catch {
      // If no body or invalid JSON, revalidate all static paths
      body = {};
    }

    const startTime = Date.now();
    
    // Define static content paths that should be revalidated
    const staticPaths = [
      '/',                    // Home page
      '/projects',           // Projects page (if it exists)
      '/docs',               // Documentation pages
      '/docs/introduction',  // Specific doc pages
      '/docs/getting-started',
      '/docs/api-basics',
      '/learning',           // Learning platform pages
      '/status',             // Status page
    ];

    // Additional paths from request body (if provided)
    const additionalPaths = body.paths || [];
    const pathsToRevalidate = [...staticPaths, ...additionalPaths];

    // Revalidate all static content paths
    const revalidationPromises = pathsToRevalidate.map(async (path) => {
      try {
        revalidatePath(path);
        return { path, success: true };
      } catch (error) {
        console.warn(`Failed to revalidate path ${path}:`, error);
        return { path, success: false, error: error instanceof Error ? error.message : 'Unknown error' };
      }
    });

    const revalidationResults = await Promise.all(revalidationPromises);
    
    const endTime = Date.now();
    const duration = endTime - startTime;

    // Log successful revalidation
    const successfulPaths = revalidationResults.filter(r => r.success).map(r => r.path);
    const failedPaths = revalidationResults.filter(r => !r.success);
    
    console.log(`Static content revalidation completed in ${duration}ms`);
    console.log(`Successfully revalidated: ${successfulPaths.join(', ')}`);
    
    if (failedPaths.length > 0) {
      console.warn(`Failed to revalidate: ${failedPaths.map(f => f.path).join(', ')}`);
    }

    // Send success response
    return NextResponse.json({
      success: true,
      message: 'Static content revalidation completed',
      timestamp: new Date().toISOString(),
      duration: `${duration}ms`,
      revalidatedPaths: successfulPaths,
      failedPaths: failedPaths.map(f => ({ path: f.path, error: f.error })),
      totalPaths: pathsToRevalidate.length,
      successCount: successfulPaths.length,
      failureCount: failedPaths.length
    });

  } catch (error) {
    // Log error to Sentry
    Sentry.captureException(error, {
      tags: {
        component: 'static-revalidation-webhook',
        operation: 'content-revalidation'
      },
      extra: {
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    });

    console.error('Static content revalidation webhook failed:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Static content revalidation failed',
      timestamp: new Date().toISOString(),
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

/**
 * Handle GET requests for webhook information
 */
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Static Content Revalidation Webhook',
    description: 'Triggered by Vercel Deploy Hooks to revalidate static content paths',
    usage: 'POST to this endpoint with optional paths array in body',
    authentication: process.env.NODE_ENV === 'production' ? 'Bearer token required' : 'No auth required in development',
    defaultPaths: [
      '/',
      '/projects',
      '/docs',
      '/docs/introduction',
      '/docs/getting-started',
      '/docs/api-basics',
      '/learning',
      '/status'
    ],
    example: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_WEBHOOK_SECRET'
      },
      body: {
        paths: ['/custom-path', '/another-path']
      }
    }
  });
} 