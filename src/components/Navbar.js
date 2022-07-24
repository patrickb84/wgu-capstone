import { Button, Container, Nav, Navbar as BsNavbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import useFirebaseContext from '../context/FirebaseContext'
import { APP_NAME } from '../settings'

const Navbar = () => {
  const { user, signOut } = useFirebaseContext()

  return (
    <BsNavbar bg='dark' variant='dark' expand='lg' fixed='top'>
      <Container>
        <LinkContainer to='/'>
          <BsNavbar.Brand className='font-display'>
            <i className='fa fa-hat-chef me-2' />
            {APP_NAME}
          </BsNavbar.Brand>
        </LinkContainer>
        <BsNavbar.Toggle aria-controls='navbar' />
        <BsNavbar.Collapse id='navbar'>
          <Nav className='ms-auto'>
            {!user ? (
              <>
                <Link to='/login' className='btn btn-primary'>
                  Sign In
                </Link>
                <Link to='/register' className='btn btn-secondary ms-2'>
                  Sign Up
                </Link>
              </>
            ) : (
              <Button onClick={signOut} className='btn btn-danger'>
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
