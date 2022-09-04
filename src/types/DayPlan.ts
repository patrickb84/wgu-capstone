import { isEqual } from 'date-fns'
import { ScheduledMeal } from 'types/ScheduledMeal'
export interface IDayPlan {
	date: Date
	meals: ScheduledMeal[]
}

export class DayPlan implements IDayPlan {
	date: Date
	meals: ScheduledMeal[]

	constructor(date: Date, scheduledMeals: ScheduledMeal[]) {
		this.date = date
		this.meals = this._getMeals(scheduledMeals)
	}

	public addMeal(meal: ScheduledMeal) {
		this.meals.push(meal)
	}

	private _getMeals(scheduledMeals: ScheduledMeal[]) {
		return scheduledMeals.filter(meal => isEqual(meal.date, this.date))
	}

	get key() {
		return this.date.toISOString()
	}
}
