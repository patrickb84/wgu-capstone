import Tippy from '@tippyjs/react'
import { IconButton, IIconButton } from 'components/IconButton'
import { addDoc, collection } from 'firebase/firestore'
import { useAppContext } from 'providers/AppProvider'
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { IScheduledMeal } from 'types/ScheduledMeal'
import { ModalDatePicker } from './ModalDatePicker'

export interface IButtonAddToPlanProps extends IIconButton {
	recipeId: string
}

export function ButtonAddToPlan(props: IButtonAddToPlanProps) {
	const { recipeId, iconFaGroup, colorVariant, size } = props
	const { db, appUser } = useAppContext()
	const [show, setShow] = useState(false)
	const [selectedDates, setSelectedDates] = useState<Date[]>([])

	const handleClose = () => setShow(false)

	const postToDatabase = async () => {
		if (!appUser) return
		await Promise.all(
			selectedDates.map(async date => {
				const scheduledMeal: IScheduledMeal = {
					date: date,
					recipeId: recipeId,
					userId: appUser.uid,
					dateAdded: new Date()
				}
				const docRef = await addDoc(collection(db, 'scheduledMeals'), scheduledMeal)

				console.log('Document written with ID: ', docRef.id)
				// TODO: Write to user acct?
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

			<Modal show={show} onHide={handleClose} centered backdrop>
				<Modal.Header className="border-0 text-center">
					<Modal.Title className="text-center">Add it to your meal plan!</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ModalDatePicker {...{ selectedDates, setSelectedDates }} />
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
