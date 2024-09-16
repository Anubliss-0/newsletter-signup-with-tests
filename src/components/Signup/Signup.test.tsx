import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vitest } from 'vitest'
import Signup from './Signup'
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

describe('Signup Component', () => {

    it('renders the signup form correctly', () => {
        render(<Signup setIsSubmitted={vitest.fn()} setEmailAddress={vitest.fn()} />)
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
        expect(screen.getByLabelText('signUp.emailAddress')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'signUp.submitButton' })).toBeInTheDocument()
    })

    it('calls setIsSubmitted and setEmailAddress with correct values on form submission', async () => {
        const mockSetIsSubmitted = vitest.fn()
        const mockSetEmailAddress = vitest.fn()

        render(<Signup setIsSubmitted={mockSetIsSubmitted} setEmailAddress={mockSetEmailAddress} />)

        fireEvent.change(screen.getByLabelText('signUp.emailAddress'), { target: { value: 'test@test.com' } })
        fireEvent.click(screen.getByRole('button', { name: 'signUp.submitButton' }))

        expect(mockSetEmailAddress).toHaveBeenCalledWith('test@test.com')

        await waitFor(() => {
            expect(mockSetIsSubmitted).toHaveBeenCalledWith(true)
        })
    })
})