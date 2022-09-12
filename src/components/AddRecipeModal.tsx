import { useUser } from 'hooks/UserProvider'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import DatePickerMultiSelect from './DatePickerMultiSelect'
import { Planner } from './Planner'
import { firestore } from 'api/firebase/app'
import { addDoc, collection } from 'firebase/firestore'
import { IScheduledMealzzz } from 'types/ScheduledMeal'
import { Recipezzz } from 'types/ZZZRecipe'
import { isSameDay } from 'date-fns'

interface IAddRecipeModalFormProps {
	selectedDates: Date[]
	setSelectedDates: React.Dispatch<React.SetStateAction<Date[]>>
	handleClose: () => void
	recipe: Recipezzz
}

function AddRecipeModalForm(props: IAddRecipeModalFormProps) {
	const { selectedDates, setSelectedDates } = props
	const [datePickerWidth, setDatePickerWidth] = useState(0)
	const datePickerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (datePickerRef.current) {
			setDatePickerWidth(datePickerRef.current.offsetWidth + 24)
		}
	}, [])

	const handleDateAdd = (date: Date) => {
		setSelectedDates([...selectedDates, date])
	}

	const handleDateRemove = (date: Date) => {
		setSelectedDates(selectedDates.filter(d => !isSameDay(d, date)))
	}

	return (
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
						collection={selectedDates.map(date => {
							return {
								date: date,
								recipe: props.recipe,
								$el: <div>{props.recipe.name}</div>
							}
						})}
						handleDateAdd={handleDateAdd}
						handleDateRemove={handleDateRemove}
					/>
				</Col>
			</Row>
		</Container>
	)
}

interface IAddRecipeModalProps {
	show: boolean
	handleClose: () => void
	recipe: Recipezzz
}
export default function AddRecipeModal(props: IAddRecipeModalProps) {
	const { show, handleClose, recipe } = props
	const user = useUser()
	const [selectedDates, setSelectedDates] = useState<Date[]>([])

	const postToDatabase = async () => {
		if (user) {
			await Promise.all(
				selectedDates.map(async date => {
					const scheduledMeal: IScheduledMealzzz = {
						date: date,
						$recipe: recipe,
						userId: user.id,
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
	}

	return (
		<Modal show={show} onHide={handleClose} size="lg" scrollable={true}>
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
					recipe={recipe}
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
	)
}
