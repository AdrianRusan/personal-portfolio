import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import MagicButton from '@/components/ui/MagicButton'
import { FaLocationArrow } from 'react-icons/fa6'

describe('MagicButton', () => {
  it('renders with title and icon on right', () => {
    render(
      <MagicButton 
        title="Test Button" 
        icon={<FaLocationArrow />} 
        position="right" 
      />
    )
    
    expect(screen.getByText('Test Button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('renders with icon on left', () => {
    render(
      <MagicButton 
        title="Test Button" 
        icon={<FaLocationArrow />} 
        position="left" 
      />
    )
    
    expect(screen.getByText('Test Button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('renders without icon', () => {
    render(<MagicButton title="Test Button" />)
    
    expect(screen.getByText('Test Button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('applies additional CSS classes', () => {
    render(
      <MagicButton 
        title="Test Button" 
        otherClasses="custom-class" 
      />
    )
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('calls handleClick when clicked', () => {
    const handleClick = jest.fn()
    
    render(
      <MagicButton 
        title="Test Button" 
        handleClick={handleClick}
      />
    )
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('has default styling classes', () => {
    render(<MagicButton title="Test Button" />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('relative')
    expect(button).toHaveClass('inline-flex')
    expect(button).toHaveClass('h-12')
  })

  it('renders with icon and proper layout for right position', () => {
    render(
      <MagicButton 
        title="Test Button" 
        icon={<FaLocationArrow data-testid="icon" />} 
        position="right" 
      />
    )
    
    expect(screen.getByTestId('icon')).toBeInTheDocument()
    const span = screen.getByText('Test Button').closest('span')
    expect(span).toHaveClass('gap-2')
  })

  it('renders with icon and proper layout for left position', () => {
    render(
      <MagicButton 
        title="Test Button" 
        icon={<FaLocationArrow data-testid="icon" />} 
        position="left" 
      />
    )
    
    expect(screen.getByTestId('icon')).toBeInTheDocument()
    const span = screen.getByText('Test Button').closest('span')
    expect(span).toHaveClass('gap-2')
  })

  it('has animated background span', () => {
    render(<MagicButton title="Test Button" />)
    
    // Check for the animated background span
    const button = screen.getByRole('button')
    const animatedSpan = button.querySelector('.animate-\\[spin_2s_linear_infinite\\]')
    expect(animatedSpan).toBeInTheDocument()
  })

  it('handles undefined handleClick gracefully', () => {
    render(<MagicButton title="Test Button" />)
    
    const button = screen.getByRole('button')
    expect(() => fireEvent.click(button)).not.toThrow()
  })
})