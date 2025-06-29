import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

// Mock all the dynamic components
jest.mock('../../components/Hero', () => {
  return function Hero() {
    return <div data-testid="hero-component" />
  }
})

jest.mock('../../components/About', () => {
  return function About() {
    return <div data-testid="about-component" />
  }
})

jest.mock('../../components/Projects', () => {
  return function Projects() {
    return <div data-testid="projects-component" />
  }
})

jest.mock('../../components/Experience', () => {
  return function Experience() {
    return <div data-testid="experience-component" />
  }
})

jest.mock('../../components/Approach', () => {
  return function Approach() {
    return <div data-testid="approach-component" />
  }
})

jest.mock('../../components/Testimonials', () => {
  return function Testimonials() {
    return <div data-testid="testimonials-component" />
  }
})

jest.mock('../../components/Footer', () => {
  return function Footer() {
    return <div data-testid="footer-component" />
  }
})

jest.mock('../../components/ui/FloatingNav', () => ({
  FloatingNav: ({ navItems }: any) => (
    <nav data-testid="floating-nav">
      {navItems.map((item: any) => (
        <a key={item.name} href={item.link}>{item.name}</a>
      ))}
    </nav>
  ),
}))

jest.mock('../../data', () => ({
  navItems: [
    { name: 'Home', link: '#home' },
    { name: 'About', link: '#about' },
    { name: 'Experience', link: '#experience' },
    { name: 'Contact', link: '#contact' },
  ]
}))

describe('Home Page', () => {
  beforeEach(() => {
    render(<Home />)
  })

  describe('Component Rendering', () => {
    it('renders the main page structure', () => {
      expect(screen.getByRole('main')).toBeInTheDocument()
      expect(screen.getByRole('main')).toHaveClass('relative', 'dark:bg-black-100', 'bg-white')
    })

    it('renders FloatingNav component', () => {
      expect(screen.getByTestId('floating-nav')).toBeInTheDocument()
    })

    it('renders Hero component', () => {
      expect(screen.getByTestId('hero-component')).toBeInTheDocument()
    })

    it('has experience section with correct id', () => {
      const experienceSection = screen.getByRole('main').querySelector('#experience')
      expect(experienceSection).toBeInTheDocument()
    })

    it('has proper responsive layout classes', () => {
      const mainContainer = screen.getByRole('main').querySelector('.max-w-7xl')
      expect(mainContainer).toHaveClass('max-w-7xl', 'w-full')
    })
  })

  describe('Navigation', () => {
    it('renders navigation items', () => {
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('About')).toBeInTheDocument()
      expect(screen.getByText('Experience')).toBeInTheDocument()
      expect(screen.getByText('Contact')).toBeInTheDocument()
    })

    it('has correct navigation links', () => {
      const homeLink = screen.getByRole('link', { name: 'Home' })
      const aboutLink = screen.getByRole('link', { name: 'About' })
      
      expect(homeLink).toHaveAttribute('href', '#home')
      expect(aboutLink).toHaveAttribute('href', '#about')
    })
  })

  describe('Page Structure', () => {
    it('maintains proper semantic structure', () => {
      expect(screen.getByRole('main')).toBeInTheDocument()
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    it('has overflow handling for animations', () => {
      expect(screen.getByRole('main')).toHaveClass('overflow-hidden')
    })

    it('has responsive padding', () => {
      expect(screen.getByRole('main')).toHaveClass('px-5', 'sm:px-10')
    })
  })
})