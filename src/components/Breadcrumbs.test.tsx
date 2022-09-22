import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Breadcrumbs from './Breadcrumbs'

it('renders breadcrumbs', async () => {
	render(<Breadcrumbs items={[]} />, { wrapper: BrowserRouter })

	const breadcrumbs = await screen.findByTestId('breadcrumbs')
	expect(breadcrumbs).toBeInTheDocument()
})

it('renders breadcrumbs with items', async () => {
	render(
		<Breadcrumbs
			items={[
				{ to: '/test', label: 'Test' },
				{ to: '/test2', label: 'Test 2' }
			]}
		/>,
		{ wrapper: BrowserRouter }
	)

   const breadcrumbLabels = await screen.findAllByTestId('breadcrumb-label')
   expect(breadcrumbLabels).toHaveLength(2)
})
