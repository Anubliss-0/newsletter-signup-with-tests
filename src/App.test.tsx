import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'
import '@testing-library/jest-dom'

describe('App Component', () => {
  it('renders Signup component initially and not Confirmation', () => {
    render(<App />)

    expect(screen.getByTestId('sign-up')).toBeInTheDocument()
    expect(screen.queryByTestId('confirmation')).not.toBeInTheDocument()
  })

  it('displays Confirmation component with entered email address after form submission', async () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText('signUp.emailAddress'), { target: { value: 'test@test.com' } })
    fireEvent.click(screen.getByRole('button', { name: 'signUp.submitButton' }))
    fireEvent.animationEnd(screen.getByTestId('sign-up'))

    await waitFor(() => {
      expect(screen.queryByRole('heading', { level: 1, name: 'signUp.stayUpdated' })).not.toBeInTheDocument()
    })

    expect(screen.getByRole('heading', { level: 1, name: 'confirmation.thanks' })).toBeInTheDocument()
    expect(screen.getByText(/test@test.com/i)).toBeInTheDocument()
  })

  it('displays error when invalid email address is submitted', () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText('signUp.emailAddress'), { target: { value: '12345678' } })
    fireEvent.click(screen.getByRole('button', { name: 'signUp.submitButton' }))

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 1, name: 'confirmation.thanks' })).not.toBeInTheDocument()
  })

  it('displays Signup component with blank email after dismissing confirmation', async () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText('signUp.emailAddress'), { target: { value: 'test@test.com' } })
    fireEvent.click(screen.getByRole('button', { name: 'signUp.submitButton' }))
    fireEvent.animationEnd(screen.getByTestId('sign-up'))

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: 'confirmation.thanks' })).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole('button', { name: 'confirmation.dismiss' }))
    fireEvent.animationEnd(screen.getByTestId('confirmation'))


    await waitFor(() => {
      expect(screen.getByTestId('sign-up')).toBeInTheDocument()
    })

    expect(screen.queryByTestId('confirmation')).not.toBeInTheDocument()
    expect(screen.getByLabelText('signUp.emailAddress')).toHaveValue('')
  })
})