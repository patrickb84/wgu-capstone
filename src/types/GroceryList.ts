import { IScheduledMeal } from 'types/ScheduledMeal'

export interface IGroceryListGenerator {
	userId: string
	scheduledMeals: IScheduledMeal[]
}

export type GroceryItemMeta = {
	measure: string
	recipeName: string
	recipeCount: number
}
export type GroceryItem = {
	ingredientName: string
	metadata: GroceryItemMeta[]
}
