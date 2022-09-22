import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import Spacer from 'components/Spacer'
import ROUTES from 'routes/routes'
import { Recipe } from 'types/Recipe'
import { RecipeCard } from 'pages/Recipes/Recipe.Card'

export interface ISectionRecipesProps {
	recipes: Recipe[]
}

export function SectionRecipes({ recipes }: ISectionRecipesProps) {
	return (
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
	)
}
