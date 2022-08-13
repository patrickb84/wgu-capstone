import { Button, Container, Nav, Navbar as BsNavbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import useFirebaseContext from '../context/FirebaseContext'
import { APP_NAME } from '../settings'

const Navbar = ({ links }) => {
  const { user, signOut } = useFirebaseContext()

  return (
    <BsNavbar
      bg='white'
      variant='light'
      className='navbar-border'
      expand='lg'
      fixed='top'
    >
      <Container>
        <LinkContainer to='/'>
          <BsNavbar.Brand className='font-display text-primary'>
            <i className='fa fa-hat-chef me-2' />
            {APP_NAME}
          </BsNavbar.Brand>
        </LinkContainer>
        <BsNavbar.Toggle aria-controls='navbar' />
        <BsNavbar.Collapse id='navbar'>
          <Nav className='ms-auto'>
            {links.map(({ to, name }) => (
              <LinkContainer key={to} to={to}>
                <Nav.Link>{name}</Nav.Link>
              </LinkContainer>
            ))}
            {!user
              ? (
                <>
                  <Link to='/login' className='btn btn-outline-secondary'>
                    Sign In
                  </Link>
                  <Link to='/register' className='btn btn-primary ms-2'>
                    Sign Up
                  </Link>
                </>
                )
              : (
                <Button onClick={signOut} className='btn btn-secondary ms-2'>
                  Sign Out
                </Button>
                )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  )
}

export default Navbar
