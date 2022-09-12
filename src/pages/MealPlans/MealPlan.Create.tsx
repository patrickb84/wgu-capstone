import { useState } from 'react'
import { Button } from 'react-bootstrap'
import IGenericButtonProps from 'types/GenericButton'
import MealPlanModal from './MealPlan.Form'

export interface IMealPlanCreateProps {}

export function MealPlanCreateButton(props: IMealPlanCreateProps & IGenericButtonProps) {
	const [showModal, setShowModal] = useState(false)

	const createNewPlan = () => {
		setShowModal(true)
	}

	const hideModal = () => {
		setShowModal(false)
	}

	return (
		<>
			<Button variant={props.variant} onClick={createNewPlan}>
				{props.children}
			</Button>

			<MealPlanModal show={showModal} onHide={hideModal} />
		</>
	)
}
