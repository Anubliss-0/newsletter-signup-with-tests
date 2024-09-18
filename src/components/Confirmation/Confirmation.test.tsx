import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vitest } from 'vitest'
import '@testing-library/jest-dom'
import { Confirmation } from './Confirmation'

describe('Confirmation Component', () => {

    it('renders the confirmation component correctly', () => {

        const mockT = (key: string, options?: { email?: string }) => {
            if (key === 'confirmation.message' && options?.email) {
                return `confirmation.message: ${options.email}`
            }
            return key
        }

        render(<Confirmation
            setIsSubmitted={vitest.fn()}
            emailAddress='testemail@test.com'
            setEmailAddress={vitest.fn()}
            t={mockT}
        />
        )

        expect(screen.getByRole('heading', { level: 1, name: 'confirmation.thanks' })).toBeInTheDocument()
        expect(screen.getByText(/testemail@test.com/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'confirmation.dismiss' })).toBeInTheDocument()
    })

    it('resets email and submission state on dismiss button press', async () => {
        const mockSetIsSubmitted = vitest.fn();
        const mockSetEmailAddress = vitest.fn();
    
        render(
            <Confirmation
                setIsSubmitted={mockSetIsSubmitted}
                emailAddress="test@test.com"
                setEmailAddress={mockSetEmailAddress}
                t={(key) => key}
            />
        );
    
        fireEvent.click(screen.getByRole('button', { name: 'confirmation.dismiss' }));
        fireEvent.animationEnd(screen.getByRole('button', { name: 'confirmation.dismiss' }));
    
        await waitFor(() => {
            expect(mockSetEmailAddress).toHaveBeenCalledWith("");
            expect(mockSetIsSubmitted).toHaveBeenCalledWith(false);
        });
    });
})