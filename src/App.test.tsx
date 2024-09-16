import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vitest } from 'vitest'
import App from './App'
import '@testing-library/jest-dom'

vitest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  }
}));

describe('App Component', () => {
  it('renders Signup component initially and not Confirmation', () => {
    render(<App />)

    // Ensure Signup form is displayed initially
    expect(screen.getByText('signUp.stayUpdated')).toBeInTheDocument()
    expect(screen.queryByText('confirmation.thanks')).not.toBeInTheDocument()
  })

  it('displays Confirmation component after form submission', () => {
    render(<App />)

    // Simulate form submission by clicking the submit button
    fireEvent.click(screen.getByTestId('submit-button'))

    // Ensure Confirmation message is displayed after submission
    expect(screen.getByText('confirmation.thanks')).toBeInTheDocument()

    // Ensure Signup form is not displayed after submission
    expect(screen.queryByText('signUp.stayUpdated')).not.toBeInTheDocument()
  })
})