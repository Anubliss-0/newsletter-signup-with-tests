import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'
import '@testing-library/jest-dom'

describe('App Component', () => {
  it('renders Signup component initially', () => {
    render(<App />)
    expect(screen.getByText(/signup/i)).toBeInTheDocument()
  })

  it('renders Confirmation component after submission', () => {
    render(<App />)

    // Assuming there's a button with text 'Submit' in the Signup component
    const submitButton = screen.getByText(/submit/i)
    fireEvent.click(submitButton)

    expect(screen.getByText(/confirmation/i)).toBeInTheDocument()
  })
})