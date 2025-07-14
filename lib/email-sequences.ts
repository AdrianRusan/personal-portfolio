import { Resend } from 'resend';
import { FollowUpEmail } from '@/emails/FollowUpEmail';
import * as Sentry from '@sentry/nextjs';
import { promises as fs } from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailSequenceRecord {
  email: string;
  name: string;
  projectType: string;
  submittedAt: string;
  lastFollowUp?: string;
  followUpCount: number;
  status: 'pending' | 'sent' | 'completed' | 'unsubscribed';
}

// Simple file-based tracking for V1 (no database)
const SEQUENCE_FILE_PATH = path.join(process.cwd(), 'tmp', 'email-sequences.json');

/**
 * Ensures the tmp directory exists
 */
async function ensureTmpDir(): Promise<void> {
  const tmpDir = path.join(process.cwd(), 'tmp');
  try {
    await fs.access(tmpDir);
  } catch {
    await fs.mkdir(tmpDir, { recursive: true });
  }
}

/**
 * Loads email sequence records from file
 */
async function loadSequenceRecords(): Promise<EmailSequenceRecord[]> {
  try {
    await ensureTmpDir();
    const data = await fs.readFile(SEQUENCE_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist or is invalid, return empty array
    return [];
  }
}

/**
 * Saves email sequence records to file
 */
async function saveSequenceRecords(records: EmailSequenceRecord[]): Promise<void> {
  try {
    await ensureTmpDir();
    await fs.writeFile(SEQUENCE_FILE_PATH, JSON.stringify(records, null, 2));
  } catch (error) {
    console.error('Failed to save sequence records:', error);
    throw error;
  }
}

/**
 * Adds a new contact to the email sequence
 */
export async function addToEmailSequence(
  email: string,
  name: string,
  projectType: string,
  submittedAt: Date
): Promise<void> {
  try {
    const records = await loadSequenceRecords();
    
    // Check if this email is already in the sequence
    const existingRecord = records.find(r => r.email === email);
    if (existingRecord) {
      // Update the existing record with new submission
      existingRecord.submittedAt = submittedAt.toISOString();
      existingRecord.projectType = projectType;
      existingRecord.name = name;
      existingRecord.status = 'pending';
    } else {
      // Add new record
      records.push({
        email,
        name,
        projectType,
        submittedAt: submittedAt.toISOString(),
        followUpCount: 0,
        status: 'pending'
      });
    }
    
    await saveSequenceRecords(records);
    console.log(`Added ${email} to email sequence`);
  } catch (error) {
    console.error('Failed to add to email sequence:', error);
    Sentry.captureException(error, {
      tags: {
        component: 'email-sequences',
        operation: 'add-to-sequence'
      },
      extra: { email, name, projectType }
    });
  }
}

/**
 * Processes pending email sequences and sends follow-up emails
 */
export async function processEmailSequences(): Promise<{ 
  processed: number; 
  sent: number; 
  errors: number; 
  results: Array<{ email: string; success: boolean; error?: string }> 
}> {
  try {
    const records = await loadSequenceRecords();
    const now = new Date();
    const results: Array<{ email: string; success: boolean; error?: string }> = [];
    
    // Find records that need follow-up
    const pendingRecords = records.filter(record => {
      if (record.status !== 'pending') return false;
      
      const submittedAt = new Date(record.submittedAt);
      const daysSinceSubmission = Math.floor((now.getTime() - submittedAt.getTime()) / (1000 * 60 * 60 * 24));
      
      // Send follow-up after 2 days, but only once
      return daysSinceSubmission >= 2 && record.followUpCount === 0;
    });

    console.log(`Found ${pendingRecords.length} records ready for follow-up`);

    // Process each pending record
    for (const record of pendingRecords) {
      try {
        // Check if Resend API key is configured
        if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'your-resend-api-key-here') {
          console.log(`Simulating follow-up email to ${record.email}`);
          
          // Update record as if email was sent
          record.lastFollowUp = now.toISOString();
          record.followUpCount += 1;
          record.status = 'sent';
          
          results.push({ email: record.email, success: true });
          continue;
        }

        const submittedAt = new Date(record.submittedAt);
        const daysSinceSubmission = Math.floor((now.getTime() - submittedAt.getTime()) / (1000 * 60 * 60 * 24));

        // Send follow-up email
        const emailResult = await resend.emails.send({
          from: process.env.FROM_EMAIL || 'noreply@adrian-rusan.com',
          to: record.email,
          subject: `Following up on your ${getProjectTypeLabel(record.projectType)} inquiry`,
          react: FollowUpEmail({
            name: record.name,
            email: record.email,
            projectType: record.projectType,
            submittedDaysAgo: daysSinceSubmission
          }),
        });

        // Update record
        record.lastFollowUp = now.toISOString();
        record.followUpCount += 1;
        record.status = 'sent';

        console.log(`Follow-up email sent to ${record.email}:`, emailResult.data?.id);
        results.push({ email: record.email, success: true });

      } catch (error) {
        console.error(`Failed to send follow-up to ${record.email}:`, error);
        
        // Log error to Sentry
        Sentry.captureException(error, {
          tags: {
            component: 'email-sequences',
            operation: 'send-follow-up'
          },
          extra: {
            email: record.email,
            name: record.name,
            projectType: record.projectType
          }
        });

        results.push({ 
          email: record.email, 
          success: false, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        });
      }
    }

    // Save updated records
    await saveSequenceRecords(records);

    const sent = results.filter(r => r.success).length;
    const errors = results.filter(r => !r.success).length;

    return {
      processed: pendingRecords.length,
      sent,
      errors,
      results
    };

  } catch (error) {
    console.error('Failed to process email sequences:', error);
    
    Sentry.captureException(error, {
      tags: {
        component: 'email-sequences',
        operation: 'process-sequences'
      }
    });

    throw error;
  }
}

/**
 * Gets project type label for display
 */
function getProjectTypeLabel(type: string): string {
  const labels = {
    'web-development': 'Web Development',
    'consultation': 'Consultation',
    'maintenance': 'Website Maintenance',
    'e-commerce': 'E-commerce Development',
    'mobile-app': 'Mobile App Development',
    'other': 'Custom Project'
  };
  return labels[type as keyof typeof labels] || type;
}

/**
 * Gets current sequence statistics
 */
export async function getSequenceStats(): Promise<{
  total: number;
  pending: number;
  sent: number;
  completed: number;
  unsubscribed: number;
}> {
  try {
    const records = await loadSequenceRecords();
    
    return {
      total: records.length,
      pending: records.filter(r => r.status === 'pending').length,
      sent: records.filter(r => r.status === 'sent').length,
      completed: records.filter(r => r.status === 'completed').length,
      unsubscribed: records.filter(r => r.status === 'unsubscribed').length,
    };
  } catch (error) {
    console.error('Failed to get sequence stats:', error);
    return {
      total: 0,
      pending: 0,
      sent: 0,
      completed: 0,
      unsubscribed: 0,
    };
  }
} 