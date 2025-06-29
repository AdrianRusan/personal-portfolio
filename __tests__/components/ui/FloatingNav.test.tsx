import { render, screen } from '@testing-library/react'
import { FloatingNav } from '@/components/ui/FloatingNav'

const mockNavItems = [
  { name: 'Home', link: '#home' },
  { name: 'About', link: '#about' },
  { name: 'Projects', link: '#projects' },
  { name: 'Contact', link: '#contact' },
]

describe('FloatingNav Component', () => {
  describe('Happy Path - Component Rendering', () => {
    it('renders all navigation items', () => {
      render(<FloatingNav navItems={mockNavItems} />)
      mockNavItems.forEach(item => {
        expect(screen.getByText(item.name)).toBeInTheDocument()
      })
    })

    it('creates correct links for navigation items', () => {
      render(<FloatingNav navItems={mockNavItems} />)
      const links = screen.getAllByRole('link')
      expect(links).toHaveLength(mockNavItems.length)
      
      links.forEach((link, index) => {
        expect(link).toHaveAttribute('href', mockNavItems[index].link)
      })
    })

    it('has correct CSS classes for styling', () => {
      render(<FloatingNav navItems={mockNavItems} />)
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('floating-nav')
    })
  })

  describe('Navigation Behavior', () => {
    it('renders navigation with proper accessibility attributes', () => {
      render(<FloatingNav navItems={mockNavItems} />)
      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()
    })

    it('has appropriate hover states for links', () => {
      render(<FloatingNav navItems={mockNavItems} />)
      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link).toHaveClass('hover:text-neutral-500')
      })
    })
  })

  describe('Responsive Design', () => {
    it('has responsive width classes', () => {
      render(<FloatingNav navItems={mockNavItems} />)
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('max-w-fit', 'md:min-w-[70vw]', 'lg:min-w-fit')
    })

    it('has correct positioning classes', () => {
      render(<FloatingNav navItems={mockNavItems} />)
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('fixed', 'z-[5000]', 'top-10', 'inset-x-0', 'mx-auto')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty navigation items array', () => {
      render(<FloatingNav navItems={[]} />)
      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()
    })

    it('handles navigation items with icons', () => {
      const navItemsWithIcons = [
        { name: 'Home', link: '#home', icon: <span data-testid="home-icon">🏠</span> },
      ]
      
      render(<FloatingNav navItems={navItemsWithIcons} />)
      expect(screen.getByTestId('home-icon')).toBeInTheDocument()
    })

    it('applies custom className when provided', () => {
      render(<FloatingNav navItems={mockNavItems} className="custom-nav" />)
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('custom-nav')
    })
  })

  describe('Accessibility', () => {
    it('has semantic navigation structure', () => {
      render(<FloatingNav navItems={mockNavItems} />)
      const nav = screen.getByRole('navigation')
      expect(nav.tagName).toBe('NAV')
    })

    it('has proper link structure for screen readers', () => {
      render(<FloatingNav navItems={mockNavItems} />)
      const links = screen.getAllByRole('link')
      links.forEach((link, index) => {
        expect(link).toHaveTextContent(mockNavItems[index].name)
      })
    })
  })
})