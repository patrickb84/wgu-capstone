import mealdb from 'api/mealdb'
import { format, isSameDay } from 'date-fns'
import ScheduledMeal, { IScheduledMeal } from 'pages/ScheduledMeals/types/ScheduledMeal'
import { FlexCenterBetween } from 'pages/shared/PageHeader'
import React, { useCallback, useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { getDateArray } from 'utils/time.utils'
import MealPlan from 'pages/MealPlans/types/MealPlan'
import ButtonPlannerDayEdit from './PlannerDay.Edit'
import MidSpinner from 'components/MidSpinner'

export interface IMealPlanViewProps {
	mealPlanId: string
	mode?: 'adding' | 'viewing'
	cardExtension?: (props: DayWithMeals) => JSX.Element
}

export function PlannerView(props: IMealPlanViewProps) {
	const { mealPlanId, mode = 'viewing', cardExtension: CardExtension } = props
	const [daysWithMeals, setDaysWithMeals] = useState<DayWithMeals[]>([])
	const [mealPlan, setMealPlan] = useState<MealPlan>()
	const [isLoading, setLoading] = useState(true)

	useEffect(() => {
		MealPlan.get(mealPlanId).then(setMealPlan)
	}, [mealPlanId])

	const getPlans = useCallback(() => {
		if (!mealPlan) return
		ScheduledMeal.getMealPlanScheduledMeals(mealPlanId as string).then(scheduledMeals => {
			const meals = scheduledMeals.map(scheduledMeal => {
				return new ScheduledMeal(scheduledMeal)
			})
			mapScheduledMealsToAndRecipes(meals, mealPlan)
				.then(setDaysWithMeals)
				.then(() => setLoading(false))
		})
	}, [mealPlan, mealPlanId])

	useEffect(() => {
		if (mealPlanId as string) {
			getPlans()
		}
	}, [mealPlanId, getPlans])

	return (
		<>
			{isLoading ? (
				<MidSpinner />
			) : (
				<>
					{daysWithMeals.map(mealDate => {
						const dateString = format(mealDate.date, 'EEE, MMM dd')

						return (
							<React.Fragment key={mealDate.date.toISOString()}>
								<Card className="mb-3">
									<Card.Header>
										<FlexCenterBetween>
											{dateString}
											{mode === 'viewing' && (
												<ButtonPlannerDayEdit mealDate={mealDate} onComplete={getPlans} />
											)}
										</FlexCenterBetween>
									</Card.Header>
									<Card.Body>
										<ul className="list-unstyled mb-0">
											{mealDate.meals.map(meal => (
												<li key={meal.id}>{meal.recipeName}</li>
											))}
										</ul>
										{CardExtension && <CardExtension {...mealDate} />}
									</Card.Body>
								</Card>
							</React.Fragment>
						)
					})}
				</>
			)}
		</>
	)
}

const mapScheduledMealsToAndRecipes = async (scheduledMeals: ScheduledMeal[], mealPlan: MealPlan) => {
	const mealsWithRecipes = scheduledMeals.map(async scheduledMeal => {
		try {
			const recipe = await mealdb.fetchRecipe(scheduledMeal.recipeId)
			return { ...scheduledMeal, recipeName: recipe.strMeal }
		} catch (error) {
			console.error(error)
			return { ...scheduledMeal, recipeName: 'None' as string }
		}
	})

	const mealsWithRecipesResolved = await Promise.all(mealsWithRecipes)

	const dateArray = getDateArray(mealPlan.planStartDate, mealPlan.planEndDate)
	const result = dateArray.map(date => {
		const mealsForDate = mealsWithRecipesResolved.filter(meal => isSameDay(meal.mealDate, date))
		return {
			date,
			meals: mealsForDate
		}
	})
	return result
}

interface MealWithRecipe extends IScheduledMeal {
	recipeName: string
}

export type DayWithMeals = {
	date: Date
	meals: MealWithRecipe[]
}
