import { contactFormSchema, type ContactFormData } from '@/lib/schemas/contactForm'

describe('contactFormSchema', () => {
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

  describe('name validation', () => {
    it('should accept valid names', () => {
      const result = contactFormSchema.safeParse(validFormData)
      expect(result.success).toBe(true)
    })

    it('should reject names that are too short', () => {
      const result = contactFormSchema.safeParse({
        ...validFormData,
        name: 'A'
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Name must be at least 2 characters')
      }
    })

    it('should reject names that are too long', () => {
      const result = contactFormSchema.safeParse({
        ...validFormData,
        name: 'A'.repeat(51)
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Name must be less than 50 characters')
      }
    })

    it('should reject names with invalid characters', () => {
      const result = contactFormSchema.safeParse({
        ...validFormData,
        name: 'John123'
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Name can only contain letters, spaces, hyphens, and apostrophes')
      }
    })

    it('should accept names with valid special characters', () => {
      const validNames = ["John O'Connor", "Mary-Jane Smith", "José María"]
      
      validNames.forEach(name => {
        const result = contactFormSchema.safeParse({
          ...validFormData,
          name
        })
        expect(result.success).toBe(true)
      })
    })
  })

  describe('email validation', () => {
    it('should accept valid email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user+tag@domain.co.uk',
        'first.last@subdomain.domain.com'
      ]
      
      validEmails.forEach(email => {
        const result = contactFormSchema.safeParse({
          ...validFormData,
          email
        })
        expect(result.success).toBe(true)
      })
    })

    it('should reject invalid email addresses', () => {
      const invalidEmails = [
        'invalid-email',
        '@domain.com',
        'user@',
        'user space@domain.com'
      ]
      
      invalidEmails.forEach(email => {
        const result = contactFormSchema.safeParse({
          ...validFormData,
          email
        })
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues[0].message).toBe('Please enter a valid email address')
        }
      })
    })
  })

  describe('phone validation', () => {
    it('should accept valid phone numbers', () => {
      const validPhones = [
        '+1-555-123-4567',
        '(555) 123-4567',
        '555.123.4567',
        '5551234567',
        '+44 20 7123 4567'
      ]
      
      validPhones.forEach(phone => {
        const result = contactFormSchema.safeParse({
          ...validFormData,
          phone
        })
        expect(result.success).toBe(true)
      })
    })

    it('should accept empty phone number', () => {
      const result = contactFormSchema.safeParse({
        ...validFormData,
        phone: ''
      })
      expect(result.success).toBe(true)
    })

    it('should reject invalid phone numbers', () => {
      const result = contactFormSchema.safeParse({
        ...validFormData,
        phone: '123'
      })
      expect(result.success).toBe(false)
    })
  })

  describe('projectType validation', () => {
    it('should accept valid project types', () => {
      const validTypes: ContactFormData['projectType'][] = [
        'web-development',
        'consultation',
        'maintenance',
        'e-commerce',
        'mobile-app',
        'other'
      ]
      
      validTypes.forEach(projectType => {
        const result = contactFormSchema.safeParse({
          ...validFormData,
          projectType
        })
        expect(result.success).toBe(true)
      })
    })

    it('should reject invalid project types', () => {
      const result = contactFormSchema.safeParse({
        ...validFormData,
        projectType: 'invalid-type' as any
      })
      expect(result.success).toBe(false)
    })
  })

  describe('budget validation', () => {
    it('should accept valid budget ranges', () => {
      const validBudgets: ContactFormData['budget'][] = [
        'under-5k',
        '5k-15k',
        '15k-30k',
        '30k-50k',
        '50k+',
        'discuss'
      ]
      
      validBudgets.forEach(budget => {
        const result = contactFormSchema.safeParse({
          ...validFormData,
          budget
        })
        expect(result.success).toBe(true)
      })
    })
  })

  describe('timeline validation', () => {
    it('should accept valid timelines', () => {
      const validTimelines: ContactFormData['timeline'][] = [
        'asap',
        '1-month',
        '2-3-months',
        '3-6-months',
        'flexible'
      ]
      
      validTimelines.forEach(timeline => {
        const result = contactFormSchema.safeParse({
          ...validFormData,
          timeline
        })
        expect(result.success).toBe(true)
      })
    })
  })

  describe('description validation', () => {
    it('should accept valid descriptions', () => {
      const result = contactFormSchema.safeParse({
        ...validFormData,
        description: 'This is a valid description with enough characters'
      })
      expect(result.success).toBe(true)
    })

    it('should reject descriptions that are too short', () => {
      const result = contactFormSchema.safeParse({
        ...validFormData,
        description: 'Short'
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Description must be at least 10 characters')
      }
    })

    it('should reject descriptions that are too long', () => {
      const result = contactFormSchema.safeParse({
        ...validFormData,
        description: 'A'.repeat(1001)
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Description must be less than 1000 characters')
      }
    })
  })

  describe('source validation', () => {
    it('should accept valid sources', () => {
      const validSources: ContactFormData['source'][] = [
        'google',
        'linkedin',
        'github',
        'referral',
        'direct',
        'other'
      ]
      
      validSources.forEach(source => {
        const result = contactFormSchema.safeParse({
          ...validFormData,
          source,
          sourceDetails: source === 'referral' || source === 'other' ? 'Some details' : ''
        })
        expect(result.success).toBe(true)
      })
    })
  })

  describe('sourceDetails validation with refinement', () => {
    it('should require sourceDetails when source is "referral"', () => {
      const result = contactFormSchema.safeParse({
        ...validFormData,
        source: 'referral',
        sourceDetails: ''
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Please provide details when selecting "referral" or "other" as source')
        expect(result.error.issues[0].path).toEqual(['sourceDetails'])
      }
    })

    it('should require sourceDetails when source is "other"', () => {
      const result = contactFormSchema.safeParse({
        ...validFormData,
        source: 'other',
        sourceDetails: ''
      })
      expect(result.success).toBe(false)
    })

    it('should accept sourceDetails when source is "referral"', () => {
      const result = contactFormSchema.safeParse({
        ...validFormData,
        source: 'referral',
        sourceDetails: 'Referred by John Smith'
      })
      expect(result.success).toBe(true)
    })

    it('should not require sourceDetails for other sources', () => {
      const result = contactFormSchema.safeParse({
        ...validFormData,
        source: 'google',
        sourceDetails: ''
      })
      expect(result.success).toBe(true)
    })
  })

  describe('optional fields', () => {
    it('should accept form with minimal required fields', () => {
      const minimalData = {
        name: 'John Doe',
        email: 'john@example.com',
        projectType: 'web-development' as const,
        budget: '5k-15k' as const,
        timeline: '2-3-months' as const,
        description: 'I need a website',
        source: 'google' as const,
        company: '',
        phone: '',
        sourceDetails: ''
      }
      
      const result = contactFormSchema.safeParse(minimalData)
      expect(result.success).toBe(true)
    })
  })
})