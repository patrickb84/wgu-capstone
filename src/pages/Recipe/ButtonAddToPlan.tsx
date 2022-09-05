import { firestore } from 'api/firebase'
import { IconButton, IIconButton } from 'components/IconButton'
import { addDoc, collection } from 'firebase/firestore'
import { Dashboard } from 'pages/Dashboard/DashboardPage'
import { Schedule } from 'pages/Dashboard/Schedule'
import { useCurrentUser } from 'providers/AuthProvider'
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { IScheduledMeal } from 'types/ScheduledMeal'
import { ModalDatePicker } from './ModalDatePicker'

export interface IButtonAddToPlanProps extends IIconButton {
	recipeId: string
}

export function ButtonAddToPlan(props: IButtonAddToPlanProps) {
	const { recipeId, iconFaGroup, colorVariant, size } = props
	const { currentUser } = useCurrentUser()
	const [show, setShow] = useState(false)
	const [selectedDates, setSelectedDates] = useState<Date[]>([])

	const handleClose = () => setShow(false)

	const postToDatabase = async () => {
		if (!currentUser) return

		await Promise.all(
			selectedDates.map(async date => {
				const scheduledMeal: IScheduledMeal = {
					date: date,
					recipeId: recipeId,
					userId: currentUser.uid,
					dateAdded: new Date()
				}
				const docRef = await addDoc(collection(firestore, 'scheduledMeals'), scheduledMeal)

				console.log('Document written with ID: ', docRef.id)
				scheduledMeal.id = docRef.id
				console.log('scheduledMeal', scheduledMeal)
			})
		)
		console.log('done')
	}

	return (
		<>
			<IconButton
				onClick={() => setShow(true)}
				iconFaName="fa-calendar-plus"
				iconFaGroup={iconFaGroup ? iconFaGroup : 'far'}
				colorVariant={colorVariant ? colorVariant : 'secondary'}
				size={size}
				tooltip="Add recipe to meal plan"
				className={props.className}
			/>

			<Modal show={show} onHide={handleClose} size="xl" scrollable={true}>
				<Modal.Header className="border-0 text-center" closeButton>
					<Modal.Title className="text-center">Add it to your meal plan!</Modal.Title>
				</Modal.Header>
				<Modal.Body className='m-0 p-0'>
					{/* <ModalDatePicker {...{ selectedDates, setSelectedDates }} /> */}

					<Dashboard />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={() => postToDatabase().then(handleClose)}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}
