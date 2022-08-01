import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const SecondaryNavigation = () => {
  const location = useLocation()

  useEffect(() => {
    console.log(location)
  }, [location])

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className={`list-group-item list-group-item-action ${
        location.pathname === to ? 'active' : null
      }`}>
      {children}
    </Link>
  )

  return (
    <div id='secondary-navigation' className='list-group'>
      <NavLink to='/dashboard'>My Meal Plan</NavLink>
      <NavLink to='/dashboard/recipes'>Recipes</NavLink>
      <button type='button' className='list-group-item list-group-item-action'>
        Grocery List
      </button>
      <button type='button' className='list-group-item list-group-item-action'>
        Offers
      </button>
    </div>
  )
}

export default SecondaryNavigation
