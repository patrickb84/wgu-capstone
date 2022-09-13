import { IScheduledMeal } from 'pages/ScheduledMeals/types/ScheduledMeal'

export interface IGroceryListGenerator {
	userId: string
	scheduledMeals: IScheduledMeal[]
}