import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'
import Button from './Button'

describe('Button Component', () => {
    it('Renders the button component correctly', () => {
        render(<Button />)
        expect(screen.getByRole('button'))
    })
})