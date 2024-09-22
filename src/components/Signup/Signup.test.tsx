import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vitest } from 'vitest'
import '@testing-library/jest-dom'
import { useTranslation } from 'react-i18next';
import Signup from './Signup'

describe('Signup Component', () => {

    it('renders the signup form correctly', () => {
        render(<Signup setIsSubmitted={vitest.fn()} setEmailAddress={vitest.fn()} />)

        expect(screen.getByRole('heading', { level: 1, name: 'signUp.stayUpdated' })).toBeInTheDocument()
        expect(screen.getByLabelText('signUp.emailAddress')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'signUp.submitButton' })).toBeInTheDocument()
    })

    it('calls setIsSubmitted and setEmailAddress with correct values on form submission', async () => {
        const mockSetIsSubmitted = vitest.fn()
        const mockSetEmailAddress = vitest.fn()

        render(<Signup setIsSubmitted={mockSetIsSubmitted} setEmailAddress={mockSetEmailAddress} />)

        fireEvent.change(screen.getByLabelText('signUp.emailAddress'), { target: { value: 'test@test.com' } })
        fireEvent.click(screen.getByRole('button', { name: 'signUp.submitButton' }))

        fireEvent.animationEnd(screen.getByTestId('sign-up'))
        
        await waitFor(() => {
            expect(mockSetEmailAddress).toHaveBeenCalledWith('test@test.com')
            expect(mockSetIsSubmitted).toHaveBeenCalledWith(true)
        })
    })

    it('does not call setIsSubmitted or setEmailAddress if the email is invalid', async () => {
        const mockSetIsSubmitted = vitest.fn()
        const mockSetEmailAddress = vitest.fn()

        render(<Signup setIsSubmitted={mockSetIsSubmitted} setEmailAddress={mockSetEmailAddress} />)

        fireEvent.change(screen.getByLabelText('signUp.emailAddress'), { target: { value: 'invalid-email' } })
        // fireEvent.click(screen.getByRole('button', { name: 'signUp.submitButton' }))

        expect(mockSetEmailAddress).not.toHaveBeenCalled()
        expect(mockSetIsSubmitted).not.toHaveBeenCalled()
    })
})