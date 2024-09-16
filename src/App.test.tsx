import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vitest } from 'vitest'
import App from './App'
import '@testing-library/jest-dom'

vitest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => { }),
      },
    };
  },
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

  it('displays Confirmation component after form submission', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'signUp.submitButton' }))

    expect(screen.getByRole('heading', { name: 'confirmation.thanks' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'signUp.stayUpdated' })).not.toBeInTheDocument()
  })
})