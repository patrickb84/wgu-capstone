import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { HowItWorksPage } from './HowItWorksPage'

it('renders without crashing', async () => {
	render(<HowItWorksPage />, { wrapper: BrowserRouter })

	const howitworks = await screen.findByTestId('howitworks')
	expect(howitworks).toBeInTheDocument()
})

it('renders main image', () => {
	render(<HowItWorksPage />, { wrapper: BrowserRouter })
	const image = screen.getByRole('img')
	expect(image).toBeInTheDocument()
})