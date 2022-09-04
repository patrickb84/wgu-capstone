import { Spacer } from 'components/Spacer'
import { addDays } from 'date-fns'
import { Schedule } from 'pages/Dashboard/Schedule'
import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { DateRangeType } from 'types/DateRangeType'
import { ScheduledMeal } from 'types/ScheduledMeal'
import DashboardDatepicker from './DashboardDatepicker'
import { DashboardHeader } from './DashboardHeader'
import MealPlanSummary from './MealPlanSummary'

export const Dashboard = () => {
	const [dateRange, setDateRange] = useState<DateRangeType>([new Date(), addDays(new Date(), 14)])
	const [scheduledMeals, setScheduledMeals] = useState<ScheduledMeal[]>([])

	return (
		<>
			<Spacer h={2} />
			<DashboardHeader />

			<Container className="py-5">
				<Row>
					<Col lg={3}>
						<DashboardDatepicker dateRange={dateRange} setDateRange={setDateRange} />
					</Col>
					<Col className="ps-lg-5 ps-xl-0">
						<Schedule {...{ dateRange, scheduledMeals, setScheduledMeals }} />
					</Col>
					<Col lg={3}>
						<MealPlanSummary {...{ dateRange, scheduledMeals }} />
					</Col>
				</Row>
			</Container>
		</>
	)
}
