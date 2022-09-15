import mealdb from 'api/mealdb'
import Layout from 'components/Layout'
import { differenceInDays } from 'date-fns'
import { useActiveMealPlan, useUserMealPlans } from 'hooks/MealPlanProvider'
import { useUser } from 'hooks/UserProvider'
import PageHeader, { PageSubtitle, PageTitle } from 'pages/shared/PageHeader'
import { useEffect, useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { MealPlanCreateButton } from './MealPlan.Create'
import MealPlanDeleteButton from './MealPlan.Delete'
import MealPlanEditButton from './MealPlan.Edit'
import MealPlan, { IMealPlan } from './types/MealPlan'

const MealPlanTable = () => {
	const user = useUser()
	const userPlans = useUserMealPlans()
	const { activeMealPlan, setActiveMealPlan } = useActiveMealPlan()

	const planIsActive = (planId: string | undefined) => {
		if (!user || !planId || !activeMealPlan) return false
		return activeMealPlan === planId
	}

	const displayData = () => {
		return userPlans.map(userPlan => {
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
			<Layout>
				<PageHeader variant="secondary">
					<div>
						<PageTitle>Meal Plans</PageTitle>
						<PageSubtitle>
							{user?.displayName}'s {userPlans.length} {userPlans.length === 1 ? 'plan' : 'plans'}
						</PageSubtitle>
					</div>
					<MealPlanCreateButton variant="light">Create Plan</MealPlanCreateButton>
				</PageHeader>

				<section>
					<Container className="py-3">
						<Table striped responsive className="border border-light">
							<thead className="bg-secondary text-white">
								<tr>
									<th>Active?</th>
									<th>Plan Name</th>
									<th>Plan Description</th>
									<th>Start Date</th>
									<th>End Date</th>
									<th>Days</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{displayData().map(plan => {
									return (
										<tr key={plan.id}>
											<td>
												<Button
													size="sm"
													className="me-lg-1"
													variant={planIsActive(plan.id) ? 'brand' : 'outline-brand'}
													onClick={() => plan.id && setActiveMealPlan(plan.id)}>
													{planIsActive(plan.id) ? 'Active' : 'Activate'}
												</Button>
											</td>
											<td>
												<Link to={`/meal-plan/${plan.id}`} replace>{plan.planName}</Link>
											</td>
											<td>{plan.planDescription}</td>
											<td>{plan.$startDate}</td>
											<td>{plan.$endDate}</td>
											<td>{plan.$numberOfDays}</td>
											<td>
												<div className="flex-column d-flex flex-lg-row">
													<Link to={`/meal-plan/${plan.id}`} replace>
														<Button variant="secondary" className="me-lg-1">
															View
														</Button>
													</Link>
													<MealPlanEditButton className="me-lg-1" variant="secondary-gray" userPlan={plan}>
														Edit
													</MealPlanEditButton>
													{plan.id && (
														<MealPlanDeleteButton
															variant="outline-danger"
															className="me-lg-1"
															userPlanId={plan.id}>
															Delete
														</MealPlanDeleteButton>
													)}
													<Button
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
													</Button>
												</div>
											</td>
										</tr>
									)
								})}
							</tbody>
						</Table>
					</Container>
				</section>
			</Layout>
		</>
	)
}

export default MealPlanTable
