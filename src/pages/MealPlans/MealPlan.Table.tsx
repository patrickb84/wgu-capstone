import mealdb from 'api/mealdb'
import { HelperModal } from 'components/HelperModal'
import Layout from 'components/Layout'
import { differenceInDays, isAfter } from 'date-fns'
import { useActivePlan, useUserMealPlans } from 'hooks/MealPlanProvider'
import { useIfNoUser, useUser } from 'hooks/UserProvider'
import PageHeader, { PageSubtitle, PageTitle } from 'pages/shared/PageHeader'
import { useEffect, useState } from 'react'
import { Alert, Button, Card, Container, Table } from 'react-bootstrap'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import ROUTES from 'routes/routes'
import { MealPlanCreateButton } from './MealPlan.Create'
import MealPlanDeleteButton from './MealPlan.Delete'
import MealPlanEditButton from './MealPlan.Edit'
import MealPlan, { IMealPlan } from './types/MealPlan'

const MealPlanTable = () => {
	const user = useUser()
	const userPlans = useUserMealPlans()
	const { activePlan, activatePlan } = useActivePlan()

	const location = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		if (!user) navigate(ROUTES.LOGIN, { replace: true, state: { redirect: location.pathname } })
	}, [location.pathname, navigate, user])

	const isPlanActive = (planId: string | undefined) => {
		if (!activePlan) return false
		return activePlan.id === planId
	}

	const displayData = (userPlans: MealPlan[]) => {
		let plans = userPlans

		if (activePlan) {
			plans = plans.filter(plan => plan.id !== activePlan.id)
		}

		plans = plans.sort((a, b) => (isAfter(new Date(a.planEndDate), new Date(b.planStartDate)) ? -1 : 1))
		if (activePlan) plans = [activePlan, ...plans]

		return plans.map(userPlan => {
			return {
				...userPlan,
				$startDate: userPlan.planStartDate.toLocaleDateString(),
				$endDate: userPlan.planEndDate.toLocaleDateString(),
				$numberOfDays: differenceInDays(userPlan.planEndDate, userPlan.planStartDate)
			}
		})
	}

	return (
		<>
			<Alert variant="primary">
				<Alert.Heading>My Meal Plans</Alert.Heading>

				<p>Start by creating a plan.</p>
				<p>
					Designate a range of dates to plan for. For example, if you want to grocery shop for just a week, pick
					that many days.
				</p>
				<p>When you create a plan, we add a few recipes to get you started.</p>
				<p>When you're finished, view your plan. Go wild!</p>
				<hr />
				<p className="mb-0">
					<MealPlanCreateButton variant="secondary">Create Plan</MealPlanCreateButton>
				</p>
			</Alert>
			<Card>
				<Card.Header>My Meal Plans</Card.Header>
				<Card.Body>
					{userPlans.length > 0 ? (
						<Table responsive size="sm">
							<thead className="bg-secondary text-white">
								<tr>
									<th>Active?</th>
									<th>Plan Name</th>
									<th>Start</th>
									<th>End</th>
									<th>Days</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{displayData(userPlans).map(plan => {
									return (
										<tr key={plan.id}>
											<td>
												<Button
													size="sm"
													className="w-100"
													variant={isPlanActive(plan.id) ? 'danger' : 'outline-secondary-gray'}
													onClick={() => plan.id && activatePlan(plan.id)}>
													{isPlanActive(plan.id) ? 'Active' : 'Activate'}
												</Button>
											</td>
											<td>
												<Link to={`/meal-plan/${plan.id}`} replace>
													{plan.planName}
												</Link>
												<br />
												<small className="text-muted">{plan.planDescription}</small>
											</td>
											<td>{plan.$startDate}</td>
											<td>{plan.$endDate}</td>
											<td>{plan.$numberOfDays}</td>
											<td>
												<div className="flex-column d-flex flex-lg-row">
													<Link to={`/meal-plan/${plan.id}`} replace>
														<Button size="sm" variant="secondary" className="me-lg-1">
															View
														</Button>
													</Link>
													<MealPlanEditButton
														size="sm"
														className="me-lg-1"
														variant="secondary-gray"
														userPlan={plan}>
														Edit
													</MealPlanEditButton>
													{plan.id && (
														<MealPlanDeleteButton
															size="sm"
															variant="danger"
															className="me-lg-1"
															userPlanId={plan.id}>
															Delete
														</MealPlanDeleteButton>
													)}
													{/* <Button
										variant="outline-secondary"
										onClick={() =>
											user &&
											plan.id &&
											MealPlan.populateNewMealPlan(
												plan.planStartDate,
												plan.planEndDate,
												plan.id,
												user.id
											)
										}>
										Populate
									</Button> */}
												</div>
											</td>
										</tr>
									)
								})}
							</tbody>
						</Table>
					) : (
						<div className="text-center my-5">
							<h3 className="text-secondary">No meal plans found.</h3>
							<p className="text-secondary">Click the button below to create a new meal plan.</p>
							<MealPlanCreateButton variant="brand" className="mt-3">
								Create Meal Plan
							</MealPlanCreateButton>
						</div>
					)}
				</Card.Body>
			</Card>
		</>
	)
}

export const MealPlanTablePage = ({ children }: any) => {
	return (
		<>
			<Layout>
				<PageHeader variant="secondary">
					<div>
						<PageTitle>
							Meal Plans{' '}
							<HelperModal title="Start by creating a meal plan">
								<>
									<p>
										Create a plan. Designate a range of dates to plan for. For example, if you want to grocery
										shop for just a week, pick that many days.
									</p>
									<p>When you create a plan, we add a few recipes to get you started.</p>
									<p className="mb-0">When you're finished, view your plan. Go wild!</p>
								</>
							</HelperModal>
						</PageTitle>
						<PageSubtitle>Manage your meal plans</PageSubtitle>
					</div>
					<MealPlanCreateButton variant="danger" className="shadow-lg">
						Create Plan
					</MealPlanCreateButton>
				</PageHeader>

				<section>
					<Container className="my-3">{children}</Container>
				</section>
			</Layout>
		</>
	)
}

export default MealPlanTable
