import { PlannerView } from 'pages/ScheduledMeals/PlannerView'
import { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import MealPlan from '../../types/MealPlan'
import { Link } from 'react-router-dom'
import ROUTES from 'routes/routes'

export interface IMealPlanViewProps {
}

export function MealPlanView(props: IMealPlanViewProps) {
	const { id } = useParams()
	const [mealPlan, setMealPlan] = useState<MealPlan | null>(null)

	useEffect(() => {
		if (id) {
			MealPlan.get(id).then(mealPlan => {
				setMealPlan(mealPlan)
			})
		}
	}, [id])

	return (
		<>
			<Alert variant="primary">
				<Alert.Heading>My Schedule</Alert.Heading>
				<p>Here you'll find what meals you've assigned to a given day.</p>
				<p>
					If you don't like what you see on a particular day, you can edit it by clicking the <strong>Edit</strong>{' '}
					button.
				</p>
				<p className="mb-0">
					To see the details of the recipe, just click on the name! To add recipes, navigate to the{' '}
					<Link to={ROUTES.RECIPES}>Recipes</Link> page!
				</p>
			</Alert>
			<PlannerView mealPlanId={mealPlan?.id as string} />
		</>
	)
}
