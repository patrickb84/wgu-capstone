import mealdb from 'api/mealdb'
import { ApiRecipe } from 'api/mealdb/types/ApiRecipe'
import { Spacer } from 'components/Spacer'
import { RECIPES } from 'data/recipes'
import React, { useState, useEffect } from 'react'
import { Badge, Card, Col, Container, Row } from 'react-bootstrap'
import { Recipe } from 'types/Recipe'
import { RecipeCard } from './RecipeCard'

export interface IRecipesPageProps {}

export const RecipesPage = (props: IRecipesPageProps) => {
	const [recipes, setRecipes] = useState<any>([])

	useEffect(() => {
		// mealdb
		// 	.fetchRandom10Recipes()
		// 	.then(data => {
		// 		data = data.map((recipe: ApiRecipe) => new Recipe(recipe))
		// 		console.log(data)
		// 		setRecipes(data)
		// 	})
		// 	.catch(err => {
		// 		console.log(err)
		// 	})

		setRecipes(RECIPES)
	}, [])

	return (
		<>
			<div className="h-100">
				<header className="pt-6 bg-secondary">
					<Container className="py-4 d-flex align-items-center h-100">
						<h1 className="text-white display-4">Recipes</h1>
					</Container>
				</header>

				<section>
					<Container className="py-5">
						<Row>
							{recipes.slice(0, 9).map((recipe: Recipe) => (
								<RecipeCard key={recipe.id} recipe={recipe} />
							))}
						</Row>
					</Container>
				</section>
			</div>
		</>
	)
}
