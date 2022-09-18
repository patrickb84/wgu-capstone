import { Container, Nav, Navbar as BootstrapNavbar, NavbarBrand, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import ROUTES from 'routes/routes'
import { signOut } from 'firebase/auth'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { auth } from 'api/firebase/app'
import IUser from 'types/User'
import { useEffect, useState } from 'react'
import { useUser } from 'hooks/UserProvider'
import { useActivePlan } from 'hooks/MealPlanProvider'

export interface INavbarSectionProps {
	children?: React.ReactNode
}

interface INavbarProps {
	children?: React.ReactNode
}

export const Navbar = (props: INavbarProps) => {
	const location = useLocation()
	const [isHidden, setIsHidden] = useState(false)
	const user = useUser()

	useEffect(() => {
		setIsHidden([ROUTES.LOGIN, ROUTES.REGISTER].includes(location.pathname))
	}, [location])

	const { activePlan } = useActivePlan()

	if (isHidden) return <></>

	return (
		<BootstrapNavbar bg="white" expand="lg" fixed="top" className="border-brand border-top border-5 shadow-sm">
			<Container fluid className="justify-content-start align-items-center">
				<BootstrapNavbar.Collapse id="navbar-nav" className="order-lg-1">
					<Nav className="mb-3 mb-lg-0">
						<LinkContainer to={ROUTES.HOME}>
							<Nav.Link className="mx-2">Home</Nav.Link>
						</LinkContainer>
						{user && (
							<LinkContainer
								to={activePlan && activePlan.id ? ROUTES.TO_MEAL_PLAN(activePlan.id) : ROUTES.MEAL_PLANS}>
								<Nav.Link className="mx-2">My Meal Plan</Nav.Link>
							</LinkContainer>
						)}

						<LinkContainer to={ROUTES.RECIPES}>
							<Nav.Link className="mx-2">Recipes</Nav.Link>
						</LinkContainer>

						{/* {user && (
							<LinkContainer to={ROUTES.USER_RECIPE_DASH}>
								<Nav.Link className="mx-2">Create Recipes</Nav.Link>
							</LinkContainer>
						)} */}

						{user && (
							<LinkContainer to={ROUTES.GROCERY_LIST}>
								<Nav.Link className="mx-2">Grocery List</Nav.Link>
							</LinkContainer>
						)}

						<LinkContainer to={ROUTES.HOW_IT_WORKS}>
							<Nav.Link className="mx-2">How it works</Nav.Link>
						</LinkContainer>
					</Nav>
				</BootstrapNavbar.Collapse>
				<BootstrapNavbar.Toggle as="span" className="border-2 py-2">
					<i className="far fa-bars" />
				</BootstrapNavbar.Toggle>

				<LinkContainer to={ROUTES.HOME} className="order-0 ms-2 ms-lg-0">
					<NavbarBrand className="font-display fs-5 no-underline text-brand">Sous Chef!</NavbarBrand>
				</LinkContainer>

				<Nav className="ms-auto order-3 d-flex align-items-center flex-row">
					<LinkContainer to={ROUTES.RECIPES}>
						<Nav.Link style={{ padding: 8 }} className="mx-1 mx-lg-0">
							<i className="far fa-search text-secondary fs-3" />
						</Nav.Link>
					</LinkContainer>
					{!user ? <SignInSignUpButtons /> : <UserDropdown user={user} />}
				</Nav>
			</Container>
		</BootstrapNavbar>
	)
}

const SignInSignUpButtons = () => {
	return (
		<>
			<Link className="btn btn-brand btn-sm mx-1" to={ROUTES.REGISTER}>
				Sign Up
			</Link>
			<Link className="btn btn-secondary btn-sm mx-1" to={ROUTES.LOGIN}>
				Sign In
			</Link>
		</>
	)
}

const UserDropdown = ({ user }: { user: IUser }) => {
	const navigate = useNavigate()
	return (
		<NavDropdown
			className="nav-drop"
			title={
				<div className="mx-1 mx-lg-0">
					<i className="far fa-circle-user text-secondary fs-3" />
				</div>
			}
			id="nav-dropdown">
			{/* <LinkContainer to={'/account'}>
				<NavDropdown.Item>My Account</NavDropdown.Item>
			</LinkContainer>
			<NavDropdown.Divider /> */}
			<NavDropdown.Item onClick={() => signOut(auth).then(() => navigate(ROUTES.HOME))}>
				<div className="d-flex justify-content-between align-items-center">
					<span>Sign Out</span>
					<i className="fad fa-sign-out-alt" />
				</div>
			</NavDropdown.Item>
		</NavDropdown>
	)
}
