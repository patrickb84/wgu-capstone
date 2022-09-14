import mealdb from 'api/mealdb'
import { ApiCategory } from 'api/mealdb/types/ApiCategory'
import Layout from 'components/Layout'
import { useActiveMealPlan } from 'hooks/MealPlanProvider'
import { IMeasuredIngredient, IRecipe, Recipe } from 'pages/Recipes/types/Recipe'
import ScheduledMeal from 'pages/ScheduledMeals/types/ScheduledMeal'
import PageHeader, { PageTitle } from 'pages/shared/PageHeader'
import * as React from 'react'
import { Button, Container, Table } from 'react-bootstrap'

export interface IGroceryListTableProps {}

type GroceryListItemData = {
	ingredient: string
	recipesAndMeasures: {
		recipeId: string
		measure: string
	}[]
}
export default function GroceryListTable(props: IGroceryListTableProps) {
	const { activeMealPlan } = useActiveMealPlan()
	const [items, setItems] = React.useState<string[]>([])
	const [loading, setLoading] = React.useState<boolean>(true)

	React.useEffect(() => {
		if (activeMealPlan) {
			const fetch = async () => {
				const scheduledMeals = await ScheduledMeal.getMealPlanScheduledMeals(activeMealPlan)
				const $recipes = await Promise.all(
					scheduledMeals
						.map(scheduledMeal => scheduledMeal.recipeId)
						.map(async recipeId => (await mealdb.fetchRecipe(recipeId)) as ApiCategory)
				)
				const recipes = $recipes.map(recipe => new Recipe(recipe) as IRecipe)
				console.log(recipes)

				const recipe_ingredients = recipes.map(recipe => recipe.ingredients)
				const measured_ingredients: IMeasuredIngredient[] = recipe_ingredients.flat()

				const getGroceryListItemDataFromMeasuredIngredients = (
					measuredIngredients: IMeasuredIngredient[]
				): GroceryListItemData[] => {
					const groceryListItemData: GroceryListItemData[] = []
					measuredIngredients.forEach(measuredIngredient => {
						const groceryListItemDataIndex = groceryListItemData.findIndex(
							item => item.ingredient === measuredIngredient.ingredientName
						)
						if (groceryListItemDataIndex === -1) {
							groceryListItemData.push({
								ingredient: measuredIngredient.ingredientName,
								recipesAndMeasures: [
									{
										recipeId: measuredIngredient.recipeId,
										measure: measuredIngredient.measure
									}
								]
							})
						} else {
							groceryListItemData[groceryListItemDataIndex].recipesAndMeasures.push({
								recipeId: measuredIngredient.recipeId,
								measure: measuredIngredient.measure
							})
						}
					})
					return groceryListItemData
				}

				const groceryListItems = getGroceryListItemDataFromMeasuredIngredients(measured_ingredients)
				console.log(groceryListItems)
			}
			fetch()
		}
	}, [activeMealPlan])

	return (
		<Layout>
			<PageHeader variant="secondary">
				<PageTitle>Grocery List</PageTitle>
				<Button variant="light">Create From Plan</Button>
			</PageHeader>

			<Container className="my-3">
				<h2>Ingredients</h2>
			</Container>
		</Layout>
	)
}
