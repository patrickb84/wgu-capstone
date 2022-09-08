import mealdb from 'api/mealdb'
import ApiRecipe from 'api/mealdb/types/ApiRecipe'
import Breadcrumbs from 'components/Breadcrumbs'
import Layout from 'components/Layout'
import Spacer from 'components/Spacer'
import { RECIPES } from 'data/recipes'
import React, { useState, useEffect } from 'react'
import { Badge, Card, Col, Container, Row } from 'react-bootstrap'
import { ROUTES } from 'routes/AppRouter'
import { Recipe } from 'types/Recipe'
import { RecipeCard } from '../../components/RecipeCard'

export interface IRecipesPageProps {}

export const RecipesPage = (props: IRecipesPageProps) => {
	const [recipes, setRecipes] = useState<any>([])

	useEffect(() => {
		setRecipes(RECIPES)
	}, [])

	return (
		<>
			<Layout>
				<div className="min-h-100 bg-gray-100">
					<header className="bg-secondary">
						<Container className="py-5 d-flex h-100 flex-column align-items-start ">
							<Breadcrumbs
								items={[
									{ label: 'Meal Plan', to: ROUTES.MEALPLAN },
									{ label: 'Recipes', to: ROUTES.RECIPES, active: true }
								]}
							/>
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
			</Layout>
		</>
	)
}