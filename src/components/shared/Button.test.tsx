import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vitest } from 'vitest'
import '@testing-library/jest-dom'
import Button from './Button'

describe('Button Component', () => {
    it('Renders the button component correctly with given string', () => {
        render(<Button content='This is a test string' />)
        expect(screen.getByRole('button', { name: 'This is a test string' }))
    })

    it('calls the onClick handler when clicked', () => {
        const handleClick = vitest.fn()

        render(<Button content="Dismiss" onClick={handleClick} />)

        const button = screen.getByRole('button')
        fireEvent.click(button)

        expect(handleClick).toHaveBeenCalledTimes(1)
    })
})