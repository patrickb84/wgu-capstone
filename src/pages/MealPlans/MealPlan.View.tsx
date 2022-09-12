import Layout from 'components/Layout'
import OverlaySpinner from 'components/OverlaySpinner'
import { PlannerView } from 'pages/ScheduledMeals/PlannerView'
import PageHeader, { PageSubtitle, PageTitle } from 'pages/shared/PageHeader'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import MealPlan from './types/MealPlan'

export interface IMealPlanViewProps {}

export function MealPlanView(props: IMealPlanViewProps) {
	const { id } = useParams()
	const [mealPlan, setMealPlan] = useState<MealPlan | null>(null)
	const [loading, setLoading] = useState(true)

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
				<OverlaySpinner show />
			) : (
				<>
					<PageHeader>
						<div>
							<PageTitle>{mealPlan?.planName || 'View Meal Plan'}</PageTitle>
							{mealPlan && (
								<PageSubtitle>
									{format(mealPlan.planStartDate, 'EEE, MMM dd')} -{' '}
									{format(mealPlan.planEndDate, 'EEE, MMM dd')}
								</PageSubtitle>
							)}
						</div>
					</PageHeader>

					<Container className="py-3">
						<PlannerView mealPlanId={mealPlan?.id as string} />
					</Container>
				</>
			)}
		</Layout>
	)
}
