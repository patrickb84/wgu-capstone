import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Layout from './Layout'

it('renders children without crashing', () => {
	render(
		<Layout>
			<p>Test</p>
		</Layout>,
		{ wrapper: BrowserRouter }
	)

	expect(screen.getByText('Test')).toBeInTheDocument()
})

it('renders navbar and footer without crashing', () => {
   render(<Layout>
      <p>Test</p>
   </Layout>, { wrapper: BrowserRouter })

   const navbar = screen.getByTestId('navbar')
   expect(navbar).toBeInTheDocument()

   const footer = screen.getByTestId('footer')
   expect(footer).toBeInTheDocument()
})

it('renders navbar-offset when navbar is present', () => {
   render(<Layout>  
      <p>Test</p>
   </Layout>, { wrapper: BrowserRouter })

   const navbarOffset = screen.getByTestId('navbar-offset')
   expect(navbarOffset).toBeInTheDocument()
})
