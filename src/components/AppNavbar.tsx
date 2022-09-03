import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { ROUTES } from '../routes/AppRouter'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import { useAppContext } from 'providers/AppProvider'
import { Link } from 'react-router-dom'

export const AppNavbar = ({ appUser }: any) => {
	const location = useLocation()
	const [hide, setHide] = useState(false)
	const { auth } = useAppContext()

	useEffect(() => {
		const routesWhereHidden = [ROUTES.LOGIN, ROUTES.REGISTER]

		setHide(routesWhereHidden.find(route => route === location.pathname) !== undefined)
	}, [location])

	const navbarRoutes = [{ to: ROUTES.HOME, text: 'Home' }]

	if (hide) return null

	return (
		<Navbar bg="white" expand="lg" fixed="top" className="border-brand border-top border-5 shadow">
			<Container>
				<LinkContainer to={ROUTES.HOME}>
					<Navbar.Brand className="text-brand">
						Sous Chef
					</Navbar.Brand>
				</LinkContainer>
				<Navbar.Toggle aria-controls="app-nav" className='border-1' />
				<Navbar.Collapse id="app-nav">
					<Nav className="ms-auto">
						{navbarRoutes.map(({ to, text }) => (
							<LinkContainer key={to} to={to}>
								<Nav.Link>{text}</Nav.Link>
							</LinkContainer>
						))}
						<div className="ms-2">
							{!appUser ? (
								<>
									<Link className='btn btn-brand mx-1' to={ROUTES.REGISTER}>Sign Up</Link>
									<Link className='btn btn-secondary mx-1' to={ROUTES.LOGIN}>Sign In</Link>
								</>
							) : (
								<Button variant='secondary' onClick={() => signOut(auth)}>Sign Out</Button>
							)}
						</div>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

// <NavDropdown title="Dropdown" id="basic-nav-dropdown">
// 	<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
// 	<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
// 	<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
// 	<NavDropdown.Divider />
// 	<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
// </NavDropdown>
