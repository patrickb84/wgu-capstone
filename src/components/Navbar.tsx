import { Container, Nav, Navbar as BootstrapNavbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { ROUTES } from '../routes/AppRouter'
import { signOut } from 'firebase/auth'
import { Link, useLocation } from 'react-router-dom'
import { auth } from 'api/firebase'
import IUser from 'types/User'
import { useEffect, useState } from 'react'
import { useUser } from 'providers/UserProvider'

export interface INavbarSectionProps {
	children?: React.ReactNode
}

const NavbarLeft = (props: INavbarSectionProps) => {
	const { children } = props

	return (
		<Nav className="me-auto navbar-left flex-1">
			{children ? (
				children
			) : (
				<>
					{/* <LinkContainer to={ROUTES.HOME}>
						<Nav.Link>Home</Nav.Link>
					</LinkContainer>
					<LinkContainer to={ROUTES.HOME}>
						<Nav.Link>About</Nav.Link>
					</LinkContainer>
					<LinkContainer to={ROUTES.HOME}>
						<Nav.Link>Contact</Nav.Link>
					</LinkContainer> */}
				</>
			)}
		</Nav>
	)
}

const NavbarCenter = (props: INavbarSectionProps) => {
	const { children: content } = props

	return (
		<Nav className="navbar-center flex-1">
			{content ? (
				content
			) : (
				<div className="py-2 text-center w-100">
					<Link to={ROUTES.HOME} className="font-display fs-5 no-underline">
						Sous Chef!
					</Link>
				</div>
			)}
		</Nav>
	)
}

const NavbarRight = (props: INavbarSectionProps) => {
	const { children } = props
	const currentUser = useUser()

	return (
		<Nav className="navbar-right flex-1">
			{children ? (
				children
			) : (
				<div className="flex-1 d-flex align-items-center justify-content-end">
					{!currentUser ? (
						<SignInSignUpButtons />
					) : (
						<>
							<UserDropdown user={currentUser} />
						</>
					)}
				</div>
			)}
		</Nav>
	)
}

interface INavbarProps {
	children?: React.ReactNode
	navbarRef?: React.RefObject<HTMLDivElement>
}

export const Navbar = ({ navbarRef }: INavbarProps) => {
	const location = useLocation()
	const [isHidden, setIsHidden] = useState(false)

	useEffect(() => {
		setIsHidden([ROUTES.LOGIN, ROUTES.REGISTER].includes(location.pathname))
	}, [location])

	if (isHidden) return null

	return (
		<BootstrapNavbar
			ref={navbarRef}
			bg="white"
			expand="lg"
			fixed="top"
			className="border-brand border-top border-5 shadow-sm">
			<Container className="d-flex align-items-center justify-content-between">
				<NavbarLeft />
				<NavbarCenter />
				<NavbarRight />
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
	return (
		<NavDropdown
			className="nav-drop"
			title={<i className="fad fa-circle-user text-brand nav-icon" />}
			id="nav-dropdown">
			<LinkContainer to={'/account'}>
				<NavDropdown.Item>My Account</NavDropdown.Item>
			</LinkContainer>
			<NavDropdown.Divider />
			<NavDropdown.Item onClick={() => signOut(auth)}>
				<div className="d-flex justify-content-between align-items-center">
					<span>Sign Out</span>
					<i className="fad fa-sign-out-alt" />
				</div>
			</NavDropdown.Item>
		</NavDropdown>
	)
}
