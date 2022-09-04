import * as React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from 'routes/AppRouter'

function NavbarBack() {
	const navigate = useNavigate()
	return (
		<Link className="text-black" to="" onClick={() => navigate(-1)}>
			<i className="far fa-arrow-left nav-icon"></i>
		</Link>
	)
}

function NavbarRecipes() {
	return (
		<Link className="text-black" to={ROUTES.RECIPES}>
			<i className="far fa-plate-utensils nav-icon"></i>
		</Link>
	)
}

const NavbarButton = {
	Back: NavbarBack,
	Recipes: NavbarRecipes
}

export default NavbarButton
