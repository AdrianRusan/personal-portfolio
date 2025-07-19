/**
 * @jest-environment jsdom
 */

import { submitContactForm } from '@/app/actions/contact'
import { ContactFormData } from '@/lib/schemas/contactForm'

// Mock Resend
const mockSend = jest.fn()
jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: mockSend
    }
  }))
}))

// Mock email sequence function
jest.mock('@/lib/email-sequences', () => ({
  addToEmailSequence: jest.fn()
}))

// Mock Sentry
jest.mock('@sentry/nextjs', () => ({
  captureException: jest.fn()
}))

// Mock email components
jest.mock('@/emails/ContactConfirmationEmail', () => ({
  ContactConfirmationEmail: jest.fn()
}))

jest.mock('@/emails/AdminNotificationEmail', () => ({
  AdminNotificationEmail: jest.fn()
}))

describe('Contact Form Integration Tests', () => {
  const validFormData: ContactFormData = {
    name: 'John Doe',
    email: 'john@example.com',
    company: 'Test Company',
    phone: '+1-555-123-4567',
    projectType: 'web-development',
    budget: '5k-15k',
    timeline: '2-3-months',
    description: 'I need a new website for my business',
    source: 'google',
    sourceDetails: ''
  }

  beforeEach(() => {
    jest.clearAllMocks()
    // Reset environment variables
    delete process.env.RESEND_API_KEY
    delete process.env.FROM_EMAIL
    delete process.env.ADMIN_EMAIL
  })

  describe('Email sending functionality', () => {
    it('should successfully send emails when API key is configured', async () => {
      // Set up environment
      process.env.RESEND_API_KEY = 'test-api-key'
      process.env.FROM_EMAIL = 'test@example.com'
      process.env.ADMIN_EMAIL = 'admin@example.com'

      // Mock successful email sends
      mockSend
        .mockResolvedValueOnce({ data: { id: 'user-email-id' } })
        .mockResolvedValueOnce({ data: { id: 'admin-email-id' } })

      const result = await submitContactForm(validFormData)

      expect(result.success).toBe(true)
      expect(result.message).toBe("Thank you for your message! I'll get back to you soon.")
      expect(result.userEmailId).toBe('user-email-id')
      expect(result.adminEmailId).toBe('admin-email-id')

      // Verify emails were sent
      expect(mockSend).toHaveBeenCalledTimes(2)
      
      // Check user email
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          from: 'test@example.com',
          to: 'john@example.com',
          subject: 'Thank you for your message - Adrian Rusan'
        })
      )

      // Check admin email
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          from: 'test@example.com',
          to: 'admin@example.com',
          subject: 'New Contact Form Submission from John Doe'
        })
      )
    })

    it('should work in simulation mode when API key is not configured', async () => {
      // Don't set RESEND_API_KEY
      const result = await submitContactForm(validFormData)

      expect(result.success).toBe(true)
      expect(result.message).toContain('Email simulation mode')
      expect(result.userEmailId).toBe('simulated')
      expect(result.adminEmailId).toBe('simulated')

      // Verify no actual emails were sent
      expect(mockSend).not.toHaveBeenCalled()
    })

    it('should handle email sending failures gracefully', async () => {
      process.env.RESEND_API_KEY = 'test-api-key'
      
      // Mock email send failure
      mockSend.mockRejectedValueOnce(new Error('Email service unavailable'))

      const result = await submitContactForm(validFormData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('server_error')
      expect(result.message).toContain('Something went wrong')
    })

    it('should handle rate limit errors specifically', async () => {
      process.env.RESEND_API_KEY = 'test-api-key'
      
      // Mock rate limit error
      mockSend.mockRejectedValueOnce(new Error('Rate limit exceeded - 429'))

      const result = await submitContactForm(validFormData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('rate_limit_error')
      expect(result.message).toContain('Too many requests')
    })
  })

  describe('Form validation', () => {
    it('should validate form data server-side', async () => {
      const invalidData = {
        ...validFormData,
        email: 'invalid-email',
        name: 'A' // Too short
      }

      const result = await submitContactForm(invalidData as ContactFormData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('validation_error')
      expect(result.message).toBe('Please check your form data and try again.')
    })

    it('should require sourceDetails for referral source', async () => {
      const dataWithReferral = {
        ...validFormData,
        source: 'referral' as const,
        sourceDetails: '' // Empty details should fail validation
      }

      const result = await submitContactForm(dataWithReferral)

      expect(result.success).toBe(false)
      expect(result.error).toBe('validation_error')
    })

    it('should accept valid referral data', async () => {
      process.env.RESEND_API_KEY = 'test-api-key'
      mockSend
        .mockResolvedValueOnce({ data: { id: 'user-email-id' } })
        .mockResolvedValueOnce({ data: { id: 'admin-email-id' } })

      const dataWithReferral = {
        ...validFormData,
        source: 'referral' as const,
        sourceDetails: 'Referred by Jane Smith'
      }

      const result = await submitContactForm(dataWithReferral)

      expect(result.success).toBe(true)
    })
  })

  describe('Email sequence integration', () => {
    it('should add user to email sequence after successful submission', async () => {
      process.env.RESEND_API_KEY = 'test-api-key'
      mockSend
        .mockResolvedValueOnce({ data: { id: 'user-email-id' } })
        .mockResolvedValueOnce({ data: { id: 'admin-email-id' } })

      const { addToEmailSequence } = require('@/lib/email-sequences')

      const result = await submitContactForm(validFormData)

      expect(result.success).toBe(true)
      expect(addToEmailSequence).toHaveBeenCalledWith(
        validFormData.email,
        validFormData.name,
        validFormData.projectType,
        expect.any(Date)
      )
    })

    it('should continue even if email sequence fails', async () => {
      process.env.RESEND_API_KEY = 'test-api-key'
      mockSend
        .mockResolvedValueOnce({ data: { id: 'user-email-id' } })
        .mockResolvedValueOnce({ data: { id: 'admin-email-id' } })

      const { addToEmailSequence } = require('@/lib/email-sequences')
      addToEmailSequence.mockRejectedValueOnce(new Error('Sequence service down'))

      const result = await submitContactForm(validFormData)

      expect(result.success).toBe(true) // Should still succeed
      expect(result.message).toBe("Thank you for your message! I'll get back to you soon.")
    })
  })

  describe('Error handling and logging', () => {
    it('should capture exceptions to Sentry', async () => {
      process.env.RESEND_API_KEY = 'test-api-key'
      mockSend.mockRejectedValueOnce(new Error('Unexpected error'))

      const Sentry = require('@sentry/nextjs')

      await submitContactForm(validFormData)

      expect(Sentry.captureException).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({
          tags: {
            action: 'contact_form_submission',
            component: 'server_action'
          },
          extra: expect.objectContaining({
            formData: validFormData,
            timestamp: expect.any(String)
          })
        })
      )
    })

    it('should handle missing required fields gracefully', async () => {
      const incompleteData = {
        name: 'John Doe',
        email: 'john@example.com'
        // Missing required fields
      }

      const result = await submitContactForm(incompleteData as any)

      expect(result.success).toBe(false)
      expect(result.error).toBe('validation_error')
    })
  })

  describe('Environment configuration', () => {
    it('should use default values when environment variables are not set', async () => {
      process.env.RESEND_API_KEY = 'test-api-key'
      // Don't set FROM_EMAIL or ADMIN_EMAIL
      
      mockSend
        .mockResolvedValueOnce({ data: { id: 'user-email-id' } })
        .mockResolvedValueOnce({ data: { id: 'admin-email-id' } })

      await submitContactForm(validFormData)

      // Check that default email addresses are used
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          from: 'rusan.adrian.ionut@gmail.com',
          to: 'john@example.com'
        })
      )

      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          from: 'noreply@adrian-rusan.com',
          to: 'rusan.adrian.ionut@gmail.com'
        })
      )
    })

    it('should detect placeholder API key', async () => {
      process.env.RESEND_API_KEY = 'your-resend-api-key-here'

      const result = await submitContactForm(validFormData)

      expect(result.success).toBe(true)
      expect(result.message).toContain('Email simulation mode')
      expect(mockSend).not.toHaveBeenCalled()
    })
  })
})