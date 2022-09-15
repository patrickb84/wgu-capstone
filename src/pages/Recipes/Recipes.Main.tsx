import ApiRecipe from 'api/mealdb/types/ApiRecipe'
import Layout from 'components/Layout'
import PageHeader, { FlexCenterBetween, PageTitle } from 'pages/shared/PageHeader'
import * as React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Recipe } from './types/Recipe'
import { RECIPES } from '__stubs__/recipes'
import { RecipeCard } from './Recipe.Card'
import Searchbox from 'components/Searchbox'

export interface IRecipesMainProps {}

export function RecipesMain(props: IRecipesMainProps) {
	const [recipes, setRecipes] = React.useState<any[]>([])

	React.useEffect(() => {
		Recipe.findRandom10Recipes().then(recipes => setRecipes(recipes))
	}, [])

	return (
		<>
			<Layout>
				<PageHeader variant="brand">
					<div>
						<PageTitle>Recipes!</PageTitle>
					</div>
				</PageHeader>

				<section className="bg-light">
					<Container className="py-5">
						<Searchbox />
					</Container>
				</section>

				<Container className="py-5">
					<Row>
						{recipes.map(recipe => (
							<Col xl={3} lg={4} md={6} className="d-flex mb-4" key={recipe.id}>
								<RecipeCard recipe={recipe} />
							</Col>
						))}
					</Row>
				</Container>
			</Layout>
		</>
	)
}
