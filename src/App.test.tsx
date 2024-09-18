import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vitest } from 'vitest'
import App from './App'
import '@testing-library/jest-dom'

describe('App Component', () => {

  // Mock i18next with withTranslation HOC
  vitest.mock('./i18n', () => ({
    withTranslation: () => (Component: React.ComponentType<{ t: (key: string, options?: { email?: string }) => string }>) =>
      (props: Omit<React.ComponentProps<typeof Component>, 't'>) => (
        <Component
          t={(key: string, options?: { email?: string }) => {
            if (key === "confirmation.message" && options?.email) {
              return `A confirmation email has been sent to ${options.email}`
            }
            return key
          }}
          {...props}
        />
      ),
  }))

  it('renders Signup component initially and not Confirmation', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'signUp.stayUpdated' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'confirmation.thanks' })).not.toBeInTheDocument()
  })

  it('displays Confirmation component with entered email address after form submission', async () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText('signUp.emailAddress'), { target: { value: 'test@test.com' } })
    fireEvent.click(screen.getByRole('button', { name: 'signUp.submitButton' }))
    fireEvent.animationEnd(screen.getByTestId('sign-up'))

    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: 'signUp.stayUpdated' })).not.toBeInTheDocument()
    })

    expect(screen.getByRole('heading', { name: 'confirmation.thanks' })).toBeInTheDocument()
    expect(screen.getByText(/A confirmation email has been sent to test@test.com/i)).toBeInTheDocument()
  })

  it('displays error when invalid email address is submitted', () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText('signUp.emailAddress'), { target: { value: '12345678' } })
    fireEvent.click(screen.getByRole('button', { name: 'signUp.submitButton' }))

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'confirmation.thanks' })).not.toBeInTheDocument()
  })

  it('displays Signup component with blank email after dismissing confirmation', async () => {
    render(<App />)
  
    fireEvent.change(screen.getByLabelText('signUp.emailAddress'), { target: { value: 'test@test.com' } })
    fireEvent.click(screen.getByRole('button', { name: 'signUp.submitButton' }))
    fireEvent.animationEnd(screen.getByTestId('sign-up'))
  
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'confirmation.thanks' })).toBeInTheDocument()
    })
  
    fireEvent.click(screen.getByRole('button', { name: 'confirmation.dismiss' }))
    fireEvent.animationEnd(screen.getByTestId('confirmation'))

  
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'signUp.stayUpdated' })).toBeInTheDocument()
    })

    expect(screen.queryByRole('heading', { name: 'confirmation.thanks' })).not.toBeInTheDocument()
    expect(screen.getByLabelText('signUp.emailAddress')).toHaveValue('')
  })
})