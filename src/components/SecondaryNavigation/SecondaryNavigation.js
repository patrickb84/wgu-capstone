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
    icon: 'fa-plate-utensils',
  },
  {
    to: '/dashboard/grocery-list',
    label: 'Grocery List',
    icon: 'fa-basket-shopping',
  },
  {
    to: '/dashboard/offers',
    label: 'Offers',
    icon: 'fa-badge-dollar',
  },
]

const SecondaryNavigation = () => {
  const location = useLocation()

  useEffect(() => {
    console.log(location)
  }, [location])

  const NavLink = ({ to, children }) => {
    const isPathActive = () => {
      
    }
    return (
      <Link
        to={to}
        className={`list-group-item list-group-item-action ${
          location.pathname === to ? 'active' : null
        }`}>
        {children}
      </Link>
    )
  }

  return (
    <div id='secondary-navigation' className='list-group'>
      {SECONDARY_NAVS.map(({ to, label, icon }) => (
        <NavLink to={to} key={label}>
          <i
            className={`fa-duotone fa-lg me-1 ${icon}`}
            style={{ width: 26, textAlign: 'center' }}
          />{' '}
          {label}
        </NavLink>
      ))}
    </div>
  )
}

export default SecondaryNavigation
