'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { TextArea } from '@/components/ui/TextArea';
import MagicButton from '@/components/ui/MagicButton';
import { 
  contactFormSchema, 
  ContactFormData,
  projectTypeOptions,
  budgetOptions,
  timelineOptions,
  sourceOptions
} from '@/lib/schemas/contactForm';
import { FaLocationArrow } from 'react-icons/fa6';
import { submitContactForm } from '@/app/actions/contact';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      description: '',
      sourceDetails: ''
    }
  });

  // Watch the source field for conditional rendering
  const watchedSource = watch('source');
  const showSourceDetails = watchedSource === 'referral' || watchedSource === 'other';

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Call the server action with form data
      const result = await submitContactForm(data);
      
      if (result.success) {
        toast.success(result.message);
        setSubmitted(true);
        reset();
      } else {
        // Handle different types of errors
        if (result.error === 'validation_error') {
          toast.error(result.message);
        } else if (result.error === 'rate_limit_error') {
          toast.error(result.message);
        } else {
          toast.error(result.message);
        }
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Something went wrong. Please try again or contact me directly at rusan.adrian.ionut@gmail.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
          <p className="text-white-200">
            Your message has been sent successfully. I&apos;ll review your project details and get back to you within 24 hours.
          </p>
        </div>
                 <MagicButton
           title="Send Another Message"
           icon={<FaLocationArrow />}
           position="right"
           handleClick={() => setSubmitted(false)}
         />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 text-center">
                 <h2 className="text-3xl font-bold text-white mb-4">Let&apos;s Work Together</h2>
         <p className="text-white-200">
           Tell me about your project and I&apos;ll get back to you with a personalized proposal.
         </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            {...register('name')}
            label="Full Name"
            placeholder="Your full name"
            error={errors.name?.message}
            isRequired
            data-testid="name-input"
          />
          
          <Input
            {...register('email')}
            type="email"
            label="Email Address"
            placeholder="your.email@example.com"
            error={errors.email?.message}
            isRequired
            data-testid="email-input"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            {...register('company')}
            label="Company"
            placeholder="Your company name (optional)"
            error={errors.company?.message}
          />
          
          <Input
            {...register('phone')}
            type="tel"
            label="Phone Number"
            placeholder="Your phone number (optional)"
            error={errors.phone?.message}
          />
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Select
            {...register('projectType')}
            label="Project Type"
            placeholder="Select project type"
            options={projectTypeOptions}
            error={errors.projectType?.message}
            isRequired
          />
          
          <Select
            {...register('budget')}
            label="Budget Range"
            placeholder="Select budget range"
            options={budgetOptions}
            error={errors.budget?.message}
            isRequired
          />
          
          <Select
            {...register('timeline')}
            label="Timeline"
            placeholder="Select timeline"
            options={timelineOptions}
            error={errors.timeline?.message}
            isRequired
          />
        </div>

        {/* Project Description */}
        <TextArea
          {...register('description')}
          label="Project Description"
          placeholder="Tell me about your project, goals, and any specific requirements..."
          error={errors.description?.message}
          isRequired
          rows={5}
        />

        {/* Source Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            {...register('source')}
            label="How did you find me?"
            placeholder="Select source"
            options={sourceOptions}
            error={errors.source?.message}
            isRequired
          />
          
          {showSourceDetails && (
            <Input
              {...register('sourceDetails')}
              label="Source Details"
              placeholder="Please provide details..."
              error={errors.sourceDetails?.message}
              isRequired
            />
          )}
        </div>

                 {/* Submit Button */}
         <div className="pt-6">
           <div onClick={handleSubmit(onSubmit)} className="cursor-pointer" data-testid="submit-button">
             <MagicButton
               title={isSubmitting ? 'Sending...' : 'Send Message'}
               icon={<FaLocationArrow />}
               position="right"
               otherClasses={isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
             />
           </div>
         </div>
      </form>
    </div>
  );
};

export default ContactForm; 