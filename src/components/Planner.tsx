import { addDays, addMonths, differenceInCalendarDays, isEqual } from 'date-fns'
import { format } from 'date-fns'
import DisplayCardDate from 'pages/Dashboard/DayPlanDateDisplay'
import * as React from 'react'
import { Card } from 'react-bootstrap'
import { formatWithoutTime } from 'utils'

export interface IPlannerItem {
	date: Date
	item: React.ReactNode
}

export interface IPlannerProps {
	items: IPlannerItem[]
}

export function Planner(props: IPlannerProps) {
	const { items } = props
	const [dates, setDates] = React.useState<Date[]>([])

	React.useEffect(() => {
		const startDate = new Date()
		const endDate = addMonths(new Date(), 1)
		const diffDays = differenceInCalendarDays(endDate, startDate)
		const dates = [startDate]
		for (let i = 0; i < diffDays; i++) {
			dates.push(addDays(startDate, i + 1))
		}
		setDates(dates)
	}, [])

	return (
		<>
			{dates.map(date => {
				const item = items.find(item =>
					isEqual(formatWithoutTime(item.date), formatWithoutTime(date))
				)
				return (
					<Card className="mb-3" key={date.toISOString()}>
						<Card.Header>
							<div className="d-flex justify-content-between">
								<div className="fw-bold">{format(date, 'EEEE')}</div>
								<div className="text-muted">{date.toLocaleDateString()}</div>
							</div>
						</Card.Header>
						<Card.Body>{item && item.item}</Card.Body>
					</Card>
				)
			})}
		</>
	)
}
