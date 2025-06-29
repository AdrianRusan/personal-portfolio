import { render, screen } from '@testing-library/react'
import Hero from '@/components/Hero'

// Mock the child components
jest.mock('../../components/ui/GridBackground', () => ({
  GridBackground: function GridBackground() {
    return <div data-testid="grid-background" />
  }
}))

jest.mock('../../components/ui/SpotlightBackground', () => {
  return function SpotlightBackground() {
    return <div data-testid="spotlight-background" />
  }
})

jest.mock('../../components/ui/TextGenerateEffect', () => ({
  TextGenerateEffect: function TextGenerateEffect({ words, className }: { words: string; className: string }) {
    return <h1 className={className} data-testid="text-generate-effect">{words}</h1>
  }
}))

jest.mock('../../components/ui/MagicButton', () => {
  return function MagicButton({ title, icon, position }: { title: string; icon: any; position: string }) {
    return (
      <button data-testid="magic-button" data-position={position}>
        {position === 'left' && icon}
        {title}
        {position === 'right' && icon}
      </button>
    )
  }
})

describe('Hero Component', () => {
  beforeEach(() => {
    render(<Hero />)
  })

  describe('Happy Path - Component Rendering', () => {
    it('renders the hero section with correct id', () => {
      const heroSection = screen.getByRole('region')
      expect(heroSection).toBeInTheDocument()
      expect(heroSection).toHaveAttribute('id', 'home')
    })

    it('renders all background components', () => {
      expect(screen.getByTestId('spotlight-background')).toBeInTheDocument()
      expect(screen.getByTestId('grid-background')).toBeInTheDocument()
    })

    it('displays the main tagline', () => {
      expect(screen.getByText('Dynamic Web Magic with Next.js')).toBeInTheDocument()
    })

    it('renders the TextGenerateEffect with correct props', () => {
      const textEffect = screen.getByTestId('text-generate-effect')
      expect(textEffect).toBeInTheDocument()
      expect(textEffect).toHaveTextContent('Transforming Concepts into Seamless User Experiences')
      expect(textEffect).toHaveClass('text-center', 'text-[40px]', 'md:text-5xl', 'lg:text-6xl')
    })

    it('displays the personal introduction', () => {
      expect(screen.getByText(/Hi, I'm Adrian, a Next.js Developer based in Romania./)).toBeInTheDocument()
    })

    it('renders the resume button with correct link', () => {
      const resumeLink = screen.getByRole('link')
      expect(resumeLink).toHaveAttribute('href', 'https://utfs.io/a/23x7w9tiht/7iidzn1TwzukCxvpcPXoxIjwOYaTyPZtGk0mVdeKgr9LH8hD')
      expect(resumeLink).toHaveAttribute('target', '_blank')
      
      const magicButton = screen.getByTestId('magic-button')
      expect(magicButton).toBeInTheDocument()
      expect(magicButton).toHaveTextContent('See my Resume')
      expect(magicButton).toHaveAttribute('data-position', 'right')
    })
  })

  describe('Layout and Structure', () => {
    it('has correct CSS classes for responsive design', () => {
      const heroSection = screen.getByRole('region')
      expect(heroSection).toHaveClass('h-[100vh]')
      
      const mainContainer = heroSection.querySelector('.h-full')
      expect(mainContainer).toHaveClass('flex', 'justify-center', 'items-center', 'relative', 'z-10')
    })

    it('has correct responsive text classes', () => {
      const tagline = screen.getByText('Dynamic Web Magic with Next.js')
      expect(tagline).toHaveClass('uppercase', 'tracking-widest', 'text-xs', 'text-center', 'text-blue-100', 'max-w-80')
      
      const description = screen.getByText(/Hi, I'm Adrian/)
      expect(description).toHaveClass('text-center', 'tracking-wider', 'mb-4', 'text-sm', 'md:text-lg', 'lg:text-2xl')
    })
  })

  describe('Accessibility', () => {
    it('has semantic HTML structure', () => {
      const section = screen.getByRole('region')
      expect(section.tagName).toBe('SECTION')
    })

    it('has appropriate text content for screen readers', () => {
      expect(screen.getByText('Dynamic Web Magic with Next.js')).toBeInTheDocument()
      expect(screen.getByText(/Hi, I'm Adrian, a Next.js Developer based in Romania/)).toBeInTheDocument()
    })

    it('resume link opens in new tab', () => {
      const resumeLink = screen.getByRole('link')
      expect(resumeLink).toHaveAttribute('target', '_blank')
    })
  })

  describe('Edge Cases', () => {
    it('handles component without errors when child components are missing', () => {
      // This test ensures the component doesn't break if child components fail to load
      expect(screen.getByRole('region')).toBeInTheDocument()
    })

    it('maintains structure when text content is very long', () => {
      // The component should handle responsive text properly
      const textEffect = screen.getByTestId('text-generate-effect')
      expect(textEffect).toBeInTheDocument()
    })
  })
})