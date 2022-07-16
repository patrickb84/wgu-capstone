import Navigation from './Navigation'

const TopNav = ({ children }) => {
  return (
    <>
      <Navigation />
      <div className='container-fluid'>{children}</div>
    </>
  )
}

const SideNav = ({ children }) => {
  return (
    <div className='container-fluid p-3'>
      <div className='row'>
        <div className='col'>
          <Navigation />
        </div>
        <div className='col-9'>
          <div className='container-fluid'>{children}</div>
        </div>
      </div>
    </div>
  )
}
const Layout = ({ sideNav, children }) => {
  return sideNav ? <SideNav {...{ children }} /> : <TopNav {...{ children }} />
}

export default Layout
