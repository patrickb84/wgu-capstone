import { Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { ROUTES } from '../routes/AppRouter'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const AppNavbar = () => {
	const location = useLocation()
	const [hide, setHide] = useState(false)


	useEffect(() => {
      const routesWhereHidden = [ROUTES.LOGIN, ROUTES.REGISTER]

		setHide(routesWhereHidden.find(route => route === location.pathname) !== undefined)
	}, [location])

	const navbarRoutes = [
		{ to: ROUTES.HOME, text: 'Home' },
		{ to: ROUTES.LOGIN, text: 'Sign In' },
		{ to: ROUTES.REGISTER, text: 'Sign Up' }
	]

	if (hide) return null

	return (
		<Navbar bg="light" expand="lg">
			<Container>
				<LinkContainer to={ROUTES.HOME}>
					<Navbar.Brand>
						<i className="far fa-garlic" />
						<span style={{ marginLeft: '0.5rem' }} />
						Sous Chef
					</Navbar.Brand>
				</LinkContainer>
				<Navbar.Toggle aria-controls="app-nav" />
				<Navbar.Collapse id="app-nav">
					<Nav className="ms-auto">
						{navbarRoutes.map(({ to, text }) => (
							<LinkContainer key={to} to={to}>
								<Nav.Link>{text}</Nav.Link>
							</LinkContainer>
						))}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

{
	/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
						</NavDropdown> */
}
