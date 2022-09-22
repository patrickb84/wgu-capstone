import mealdb from 'api/mealdb'
import { format, isSameDay } from 'date-fns'
import ScheduledMeal, { IScheduledMeal } from 'types/ScheduledMeal'
import { FlexCenterBetween } from 'components/PageHeader'
import React, { useCallback, useEffect, useState } from 'react'
import { Card, Container } from 'react-bootstrap'
import { convertTimestamp, getDateArray } from 'utils/time.utils'
import MealPlan from 'types/MealPlan'
import ButtonPlannerDayEdit from './PlannerDay.Edit'
import MidSpinner from 'components/MidSpinner'
import ROUTES from 'routes/routes'
import { Link } from 'react-router-dom'
import { UserRecipe } from 'types/UserRecipe'

interface MealWithRecipe extends IScheduledMeal {
	recipeName: string
	recipeId: string
}

export type DayWithMeals = {
	date: Date
	meals: MealWithRecipe[]
}

export interface IMealPlanViewProps {
	mealPlanId?: string
	mode?: 'adding' | 'viewing'
	cardExtension?: (props: DayWithMeals) => JSX.Element
}

export function PlannerView(props: IMealPlanViewProps) {
	const { mealPlanId, mode = 'viewing', cardExtension: CardExtension } = props
	const [daysWithMeals, setDaysWithMeals] = useState<DayWithMeals[]>([])
	const [mealPlan, setMealPlan] = useState<MealPlan>()
	const [isLoading, setLoading] = useState(true)

	useEffect(() => {
		mealPlanId && MealPlan.get(mealPlanId).then(setMealPlan)
	}, [mealPlanId])

	const getPlans = useCallback(() => {
		if (!mealPlan) return
		ScheduledMeal.getMealPlanScheduledMeals(mealPlanId!).then(scheduledMeals => {
			const meals = scheduledMeals.map(scheduledMeal => {
				return new ScheduledMeal(scheduledMeal)
			})
			mapScheduledMealsToAndRecipes(meals, mealPlan)
				.then(setDaysWithMeals)
				.then(() => setLoading(false))
		})
	}, [mealPlan, mealPlanId])

	useEffect(() => {
		if (mealPlanId) {
			getPlans()
		}
	}, [mealPlanId, getPlans])
	
	return (
		<>
			{isLoading ? (
				<MidSpinner />
			) : !mealPlan ? (
				<Container className="my-3">
					<h1>Meal Plan Not Found</h1>
					<Link to={ROUTES.MEAL_PLANS}>Go to Meal Plans and activate one to get going.</Link>
				</Container>
			) : (
				<>
					{daysWithMeals.map(dayWithMeals => {
						const dateString = format(dayWithMeals.date, 'EEE, MMM dd')

						return (
							<React.Fragment key={dayWithMeals.date.toISOString()}>
								<Card className="mb-3">
									<Card.Header>
										<FlexCenterBetween>
											{dateString}
											{mode === 'viewing' && (
												<ButtonPlannerDayEdit mealDate={dayWithMeals} onComplete={getPlans} />
											)}
										</FlexCenterBetween>
									</Card.Header>
									<Card.Body>
										<ul className="list-unstyled mb-0">
											{dayWithMeals.meals.map(singleMealOfDay => (
												<li key={singleMealOfDay.id}>
													<Link to={ROUTES.TO_RECIPE(singleMealOfDay.recipeId)}>
														{singleMealOfDay.recipeName}
													</Link>{' '}
												</li>
											))}
										</ul>
										{CardExtension && <CardExtension {...dayWithMeals} />}
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
			return { ...scheduledMeal, recipeName: recipe.strMeal, recipeId: recipe.idMeal } as MealWithRecipe
		} catch (error) {
			console.error(error)
			try {
				const recipe = (await UserRecipe.get(scheduledMeal.recipeId)) as UserRecipe
				return { ...scheduledMeal, recipeName: recipe.name, recipeId: recipe.id } as MealWithRecipe
			} catch (error) {
				console.error(error)
			}
			return { ...scheduledMeal, recipeName: 'None' as string } as MealWithRecipe
		}
	})

	const mealsWithRecipesResolved = await Promise.all(mealsWithRecipes)

	const dateArray = getDateArray(mealPlan.planStartDate, mealPlan.planEndDate)
	const result = dateArray.map(date => {
		const mealsForDate = mealsWithRecipesResolved.filter(meal => isSameDay(convertTimestamp(meal.mealDate), date))
		return {
			date,
			meals: mealsForDate
		}
	})
	return result
}
