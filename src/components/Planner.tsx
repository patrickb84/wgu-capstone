import { addDays, addMonths, differenceInCalendarDays, isEqual, format } from 'date-fns'
import { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { Recipezzz } from 'types/ZZZRecipe'
import { stripTime } from 'utils/time.utils'

type PlannerItem = {
	date: Date
	recipe: Recipezzz
	$el: React.ReactNode
}

export interface IPlannerProps {
	collection: PlannerItem[]
	handleDateAdd: (date: Date) => void
	handleDateRemove: (date: Date) => void
}

export function Planner(props: IPlannerProps) {
	// const { collection, handleDateAdd, handleDateRemove } = props
	// const [dates, setDates] = useState<Date[]>([])

	// useEffect(() => {
	// 	const startDate = new Date(),
	// 		endDate = addMonths(new Date(), 1),
	// 		diffDays = differenceInCalendarDays(endDate, startDate),
	// 		dates = [startDate]

	// 	for (let i = 0; i < diffDays; i++) {
	// 		dates.push(addDays(startDate, i + 1))
	// 	}
	// 	setDates(dates)
	// }, [])

	// return (
	// 	<>
	// 		<Row>
	// 			{dates.map(date => {
	// 				const item = collection.find(item => isEqual(stripTime(item.date), stripTime(date)))
	// 				const meals = scheduledMeals.filter(meal =>
	// 					isEqual(stripTime(meal.date), stripTime(date))
	// 				)
	// 				const active = meals.length > 0 || item

	// 				return (
	// 					<Col lg={12}>
	// 						<Card className="mb-3" key={date.toISOString()}>
	// 							<Card.Header
	// 								className={active ? `bg-brand text-white` : `bg-secondary text-white`}>
	// 								<div className="d-flex justify-content-between">
	// 									<div className="fw-bold">{format(date, 'EEEE')}</div>
	// 									<div>{date.toLocaleDateString()}</div>
	// 								</div>
	// 							</Card.Header>
	// 							{active ? (
	// 								<Card.Body>
	// 									{meals.length > 0 && (
	// 										<div className="my-2">
	// 											<div className="fw-bold small">Scheduled Meals:</div>
	// 											{meals
	// 												.filter(m => m.$recipe.id !== item?.recipe.id)
	// 												.map(meal => (
	// 													<div key={meal.id}>{meal.$recipe.name}</div>
	// 												))}
	// 										</div>
	// 									)}

	// 									{item && (
	// 										<div className="my-2">
	// 											<div className="fw-bold small">Add to schedule:</div>
	// 											<div>{item.recipe.name}</div>
	// 											<Button
	// 												variant="danger"
	// 												size="sm"
	// 												className="mt-2"
	// 												onClick={() => props.handleDateRemove(date)}>
	// 												Remove
	// 											</Button>
	// 										</div>
	// 									)}
	// 								</Card.Body>
	// 							) : (
	// 								<Card.Body>
	// 									<Button
	// 										variant="primary"
	// 										size="sm"
	// 										onClick={() => props.handleDateAdd(date)}>
	// 										Add
	// 									</Button>
	// 								</Card.Body>
	// 							)}
	// 						</Card>
	// 					</Col>
	// 				)
	// 			})}
	// 		</Row>
	// 	</>
	// )
	return <>	</>
}
