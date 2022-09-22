import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { MiniLogo } from './Logo'

it('renders without crashing', () => {
	render(<MiniLogo />, { wrapper: BrowserRouter })
})

it('renders with color class', () => {
	render(<MiniLogo colorClass="brand" />, { wrapper: BrowserRouter })
	const logo = screen.getByTestId('logo-wrapper')
	expect(logo).toHaveClass('text-brand')
})

it('renders with default color class', () => {
   render(<MiniLogo />, { wrapper: BrowserRouter })
   const logo = screen.getByTestId('logo-wrapper')
   expect(logo).toHaveClass('text-brand')
})

it('renders with link', () => {
   render(<MiniLogo />, { wrapper: BrowserRouter })
   const link = screen.getByTestId('logo-link')
   expect(link).toBeInTheDocument()
})

it('renders with link to home', () => {
   render(<MiniLogo />, { wrapper: BrowserRouter })
   const link = screen.getByTestId('logo-link')
   expect(link).toHaveAttribute('href', '/')
})