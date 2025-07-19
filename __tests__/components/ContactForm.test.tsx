import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from '@/components/ContactForm'
import { submitContactForm } from '@/app/actions/contact'
import toast from 'react-hot-toast'

// Mock the server action
jest.mock('@/app/actions/contact', () => ({
  submitContactForm: jest.fn(),
}))

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}))

const mockedSubmitContactForm = submitContactForm as jest.MockedFunction<typeof submitContactForm>
const mockedToastSuccess = toast.success as jest.MockedFunction<typeof toast.success>
const mockedToastError = toast.error as jest.MockedFunction<typeof toast.error>

describe('ContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the contact form with all required fields', () => {
    render(<ContactForm />)
    
    expect(screen.getByText("Let's Work Together")).toBeInTheDocument()
    expect(screen.getByTestId('name-input')).toBeInTheDocument()
    expect(screen.getByTestId('email-input')).toBeInTheDocument()
    expect(screen.getByText('Project Type')).toBeInTheDocument()
    expect(screen.getByText('Budget Range')).toBeInTheDocument()
    expect(screen.getByText('Timeline')).toBeInTheDocument()
    expect(screen.getByText('Project Description')).toBeInTheDocument()
    expect(screen.getByText('How did you find me?')).toBeInTheDocument()
    expect(screen.getByTestId('submit-button')).toBeInTheDocument()
  })

  it('shows validation errors for empty required fields', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const submitButton = screen.getByTestId('submit-button')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument()
      expect(screen.getByText('Email is required')).toBeInTheDocument()
      expect(screen.getByText('Project type is required')).toBeInTheDocument()
      expect(screen.getByText('Budget is required')).toBeInTheDocument()
      expect(screen.getByText('Timeline is required')).toBeInTheDocument()
      expect(screen.getByText('Project description is required')).toBeInTheDocument()
      expect(screen.getByText('Source is required')).toBeInTheDocument()
    })
  })

  it('validates email format', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const emailInput = screen.getByTestId('email-input')
    await user.type(emailInput, 'invalid-email')
    
    const submitButton = screen.getByTestId('submit-button')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
    })
  })

  it('shows source details field when referral or other is selected', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    // Select referral as source
    const sourceSelect = screen.getByRole('combobox', { name: /how did you find me/i })
    await user.selectOptions(sourceSelect, 'referral')
    
    await waitFor(() => {
      expect(screen.getByText('Source Details')).toBeInTheDocument()
    })
  })

  it('submits form successfully with valid data', async () => {
    const user = userEvent.setup()
    mockedSubmitContactForm.mockResolvedValueOnce({
      success: true,
      message: 'Message sent successfully!'
    })

    render(<ContactForm />)
    
    // Fill out the form
    await user.type(screen.getByTestId('name-input'), 'John Doe')
    await user.type(screen.getByTestId('email-input'), 'john@example.com')
    
    // Select dropdowns
    await user.selectOptions(screen.getByRole('combobox', { name: /project type/i }), 'web-development')
    await user.selectOptions(screen.getByRole('combobox', { name: /budget range/i }), '5000-10000')
    await user.selectOptions(screen.getByRole('combobox', { name: /timeline/i }), '1-3-months')
    await user.selectOptions(screen.getByRole('combobox', { name: /how did you find me/i }), 'linkedin')
    
    // Fill description
    await user.type(screen.getByRole('textbox', { name: /project description/i }), 'I need a new website')
    
    // Submit form
    const submitButton = screen.getByTestId('submit-button')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(mockedSubmitContactForm).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        company: '',
        phone: '',
        projectType: 'web-development',
        budget: '5000-10000',
        timeline: '1-3-months',
        description: 'I need a new website',
        source: 'linkedin',
        sourceDetails: ''
      })
      expect(mockedToastSuccess).toHaveBeenCalledWith('Message sent successfully!')
    })
  })

  it('handles submission errors', async () => {
    const user = userEvent.setup()
    mockedSubmitContactForm.mockResolvedValueOnce({
      success: false,
      error: 'validation_error',
      message: 'Validation failed'
    })

    render(<ContactForm />)
    
    // Fill out minimum required fields
    await user.type(screen.getByTestId('name-input'), 'John Doe')
    await user.type(screen.getByTestId('email-input'), 'john@example.com')
    await user.selectOptions(screen.getByRole('combobox', { name: /project type/i }), 'web-development')
    await user.selectOptions(screen.getByRole('combobox', { name: /budget range/i }), '5000-10000')
    await user.selectOptions(screen.getByRole('combobox', { name: /timeline/i }), '1-3-months')
    await user.selectOptions(screen.getByRole('combobox', { name: /how did you find me/i }), 'linkedin')
    await user.type(screen.getByRole('textbox', { name: /project description/i }), 'Test description')
    
    // Submit form
    const submitButton = screen.getByTestId('submit-button')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(mockedToastError).toHaveBeenCalledWith('Validation failed')
    })
  })

  it('shows success message after successful submission', async () => {
    const user = userEvent.setup()
    mockedSubmitContactForm.mockResolvedValueOnce({
      success: true,
      message: 'Message sent successfully!'
    })

    render(<ContactForm />)
    
    // Fill and submit form (using minimum required fields)
    await user.type(screen.getByTestId('name-input'), 'John Doe')
    await user.type(screen.getByTestId('email-input'), 'john@example.com')
    await user.selectOptions(screen.getByRole('combobox', { name: /project type/i }), 'web-development')
    await user.selectOptions(screen.getByRole('combobox', { name: /budget range/i }), '5000-10000')
    await user.selectOptions(screen.getByRole('combobox', { name: /timeline/i }), '1-3-months')
    await user.selectOptions(screen.getByRole('combobox', { name: /how did you find me/i }), 'linkedin')
    await user.type(screen.getByRole('textbox', { name: /project description/i }), 'Test description')
    
    const submitButton = screen.getByTestId('submit-button')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Thank You!')).toBeInTheDocument()
      expect(screen.getByText(/Your message has been sent successfully/)).toBeInTheDocument()
      expect(screen.getByText('Send Another Message')).toBeInTheDocument()
    })
  })

  it('allows user to send another message after success', async () => {
    const user = userEvent.setup()
    mockedSubmitContactForm.mockResolvedValueOnce({
      success: true,
      message: 'Message sent successfully!'
    })

    render(<ContactForm />)
    
    // Submit form successfully (abbreviated for brevity)
    await user.type(screen.getByTestId('name-input'), 'John Doe')
    await user.type(screen.getByTestId('email-input'), 'john@example.com')
    await user.selectOptions(screen.getByRole('combobox', { name: /project type/i }), 'web-development')
    await user.selectOptions(screen.getByRole('combobox', { name: /budget range/i }), '5000-10000')
    await user.selectOptions(screen.getByRole('combobox', { name: /timeline/i }), '1-3-months')
    await user.selectOptions(screen.getByRole('combobox', { name: /how did you find me/i }), 'linkedin')
    await user.type(screen.getByRole('textbox', { name: /project description/i }), 'Test description')
    
    await user.click(screen.getByTestId('submit-button'))
    
    await waitFor(() => {
      expect(screen.getByText('Send Another Message')).toBeInTheDocument()
    })
    
    // Click "Send Another Message"
    await user.click(screen.getByText('Send Another Message'))
    
    await waitFor(() => {
      expect(screen.getByText("Let's Work Together")).toBeInTheDocument()
      expect(screen.getByTestId('contact-form')).toBeInTheDocument()
    })
  })

  it('disables submit button while submitting', async () => {
    const user = userEvent.setup()
    mockedSubmitContactForm.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)))

    render(<ContactForm />)
    
    // Fill form
    await user.type(screen.getByTestId('name-input'), 'John Doe')
    await user.type(screen.getByTestId('email-input'), 'john@example.com')
    await user.selectOptions(screen.getByRole('combobox', { name: /project type/i }), 'web-development')
    await user.selectOptions(screen.getByRole('combobox', { name: /budget range/i }), '5000-10000')
    await user.selectOptions(screen.getByRole('combobox', { name: /timeline/i }), '1-3-months')
    await user.selectOptions(screen.getByRole('combobox', { name: /how did you find me/i }), 'linkedin')
    await user.type(screen.getByRole('textbox', { name: /project description/i }), 'Test description')
    
    // Submit form
    const submitButton = screen.getByTestId('submit-button')
    await user.click(submitButton)
    
    // Check that button shows "Sending..." state
    await waitFor(() => {
      expect(screen.getByText('Sending...')).toBeInTheDocument()
    })
  })
})