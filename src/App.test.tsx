import { render, screen } from '@testing-library/react'
import App from './App'
import { AppProvider } from 'hooks/AppProvider'

test('loads homepage and navbar', async () => {
	render(<App />, { wrapper: AppProvider })

	const homepage = await screen.findByTestId('homepage')
	expect(homepage).toBeInTheDocument()

	const navbar = await screen.findByTestId('navbar')
	expect(navbar).toBeInTheDocument()
})