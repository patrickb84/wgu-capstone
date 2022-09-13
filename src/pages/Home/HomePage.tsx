import { Link } from 'react-router-dom'
import { Card, Col, Container, Row } from 'react-bootstrap'

import img_1 from 'styles/img/arch_cooks/009-cooking.png'
import img_2 from 'styles/img/arch_cooks/016-cooking.png'
import img_3 from 'styles/img/arch_cooks/013-cooking.png'
import mealdb from 'api/mealdb'
import { useEffect, useState } from 'react'
import ApiRecipe from 'api/mealdb/types/ApiRecipe'
import Spacer from 'components/Spacer'
import Layout from 'components/Layout'
import ROUTES from 'routes/routes'
import { Recipe } from 'pages/Recipes/types/Recipe'
import { RecipeCard } from 'pages/Recipes/Recipe.Card'

export interface IHomePageProps {}

export const HomePage = (props: IHomePageProps) => {
	const [recipes, setRecipes] = useState<Recipe[]>([])

	useEffect(() => {
		mealdb
			.fetchRandom10Recipes()
			.then(recipes => recipes.map((r: ApiRecipe) => new Recipe(r)))
			.then(setRecipes)
	}, [])

	console.log(recipes)

	return (
		<Layout>
			<Hero />

			<section className="py-5">
				<Container className="py-5">
					<h1 className="text-center mb-5 display-4">Plan your menu like a master!</h1>
					<Row>
						<Col lg={4}>
							<Card className="border-0">
								<img src={img_1} alt="plan" className="w-100 mb-2" />
								<Card.Body>
									<Card.Title>Plan your meals</Card.Title>
									<Card.Text>
										Plan your meals for the week and get a shopping list for the weekend.
									</Card.Text>
									<Link to={''}>Plan your meals</Link>
								</Card.Body>
							</Card>
						</Col>
						<Col lg={4}>
							<Card className="border-0">
								<img src={img_2} alt="find" className="w-100 mb-2" />
								<Card.Body>
									<Card.Title>Find recipes</Card.Title>
									<Card.Text>
										Find recipes based on your preferences and ingredients you have at
										home.
									</Card.Text>
									<Link to={''}>Find recipes</Link>
								</Card.Body>
							</Card>
						</Col>
						<Col lg={4}>
							<Card className="border-0">
								<img src={img_3} alt="save" className="w-100 mb-2" />
								<Card.Body>
									<Card.Title>Save your favorites</Card.Title>
									<Card.Text>
										Save your favorite recipes and plan them for the week.
									</Card.Text>
									<Link to={''}>View recipes</Link>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</section>

			<section className="py-5 bg-gray-200">
				<Container className="py-5">
					<h2 className="display-4 font-display text-tertiary text-center mb-5">
						Such Recipes!
					</h2>
					<p className="font-hand h1 text-center mb-5">
						Choose from an ever-growing cookbook.
					</p>
					<Spacer h={1} />
					<Row>
						{recipes.slice(0, 9).map(recipe => {
							return <RecipeCard key={recipe.id} recipe={recipe} />
						})}
					</Row>
				</Container>
			</section>
		</Layout>
	)
}

const Hero = () => {
	return (
		<header className="bg-light">
			<Container>
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
						<Link
							to={ROUTES.LOGIN}
							className="mx-1 mx-lg-2 btn btn-outline-secondary btn-lg px-5">
							Sign In
						</Link>
					</div>
				</div>
			</Container>
		</header>
	)
}
