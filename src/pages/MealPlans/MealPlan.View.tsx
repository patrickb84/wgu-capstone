import Layout from 'components/Layout'
import OverlaySpinner from 'components/OverlaySpinner'
import { PlannerView } from 'pages/ScheduledMeals/PlannerView'
import PageHeader, { PageSubtitle, PageTitle } from 'pages/shared/PageHeader'
import { differenceInDays, format } from 'date-fns'
import { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import MealPlan from './types/MealPlan'
import { Link } from 'react-router-dom'
import ROUTES from 'routes/routes'
import { useUser } from 'hooks/UserProvider'
import Breadcrumbs from 'components/Breadcrumbs'

export interface IMealPlanViewProps {}

export function MealPlanView(props: IMealPlanViewProps) {
	const { id } = useParams()
	const [mealPlan, setMealPlan] = useState<MealPlan | null>(null)
	const [loading, setLoading] = useState(true)

	const user = useUser()
	const location = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		if (!user) navigate(ROUTES.LOGIN, { replace: true, state: { redirect: location.pathname } })
	}, [location.pathname, navigate, user])

	useEffect(() => {
		if (id) {
			MealPlan.get(id).then(mealPlan => {
				setMealPlan(mealPlan)
				setLoading(false)
			})
		}
	}, [id])

	return (
		<Layout>
			{loading ? (
				<OverlaySpinner />
			) : (
				<>
					<PageHeader variant="tertiary">
						<div>
							{mealPlan && (
								<Breadcrumbs
									items={[
										{ to: ROUTES.MEAL_PLANS, label: 'Meal Plans' },
										{ to: '.', label: mealPlan.planName, active: true }
									]}
								/>
							)}
							<PageTitle>{mealPlan?.planName || 'View Meal Plan'}</PageTitle>
							{mealPlan && (
								<PageSubtitle>
									{format(mealPlan.planStartDate, 'EE, MMM dd')} - {format(mealPlan.planEndDate, 'EE, MMM dd')}
								</PageSubtitle>
							)}
						</div>
						<div className="pt-3 mt-lg-0">
							<Link to={ROUTES.RECIPES} className="btn btn-secondary">
								Find Recipes
							</Link>
						</div>
					</PageHeader>

					<Container className="my-3">
						<div className="py-lg-4 px-lg-5 p-4 mb-3 bg-light rounded-4">
							<h5 className="mb-3">Your scheduled meals</h5>
							<p>Here is a planner-style view of your upcoming meals.</p>
							<p>If you don't like what you see on a particular, you can edit it by clicking the Edit button.</p>
							<p className="mb-0">
								To see the details of the recipe, just click on the name! To add recipes, navigate to the{' '}
								<Link to={ROUTES.RECIPES}>Recipes</Link> page!
							</p>
						</div>
						<Row>
							<Col xs={12} md={4} lg={3}>
								<Card className="mb-3">
									<Card.Header className='bg-brand text-white'>Meal Plan Summary</Card.Header>
									<Card.Body>
										{mealPlan && (
											<>
												{mealPlan.planDescription && (
													<p className="lead mb-3">{mealPlan.planDescription}</p>
												)}
												<p>
													<strong>Start Date:</strong> {format(mealPlan.planStartDate, 'EEE, MMM dd')}
												</p>
												<p>
													<strong>End Date:</strong> {format(mealPlan.planEndDate, 'EEE, MMM dd')}
												</p>
												<p>
													<strong>Days:</strong>{' '}
													{differenceInDays(mealPlan.planEndDate, mealPlan.planStartDate)}
												</p>
											</>
										)}
										<Link to={ROUTES.MEAL_PLANS} className="btn btn-gray-400 w-100">
											View All Meal Plans
										</Link>
									</Card.Body>
								</Card>
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
