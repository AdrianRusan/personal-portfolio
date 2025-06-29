import { render, screen, fireEvent } from '@testing-library/react'
import MagicButton from '@/components/ui/MagicButton'

// Mock the Button component
jest.mock('../../../components/ui/button', () => ({
  Button: ({ children, className, onClick, ...props }: any) => (
    <button className={className} onClick={onClick} {...props} data-testid="base-button">
      {children}
    </button>
  ),
}))

describe('MagicButton Component', () => {
  const mockIcon = <span data-testid="test-icon">🚀</span>
  const mockHandleClick = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Happy Path - Component Rendering', () => {
    it('renders button with title', () => {
      render(<MagicButton title="Test Button" icon={mockIcon} position="right" />)
      
      expect(screen.getByText('Test Button')).toBeInTheDocument()
    })

    it('renders icon in correct position - right', () => {
      render(<MagicButton title="Test Button" icon={mockIcon} position="right" />)
      
      const button = screen.getByTestId('base-button')
      const buttonText = button.textContent
      
      // Icon should appear after the title when position is 'right'
      expect(buttonText).toMatch(/Test Button.*🚀/)
    })

    it('renders icon in correct position - left', () => {
      render(<MagicButton title="Test Button" icon={mockIcon} position="left" />)
      
      const button = screen.getByTestId('base-button')
      const buttonText = button.textContent
      
      // Icon should appear before the title when position is 'left'
      expect(buttonText).toMatch(/🚀.*Test Button/)
    })

    it('has correct default styling classes', () => {
      render(<MagicButton title="Test Button" icon={mockIcon} position="right" />)
      
      const button = screen.getByTestId('base-button')
      expect(button).toHaveClass(
        'relative', 'w-full', 'inline-flex', 'h-12', 'overflow-hidden', 
        'rounded-lg', 'p-[1px]', 'focus:outline-none', 'md:w-60', 'md:mt-10'
      )
    })
  })

  describe('Click Interactions', () => {
    it('calls handleClick when button is clicked', () => {
      render(
        <MagicButton 
          title="Clickable Button" 
          icon={mockIcon} 
          position="right" 
          handleClick={mockHandleClick}
        />
      )
      
      const button = screen.getByTestId('base-button')
      fireEvent.click(button)
      
      expect(mockHandleClick).toHaveBeenCalledTimes(1)
    })

    it('does not throw error when clicked without handleClick prop', () => {
      render(<MagicButton title="Button" icon={mockIcon} position="right" />)
      
      const button = screen.getByTestId('base-button')
      expect(() => fireEvent.click(button)).not.toThrow()
    })
  })

  describe('Styling Variants', () => {
    it('applies custom classes when otherClasses prop is provided', () => {
      render(
        <MagicButton 
          title="Custom Button" 
          icon={mockIcon} 
          position="right" 
          otherClasses="custom-class"
        />
      )
      
      const innerSpan = screen.getByText('Custom Button').closest('span')
      expect(innerSpan).toHaveClass('custom-class')
    })

    it('has animated background span', () => {
      render(<MagicButton title="Animated Button" icon={mockIcon} position="right" />)
      
      const button = screen.getByTestId('base-button')
      const animatedSpan = button.querySelector('span[class*="animate-[spin_2s_linear_infinite]"]')
      expect(animatedSpan).toBeInTheDocument()
    })

    it('has gradient background styling', () => {
      render(<MagicButton title="Gradient Button" icon={mockIcon} position="right" />)
      
      const button = screen.getByTestId('base-button')
      const gradientSpan = button.querySelector('span[class*="bg-[conic-gradient"]')
      expect(gradientSpan).toBeInTheDocument()
    })
  })

  describe('Icon Positioning', () => {
    it('only shows icon on the specified side', () => {
      const { rerender } = render(
        <MagicButton title="Test" icon={mockIcon} position="left" />
      )
      
      let button = screen.getByTestId('base-button')
      let textContent = button.textContent
      expect(textContent).toMatch(/🚀.*Test/)
      expect(textContent).not.toMatch(/Test.*🚀.*Test/) // Should not appear twice
      
      rerender(<MagicButton title="Test" icon={mockIcon} position="right" />)
      
      button = screen.getByTestId('base-button')
      textContent = button.textContent
      expect(textContent).toMatch(/Test.*🚀/)
      expect(textContent).not.toMatch(/🚀.*Test.*🚀/) // Should not appear twice
    })
  })

  describe('Accessibility', () => {
    it('maintains button semantics', () => {
      render(<MagicButton title="Accessible Button" icon={mockIcon} position="right" />)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Accessible Button')
    })

    it('has focus outline styling', () => {
      render(<MagicButton title="Focus Button" icon={mockIcon} position="right" />)
      
      const button = screen.getByTestId('base-button')
      expect(button).toHaveClass('focus:outline-none')
    })

    it('is keyboard accessible', () => {
      render(
        <MagicButton 
          title="Keyboard Button" 
          icon={mockIcon} 
          position="right" 
          handleClick={mockHandleClick}
        />
      )
      
      const button = screen.getByRole('button')
      button.focus()
      fireEvent.keyDown(button, { key: 'Enter' })
      fireEvent.keyUp(button, { key: 'Enter' })
      
      // The button should be focusable
      expect(document.activeElement).toBe(button)
    })
  })

  describe('Edge Cases', () => {
    it('handles empty title gracefully', () => {
      render(<MagicButton title="" icon={mockIcon} position="right" />)
      
      const button = screen.getByTestId('base-button')
      expect(button).toBeInTheDocument()
    })

    it('handles null icon gracefully', () => {
      render(<MagicButton title="No Icon Button" icon={null} position="right" />)
      
      expect(screen.getByText('No Icon Button')).toBeInTheDocument()
    })

    it('handles undefined position gracefully', () => {
      render(<MagicButton title="Button" icon={mockIcon} position={undefined as any} />)
      
      expect(screen.getByText('Button')).toBeInTheDocument()
    })
  })

  describe('Responsive Behavior', () => {
    it('has responsive width classes', () => {
      render(<MagicButton title="Responsive Button" icon={mockIcon} position="right" />)
      
      const button = screen.getByTestId('base-button')
      expect(button).toHaveClass('w-full', 'md:w-60')
    })

    it('has responsive margin classes', () => {
      render(<MagicButton title="Responsive Button" icon={mockIcon} position="right" />)
      
      const button = screen.getByTestId('base-button')
      expect(button).toHaveClass('md:mt-10')
    })
  })
})