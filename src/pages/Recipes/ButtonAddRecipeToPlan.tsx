import * as React from 'react'

import { Button, Container, Modal } from 'react-bootstrap'
import { useUser } from 'hooks/UserProvider'
import { IRecipe } from './types/Recipe'
import { GenericIconButtonProps, IconButton } from 'components/IconButton'
import { DayWithMeals, PlannerView } from 'pages/ScheduledMeals/PlannerView'
import ScheduledMeal from 'pages/ScheduledMeals/types/ScheduledMeal'
import MidSpinner from 'components/MidSpinner'

export interface IButtonAddToPlanProps extends GenericIconButtonProps {
	planId: string
	recipe: IRecipe
}

export function ButtonAddRecipeToPlan(props: IButtonAddToPlanProps) {
	const { iconFaGroup, colorVariant, size, className, recipe, planId } = props
	const [selectedDates, setSelectedDates] = React.useState<Date[]>([])

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
		await Promise.all(
			selectedDates.map(date => {
				const scheduledMeal: Partial<ScheduledMeal> = {
					recipeId: recipe.id,
					userId: user?.id,
					mealDate: date,
					mealPlanId: planId
				}
				ScheduledMeal.add(scheduledMeal, user.id)
			})
		)
		handleHide()
	}

	return (
		<>
			<IconButton
				onClick={handleShow}
				iconFaName="fa-calendar-plus"
				iconFaGroup={iconFaGroup ? iconFaGroup : 'far'}
				colorVariant={colorVariant ? colorVariant : 'secondary'}
				size={size}
				tooltip="Add recipe to meal plan"
				className={className}
			/>

			<Modal show={show} onHide={handleHide} size="lg" scrollable>
				<Modal.Header closeButton>
					<Modal.Title>Add to Meal Plan</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container fluid>
						<div className="bg-light p-3 mb-3">
							<h5>{recipe.name}</h5>
							<p className="mb-0">
								Add <strong>{recipe.name}</strong> to your plan by selecting dates below. When you're done
								selecting dates, click <strong>Save Changes</strong> at the bottom.
							</p>
						</div>
						<PlannerView
							mealPlanId={planId}
							mode="adding"
							cardExtension={(props: DayWithMeals) => <CardExtension {...props} />}
						/>
					</Container>
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
