import { HelperModal } from 'components/HelperModal'
import Layout from 'components/Layout'
import { format } from 'date-fns'
import { useActivePlan } from 'hooks/MealPlanProvider'
import { CreateReportButton } from 'pages/Reports/Report.Create'
import PageHeader, { PageSubtitle, PageTitle } from 'pages/shared/PageHeader'
import * as React from 'react'
import { Alert, Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Outlet } from 'react-router-dom'
import ROUTES from 'routes/routes'

export interface IDashboardProps {}

export function Dashboard(props: IDashboardProps) {
	const { activePlan } = useActivePlan()

	return (
		<Layout>
			<PageHeader variant="secondary">
				<div>
					<PageTitle>Dashboard</PageTitle>
					<PageSubtitle>Manage your meal plans and grocery lists.</PageSubtitle>
				</div>
			</PageHeader>

			<Container className="my-3">
				<Row>
					<Col>
						<h5 className="fw-bold small text-brand">MENU</h5>
					</Col>
				</Row>
				<Row>
					<Col lg={3}>
						<div className="mb-5">
							<ListGroup>
								<LinkContainer to={ROUTES.MEAL_PLANS} style={{ cursor: 'pointer' }}>
									<ListGroup.Item>My Meal Plans</ListGroup.Item>
								</LinkContainer>
								<LinkContainer to={ROUTES.TO_MEAL_PLAN(activePlan?.id)} style={{ cursor: 'pointer' }}>
									<ListGroup.Item>My Schedule</ListGroup.Item>
								</LinkContainer>
								<LinkContainer to={ROUTES.GROCERY_LIST} style={{ cursor: 'pointer' }}>
									<ListGroup.Item>Grocery Planner</ListGroup.Item>
								</LinkContainer>
							</ListGroup>

							{activePlan && (
								<div className="mt-3">
									<Card>
										<Card.Header>
											<div className="d-flex align-items-baseline justify-content-between">
												<div>Meal Plan Summary</div>
											</div>
										</Card.Header>
										<Card.Body>
											<div>{activePlan.planName}</div>
											{activePlan.planDescription && <div>{activePlan.planDescription}</div>}
											<div>
												<small className="text-muted">
													{format(activePlan.planStartDate, 'MMMM dd')} -{' '}
													{format(activePlan.planEndDate, 'MMMM dd')}
												</small>
											</div>
										</Card.Body>
									</Card>
								</div>
							)}
						</div>
					</Col>
					<Col lg={9}>
						<Outlet />
					</Col>
				</Row>
			</Container>
		</Layout>
	)
}