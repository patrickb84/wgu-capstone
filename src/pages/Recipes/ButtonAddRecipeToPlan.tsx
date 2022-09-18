import * as React from 'react'

import { Button, Container, Modal } from 'react-bootstrap'
import { useUser } from 'hooks/UserProvider'
import { IRecipe } from './types/Recipe'
import { GenericIconButtonProps, IconButton } from 'components/IconButton'
import { DayWithMeals, PlannerView } from 'pages/ScheduledMeals/PlannerView'
import ScheduledMeal from 'pages/ScheduledMeals/types/ScheduledMeal'
import { Link } from 'react-router-dom'
import ROUTES from 'routes/routes'
import { useActivePlan } from 'hooks/MealPlanProvider'

export interface IButtonAddToPlanProps extends GenericIconButtonProps {
	recipe: IRecipe
	isUserRecipe?: boolean
	as?: 'icon' | 'button'
}

export function ButtonAddRecipeToPlan({
	iconFaGroup,
	colorVariant,
	size,
	className,
	recipe,
	isUserRecipe,
	as = 'icon',
	...props
}: IButtonAddToPlanProps) {
	const [selectedDates, setSelectedDates] = React.useState<Date[]>([])
	const { activePlan } = useActivePlan()

	const user = useUser()
	const [show, setShow] = React.useState(false)

	const handleShow = () => setShow(true)

	const handleHide = () => setShow(false)

	const handleSelect = (date: Date) => {
		setSelectedDates([...selectedDates, date])
	}

	const handleDeselect = (date: Date) => {
		setSelectedDates(selectedDates.filter(d => d !== date))
	}

	const CardExtension = ({ date }: DayWithMeals) => {
		const isSelected = selectedDates.includes(date)
		if (!date) return null
		return (
			<>
				{isSelected ? (
					<>
						<div className="mb-3 fw-bold">{recipe.name}</div>
						<Button size="sm" variant="outline-danger" onClick={() => handleDeselect(date)}>
							Unselect this date
						</Button>
					</>
				) : (
					<>
						<div className="mt-3">
							<Button size="sm" variant="secondary" onClick={() => handleSelect(date)}>
								Select this date
							</Button>
						</div>
					</>
				)}
			</>
		)
	}

	const handleSave = async () => {
		if (!user) return
		if (!activePlan) return
		await Promise.all(
			selectedDates.map(date => {
				const scheduledMeal: Partial<ScheduledMeal> = {
					recipeId: recipe.id,
					userId: user?.id,
					mealDate: date,
					mealPlanId: activePlan.id,
					isUserRecipe: isUserRecipe
				}
				return ScheduledMeal.add(scheduledMeal, user.id)
			})
		)
		handleHide()
	}

	return (
		<>
			{as === 'icon' ? (
				<IconButton
					onClick={handleShow}
					iconFaName="fa-calendar-plus"
					iconFaGroup={iconFaGroup ? iconFaGroup : 'far'}
					colorVariant={colorVariant ? colorVariant : 'secondary'}
					size={size}
					tooltip="Add recipe to meal plan"
					className={className}
				/>
			) : (
				<Button variant="secondary" onClick={handleShow}>
					<i className='fas fa-calendar-plus' /> Add to meal plan
				</Button>
			)}

			<Modal show={show} onHide={handleHide} size="lg" scrollable>
				<Modal.Header closeButton>
					<Modal.Title>Add to Meal Plan</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{activePlan ? (
						<Container fluid>
							<div className="bg-light p-3 mb-3">
								<h5>{recipe.name}</h5>
								<p className="mb-0">
									Add <strong>{recipe.name}</strong> to your plan by selecting dates below. When you're done
									selecting dates, click <strong>Save Changes</strong> at the bottom.
								</p>
							</div>
							<PlannerView
								mealPlanId={activePlan.id}
								mode="adding"
								cardExtension={(props: DayWithMeals) => <CardExtension {...props} />}
							/>
						</Container>
					) : (
						<div className="bg-light p-3 mb-3">
							<h5>You don't have a plan yet!</h5>
							<p className="mb-0">First create or activate a meal plan before adding recipes to it.</p>
							<Link to={ROUTES.MEAL_PLANS}>Go to Meal Plans</Link>
						</div>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleHide}>
						Close
					</Button>
					<Button variant="primary" onClick={handleSave}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}
