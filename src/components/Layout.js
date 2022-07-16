import Navigation from "./Navigation"

const Layout = ({ children }) => {
  return (
    <>
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
    </>
  )
}

export default Layout
