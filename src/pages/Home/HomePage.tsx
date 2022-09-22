import { Link } from 'react-router-dom'
import { Card, Col, Container, Row } from 'react-bootstrap'
import img_1 from 'styles/img/arch_cooks/009-cooking.png'
import img_2 from 'styles/img/arch_cooks/016-cooking.png'
import img_3 from 'styles/img/arch_cooks/013-cooking.png'
import mealdb from 'api/mealdb'
import { useEffect, useState } from 'react'
import ApiRecipe from 'types/ApiRecipe'
import Spacer from 'components/Spacer'
import Layout from 'components/Layout'
import ROUTES from 'routes/routes'
import { Recipe } from 'types/Recipe'
import { RecipeCard } from 'pages/Recipes/Recipe.Card'
import { useUser } from 'hooks/UserProvider'
import { MiniLogo } from 'components/Logo'
import { HomePageSectionHowItWorks } from './Section.HowItWorks'
import { SectionRecipes } from './Section.Recipes'

export interface IHomePageProps {}

export const HomePage = (props: IHomePageProps) => {
	const [recipes, setRecipes] = useState<Recipe[]>([])

	useEffect(() => {
		mealdb
			.fetchRandom10Recipes()
			.then(recipes => recipes.map((r: ApiRecipe) => new Recipe(r)))
			.then(setRecipes)
	}, [])

	return (
		<Layout>
			<Hero />

			<HomePageSectionHowItWorks />

			<SectionRecipes recipes={recipes} />
		</Layout>
	)
}

const Hero = () => {
	const user = useUser()
	return (
		<header data-testid='homepage' className={!user ? 'bg-light' : 'bg-tertiary'}>
			<Container>
				{!user ? (
					<div
						className="text-center d-flex align-items-center justify-content-center flex-column pt-3"
						style={{ height: '30rem' }}>
						<h1 className="font-display text-brand display-1">Sous Chef!</h1>
						<p className="fs-1 text-secondary font-hand" style={{ opacity: 0.85 }}>
							Your meal plan assistant
						</p>
						<div className="pt-4">
							<Link to={ROUTES.REGISTER} className="btn btn-brand btn-lg px-5 mx-1 mx-lg-2">
								Sign Up
							</Link>
							<Link to={ROUTES.LOGIN} className="mx-1 mx-lg-2 btn btn-outline-secondary btn-lg px-5">
								Sign In
							</Link>
						</div>
					</div>
				) : (
					<div
						className="text-center d-flex align-items-center justify-content-center flex-column pt-3"
						style={{ height: '32rem' }}>
							<MiniLogo colorClass="white" />
							<Spacer h={1} />
						<h1 className="font-display text-white display-1 mt-3">Get Started!</h1>
						<div className="pt-4">
							<Link to={ROUTES.MEAL_PLANS} className="btn btn-secondary btn-lg mx-1 mx-lg-2 my-2">
								Create a Meal Plan
							</Link>
						</div>
					</div>
				)}
			</Container>
		</header>
	)
}
