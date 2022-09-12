import { isEqual } from 'date-fns'
import { ScheduledMealzzzz } from 'types/ScheduledMeal'

export interface IDayPlan {
	date: Date
	meals: ScheduledMealzzzz[]
}

export class DayPlan implements IDayPlan {
	date: Date
	meals: ScheduledMealzzzz[]

	constructor(date: Date, scheduledMeals: ScheduledMealzzzz[]) {
		this.date = date
		this.meals = this._getMeals(scheduledMeals)
	}

	public addMeal(meal: ScheduledMealzzzz) {
		this.meals.push(meal)
	}

	private _getMeals(scheduledMeals: ScheduledMealzzzz[]) {
		return scheduledMeals.filter(meal => isEqual(meal.date, this.date))
	}

	get key() {
		return this.date.toISOString()
	}
}
