import Navigation from './Navigation'

const Layout = ({ children, ...props }) => {
  return (
    <>

      <div id='layout' className={`${props.className ? props.className : ''}`}>
        {children}
      </div>
    </>
  )
}

export default Layout
