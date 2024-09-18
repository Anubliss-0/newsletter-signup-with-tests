import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vitest } from 'vitest'
import '@testing-library/jest-dom'
import { Signup } from './Signup'

describe('Signup Component', () => {

    it('renders the signup form correctly', () => {
        render(<Signup setIsSubmitted={vitest.fn()} setEmailAddress={vitest.fn()} t={key => key} />)

        expect(screen.getByRole('heading', { level: 1, name: 'signUp.stayUpdated' })).toBeInTheDocument()
        expect(screen.getByLabelText('signUp.emailAddress')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'signUp.submitButton' })).toBeInTheDocument()
    })

    it('calls setIsSubmitted and setEmailAddress with correct values on form submission', async () => {
        const mockSetIsSubmitted = vitest.fn()
        const mockSetEmailAddress = vitest.fn()

        render(<Signup setIsSubmitted={mockSetIsSubmitted} setEmailAddress={mockSetEmailAddress} t={key => key} />)

        fireEvent.change(screen.getByLabelText('signUp.emailAddress'), { target: { value: 'test@test.com' } })
        fireEvent.click(screen.getByRole('button', { name: 'signUp.submitButton' }))

        expect(mockSetEmailAddress).toHaveBeenCalledWith('test@test.com')

        await waitFor(() => {
            expect(mockSetIsSubmitted).toHaveBeenCalledWith(true)
        })
    })
})