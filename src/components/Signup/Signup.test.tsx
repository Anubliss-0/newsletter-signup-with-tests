import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vitest } from 'vitest'
import Signup from './Signup'
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

describe('Signup Component', () => {
  it('renders the signup form correctly', () => {
    render(<Signup setIsSubmitted={vitest.fn()} setEmailAddress={vitest.fn()} />)

    expect(screen.getByText('signUp.stayUpdated')).toBeInTheDocument()
    expect(screen.getByText('signUp.emailAddress')).toBeInTheDocument()
    expect(screen.getByText('signUp.submitButton')).toBeInTheDocument()
  })

  it('calls setIsSubmitted when submit button is clicked', () => {
    const mockSetIsSubmitted = vitest.fn()

    render(<Signup setIsSubmitted={mockSetIsSubmitted} setEmailAddress={vitest.fn()} />)

    fireEvent.click(screen.getByTestId('submit-button'))

    expect(mockSetIsSubmitted).toHaveBeenCalledWith(true)
  })
})