'use server';

import { contactFormSchema, ContactFormData } from '@/lib/schemas/contactForm';
import { Resend } from 'resend';
import { ContactConfirmationEmail } from '@/emails/ContactConfirmationEmail';
import { AdminNotificationEmail } from '@/emails/AdminNotificationEmail';
import * as Sentry from '@sentry/nextjs';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(formData: ContactFormData) {
  try {
    // Server-side validation using the same Zod schema
    const validatedData = contactFormSchema.parse(formData);

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'your-resend-api-key-here') {
      console.log('Resend API key not configured - simulating email send');
      
      // Simulate email sending for testing
      return {
        success: true,
        message: "Thank you for your message! I'll get back to you soon. (Email simulation mode - configure RESEND_API_KEY for real emails)",
        userEmailId: 'simulated',
        adminEmailId: 'simulated'
      };
    }

    // Send confirmation email to the user
    const userEmailResult = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'rusan.adrian.ionut@gmail.com',
      to: validatedData.email,
      subject: 'Thank you for your message - Adrian Rusan',
      react: ContactConfirmationEmail({ 
        name: validatedData.name,
        projectType: validatedData.projectType,
        budget: validatedData.budget,
        timeline: validatedData.timeline
      }),
    });

    // Send notification email to admin
    const adminEmailResult = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@adrian-rusan.com',
      to: process.env.ADMIN_EMAIL || 'rusan.adrian.ionut@gmail.com',
      subject: `New Contact Form Submission from ${validatedData.name}`,
      react: AdminNotificationEmail({ 
        formData: validatedData,
        submittedAt: new Date()
      }),
    });

    // Log successful email sends
    console.log('User email sent:', userEmailResult.data?.id);
    console.log('Admin email sent:', adminEmailResult.data?.id);

    return {
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
      userEmailId: userEmailResult.data?.id,
      adminEmailId: adminEmailResult.data?.id
    };

  } catch (error) {
    // Log the error to Sentry with context
    Sentry.captureException(error, {
      tags: {
        action: 'contact_form_submission',
        component: 'server_action'
      },
      extra: {
        formData: formData, // This will help debug form submission issues
        timestamp: new Date().toISOString()
      }
    });

    console.error('Contact form submission error:', error);

    // Return appropriate error message based on error type
    if (error instanceof Error) {
      if (error.name === 'ZodError') {
        return {
          success: false,
          message: 'Please check your form data and try again.',
          error: 'validation_error'
        };
      }
      
      if (error.message.includes('rate limit') || error.message.includes('429')) {
        return {
          success: false,
          message: 'Too many requests. Please try again in a few minutes.',
          error: 'rate_limit_error'
        };
      }
    }

    // Generic error message for any other errors
    return {
      success: false,
      message: 'Something went wrong. Please try again or contact me directly at rusan.adrian.ionut@gmail.com.',
      error: 'server_error'
    };
  }
} 