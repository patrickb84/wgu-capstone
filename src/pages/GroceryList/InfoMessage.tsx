import { useActivePlan } from 'hooks/MealPlanProvider'
import * as React from 'react'
import { Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ROUTES from 'routes/routes'
import { IScheduledMeal } from 'types/ScheduledMeal'

export interface IGroceryPageInfoProps {
	scheduledMeals: IScheduledMeal[]
}

export function GroceryPageInfo(props: IGroceryPageInfoProps) {
	const { activePlan } = useActivePlan()
	return (
		<>
			<Alert variant="secondary">
				<Alert.Heading>You'll see this page fill up</Alert.Heading>
				<p className="mb-0">
					Once you've added some meals to your meal plan, you'll see a list of ingredients here. You can use this
					list to create a grocery list, or to see what you have on hand.
				</p>
				<hr />
				{!activePlan && (
					<>
						<h2 className="h5 mb-3">Have you created a meal plan? Or maybe you don't have an active one.</h2>
						<p className="mb-0">You can create a meal plan by clicking the button below.</p>
						<div className="my-3">
							<Link to={ROUTES.HOME} className="btn btn-secondary">
								Create a meal plan
							</Link>
						</div>
					</>
				)}
				{!props.scheduledMeals.length && (
					<>
						<h2 className="h5 mb-3">You don't have any scheduled meals.</h2>

						<p className="mb-0">
							You can schedule meals by finding recipes and clicking the calendar icon next to them.
						</p>
						<div className="mt-3">
							<Link to={ROUTES.RECIPES} className="btn btn-secondary">
								Find recipes
							</Link>
						</div>
					</>
				)}
			</Alert>
		</>
	)
}
