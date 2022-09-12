import { useState } from 'react'
import { Button } from 'react-bootstrap'
import IGenericButtonProps from 'types/GenericButton'
import MealPlanModal from './MealPlan.Form'
import MealPlan from './types/MealPlan'

export interface IMealPlanEditProps {
	userPlan: EditingMealPlan
}

type EditingMealPlan = Partial<MealPlan>

export default function MealPlanEditButton(props: IMealPlanEditProps & IGenericButtonProps) {
	const [showModal, setShowModal] = useState(false)
	const [mealPlanToEdit, setMealPlanToEdit] = useState<MealPlan | undefined>(undefined)

	const editPlan = (userPlan: MealPlan) => {
		setMealPlanToEdit(userPlan)
		setShowModal(true)
	}

	const hideModal = () => {
		setShowModal(false)
		setMealPlanToEdit(undefined)
	}

	return (
		<>
			<Button
				variant={props.variant}
				className={props.className}
				onClick={() => editPlan(props.userPlan as MealPlan)}>
				{props.children}
			</Button>

			<MealPlanModal show={showModal} onHide={hideModal} userPlan={mealPlanToEdit} />
		</>
	)
}
