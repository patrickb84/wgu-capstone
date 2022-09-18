import ApiRecipe from 'api/mealdb/types/ApiRecipe'
import Layout from 'components/Layout'
import PageHeader, { FlexCenterBetween, PageSubtitle, PageTitle } from 'pages/shared/PageHeader'
import * as React from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { Recipe } from './types/Recipe'
import { RECIPES } from '__stubs__/recipes'
import { RecipeCard } from './Recipe.Card'
import Searchbox from 'components/Searchbox'
import { UserRecipe } from 'types/UserRecipe'
import { useUser } from 'hooks/UserProvider'
import { Link } from 'react-router-dom'
import { useRecipeData } from 'hooks/RecipeDataProvider'
import ROUTES from 'routes/routes'

export interface IRecipesMainProps {}

export function RecipesMain(props: IRecipesMainProps) {
	const [recipes, setRecipes] = React.useState<Recipe[]>([])
	const [userRecipes, setUserRecipes] = React.useState<Recipe[]>([])
	const user = useUser()

	const { areas, categories } = useRecipeData()

	React.useEffect(() => {
		Recipe.findRandom10Recipes().then(recipes => setRecipes(recipes))
		if (user) {
			UserRecipe.getAll(user.id).then(recipes => {
				const asRecipes = recipes?.map(recipe => recipe.toRecipe()).map(r => r as Recipe)
				setUserRecipes(asRecipes || [])
			})
		}
	}, [user])

	return (
		<>
			<Layout>
				<PageHeader variant="brand">
					<div>
						<PageTitle>Recipes!</PageTitle>
						<PageSubtitle>
							Hover over the recipe card to view details. Click on the calendar icon to add to your plan.
						</PageSubtitle>
					</div>
				</PageHeader>

				<section className="bg-gray-300">
					<Container className="py-5" style={{ maxWidth: 800 }}>
						<Searchbox />
					</Container>
				</section>

				<Container className="my-3 py-3">
					<h3 className="font-display h2 text-secondary text-center">Recipe Areas</h3>
					<div className="d-flex flex-wrap justify-content-center">
						{areas.map(area => (
							<div className="p-2" key={area.strArea}>
								<Link
									to={ROUTES.TO_RECIPE_TYPE_VIEW(
										'area',
										area.strArea?.toLowerCase().split(' ').join('_') || '',
										area.strArea || ''
									)}>
									{area.strArea}
								</Link>
							</div>
						))}
					</div>
				</Container>

				<Container className="my-3 py-3">
					<h3 className="font-display h2 text-secondary text-center">Recipe Categories</h3>
					<div className="d-flex flex-wrap justify-content-center">
						{categories.map(category => (
							<div className="p-2" key={category.strCategory}>
								<Link
									to={ROUTES.TO_RECIPE_TYPE_VIEW(
										'category',
										category.strCategory?.toLowerCase().split(' ').join('_') || '',
										category.strCategory || ''
									)}>
									{category.strCategory}
								</Link>
							</div>
						))}
					</div>
				</Container>

				<Container className="my-4">
					{userRecipes.length ? (
						<Row className="my-4">
							<Col xl={3} lg={4} md={6} className="d-flex mb-4">
								<div className="d-flex align-items-center p-5 p-md-3 bg-tertiary text-white w-100 rounded-3">
									<h3 className="m-0">
										User Recipes <i className="fad fa-circle-arrow-right" />
									</h3>
								</div>
							</Col>
							{userRecipes.map(recipe => (
								<Col xl={3} lg={4} md={6} className="d-flex mb-4" key={recipe.id}>
									<RecipeCard recipe={recipe} isUserRecipe />
								</Col>
							))}
						</Row>
					) : (
						<></>
					)}
					<Row className="my-4">
						<Col xl={3} lg={4} md={6} className="d-flex mb-4">
							<div className="d-flex align-items-center p-5 p-md-3 bg-tertiary text-white w-100 rounded-3">
								<h3 className="m-0">
									Random Recipes every time you refresh <i className="fad fa-circle-arrow-right" />
								</h3>
							</div>
						</Col>
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
