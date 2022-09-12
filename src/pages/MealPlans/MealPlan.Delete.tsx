import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import IGenericButtonProps from 'types/GenericButton'
import MealPlan from './types/MealPlan'

interface IProps extends IGenericButtonProps {
	userPlanId: string
}

export default function MealPlanDeleteButton(props: IProps) {
	const { userPlanId, variant, size, className, style, children } = props
	const [show, setShow] = useState(false)

	const deletePlan = async () => {
		try {
			await MealPlan.delete(userPlanId)
			setShow(false)
		} catch (error) {
			console.error('🚀 ~ deletePlan ~ error', error)
		}
	}

	return (
		<>
			<Button
				variant={variant}
				className={className}
				size={size}
				style={style}
				onClick={() => setShow(true)}>
				{children}
			</Button>

			<Modal centered show={show} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Delete meal plan</Modal.Title>
				</Modal.Header>
				<Modal.Body>Are you sure you want to delete this meal plan?</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShow(false)}>
						Cancel
					</Button>
					<Button variant="brand" onClick={deletePlan}>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}
