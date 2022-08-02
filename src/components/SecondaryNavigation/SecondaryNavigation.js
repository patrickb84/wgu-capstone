import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const SECONDARY_NAVS = [
  {
    to: '/dashboard',
    label: 'My Meal Plan',
    icon: 'fa-calendar',
  },
  {
    to: '/dashboard/recipes',
    label: 'Recipes',
    icon: 'fa-calendar',
  },
  {
    to: '/dashboard/grocery-list',
    label: 'Grocery List',
    icon: 'fa-calendar',
  },
  {
    to: '/dashboard/offers',
    label: 'Offers',
    icon: 'fa-calendar',
  },
]

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
    <div id='secondary-navigation' className='list-group list-group-flush'>
      {SECONDARY_NAVS.map(({ to, label, icon }) => (
        <NavLink to={to} key={label}>
          <i className={`fa-duotone fa-lg me-1 ${icon}`} /> {label}
        </NavLink>
      ))}
    </div>
  )
}

export default SecondaryNavigation
