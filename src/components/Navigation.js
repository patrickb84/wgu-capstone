import { LinkContainer } from 'react-router-bootstrap'
import routes from '../routes'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

const TopNav = () => {
  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      {/* <Container fluid> */}
      <LinkContainer to={routes.HOME}>
        <Navbar.Brand>WGU Capstone</Navbar.Brand>
      </LinkContainer>

      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav style={{ width: '100%', justifyContent: 'end' }}>
          <LinkContainer to={routes.HOME}>
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to={routes.GROCERIES}>
            <Nav.Link>Groceries</Nav.Link>
          </LinkContainer>
          <LinkContainer to={routes.INVENTORY}>
            <Nav.Link>Inventory</Nav.Link>
          </LinkContainer>
          <LinkContainer to={routes.REPORTS}>
            <Nav.Link>Reports</Nav.Link>
          </LinkContainer>

          <NavDropdown id='user-menu-dropdown' title={userMenuIcon}>
            <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
            <NavDropdown.Item href='#action/3.2'>
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href='#action/3.4'>
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      {/* </Container> */}
    </Navbar>
  )
}

const SideNav = () => {
  return (
    <ul className='list-group'>
      <li className='list-group-item'>An item</li>
      <li className='list-group-item'>A second item</li>
      <li className='list-group-item'>A third item</li>
      <li className='list-group-item'>A fourth item</li>
      <li className='list-group-item'>And a fifth one</li>
    </ul>
  )
}
const Navigation = ({ sideNav }) => {
  return sideNav ? <SideNav /> : <TopNav />
}

export default Navigation

const userMenuIcon = <i className='fa fa-circle-user fa-lg text-white'></i>
