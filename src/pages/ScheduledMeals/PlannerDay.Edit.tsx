import { IconButton } from 'components/IconButton'
import React, { useState } from 'react'
import { Button, ListGroup, ListGroupItem, Modal } from 'react-bootstrap'
import { DayWithMeals } from './PlannerView'
import ScheduledMeal from './types/ScheduledMeal'

export interface IPlannerDayEditProps {
	mealDate: DayWithMeals
	onComplete: () => void
}

export default function ButtonPlannerDayEdit({ mealDate, onComplete }: IPlannerDayEditProps) {
	const [show, setShow] = useState(false)
	const [deletingIds, setDeletingIds] = useState<string[]>([])

	const handleShow = () => setShow(true)
	const handleClose = () => setShow(false)

	const handleSave = async () => {
		if (deletingIds.length > 0) {
			await Promise.all(deletingIds.map(id => ScheduledMeal.delete(id)))
		}
		onComplete()
		handleClose()
	}

	const idWillBeDeleted = (id: string) => {
		return deletingIds.includes(id)
	}

	const handleRemove = (id: string) => {
		setDeletingIds([...deletingIds, id])
	}

	const handleUndo = (id: string) => {
		setDeletingIds(deletingIds.filter(i => i !== id))
	}

	return (
		<>
			{/* <IconButton iconFaName="fa-ellipsis-vertical" iconFaGroup="far" onClick={handleShow} /> */}
			<Button variant="secondary-gray" size="sm" onClick={handleShow}>
				Edit
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Meals</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="bg-light p-3 rounded mb-3">
						Select meals to remove. You can undo a selection by clicking the undo button.
					</div>
					<ListGroup variant="flush">
						{mealDate.meals.map(meal => {
							const { recipeName } = meal
							const id = meal.id as string
							return (
								<ListGroupItem key={id}>
									<p>{recipeName}</p>
									<div className="d-flex justify-content-end">
										{!idWillBeDeleted(id) ? (
											<Button variant="outline-danger" size="sm" onClick={() => handleRemove(id)}>
												Remove
											</Button>
										) : (
											<Button variant="outline-secondary" size="sm" onClick={() => handleUndo(id)}>
												Undo Remove
											</Button>
										)}
									</div>
								</ListGroupItem>
							)
						})}
					</ListGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
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
