import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vitest } from 'vitest'
import '@testing-library/jest-dom'
import Confirmation from './Confirmation'

vitest.mock('react-i18next', () => ({
    useTranslation: () => {
        return {
            t: (key: string, options?: Record<string, string>) => {
                if (key === "confirmation.message" && options?.email) {
                    return `A confirmation email has been sent to ${options.email}. Please open it and click the button inside to confirm your subscription.`
                }
                return key
            },
            i18n: {
                changeLanguage: () => new Promise(() => { }),
            },
        };
    },
    initReactI18next: {
        type: '3rdParty',
        init: () => { },
    }
}))

describe('Confirmation Component', () => {

    it('renders the confirmation component correctly', () => {
        render(<Confirmation
            setIsSubmitted={vitest.fn()}
            emailAddress='testemail@test.com'
            setEmailAddress={vitest.fn()}
        />
        )

        expect(screen.getByRole('heading', { level: 1, name: 'confirmation.thanks' })).toBeInTheDocument()
        expect(screen.getByText(/testemail@test.com/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'confirmation.dismiss' })).toBeInTheDocument()
    })

    it('resets email and submission state on dismiss button press', async () => {
        const mockSetIsSubmitted = vitest.fn()
        const mockSetEmailAddress = vitest.fn()

        render(
            <Confirmation
                setIsSubmitted={mockSetIsSubmitted}
                emailAddress="test@test.com"
                setEmailAddress={mockSetEmailAddress}
            />
        )

        fireEvent.click(screen.getByRole('button', { name: 'confirmation.dismiss' }))
        fireEvent.animationEnd(screen.getByTestId('confirmation'))

        await waitFor(() => {
            expect(mockSetEmailAddress).toHaveBeenCalledWith("")
            expect(mockSetIsSubmitted).toHaveBeenCalledWith(false)
        })
    })
})