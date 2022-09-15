import Layout from 'components/Layout'
import OverlaySpinner from 'components/OverlaySpinner'
import { PlannerView } from 'pages/ScheduledMeals/PlannerView'
import PageHeader, { PageSubtitle, PageTitle } from 'pages/shared/PageHeader'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Navigate, useParams } from 'react-router-dom'
import MealPlan from './types/MealPlan'
import { Link } from 'react-router-dom'
import ROUTES from 'routes/routes'
import { useUser } from 'hooks/UserProvider'

export interface IMealPlanViewProps {}

export function MealPlanView(props: IMealPlanViewProps) {
	const { id } = useParams()
	const [mealPlan, setMealPlan] = useState<MealPlan | null>(null)
	const [loading, setLoading] = useState(true)
	const user = useUser()

	useEffect(() => {
		if (id) {
			MealPlan.get(id).then(mealPlan => {
				setMealPlan(mealPlan)
				setLoading(false)
			})
		}
	}, [id])

	if (!user) return <Navigate to="/" replace />

	return (
		<Layout>
			{loading ? (
				<OverlaySpinner />
			) : (
				<>
					<PageHeader variant="tertiary">
						<div>
							<PageTitle>{mealPlan?.planName || 'View Meal Plan'}</PageTitle>
							{mealPlan && (
								<PageSubtitle>
									{format(mealPlan.planStartDate, 'EEE, MMM dd')} -{' '}
									{format(mealPlan.planEndDate, 'EEE, MMM dd')}
								</PageSubtitle>
							)}
						</div>
						<Link to={ROUTES.RECIPES} className="btn btn-brand" replace>
							Find Recipes
						</Link>
					</PageHeader>

					<Container className="py-3">
						<Row>
							<Col xs={12} md={4} lg={3}>
								{/* <Card className="mb-3">
									<Card.Header>
										Meal Plan Actions
									</Card.Header>
									<Card.Body>
										<Button variant="secondary" className="mb-2 w-100">
											Generate Grocery List
										</Button>
										<hr />
										<Button variant="secondary-gray" className="mb-2 w-100">
											Edit Meal Plan
										</Button>
										<Button variant="outline-danger" className="mb-2 w-100">
											Delete Meal Plan
										</Button>
									</Card.Body>
								</Card> */}
							</Col>
							<Col xs={12} md={8} lg={9}>
								<PlannerView mealPlanId={mealPlan?.id as string} />
							</Col>
						</Row>
					</Container>
				</>
			)}
		</Layout>
	)
}
