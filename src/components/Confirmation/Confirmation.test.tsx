import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vitest } from 'vitest'
import '@testing-library/jest-dom'
import Confirmation from './Confirmation'

describe('Confirmation Component', () => {

    it('renders the confirmation component correctly', () => {
        render(<Confirmation
            setIsSubmitted={vitest.fn()}
            emailAddress='testemail@test.com'
            setEmailAddress={vitest.fn()}
        />
        )

        expect(screen.getByRole('heading', { level: 1, name: 'confirmation.thanks' })).toBeInTheDocument()
        expect(screen.getByText(/A confirmation email has been sent to testemail@test.com/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'confirmation.dismiss' })).toBeInTheDocument()
    })

    it('calls setIsSubmitted and setEmailAddress with false and empty string', () => {
        const mockSetIsSubmitted = vitest.fn()
        const mockSetEmailAddress = vitest.fn()

        render(<Confirmation setIsSubmitted={mockSetIsSubmitted} emailAddress='test@test.com' setEmailAddress={mockSetEmailAddress} />)

        fireEvent.click(screen.getByRole('button', { name: 'confirmation.dismiss' }))

        expect(mockSetEmailAddress).toHaveBeenCalledWith('')
        expect(mockSetIsSubmitted).toBeCalledWith(false)
    })
})