import { DateRangePicker } from 'components/DateRangePicker'
import { Spacer } from 'components/Spacer'
import { addDays } from 'date-fns'
import { Schedule, Today } from 'pages/Dashboard/Schedule'
import React, { useState, useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export interface IDashboardProps {}

export const Dashboard = (props: IDashboardProps) => {
	const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])

	return (
		<>
			<div className="h-100">
				<header className="pt-6 bg-brand">
					<Container className="py-4 d-flex align-items-center h-100">
						<h1 className="text-white">My Meal Plan</h1>
					</Container>
				</header>

				<section>
					<Container className="py-5">
						<div className="bg-light p-5 rounded">
							<h2>Your meal schedule</h2>
							<p className="lead">The way it works:</p>
						</div>
						<Spacer h={3} />
						<Schedule startDate={new Date()} endDate={addDays(new Date(), 14)} />
					</Container>
				</section>
			</div>
		</>
	)
}
