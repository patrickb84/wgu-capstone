import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import { AppProvider } from 'hooks/AppProvider'
import 'jest-canvas-mock'

test('renders routing component', () => {
	// Arrange
	render(<App />, { wrapper: AppProvider })

	expect(screen.getByText(/Sous Chef/i)).toBeTruthy()
})
