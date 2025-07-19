import { Resend } from 'resend';
import { StatusNotificationEmail } from '@/emails/StatusNotificationEmail';
import * as Sentry from '@sentry/nextjs';

const resend = new Resend(process.env.RESEND_API_KEY);

// Service status types
type ServiceStatus = 'operational' | 'degraded' | 'down';

interface StatusNotificationData {
  service: string;
  status: ServiceStatus;
  previousStatus?: ServiceStatus | undefined;
  timestamp: Date;
  error?: string | undefined;
  responseTime?: number | undefined;
  affectedServices?: string[] | undefined;
}

/**
 * Sends a status notification email to the admin
 */

export async function sendStatusNotification(data: StatusNotificationData): Promise<{ success: boolean; emailId?: string; error?: string }> {
  try {
    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'your-resend-api-key-here') {
      console.log('Resend API key not configured - simulating status notification email');
      
      // Log the notification details for debugging
      console.log('Status notification details:', {
        service: data.service,
        status: data.status,
        previousStatus: data.previousStatus,
        timestamp: data.timestamp.toISOString(),
        error: data.error,
        responseTime: data.responseTime,
        affectedServices: data.affectedServices,
      });
      
      return {
        success: true,
        emailId: 'simulated-status-notification',
      };
    }

    // Determine the subject line
    const getSubjectLine = () => {
      const isRecovery = data.previousStatus && 
        (data.previousStatus === 'down' || data.previousStatus === 'degraded') && 
        data.status === 'operational';
      
      if (isRecovery) {
        return `✅ ${data.service} Service Restored - Adrian Rusan Portfolio`;
      }
      
      const statusEmoji = data.status === 'operational' ? '✅' : 
                         data.status === 'degraded' ? '⚠️' : '🔴';
      
      const statusLabel = data.status === 'operational' ? 'Operational' :
                         data.status === 'degraded' ? 'Degraded Performance' : 'Service Down';
      
      return `${statusEmoji} ${data.service} Status Update: ${statusLabel}`;
    };

    // Send the status notification email
    const emailResult = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@adrian-rusan.com',
      to: process.env.ADMIN_EMAIL || 'rusan.adrian.ionut@gmail.com',
      subject: getSubjectLine(),
      react: StatusNotificationEmail({
        service: data.service,
        status: data.status,
        previousStatus: data.previousStatus,
        timestamp: data.timestamp,
        error: data.error,
        responseTime: data.responseTime,
        affectedServices: data.affectedServices,
      }),
    });

    // Log successful email send
    console.log('Status notification email sent:', emailResult.data?.id);

    const emailId = emailResult.data?.id;
    return {
      success: true,
      ...(emailId && { emailId }),
    };

  } catch (error) {
    // Log the error to Sentry with context
    Sentry.captureException(error, {
      tags: {
        component: 'status-notifications',
        service: data.service,
        status: data.status,
      },
      extra: {
        notificationData: data,
        timestamp: new Date().toISOString(),
      },
    });

    console.error('Status notification email error:', error);

    // Return error details
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Determines if a status notification should be sent based on status change
 */
export function shouldSendNotification(
  currentStatus: ServiceStatus,
  previousStatus?: ServiceStatus
): boolean {
  // Don't send notification if status hasn't changed
  if (currentStatus === previousStatus) {
    return false;
  }

  // Always send notification for service down
  if (currentStatus === 'down') {
    return true;
  }

  // Send notification for degraded performance
  if (currentStatus === 'degraded') {
    return true;
  }

  // Send notification for recovery (from down/degraded to operational)
  if (currentStatus === 'operational' && previousStatus && 
      (previousStatus === 'down' || previousStatus === 'degraded')) {
    return true;
  }

  // Don't send notification for operational status without previous issues
  return false;
}

/**
 * Service display names for better email readability
 */
export const SERVICE_DISPLAY_NAMES: Record<string, string> = {
  portfolio: 'Portfolio Website',
  github: 'GitHub Integration',
  email: 'Email Delivery',
  analytics: 'Analytics & Monitoring',
};

/**
 * Affected services mapping for cascade notifications
 */
export const AFFECTED_SERVICES_MAP: Record<string, string[]> = {
  portfolio: ['GitHub Integration', 'Email Delivery'],
  github: [],
  email: [],
  analytics: [],
};

/**
 * Enhanced status notification that includes affected services
 */
export async function sendEnhancedStatusNotification(
  serviceKey: string,
  status: ServiceStatus,
  previousStatus?: ServiceStatus,
  error?: string,
  responseTime?: number
): Promise<{ success: boolean; emailId?: string; error?: string }> {
  const serviceName = SERVICE_DISPLAY_NAMES[serviceKey] || serviceKey;
  const affectedServices = AFFECTED_SERVICES_MAP[serviceKey] || [];

  return sendStatusNotification({
    service: serviceName,
    status,
    previousStatus,
    timestamp: new Date(),
    error,
    responseTime,
    affectedServices: affectedServices.length > 0 ? affectedServices : undefined,
  });
} 