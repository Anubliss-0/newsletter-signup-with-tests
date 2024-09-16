import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vitest } from 'vitest'
import App from './App'
import '@testing-library/jest-dom'

vitest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options: { name?: { emailAddress?: string } } = {}) => {
      if (key === 'confirmation.message' && options.name?.emailAddress) {
        return `A confirmation email has been sent to ${options.name.emailAddress}`;
      }
      return key;
    },
    i18n: {
      changeLanguage: () => new Promise(() => { }),
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: () => { },
  }
}));

describe('App Component', () => {

  it('renders Signup component initially and not Confirmation', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'signUp.stayUpdated' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'confirmation.thanks' })).not.toBeInTheDocument()
  })

  it('displays Confirmation component with entered email address after form submission', async () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText('signUp.emailAddress'), { target: { value: 'test@test.com' } })
    fireEvent.click(screen.getByRole('button', { name: 'signUp.submitButton' }))

    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: 'signUp.stayUpdated' })).not.toBeInTheDocument()
    })

    expect(screen.getByRole('heading', { name: 'confirmation.thanks' })).toBeInTheDocument()
    expect(screen.getByText(/A confirmation email has been sent to test@test.com/i)).toBeInTheDocument()
  })
})