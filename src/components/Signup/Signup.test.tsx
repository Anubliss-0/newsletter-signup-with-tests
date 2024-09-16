import { render, screen, fireEvent } from '@testing-library/react'
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

    // Test case 1: Ensures that the signup form renders with the correct text
    it('renders the signup form correctly', () => {
        // passing mock functions for setIsSubmitted and setEmailAddress props.
        render(<Signup setIsSubmitted={vitest.fn()} setEmailAddress={vitest.fn()} />)
        
        // Assert that the h1 element is present (better practice for heading)
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()

        // Assert that the input field is associated with its label
        expect(screen.getByLabelText('signUp.emailAddress')).toBeInTheDocument()

        // Assert that the button element is present (using button role)
        expect(screen.getByRole('button', { name: 'signUp.submitButton' })).toBeInTheDocument()
    })

    // Test case 2: Ensures that clicking the submit button triggers the setIsSubmitted function
    it('calls setIsSubmitted when submit button is clicked', () => {
        // Create a mock function to track if setIsSubmitted is called
        const mockSetIsSubmitted = vitest.fn()

        // Render the Signup component and pass the mockSetIsSubmitted function as a prop
        render(<Signup setIsSubmitted={mockSetIsSubmitted} setEmailAddress={vitest.fn()} />)

        // Simulate a click on the submit button using its role
        fireEvent.click(screen.getByRole('button', { name: 'signUp.submitButton' }))

        // Assert that the mockSetIsSubmitted function was called with the argument "true"
        expect(mockSetIsSubmitted).toHaveBeenCalledWith(true)
    })
})