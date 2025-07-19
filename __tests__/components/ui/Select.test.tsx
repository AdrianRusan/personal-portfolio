import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Select } from '@/components/ui/Select'

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
]

describe('Select', () => {
  it('renders with label and select field', () => {
    render(<Select label="Test Select" options={mockOptions} />)
    
    expect(screen.getByText('Test Select')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renders with required indicator when isRequired is true', () => {
    render(<Select label="Test Select" options={mockOptions} isRequired />)
    
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('renders with placeholder text', () => {
    render(
      <Select 
        label="Test Select" 
        options={mockOptions} 
        placeholder="Choose an option" 
      />
    )
    
    expect(screen.getByText('Choose an option')).toBeInTheDocument()
  })

  it('renders with error message', () => {
    render(
      <Select 
        label="Test Select" 
        options={mockOptions} 
        error="This field is required" 
      />
    )
    
    expect(screen.getByText('This field is required')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toHaveClass('border-red-500')
  })

  it('renders all option elements', () => {
    render(<Select label="Test Select" options={mockOptions} />)
    
    const select = screen.getByRole('combobox')
    const options = select.querySelectorAll('option')
    
    // Should have placeholder option + 3 data options
    expect(options).toHaveLength(4)
    expect(options[1]).toHaveTextContent('Option 1')
    expect(options[2]).toHaveTextContent('Option 2')
    expect(options[3]).toHaveTextContent('Option 3')
  })

  it('handles selection correctly', async () => {
    const onChange = jest.fn()
    render(
      <Select 
        label="Test Select" 
        options={mockOptions} 
        onChange={onChange}
      />
    )
    
    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: 'option2' } })
    
    expect(onChange).toHaveBeenCalled()
    expect(select).toHaveValue('option2')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLSelectElement>()
    render(<Select label="Test Select" options={mockOptions} ref={ref} />)
    
    expect(ref.current).toBeInstanceOf(HTMLSelectElement)
  })

  it('applies custom className', () => {
    render(
      <Select 
        label="Test Select" 
        options={mockOptions} 
        className="custom-select" 
      />
    )
    
    const select = screen.getByRole('combobox')
    expect(select).toHaveClass('custom-select')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Select label="Test Select" options={mockOptions} disabled />)
    
    const select = screen.getByRole('combobox')
    expect(select).toBeDisabled()
    expect(select).toHaveClass('cursor-not-allowed', 'opacity-50')
  })

  it('shows error state styling when error is present', () => {
    render(
      <Select 
        label="Test Select" 
        options={mockOptions} 
        error="Error message" 
      />
    )
    
    const select = screen.getByRole('combobox')
    expect(select).toHaveClass('border-red-500')
    expect(select).toHaveClass('focus:border-red-500')
  })

  it('shows normal state styling when no error', () => {
    render(<Select label="Test Select" options={mockOptions} />)
    
    const select = screen.getByRole('combobox')
    expect(select).not.toHaveClass('border-red-500')
    expect(select).toHaveClass('border-white/20')
  })

  it('has proper accessibility attributes', () => {
    render(
      <Select 
        label="Test Select" 
        options={mockOptions} 
        isRequired 
        error="Error message" 
      />
    )
    
    const select = screen.getByRole('combobox')
    expect(select).toHaveAttribute('aria-invalid', 'true')
    expect(select).toHaveAttribute('aria-describedby', expect.stringContaining('error'))
  })

  it('links label to select with htmlFor', () => {
    render(<Select label="Test Select" options={mockOptions} />)
    
    const label = screen.getByText('Test Select')
    const select = screen.getByRole('combobox')
    
    expect(label).toHaveAttribute('for', select.id)
  })

  it('renders with default value', () => {
    render(
      <Select 
        label="Test Select" 
        options={mockOptions} 
        defaultValue="option2"
      />
    )
    
    const select = screen.getByRole('combobox')
    expect(select).toHaveValue('option2')
  })

  it('handles empty options array', () => {
    render(<Select label="Test Select" options={[]} />)
    
    const select = screen.getByRole('combobox')
    const options = select.querySelectorAll('option')
    
    // Should only have placeholder option
    expect(options).toHaveLength(1)
  })

  it('handles focus and blur events', () => {
    const onFocus = jest.fn()
    const onBlur = jest.fn()
    
    render(
      <Select 
        label="Test Select" 
        options={mockOptions} 
        onFocus={onFocus} 
        onBlur={onBlur} 
      />
    )
    
    const select = screen.getByRole('combobox')
    
    fireEvent.focus(select)
    expect(onFocus).toHaveBeenCalledTimes(1)
    
    fireEvent.blur(select)
    expect(onBlur).toHaveBeenCalledTimes(1)
  })
})