import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RegistrationForm } from './RegistrationForm'

describe('RegistrationForm', () => {
  it('renders all form fields', () => {
    render(<RegistrationForm />)
    
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/mobile phone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument()
  })

  it('submit button is disabled initially', () => {
    render(<RegistrationForm />)
    
    const submitButton = screen.getByRole('button', { name: /register/i })
    expect(submitButton).toBeDisabled()
  })

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup()
    render(<RegistrationForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    await user.type(emailInput, 'invalid-email')
    await user.tab()
    
    expect(await screen.findByText(/invalid email address/i)).toBeInTheDocument()
  })

  it('shows validation error for short mobile phone', async () => {
    const user = userEvent.setup()
    render(<RegistrationForm />)
    
    const phoneInput = screen.getByLabelText(/mobile phone/i)
    await user.type(phoneInput, '123')
    await user.tab()
    
    expect(await screen.findByText(/phone number must be at least 10 digits/i)).toBeInTheDocument()
  })

  it('shows error when passwords do not match', async () => {
    const user = userEvent.setup()
    render(<RegistrationForm />)
    
    const passwordInput = screen.getByLabelText(/^password$/i)
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)
    
    await user.type(passwordInput, 'Password123')
    await user.type(confirmPasswordInput, 'Password456')
    await user.tab()
    
    expect(await screen.findByText(/passwords don't match/i)).toBeInTheDocument()
  })

  it('enables submit button when all fields are valid', async () => {
    const user = userEvent.setup()
    render(<RegistrationForm />)
    
    await user.type(screen.getByLabelText(/full name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/mobile phone/i), '+6281234567890')
    await user.type(screen.getByLabelText(/^password$/i), 'Password123')
    await user.type(screen.getByLabelText(/confirm password/i), 'Password123')
    
    const submitButton = screen.getByRole('button', { name: /register/i })
    expect(submitButton).toBeEnabled()
  })
})
