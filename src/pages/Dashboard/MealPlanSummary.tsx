import { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { DateRangeType } from 'types/DateRangeType'
import { Recipe, RecipeMetadata } from 'types/Recipe'
import { ScheduledMeal } from 'types/ScheduledMeal'

interface IMealPlanSummaryProps {
	dateRange: DateRangeType
	scheduledMeals: ScheduledMeal[]
}
const MealPlanSummary = ({ dateRange, scheduledMeals }: IMealPlanSummaryProps) => {
	const [startDate, endDate] = dateRange
	const [groceryListItems, setGroceryListItems] = useState<GroceryListItem[]>([])

	return (
		<>
			<Card>
				<Card.Body>
					<Card.Title className="font-display text-brand">Plan Summary</Card.Title>
					<div className="my-4">
						{startDate && endDate && (
							<>
								<div>
									<strong>Start Date:</strong> {startDate.toLocaleDateString()}
								</div>

								<div>
									<strong>End Date:</strong> {endDate.toLocaleDateString()}
								</div>

								<div>
									<strong>Days:</strong> {endDate.getDate() - startDate.getDate()}
								</div>

								<div>
									<strong>Meals:</strong> -1
								</div>
							</>
						)}
					</div>
					<Button variant="outline-dark" size="sm" className="w-100 my-1">
						Save Plan
					</Button>
					<ButtonCreateGroceryList {...{ scheduledMeals, setGroceryListItems }} />
				</Card.Body>
			</Card>

			<Card>
				<Card.Body>
					<Card.Title className="font-display text-brand">Grocery List</Card.Title>
					{groceryListItems.map(item => (
						<div key={item.ingredient} className="mb-3">
							<div>{item.ingredient}</div>
							{/* {item.recipeMeasures.map(recipeMeasure => (
								<div className="small text-primary" key={recipeMeasure.id}>
									{recipeMeasure.name} - {recipeMeasure.measure}
								</div>
							))} */}
							<div className="text-brand small">
								{item.recipeMeasures.map(recipeMeasure => recipeMeasure.measure).join(' || ')}
							</div>
						</div>
					))}
				</Card.Body>
			</Card>
		</>
	)
}

export default MealPlanSummary

interface RecipeMeasure extends RecipeMetadata {
	measure: string
}

interface GroceryListItem {
	ingredient: string
	recipeMeasures: RecipeMeasure[]
}

interface IButtonCreateGroceryListProps {
	scheduledMeals: ScheduledMeal[]
	setGroceryListItems: (items: GroceryListItem[]) => void
}
const ButtonCreateGroceryList = (props: IButtonCreateGroceryListProps) => {
	const { scheduledMeals, setGroceryListItems } = props

	const handleCreateGroceryList = async (meals: ScheduledMeal[]) => {
		const promiseRecipes = meals.map(meal => Recipe.findRecipeById(meal.recipeId))
		const recipes = await Promise.all(promiseRecipes)
		const ingredients = recipes.map(recipe => recipe.ingredients).flat(1)
		console.log('ingredients', ingredients)

		const groceryListItems = ingredients.reduce((acc: GroceryListItem[], ingredient) => {
			const item = acc.find(item => item.ingredient === ingredient.name)
			if (item) {
				item.recipeMeasures.push({ ...ingredient.recipe, measure: ingredient.measure })
			} else {
				acc.push({
					ingredient: ingredient.name,
					recipeMeasures: [{ ...ingredient.recipe, measure: ingredient.measure }]
				})
			}
			return acc
		}, [])

		console.log('groceryListItems', groceryListItems)
		groceryListItems.sort((a, b) => a.ingredient.localeCompare(b.ingredient))
		setGroceryListItems(groceryListItems)
	}

	return (
		<Button
			variant="secondary-gray"
			size="sm"
			className="w-100 my-1"
			onClick={() => handleCreateGroceryList(scheduledMeals)}>
			Create Grocery List
		</Button>
	)
}
