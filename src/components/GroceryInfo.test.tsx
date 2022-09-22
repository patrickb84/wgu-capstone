import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { GroceryPageInfo } from './GroceryInfo'

it('renders grocery context message', async () => {
	render(<GroceryPageInfo />, { wrapper: BrowserRouter })

	const header = await screen.findByTestId('grocery-info-header')
	expect(header).toBeInTheDocument()
})

it('renders no active plan message', async () => {
	render(<GroceryPageInfo hasActivePlan={false} />, { wrapper: BrowserRouter })

	const message = await screen.findByTestId('no-plan')

	expect(message).toBeInTheDocument()
})

it('renders no scheduled meals message', async () => {
	render(<GroceryPageInfo hasScheduledMeals={false} />, { wrapper: BrowserRouter })

	const message = await screen.findByTestId('no-meals')

	expect(message).toBeInTheDocument()
})
