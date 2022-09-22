import { render, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { HelperModal } from './HelperModal'

it('renders as a button', async () => {
	render(<HelperModal asButton={true} />)
	const button = await screen.findByTestId('button-only')
	expect(button).toBeInTheDocument()
})

it('renders as an icon button', async () => {
	render(<HelperModal asButton={false} />)
	const button = await screen.findByTestId('icon-button')
	expect(button).toBeInTheDocument()
})

it('opens modal when clicked', async () => {
	render(<HelperModal asButton={true} />)
	const button = await screen.findByTestId('button-only')
	act(() => {
		button.click()
	})
	const modal = await screen.findByTestId('helper-modal')
	await waitFor(() => expect(modal).toBeInTheDocument())
})

it('renders message in modal', async () => {
	render(
		<HelperModal asButton={true}>
			<p>Test message</p>
		</HelperModal>
	)
	const button = await screen.findByRole('button')
	act(() => {
		button.click()
	})
	const modal = await screen.findByTestId('helper-modal')
	await waitFor(() => expect(modal).toBeInTheDocument())
	const message = await screen.findByText('Test message')
	expect(message).toBeInTheDocument()
})
