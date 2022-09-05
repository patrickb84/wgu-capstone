import mealdb from 'api/mealdb'
import { ApiRecipe } from 'api/mealdb/types/ApiRecipe'
import { OverlaySpinner } from 'components/OverlaySpinner'
import { Spacer } from 'components/Spacer'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Recipe, RecipeIngredient } from 'types/Recipe'
import { ButtonAddToPlan } from './ButtonAddToPlan'
import { ButtonBookmark } from './ButtonBookmark'

export interface IRecipePageProps {}

export function RecipePage(props: IRecipePageProps) {
	const [recipe, setRecipe] = useState<Recipe | null>(null)
	const params = useParams()
	const recipeId = params.recipeId

	useEffect(() => {
		if (recipeId)
			mealdb.fetchRecipe(recipeId).then((data: ApiRecipe) => setRecipe(new Recipe(data)))
	}, [recipeId])

	if (!recipe)
		return (
			<div className="h-100">
				<OverlaySpinner />
			</div>
		)

	return (
		<div className="min-h-100">
			<header className="pt-6 bg-brand">
				<Container className="py-4 d-flex flex-column align-items-start h-100">
					<div className="d-flex w-100 align-items-center justify-content-between">
						<div>
							<h1 className="text-white d-flex align-items-start align-items-lg-center flex-lg-row flex-column justify-content-start">
								<Spacer w={0.5} />
								<span className=" display-4">{recipe.name}</span>
							</h1>
						</div>
						<div className="ms-3 d-flex flex-column justify-content-center align-items-center px-2">
							<ButtonBookmark iconFaGroup="fal" size="1.5rem" colorVariant="white" />
							<ButtonAddToPlan
								recipeId={recipe.id}
								iconFaGroup="fa"
								size="1.5rem"
								colorVariant="white"
							/>
						</div>
					</div>
				</Container>
			</header>

			<section className="w-100 min-h-100">
				<Container>
					<Row className="my-4">
						<Col>
							<RecipePageMetadata recipe={recipe} />
						</Col>
					</Row>
					<Row>
						<Col lg={4}>
							<img src={recipe.imageUrl} alt={recipe.name} className="w-100 rounded mb-4" />
							<RecipePageIngredientsList ingredients={recipe.ingredients} />
						</Col>
						<Col>
							<>
								<h2 className="display-4 mt-0 font-hand text-brand d-flex align-items-end justify-content-between">
									Instructions
								</h2>
								<ol>
									{recipe.instructions?.map((instruction, idx) => (
										<li key={idx} className="my-4 pb-1">
											{instruction}
										</li>
									))}
								</ol>
								<div className="pt-4 text-end pe-2 small i">
									{recipe.linkUrl && (
										<>
											<Link className="text-tertiary" to={recipe.linkUrl}>
												Original Source
											</Link>
										</>
									)}
								</div>
							</>
						</Col>
					</Row>
				</Container>
			</section>

			<Spacer h={5} />
		</div>
	)
}

export default RecipePage

const RecipePageIngredientsList = ({ ingredients }: { ingredients: RecipeIngredient[] }) => {
	return (
		<>
			<h2 className="h1 font-hand text-tertiary mb-0">Ingredients</h2>
			<div className="border rounded px-5 px-lg-3 py-4">
				{ingredients.map((ingredient, idx) => (
					<div key={idx} className="d-flex align-items-end justify-content-between my-1">
						<span className="fw-semibold">{ingredient.name}</span>
						<small className="text-brand">{ingredient.measure}</small>
					</div>
				))}
			</div>
		</>
	)
}

const RecipePageMetadata = ({ recipe }: { recipe: Recipe }) => {
	return (
		<div className="small d-flex mb-2 w-100 flex-wrap">
			{recipe.area && (
				<div className="me-3 py-1">
					<span className="text-muted">Area:</span>
					<Spacer w={0.3} />
					<span className="text-tertiary">{recipe.area}</span>
				</div>
			)}
			{recipe.category && (
				<div className="me-3 py-1">
					<span className="text-muted">Category:</span>
					<Spacer w={0.3} />
					<span className="text-tertiary">{recipe.category}</span>
				</div>
			)}
			{recipe.tags && (
				<div className="me-3 py-1">
					<span className="text-muted">Tags:</span>
					<Spacer w={0.3} />
					<span className="text-tertiary">{recipe.tags.split(',').join(', ')}</span>
				</div>
			)}

			{recipe.youtubeUrl && (
				<div className="me-3 ms-lg-auto py-1">
					<Link className="d-flex align-items-center text-tertiary i" to={recipe.youtubeUrl}>
						<span>Watch it on YouTube</span> <Spacer w={0.5} />
						<i className="fab fa-youtube fa-lg" />
					</Link>
				</div>
			)}
		</div>
	)
}
