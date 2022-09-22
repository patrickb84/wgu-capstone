import { render, screen } from '@testing-library/react'
import { Button } from 'react-bootstrap'
import { BrowserRouter } from 'react-router-dom'
import PageHeader, { PageSubtitle, PageTitle } from './PageHeader'

it('renders without crashing', () => {
	render(<PageHeader />, { wrapper: BrowserRouter })

	const pageHeader = screen.getByTestId('page-header')
	expect(pageHeader).toBeInTheDocument()
})

it('renders with children', () => {
	render(
		<PageHeader>
			<p>Test</p>
		</PageHeader>,
		{ wrapper: BrowserRouter }
	)

	expect(screen.getByText('Test')).toBeInTheDocument()
})

it('renders with title, subtitle, breadcrumbs, and button', () => {
	render(
		<PageHeader>
			<div>
				<PageTitle>Test Title</PageTitle>
				<PageSubtitle>Test Subtitle</PageSubtitle>
			</div>
			<Button data-testid='page-button'>Test Button</Button>
		</PageHeader>
	)
	const title = screen.getByTestId('page-title')
	expect(title).toBeInTheDocument()
	expect(title).toHaveTextContent('Test Title')

	const subtitle = screen.getByTestId('page-subtitle')
	expect(subtitle).toBeInTheDocument()
	expect(subtitle).toHaveTextContent('Test Subtitle')

	const button = screen.getByTestId('page-button')
	expect(button).toBeInTheDocument()
	expect(button).toHaveTextContent('Test Button')
})
