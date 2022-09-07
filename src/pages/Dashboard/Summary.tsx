import { useScheduleMeals } from 'providers/MealPlanProvider'
import { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ROUTES } from 'routes/AppRouter'
import { DateRangeType } from 'types/DateRangeType'
import { Recipe, IMeasuredIngredient } from 'types/Recipe'
import { ScheduledMeal } from 'types/ScheduledMeal'

interface IMealPlanSummaryProps {
	dateRange: DateRangeType
}

const Summary = ({ dateRange }: IMealPlanSummaryProps) => {
	const scheduledMeals = useScheduleMeals()
	const [startDate, endDate] = dateRange

	return (
		<>
			<Card className="mb-4">
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
									<strong>Meals:</strong> {scheduledMeals?.length}
								</div>
							</>
						)}
					</div>
					<Button variant="outline-dark" size="sm" className="w-100 my-1">
						Save Plan
					</Button>
					<Link className="btn btn-primary btn-sm w-100 my-1" to={ROUTES.GROCERYLIST}>
						Grocery List
					</Link>
				</Card.Body>
			</Card>
		</>
	)
}

export default Summary
