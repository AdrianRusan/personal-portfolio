import { NextRequest, NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';
import { sendEnhancedStatusNotification, shouldSendNotification } from '@/lib/status-notifications';

// Simple in-memory cache for previous health states
let previousHealthState: Record<string, HealthCheckResult> | undefined;

// Health check result interface
interface HealthCheckResult {
  status: 'operational' | 'degraded' | 'down';
  responseTime?: number;
  error?: string;
  lastChecked: string;
}

// Combined health status interface
interface HealthStatus {
  portfolio: HealthCheckResult;
  github: HealthCheckResult;
  email: HealthCheckResult;
  analytics: HealthCheckResult;
  overall: 'operational' | 'degraded' | 'down';
  timestamp: string;
}

/**
 * Performs a health check on a given URL
 */
async function checkService(
  url: string, 
  timeout: number = 5000,
  expectedStatus: number = 200
): Promise<HealthCheckResult> {
  const startTime = Date.now();
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Adrian-Rusan-Portfolio-Health-Check/1.0',
        'Accept': 'application/json, text/html, */*',
      },
    });
    
    clearTimeout(timeoutId);
    const responseTime = Date.now() - startTime;
    
    if (response.status === expectedStatus) {
      return {
        status: 'operational',
        responseTime,
        lastChecked: new Date().toISOString(),
      };
    } else {
      return {
        status: 'degraded',
        responseTime,
        error: `HTTP ${response.status}`,
        lastChecked: new Date().toISOString(),
      };
    }
  } catch (error) {
    const responseTime = Date.now() - startTime;
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return {
          status: 'down',
          responseTime,
          error: 'Request timeout',
          lastChecked: new Date().toISOString(),
        };
      }
      
      return {
        status: 'down',
        responseTime,
        error: error.message,
        lastChecked: new Date().toISOString(),
      };
    }
    
    return {
      status: 'down',
      responseTime,
      error: 'Unknown error',
      lastChecked: new Date().toISOString(),
    };
  }
}

/**
 * Determines overall system status based on individual service statuses
 */
function calculateOverallStatus(services: Record<string, HealthCheckResult>): 'operational' | 'degraded' | 'down' {
  const statuses = Object.values(services).map(service => service.status);
  
  if (statuses.includes('down')) return 'down';
  if (statuses.includes('degraded')) return 'degraded';
  
  return 'operational';
}

/**
 * Checks for status changes and sends notifications if needed
 */
async function checkAndNotifyStatusChanges(
  currentHealth: Record<string, HealthCheckResult>,
  previousHealth?: Record<string, HealthCheckResult>
): Promise<void> {
  if (!previousHealth) {
    return; // No previous state to compare against
  }

  // Check each service for status changes
  for (const [serviceKey, currentResult] of Object.entries(currentHealth)) {
    const previousResult = previousHealth[serviceKey];
    
    if (previousResult && shouldSendNotification(currentResult.status, previousResult.status)) {
      try {
        await sendEnhancedStatusNotification(
          serviceKey,
          currentResult.status,
          previousResult.status,
          currentResult.error,
          currentResult.responseTime
        );
      } catch (error) {
        // Log notification error but don't fail the health check
        console.error(`Failed to send status notification for ${serviceKey}:`, error);
        
        Sentry.captureException(error, {
          tags: {
            component: 'health-check',
            service: serviceKey,
            operation: 'status-notification',
          },
          extra: {
            currentStatus: currentResult.status,
            previousStatus: previousResult.status,
          },
        });
      }
    }
  }
}

/**
 * GET /api/health
 * Performs health checks on all critical services
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Determine the base URL for the portfolio check
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                   process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                   'http://localhost:3000';
    
    // Perform health checks in parallel
    const [portfolioHealth, githubHealth, emailHealth, analyticsHealth] = await Promise.all([
      // Portfolio website health check - avoid circular dependency in development
      process.env.NODE_ENV === 'development' 
        ? Promise.resolve({
            status: 'operational' as const,
            responseTime: 0,
            lastChecked: new Date().toISOString(),
          })
        : checkService(baseUrl, 8000),
      
      // GitHub API health check
      checkService('https://api.github.com', 5000),
      
      // Resend API health check
      checkService('https://api.resend.com/emails', 5000, 401), // 401 is expected without auth
      
      // Vercel Analytics health check (checking Vercel status)
      checkService('https://vercel.com', 5000),
    ]);
    
    // Create the health status object
    const currentHealthResults = {
      portfolio: portfolioHealth,
      github: githubHealth,
      email: emailHealth,
      analytics: analyticsHealth,
    };
    
    const healthStatus: HealthStatus = {
      ...currentHealthResults,
      overall: calculateOverallStatus(currentHealthResults),
      timestamp: new Date().toISOString(),
    };
    
    // Check for status changes and send notifications (async, don't wait)
    if (previousHealthState) {
      checkAndNotifyStatusChanges(currentHealthResults, previousHealthState)
        .catch(error => {
          console.error('Status notification check failed:', error);
        });
    }
    
    // Update previous health state for next comparison
    previousHealthState = { ...currentHealthResults };
    
    // Log any service issues to Sentry
    const failedServices = Object.entries(healthStatus)
      .filter(([key, value]) => key !== 'overall' && key !== 'timestamp' && value.status !== 'operational')
      .map(([key, value]) => ({ service: key, status: value.status, error: value.error }));
    
    if (failedServices.length > 0) {
      Sentry.captureMessage('Service health check detected issues', {
        level: 'warning',
        tags: {
          component: 'health-check',
          overall_status: healthStatus.overall,
        },
        extra: {
          failed_services: failedServices,
          all_services: healthStatus,
          processing_time: Date.now() - startTime,
        },
      });
    }
    
    // Return appropriate HTTP status based on overall health
    const httpStatus = healthStatus.overall === 'operational' ? 200 : 
                      healthStatus.overall === 'degraded' ? 200 : 503;
    
    return NextResponse.json(healthStatus, { 
      status: httpStatus,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Log error to Sentry
    Sentry.captureException(error, {
      tags: {
        api_route: 'health',
        component: 'health-check',
      },
      extra: {
        processing_time: Date.now() - startTime,
        request_url: request.url,
      },
    });
    
    console.error('Health check API error:', errorMessage);
    
    // Return error response
    const errorResponse: HealthStatus = {
      portfolio: {
        status: 'down',
        error: 'Health check failed',
        lastChecked: new Date().toISOString(),
      },
      github: {
        status: 'down',
        error: 'Health check failed',
        lastChecked: new Date().toISOString(),
      },
      email: {
        status: 'down',
        error: 'Health check failed',
        lastChecked: new Date().toISOString(),
      },
      analytics: {
        status: 'down',
        error: 'Health check failed',
        lastChecked: new Date().toISOString(),
      },
      overall: 'down',
      timestamp: new Date().toISOString(),
    };
    
    return NextResponse.json(
      { 
        error: 'Health check failed',
        message: process.env.NODE_ENV === 'development' ? errorMessage : 'Internal server error',
        details: errorResponse,
      },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  }
}

/**
 * POST /api/health
 * Allows manual triggering of health checks (for testing)
 */
export async function POST(request: NextRequest) {
  // For development and testing purposes
  if (process.env.NODE_ENV === 'development') {
    return GET(request);
  }
  
  return NextResponse.json(
    { error: 'Method not allowed in production' },
    { status: 405 }
  );
}

/**
 * OPTIONS /api/health
 * Handle CORS preflight requests
 */
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
} 