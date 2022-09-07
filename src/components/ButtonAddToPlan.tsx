import { firestore } from 'api/firebase'
import { IconButton, IIconButton } from 'components/IconButton'
import { addDoc, collection } from 'firebase/firestore'
import { Dashboard } from 'pages/Dashboard/DashboardPage'
import { Schedule } from 'pages/Dashboard/Schedule'
import { useUser } from 'providers/UserProvider'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import ReactDatePicker from 'react-datepicker'
import { IScheduledMeal } from 'types/ScheduledMeal'
import DatePickerMultiSelect from './DatePickerMultiSelect'
import { Planner } from './Planner'

export interface IButtonAddToPlanProps extends IIconButton {
	recipeId: string
	recipeName: string
}

export default function ButtonAddToPlan(props: IButtonAddToPlanProps) {
	const { recipeId, iconFaGroup, colorVariant, size } = props
	const currentUser = useUser()
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
					<Modal.Title className="text-center font-display">
						Add it to your meal plan!
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="m-0 p-0">
					<AddRecipeModalForm
						selectedDates={selectedDates}
						setSelectedDates={setSelectedDates}
						handleClose={handleClose}
						recipeName={props.recipeName}
					/>
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

export interface IAddRecipeModalFormProps {
	selectedDates: Date[]
	setSelectedDates: React.Dispatch<React.SetStateAction<Date[]>>
	handleClose: () => void
	recipeName: string
}

export function AddRecipeModalForm(props: IAddRecipeModalFormProps) {
	const { selectedDates, setSelectedDates } = props
	const [datePickerWidth, setDatePickerWidth] = useState(0)
	const datePickerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (datePickerRef.current) {
			setDatePickerWidth(datePickerRef.current.offsetWidth + 24)
		}
	}, [])

	return (
		<>
			<Container fluid>
				<Row className="position-relative">
					<Col style={{ maxWidth: datePickerWidth }}>
						<div className="position-fixed">
							<DatePickerMultiSelect
								datePickerRef={datePickerRef}
								{...{ selectedDates, setSelectedDates }}
							/>
						</div>
					</Col>
					<Col>
						<Planner
							items={selectedDates.map(date => {
								return {
									date: date,
									item: <div>{props.recipeName}</div>
								}
							})}
						/>
					</Col>
				</Row>
			</Container>
		</>
	)
}
