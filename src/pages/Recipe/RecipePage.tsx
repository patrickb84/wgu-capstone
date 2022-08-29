import mealdb from 'api/mealdb'
import { ApiRecipe } from 'api/mealdb/types/ApiRecipe'
import { OverlaySpinner } from 'components/OverlaySpinner'
import { Spacer } from 'components/Spacer'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Recipe } from 'types/Recipe'

export interface IRecipePageProps {}

export function RecipePage(props: IRecipePageProps) {
	const [recipe, setRecipe] = useState<Recipe | null>(null)
	const params = useParams()
	let navigate = useNavigate()
	const recipeId = params.recipeId

	useEffect(() => {
		if (!recipeId) return

		mealdb
			.fetchRecipe(recipeId)
			.then((data: ApiRecipe) => {
				const r = new Recipe(data)
				console.log(r)
				return r
			})
			.then(setRecipe)
	}, [recipeId])

	if (!recipe) return <OverlaySpinner />

	return (
		<div className="h-100">
			<header className="pt-6 bg-brand">
				<Container className="py-4 d-flex flex-column align-items-start h-100">
					<Link className="text-white" to={''} onClick={() => navigate(-1)}>
						{'<'} Back
					</Link>
					<h1 className="text-white display-4">{recipe.name}</h1>
				</Container>
			</header>

			<section className="w-100">
				<Container>
					<Row className="my-4">
						<Col className="d-flex justify-content-between">
							<div className="small d-flex mb-2">
								{recipe.area && (
									<div className="me-3">
										<span className="text-muted">Area:</span>
										<Spacer w={0.3} />
										<span className="text-tertiary">{recipe.area}</span>
									</div>
								)}
								{recipe.category && (
									<div className="me-3">
										<span className="text-muted">Category:</span>
										<Spacer w={0.3} />
										<span className="text-tertiary">{recipe.category}</span>
									</div>
								)}

								{recipe.tags && (
									<div className="me-3">
										<span className="text-muted">Tags:</span>
										<Spacer w={0.3} />
										<span className="text-tertiary">{recipe.tags.split(',').join(', ')}</span>
									</div>
								)}
							</div>

							{recipe.youtubeUrl && (
								<Link
									className="small d-flex align-items-center text-tertiary i"
									to={recipe.youtubeUrl}>
									<span>Watch it on YouTube</span> <Spacer w={0.5} />
									<i className="fab fa-youtube fa-lg" />
								</Link>
							)}
						</Col>
					</Row>
					<Row>
						<Col lg={4}>
							<img src={recipe.imageUrl} alt={recipe.name} className="w-100 rounded mb-4" />

							<div>
								<h2 className="h1 font-hand text-tertiary" style={{ marginBottom: -20 }}>
									Ingredients
								</h2>
								<div className="border rounded px-3 py-4">
									{recipe.ingredients.map((ingredient, idx) => (
										<div key={idx} className="d-flex align-items-end justify-content-between my-1">
											<span className="fw-semibold">{ingredient.name}</span>
											<small className="text-brand">{ingredient.measure}</small>
										</div>
									))}
								</div>
							</div>
						</Col>
						<Col>
							<div>
								<h2 className="h1 font-hand text-brand d-flex align-items-end justify-content-between">
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
												{recipe.linkUrl}
											</Link>
										</>
									)}
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</section>

			<Spacer h={5} />
		</div>
	)
}

export default RecipePage
