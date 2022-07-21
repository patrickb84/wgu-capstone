import { LinkContainer } from 'react-router-bootstrap'
import routes from '../routes'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavDropdown } from 'react-bootstrap'
import { useAuthState } from 'react-firebase-hooks/auth'
import useFirebaseContext from '../context/FirebaseContext'
import { signOut } from 'firebase/auth'
import { CONST_APP_NAME } from '../constants'

const NavbarBrandContainer = () => (
  <LinkContainer to={routes.HOME}>
    <Navbar.Brand>{CONST_APP_NAME}</Navbar.Brand>
  </LinkContainer>
)

const NavLinkContainer = ({ path, children }) => (
  <LinkContainer to={path}>
    <Nav.Link>{children}</Nav.Link>
  </LinkContainer>
)

const NavDropdownContainer = ({ path, children }) => (
  <LinkContainer to={path}>
    <NavDropdown.Item>{children}</NavDropdown.Item>
  </LinkContainer>
)

export const TopBar = ({ bg = 'transparent', children, ...props }) => (
  <Navbar bg={bg} {...props}>
    <NavbarBrandContainer />
    {children}
  </Navbar>
)

const Navigation = ({user}) => {
  const { auth } = useFirebaseContext()

  const logout = async () => {
    await signOut(auth)
  }

  return (
    <Navbar bg='dark' variant='dark' expand='lg' fixed='top'>
      <NavbarBrandContainer />
      <Navbar.Toggle aria-controls='basic-navbar-nav' />

      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav style={{ width: '100%', justifyContent: 'end' }}>
          <NavLinkContainer path={routes.HOME}>Home</NavLinkContainer>

          <NavDropdown id='user-menu-dropdown' title={userMenuIcon}>
            {user ? (
              <>
                <NavDropdown.Item>
                  <div className='mb-2'>
                    <small className='d-block mb-0'>Logged in as:</small>
                    <div className='text-dark'>{user.email}</div>
                  </div>
                </NavDropdown.Item>

                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </>
            ) : (
              <>
                <NavDropdownContainer path={routes.LOGIN}>
                  Login
                </NavDropdownContainer>
                <NavDropdownContainer path={routes.REGISTER}>
                  Register
                </NavDropdownContainer>
              </>
            )}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation

const userMenuIcon = <i className='fa fa-circle-user fa-lg text-white'></i>
