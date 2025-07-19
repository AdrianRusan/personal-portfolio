import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  
  email: z.string()
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must be less than 100 characters'),
  
  company: z.string()
    .max(100, 'Company name must be less than 100 characters')
    .optional(),
  
  phone: z.string()
    .regex(/^[\+]?[0-9\s\-\(\)]{10,20}$/, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),
  
  projectType: z.enum([
    'web-development',
    'consultation', 
    'maintenance',
    'e-commerce',
    'mobile-app',
    'other'
  ], {
    required_error: 'Please select a project type',
    invalid_type_error: 'Please select a valid project type'
  }),
  
  budget: z.enum([
    'under-5k',
    '5k-15k',
    '15k-30k',
    '30k-50k',
    '50k+',
    'discuss'
  ], {
    required_error: 'Please select a budget range',
    invalid_type_error: 'Please select a valid budget range'
  }),
  
  timeline: z.enum([
    'asap',
    '1-month',
    '2-3-months',
    '3-6-months',
    'flexible'
  ], {
    required_error: 'Please select a timeline',
    invalid_type_error: 'Please select a valid timeline'
  }),
  
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  
  source: z.enum([
    'google',
    'linkedin',
    'github',
    'referral',
    'direct',
    'other'
  ], {
    required_error: 'Please select how you found us',
    invalid_type_error: 'Please select a valid source'
  }),
  
  sourceDetails: z.string()
    .max(200, 'Source details must be less than 200 characters')
    .optional()
    .or(z.literal(''))
}).refine((data) => {
  // If source is 'referral' or 'other', sourceDetails should be provided
  if ((data.source === 'referral' || data.source === 'other') && !data.sourceDetails?.trim()) {
    return false;
  }
  return true;
}, {
  message: 'Please provide details when selecting "referral" or "other" as source',
  path: ['sourceDetails']
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Export individual field schemas for reusability
export const projectTypeOptions = [
  { value: 'web-development', label: 'Web Development' },
  { value: 'consultation', label: 'Consultation' },
  { value: 'maintenance', label: 'Website Maintenance' },
  { value: 'e-commerce', label: 'E-commerce Solution' },
  { value: 'mobile-app', label: 'Mobile App Development' },
  { value: 'other', label: 'Other' }
] as const;

export const budgetOptions = [
  { value: 'under-5k', label: 'Under $5,000' },
  { value: '5k-15k', label: '$5,000 - $15,000' },
  { value: '15k-30k', label: '$15,000 - $30,000' },
  { value: '30k-50k', label: '$30,000 - $50,000' },
  { value: '50k+', label: '$50,000+' },
  { value: 'discuss', label: 'Let\'s Discuss' }
] as const;

export const timelineOptions = [
  { value: 'asap', label: 'ASAP' },
  { value: '1-month', label: 'Within 1 Month' },
  { value: '2-3-months', label: '2-3 Months' },
  { value: '3-6-months', label: '3-6 Months' },
  { value: 'flexible', label: 'Flexible' }
] as const;

export const sourceOptions = [
  { value: 'google', label: 'Google Search' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'github', label: 'GitHub' },
  { value: 'referral', label: 'Referral' },
  { value: 'direct', label: 'Direct Visit' },
  { value: 'other', label: 'Other' }
] as const; 