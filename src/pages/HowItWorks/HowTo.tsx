import Layout from 'components/Layout'
import PageHeader, { PageSubtitle, PageTitle } from 'pages/shared/PageHeader'
import * as React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ROUTES from 'routes/routes'

import image2 from 'styles/img/line_guy/011-cook.png'

export interface IHowToProps {}

const Section = ({ children }: { children: React.ReactNode }) => <div className="py-5">{children}</div>

export function HowTo(props: IHowToProps) {
	return (
		<Layout>
			<PageHeader variant="brand">
				<div>
					<PageTitle>How it works!</PageTitle>
					<PageSubtitle>We make it easy to plan your meals and grocery list</PageSubtitle>
				</div>
			</PageHeader>

			<Container className="my-5">
				<Row>
					<Col lg={5} md={10}>
						<h2>Steps</h2>

						<Section>
							<h3>1. Create a meal plan</h3>
							<br />
							<p>For whatever time frame you'd like, however many you want</p>
							<p>
								Once you create a meal plan, we'll automatically fill it in with recipes that fit to help you
								get started.
							</p>
							<p>
								If you're making separate meal plans, that's fine too. You can add recipes to any meal plan you
								want. Just click the "activate" button next to the plan you want to manage.
							</p>
							<br />

							<Link to={ROUTES.MEAL_PLANS} className="btn btn-tertiary text-white">
								Create a meal plan
							</Link>
						</Section>

						<Section>
							<h3>2. Add recipes</h3>
							<br />
							<p>
								Search for recipes you'd like. You can look up categories like "breakfast" or "vegetarian", or
								you can look up by area or locale, like "Greece". You can look up recipes by ingredient if you'd
								like, or just by the name.
							</p>
							{/* <p>
								You can even add your own recipes! Just click the "Create recipes" button on the recipe page.
							</p> */}
							<Link to={ROUTES.RECIPES} className="btn btn-tertiary text-white">
								Search for recipes
							</Link>
							{/* <br />
							<br />
							<Link to={ROUTES.USER_RECIPE_DASH} className="btn btn-tertiary text-white">
								Make a recipe
							</Link> */}
						</Section>
						<Section>
							<h3>3. Get a shopping list</h3>

							<br />
							<p>
								Once you've added recipes to your meal plan, you can get a shopping list for all the ingredients
								you need to make those recipes. Exclude any ingredients you may already have for your
								convenience.
							</p>

							<Link to={ROUTES.GROCERY_LIST} className="btn btn-tertiary text-white">
								Get a shopping list
							</Link>
						</Section>
					</Col>
					<Col xs={0} md={0} lg={7}>
						<div className="p-5 text-center">
							<img src={image2} alt="Cooking" className="img-fluid" />
						</div>
					</Col>
				</Row>
			</Container>
		</Layout>
	)
}
