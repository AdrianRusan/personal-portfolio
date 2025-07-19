import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '@/components/ui/Input'

describe('Input', () => {
  it('renders with label and input field', () => {
    render(<Input label="Test Label" />)
    
    expect(screen.getByText('Test Label')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders with required indicator when isRequired is true', () => {
    render(<Input label="Test Label" isRequired />)
    
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('renders with placeholder text', () => {
    render(<Input label="Test Label" placeholder="Enter text here" />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('placeholder', 'Enter text here')
  })

  it('renders with error message', () => {
    render(<Input label="Test Label" error="This field is required" />)
    
    expect(screen.getByText('This field is required')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveClass('border-red-500')
  })

  it('renders different input types', () => {
    const { rerender } = render(<Input label="Email" type="email" />)
    
    let input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('type', 'email')
    
    rerender(<Input label="Password" type="password" />)
    input = screen.getByLabelText('Password')
    expect(input).toHaveAttribute('type', 'password')
    
    rerender(<Input label="Phone" type="tel" />)
    input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('type', 'tel')
  })

  it('handles user input correctly', async () => {
    const user = userEvent.setup()
    render(<Input label="Test Label" />)
    
    const input = screen.getByRole('textbox')
    await user.type(input, 'Hello World')
    
    expect(input).toHaveValue('Hello World')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input label="Test Label" ref={ref} />)
    
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('applies custom className', () => {
    render(<Input label="Test Label" className="custom-input" />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('custom-input')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Input label="Test Label" disabled />)
    
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
    expect(input).toHaveClass('cursor-not-allowed', 'opacity-50')
  })

  it('shows error state styling when error is present', () => {
    render(<Input label="Test Label" error="Error message" />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-red-500')
    expect(input).toHaveClass('focus:border-red-500')
  })

  it('shows normal state styling when no error', () => {
    render(<Input label="Test Label" />)
    
    const input = screen.getByRole('textbox')
    expect(input).not.toHaveClass('border-red-500')
    expect(input).toHaveClass('border-white/20')
  })

  it('has proper accessibility attributes', () => {
    render(<Input label="Test Label" isRequired error="Error message" />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-describedby', expect.stringContaining('error'))
  })

  it('links label to input with htmlFor', () => {
    render(<Input label="Test Label" />)
    
    const label = screen.getByText('Test Label')
    const input = screen.getByRole('textbox')
    
    expect(label).toHaveAttribute('for', input.id)
  })

  it('handles focus and blur events', () => {
    const onFocus = jest.fn()
    const onBlur = jest.fn()
    
    render(<Input label="Test Label" onFocus={onFocus} onBlur={onBlur} />)
    
    const input = screen.getByRole('textbox')
    
    fireEvent.focus(input)
    expect(onFocus).toHaveBeenCalledTimes(1)
    
    fireEvent.blur(input)
    expect(onBlur).toHaveBeenCalledTimes(1)
  })
})