import mealdb from 'api/mealdb'
import ApiRecipe from 'types/ApiRecipe'
import Breadcrumbs from 'components/Breadcrumbs'
import Layout from 'components/Layout'
import OverlaySpinner from 'components/OverlaySpinner'
import Spacer from 'components/Spacer'
import PageHeader, { PageTitle } from 'pages/shared/PageHeader'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import ROUTES from 'routes/routes'
import { UserRecipe } from 'types/UserRecipe'
import { ButtonAddRecipeToPlan } from './ButtonAddRecipeToPlan'
import { IRecipe, Recipe } from '../../types/Recipe'

export default function RecipeDetails() {
	const [recipe, setRecipe] = useState<IRecipe | null>(null)
	const { recipeId, userRecipeId } = useParams()
	const navigate = useNavigate()
	const [errorLoading, setErrorLoading] = useState(false)

	useEffect(() => {
		// const getUserRecipe = async (id: string) => {
		// 	try {
		// 		const customerRecipe = await UserRecipe.get(id)
		// 		if (customerRecipe) {
		// 			const recipe = customerRecipe.toRecipe() as Recipe
		// 			setRecipe(recipe)
		// 		}
		// 	} catch (error) {
		// 		console.error('error', { error, id })
		// 	}
		// }
		const getApiRecipe = async (id: string) => {
			try {
				const apiRecipe: ApiRecipe = await mealdb.fetchRecipe(id)
				const recipe = new Recipe(apiRecipe)
				setRecipe(recipe)
			} catch (error) {
				console.error('error', { error, id })
				console.warn('Could not find recipe, like a user recipe', { id })
				// getUserRecipe(id)
				await UserRecipe.get(id).then(customerRecipe => {
					if (customerRecipe && customerRecipe.id) {
						// navigate(ROUTES.TO_USER_RECIPE(customerRecipe.id))
					} else {
						setErrorLoading(true)
					}
				})
			}
		}
		try {
			if (recipeId) getApiRecipe(recipeId)
			// if (userRecipeId) getUserRecipe(userRecipeId)
		} catch (error) {
			console.error('error', { error })
		}
	}, [userRecipeId, navigate, recipeId])

	return (
		<Layout>
			{!errorLoading ? (
				<>
					{!recipe ? (
						<OverlaySpinner />
					) : (
						<>
							<PageHeader variant="brand">
								<div>
									<Breadcrumbs
										items={[
											{ label: 'Home', to: ROUTES.HOME },
											{ label: 'Recipes', to: ROUTES.RECIPES }
										]}
									/>

									<div className="d-flex justify-content-center align-items-lg-end align-items-center">
										<PageTitle>{recipe.name}</PageTitle>
									</div>
								</div>

								<ButtonAddRecipeToPlan as="button" recipe={recipe} />
							</PageHeader>
							<RecipePageMetadata {...recipe} />
							<Container className='my-3'>
								<Row>
									<Col lg={4}>
										<img
											src={recipe.imageUrl}
											alt={recipe.name}
											className="w-100 rounded mb-4"
											onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
												e.currentTarget.src = 'https://via.placeholder.com/640x640'
											}}
										/>
										<RecipePageIngredientsList ingredients={recipe.ingredients} />
									</Col>
									<Col className="mt-0 mt-5">
										<RecipeInstructions instructions={recipe.instructions} />
										{recipe.linkUrl && <RecipeLink linkUrl={recipe.linkUrl} />}
									</Col>
								</Row>
							</Container>
							<Spacer h={5} />
						</>
					)}
				</>
			) : (
				<>
					<div className="py-5">
						<Container className="bg-light my-3 rounded p-lg-5 p-4 text-center">
							<p>Recipe not found</p>
							<h1 className="mb-4">Couldn't seem to find that one...</h1>
							<Link to={ROUTES.RECIPES} className="btn btn-brand">
								Go back to recipes
							</Link>
						</Container>
					</div>
				</>
			)}
		</Layout>
	)
}

function RecipePageMetadata(props: Pick<Recipe, 'area' | 'category'>) {
	if (!props.area && !props.category) return <></>
	return (
		<Container className="small d-flex py-3 w-100 flex-wrap">
			{props.area && (
				<div className="me-3 py-1">
					<span className="text-muted">Area:</span>
					<Spacer w={0.3} />
					<span className="text-tertiary">{props.area}</span>
				</div>
			)}
			{props.category && (
				<div className="me-3 py-1">
					<span className="text-muted">Category:</span>
					<Spacer w={0.3} />
					<span className="text-tertiary">{props.category}</span>
				</div>
			)}
		</Container>
	)
}

function RecipePageIngredientsList(props: Pick<Recipe, 'ingredients'>) {
	return (
		<>
			<h2 className="h1 font-hand text-tertiary mb-0">Ingredients</h2>
			<div className="border rounded px-5 px-lg-3 py-4">
				{props.ingredients.map((ingredient, idx) => (
					<div key={idx} className="d-flex align-items-end justify-content-between my-1">
						<span className="fw-semibold">{ingredient.ingredientName}</span>
						<small className="text-brand">{ingredient.measure}</small>
					</div>
				))}
			</div>
		</>
	)
}

function RecipeInstructions(props: Pick<Recipe, 'instructions'>) {
	return (
		<>
			<h2 className="display-4 mt-0 font-hand text-brand d-flex align-items-end justify-content-between">
				Instructions
			</h2>
			<ol>
				{props.instructions?.map((instruction, idx) => (
					<li key={idx} className="my-4 pb-1">
						{instruction}
					</li>
				))}
			</ol>
		</>
	)
}

function RecipeLink(props: Pick<Recipe, 'linkUrl'>) {
	if (!props.linkUrl) return <></>
	return (
		<>
			<div className="pt-4 text-end pe-2 small i">
				Source:{' '}
				<Link className="text-tertiary" to={props.linkUrl}>
					{props.linkUrl}
				</Link>
			</div>
		</>
	)
}
