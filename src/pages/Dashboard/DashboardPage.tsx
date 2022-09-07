import Layout from 'components/Layout'
import { addDays } from 'date-fns'
import { Schedule } from 'pages/Dashboard/Schedule'
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { DateRangeType } from 'types/DateRangeType'
import DashboardDatepicker from './DashboardDatepicker'
import PageHeader from 'components/PageHeader'
import Summary from './Summary'

export const Dashboard = () => {
	const [dateRange, setDateRange] = useState<DateRangeType>([new Date(), addDays(new Date(), 14)])

	return (
		<>
			<Layout>
				<PageHeader title="My Meal Plan" bgColor="tertiary" />

				<Container className="py-5">
					<Row>
						<Col lg={3}>
							<DashboardDatepicker dateRange={dateRange} setDateRange={setDateRange} />
						</Col>
						<Col className="ps-lg-5 ps-xl-0">
							<Schedule {...{ dateRange }} />
						</Col>
						<Col lg={3}>
							<Summary {...{ dateRange }} />
						</Col>
					</Row>
				</Container>
			</Layout>
		</>
	)
}
