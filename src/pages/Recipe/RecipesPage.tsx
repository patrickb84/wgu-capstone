import mealdb from 'api/mealdb'
import { ApiRecipe } from 'api/mealdb/types/ApiRecipe'
import IconButton from 'components/IconButton'
import React, { useState, useContext, useEffect } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Recipe } from 'types/Recipe'

export interface IRecipesProps {}

export const Recipes = (props: IRecipesProps) => {
	const [recipes, setRecipes] = useState<any>([])

	useEffect(() => {
		mealdb
			.fetchRandom10Recipes()
			.then(data => {
				data = data.map((recipe: ApiRecipe) => new Recipe(recipe))
				console.log(data)
				setRecipes(data)
			})
			.catch(err => {
				console.log(err)
			})
	}, [])

	return (
		<>
			<div className="h-100">
				<header className="pt-6 bg-tertiary">
					<Container className="py-4 d-flex align-items-center h-100">
						<h1 className="text-white">Recipes</h1>
					</Container>
				</header>

				<section>
					<Container className="py-5">
						<Row>
							{recipes.slice(0, 9).map((recipe: Recipe) => (
								<Col lg={4} key={recipe.id} className="d-flex mb-4">
									<Card className="w-100">
										<Card.Img variant="top" src={recipe.imageUrl} />
										<Card.Body className="d-flex justify-content-between">
											<span>{recipe.name}</span>
											<div className='d-flex flex-row text-secondary align-items-start'>
												<button className="icon-button">
													<i
														className="far fa-calendar-plus" // can use a modal: add to plan day, or add to another
														style={{ fontSize: 24 }}
													/>
                                                </button>
                                                {/* <button className="icon-button ms-1">
													<i
														className="far fa-calendar-day"
														style={{ fontSize: 24 }}
													/>
												</button> */}
                                                {/* <button className="icon-button ms-1">
													<i
														className="far fa-bookmark" // can slash
														style={{ fontSize: 24 }}
													/>
												</button> */}
                                                <button className="icon-button ms-1">
													<i
														className="far fa-book" // open recipe
														style={{ fontSize: 24 }}
													/>
												</button>
											</div>
										</Card.Body>
									</Card>
								</Col>
							))}
						</Row>
					</Container>
				</section>
			</div>
		</>
	)
}
