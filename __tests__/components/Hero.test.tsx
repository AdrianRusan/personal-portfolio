import React from 'react'
import { render, screen } from '@testing-library/react'
import Hero from '@/components/Hero'

describe('Hero', () => {
  it('renders the hero section with all essential elements', () => {
    render(<Hero />)
    
    // Check for main heading (screen reader accessible) - there may be multiple h1s due to TextGenerateEffect
    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings.length).toBeGreaterThan(0)
    expect(headings[0]).toHaveTextContent('Adrian Rusan - Full-Stack Engineer Portfolio')
    
    // Check for tagline
    expect(screen.getByText('Dynamic Web Magic with Next.js')).toBeInTheDocument()
    
    // Check for main text effect words (TextGenerateEffect splits text into spans)
    expect(screen.getByText('Transforming')).toBeInTheDocument()
    expect(screen.getByText('Concepts')).toBeInTheDocument()
    expect(screen.getByText('Seamless')).toBeInTheDocument()
    
    // Check for description text
    expect(screen.getByText(/Hi, I'm/)).toBeInTheDocument()
    expect(screen.getByText(/Adrian Rusan/)).toBeInTheDocument()
    expect(screen.getByText(/Full-Stack Engineer/)).toBeInTheDocument()
    expect(screen.getByText(/Romania/)).toBeInTheDocument()
    expect(screen.getByText(/8 years of experience/)).toBeInTheDocument()
  })

  it('renders call-to-action buttons', () => {
    render(<Hero />)
    
    // Check for resume button
    const resumeLink = screen.getByRole('link', { name: /download.*resume/i })
    expect(resumeLink).toBeInTheDocument()
    expect(screen.getByText('See my Resume')).toBeInTheDocument()
    
    // Check for consultation button
    const consultationLink = screen.getByRole('link', { name: /schedule.*consultation/i })
    expect(consultationLink).toBeInTheDocument()
    expect(consultationLink).toHaveAttribute('href', 'https://calendly.com/adrian-rusan/30min')
    expect(consultationLink).toHaveAttribute('target', '_blank')
    expect(consultationLink).toHaveAttribute('rel', 'noopener noreferrer')
    expect(screen.getByText('Book Consultation')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<Hero />)
    
    // Check for section with proper aria-labelledby
    const section = screen.getByRole('region')
    expect(section).toHaveAttribute('aria-labelledby', 'hero-heading')
    
    // Check that links have proper aria-labels
    const resumeLink = screen.getByRole('link', { name: /download.*resume/i })
    const consultationLink = screen.getByRole('link', { name: /schedule.*consultation/i })
    
    expect(resumeLink).toHaveAttribute('aria-label')
    expect(consultationLink).toHaveAttribute('aria-label')
  })

  it('renders background components', () => {
    render(<Hero />)
    
    // The background components are rendered (they would be tested in their own test files)
    // We can verify the structure is correct
    const section = screen.getByRole('region')
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('h-[100vh]')
  })

  it('has proper semantic structure', () => {
    render(<Hero />)
    
    // Check for section element
    const heroSection = screen.getByRole('region')
    expect(heroSection).toHaveAttribute('id', 'home')
    
    // Check for proper heading hierarchy
    const headings = screen.getAllByRole('heading', { level: 1 })
    const heading = headings[0]
    expect(heading).toHaveAttribute('id', 'hero-heading')
    expect(heading).toHaveClass('sr-only') // Screen reader only
  })

  it('renders with responsive classes', () => {
    render(<Hero />)
    
    const section = screen.getByRole('region')
    expect(section).toHaveClass('h-[100vh]')
    
    // Check for responsive text sizing on the text generate effect
    const textContainer = section.querySelector('.text-center.text-\\[40px\\]')
    expect(textContainer).toHaveClass('md:text-5xl', 'lg:text-6xl')
  })

  it('renders buttons in responsive layout', () => {
    render(<Hero />)
    
    // Check that buttons are in a flex container
    const buttonContainer = screen.getByText('See my Resume').closest('.flex')
    expect(buttonContainer).toHaveClass('flex-col', 'sm:flex-row', 'gap-4')
  })
})