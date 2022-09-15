import mealdb from 'api/mealdb'
import ApiRecipe from 'api/mealdb/types/ApiRecipe'
import Breadcrumbs from 'components/Breadcrumbs'
import { GenericIconButtonProps } from 'components/IconButton'
import Layout from 'components/Layout'
import OverlaySpinner from 'components/OverlaySpinner'
import Spacer from 'components/Spacer'
import { useActiveMealPlan } from 'hooks/MealPlanProvider'
import PageHeader, { PageTitle } from 'pages/shared/PageHeader'
import { useEffect, useState } from 'react'
import { Breadcrumb, Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import ROUTES from 'routes/routes'
import { ButtonAddRecipeToPlan } from './ButtonAddRecipeToPlan'
import { Recipe } from './types/Recipe'

export interface IRecipePageProps {}

const iconProps: Pick<GenericIconButtonProps, 'size' | 'className' | 'colorVariant'> = {
	size: '1.75em',
	className: 'mx-2',
	colorVariant: 'white'
}

export default function RecipeDetails(props: IRecipePageProps) {
	const [recipe, setRecipe] = useState<Recipe | null>(null)
	const { recipeId } = useParams()
	const { activeMealPlan } = useActiveMealPlan()
	const navigate = useNavigate()

	useEffect(() => {
		if (recipeId)
			mealdb
				.fetchRecipe(recipeId)
				.then((data: ApiRecipe) => setRecipe(new Recipe(data)))
				.catch(() => navigate(ROUTES.ERROR))
	}, [navigate, recipeId])


	if (!recipe) return <OverlaySpinner />

	return (
		<Layout>
			<PageHeader variant="brand">
				<div>
					<Breadcrumbs
						items={[
							{ label: 'Home', to: ROUTES.HOME },
							{ label: 'Recipes', to: ROUTES.RECIPES },
							{ label: recipe.name, to: '.', active: true }
						]}
					/>
					<PageTitle>{recipe.name}</PageTitle>
				</div>
				<div className="d-flex flex-lg-row flex-column justify-content-center align-items-lg-end align-items-center">
					<ButtonAddRecipeToPlan
						iconFaGroup="fas"
						{...iconProps}
						recipe={recipe}
						planId={activeMealPlan as string}
					/>
					{/* <IconButton iconFaName="fa-youtube" iconFaGroup="fa-brands" {...iconProps} /> */}
				</div>
			</PageHeader>
			<Container>
				<RecipePageMetadata {...recipe} />
				<Row>
					<Col lg={4}>
						<img src={recipe.imageUrl} alt={recipe.name} className="w-100 rounded mb-4" />
						<RecipePageIngredientsList ingredients={recipe.ingredients} />
					</Col>
					<Col className="mt-0 mt-5">
						<RecipeInstructions instructions={recipe.instructions} />
						{recipe.linkUrl && <RecipeLink linkUrl={recipe.linkUrl} />}
					</Col>
				</Row>
			</Container>
			<Spacer h={5} />
		</Layout>
	)
}

function RecipePageMetadata(props: Pick<Recipe, 'area' | 'category'>) {
	return (
		<div className="small d-flex py-4 mb-2 w-100 flex-wrap">
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
		</div>
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
				<Link className="text-tertiary" to={props.linkUrl} replace>
					{props.linkUrl}
				</Link>
			</div>
		</>
	)
}
