import { Container } from 'react-bootstrap'
import Navigation from './Navigation'

const TopNav = ({ children }) => {
  return (
    <>
      <Navigation />
      <Container>{children}</Container>
    </>
  )
}

const SideNav = ({ children }) => {
  return (
    <Container className='p-3'>
      <div className='row'>
        <div className='col'>
          <Navigation />
        </div>
        <div className='col-9'>
          <div className='container-fluid'>{children}</div>
        </div>
      </div>
    </Container>
  )
}
const Layout = ({ sideNav, children }) => {
  return sideNav ? <SideNav {...{ children }} /> : <TopNav {...{ children }} />
}

export default Layout
