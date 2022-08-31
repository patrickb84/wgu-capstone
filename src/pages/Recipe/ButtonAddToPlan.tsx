import Tippy from '@tippyjs/react'
import { DateRangePicker } from 'components/DateRangePicker'
import { addDays, compareAsc, isEqual, subDays } from 'date-fns'
import format from 'date-fns/format'
import { addDoc, collection } from 'firebase/firestore'
import { useAppContext } from 'providers/AppProvider'
import { useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import ReactDatePicker from 'react-datepicker'

export interface IButtonAddToPlanProps {
	recipeId: string
	// userId?: string
}

export function ButtonAddToPlan(props: IButtonAddToPlanProps) {
	const { db, appUser } = useAppContext()
	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)
	const [selectedDates, setSelectedDates] = useState<Date[]>([])

	const postToDatabase = async () => {
		await Promise.all(
			selectedDates.map(async date => {
				// const dateString = formatDate(date)
				// const recipeRef = collection(db, 'recipes', props.recipeId)
				// const planRef = collection(db, 'plans', dateString)
				// const plan = {
				// 	recipeId: props.recipeId,
				// 	userId: props.userId
				// }
				// addDoc(planRef, plan)
				// addDoc(recipeRef, { dateString })

				const docRef = await addDoc(collection(db, 'scheduledMeals'), {
					date: date.toISOString(),
					dateFormatted: formatDate(date),
					recipeId: props.recipeId,
					userId: appUser?.uid
					// TODO: Probably ISO String is best
					// ! It might be better to save the actual recipe, because what if it changes and the user has already purchased items for the recipe? Better to leave it static, so save the whole thing MAYBE
				})
				console.log('Document written with ID: ', docRef.id)
			})
		)
		console.log('done')
	}

	return (
		<>
			<Tippy content="Add to meal plan">
				<button onClick={handleShow} className="icon-button icon-button-lg text-secondary">
					<i className="far fa-calendar-plus" />
				</button>
			</Tippy>

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

export interface IModalDatePickerProps {
	selectedDates: Date[]
	setSelectedDates: (dates: Date[]) => void
}

export function ModalDatePicker(props: IModalDatePickerProps) {
	const { selectedDates, setSelectedDates } = props
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

	const handleChange = (date: Date) => {
		setSelectedDate(date)
		const dateAsString = formatDate(date)

		// TODO: Probably convert to ISO string? But this works, ISO might not
		const stringArr = selectedDates.map(d => formatDate(d))
		const index = stringArr.findIndex(d => d === dateAsString)

		if (index === -1) {
			setSelectedDates([...selectedDates, date])
			setSelectedDate(undefined)
		} else {
			setSelectedDates(selectedDates)
		}
	}

	const highlightWithRanges = [
		{
			'react-datepicker__day--selected bg-brand text-white': selectedDates
		}
	]
	return (
		<>
			<div className="modal-date-picker d-flex w-100 justify-content-center">
				<ReactDatePicker
					selected={selectedDate as any}
					onChange={(date: any) => handleChange(date)}
					highlightDates={highlightWithRanges as any}
					placeholderText="This highlight two ranges with custom classes"
					inline
				/>
				{/* <Col>
					{selectedDates.sort(compareAsc).map(date => {
						const format = formatDate(date)
						return (
							<>
								<div key={format}>
									{format}{' '}
									<button className="icon-button text-brand">
										<i className="fas fa-circle-xmark" />
									</button>
								</div>
							</>
						)
					})}
				</Col> */}
			</div>
		</>
	)
}

const formatDate = (date: Date) => format(date, 'EEE MMM do')
