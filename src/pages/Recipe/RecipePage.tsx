import mealdb from 'api/mealdb'
import ApiRecipe from 'api/mealdb/types/ApiRecipe'
import Layout from 'components/Layout'
import OverlaySpinner from 'components/OverlaySpinner'
import Spacer from 'components/Spacer'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Recipe, IMeasuredIngredient } from 'types/Recipe'
import { RecipeHeader } from './RecipeHeader'
import RecipePageIngredientsList from './RecipeIngredientsList'
import { RecipeInstructions } from './RecipeInstructions'
import { RecipeLink } from './RecipeLink'
import RecipePageMetadata from './RecipePageMetadata'

export interface IRecipePageProps {}

export function RecipePage(props: IRecipePageProps) {
	const [recipe, setRecipe] = useState<Recipe | null>(null)
	const params = useParams()
	const recipeId = params.recipeId

	useEffect(() => {
		if (recipeId)
			mealdb.fetchRecipe(recipeId).then((data: ApiRecipe) => setRecipe(new Recipe(data)))
	}, [recipeId])

	if (!recipe) return <OverlaySpinner show />

	return (
		<Layout>
			<RecipeHeader {...recipe} />
			<Container>
				<RecipePageMetadata {...recipe} />
				<Row>
					<Col lg={4}>
						<img src={recipe.imageUrl} alt={recipe.name} className="w-100 rounded mb-4" />
						<RecipePageIngredientsList ingredients={recipe.ingredients} />
					</Col>
					<Col className="mt-0 mt-5">
						<RecipeInstructions {...recipe} />
						{recipe.linkUrl && <RecipeLink url={recipe.linkUrl} />}
					</Col>
				</Row>
			</Container>

			<Spacer h={5} />
		</Layout>
	)
}

export default RecipePage
