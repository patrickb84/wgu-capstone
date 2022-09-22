import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { HomePageSectionHowItWorks } from './Section.HowItWorks'

it('renders without crashing', () => {
	render(<HomePageSectionHowItWorks />, { wrapper: BrowserRouter })
})

it('renders images', () => {
	render(<HomePageSectionHowItWorks />, { wrapper: BrowserRouter })
	const images = screen.getAllByRole('img')
	expect(images).toHaveLength(3)
})

	
