import { Link, useLocation, useNavigate } from 'react-router-dom'
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

			<section className="py-5">
				<Container className="py-5">
					<h1 className="text-center mb-5 display-4">How it works</h1>
					<Row>
						<Col lg={4}>
							<Card className="border-0 mb-3">
								<img src={img_1} alt="plan" className="w-100 mb-2 mx-auto" style={{ maxWidth: 250 }} />
								<Card.Body className="px-lg-5 text-center">
									<Card.Title>Create a meal plan</Card.Title>
									<Card.Text>For whatever time frame you'd like, however many plans you want or need</Card.Text>
								</Card.Body>
							</Card>
						</Col>
						<Col lg={4}>
							<Card className="border-0 mb-3">
								<img src={img_2} alt="find" className="w-100 mb-2 mx-auto" style={{ maxWidth: 250 }} />
								<Card.Body className="px-lg-5 text-center">
									<Card.Title>Add recipes</Card.Title>
									<Card.Text>
										Once you create a meal plan, we'll automatically fill it in with recipes that fit. At any
										time you can add or remove recipes.
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
						<Col lg={4}>
							<Card className="border-0 mb-3">
								<img src={img_3} alt="save" className="w-100 mb-2 mx-auto" style={{ maxWidth: 250 }} />
								<Card.Body className="px-lg-5 text-center">
									<Card.Title>Get a shopping list</Card.Title>
									<Card.Text>
										When you're ready, a shopping list will be prepared for you, just exclude the items you
										don't need and be on your way!
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					</Row>

					<Spacer h={2} />
					<div className="text-center">
						<Link to={ROUTES.HOW_IT_WORKS} className="btn btn-brand btn-lg mx-auto px-5">
							More Details
						</Link>
					</div>
				</Container>
			</section>

			<section className="py-5 bg-gray-200">
				<Container className="py-5">
					<h2 className="display-4 font-display text-tertiary text-center mb-5">Such Recipes!</h2>
					<p className="font-hand h1 text-center mb-5">Choose from an ever-growing cookbook.</p>
					<Spacer h={1} />
					<Row>
						{recipes.slice(0, 8).map((recipe, idx) => {
							return (
								<Col md={6} lg={4} xl={3} className="mb-3" key={idx}>
									<RecipeCard key={recipe.id} recipe={recipe} />
								</Col>
							)
						})}
					</Row>

					<Spacer h={1} />

					<div className="text-center my-5">
						<Link to={ROUTES.RECIPES} className="btn btn-brand btn-lg">
							See All Recipes
						</Link>
					</div>
				</Container>
			</section>
		</Layout>
	)
}

const Hero = () => {
	const user = useUser()
	return (
		<header data-testid='homepage-hero' className={!user ? 'bg-light' : 'bg-tertiary'}>
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
