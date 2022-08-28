import { DateRangePicker } from 'components/DateRangePicker'
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
						<Row>
							<Col lg={4}>
								<h2>This plan is empty</h2>
								<h3>{Today()}</h3>
								<h3>Create a plan, start by choosing a time range</h3>
								<DateRangePicker
									callback={dateRange => {
										console.log(dateRange)
										setDateRange(dateRange)
									}}
								/>
							</Col>
							<Col>
								<Schedule startDate={dateRange[0]} endDate={dateRange[1]} />
							</Col>
						</Row>
					</Container>
				</section>
			</div>
		</>
	)
}
