import { Button, Card, Col, Row } from 'react-bootstrap'
import format from 'date-fns/format'
import { useEffect, useState } from 'react'
import { DayPlan } from 'types/DayPlan'
import { Recipe } from 'types/Recipe'
import Spacer from 'components/Spacer'
import { Link, useNavigate } from 'react-router-dom'
import DisplayCardDate from './DayPlanDateDisplay'
import ScheduleDayButtonAddRecipe from './DayPlanButtonAddRecipe'

export interface IScheduleDayCardProps {
	index?: number
	dayPlan: DayPlan
}

export function ScheduleDayCard(props: IScheduleDayCardProps) {
	const { index, dayPlan } = props
	const { date, meals } = dayPlan
	const [recipes, setRecipes] = useState<Recipe[]>([])
	const [active, setActive] = useState(false)

	useEffect(
		function shimmer() {
			let timeoutms: number
			if (!index) return
			if (index === 0) timeoutms = 100
			else timeoutms = 100 * index
			setTimeout(() => setActive(true), timeoutms)
		},
		[index]
	)

	useEffect(() => {
		if (meals.length) {
			const recipes = meals.map(meal => Recipe.findRecipeById(meal.recipeId))
			Promise.all(recipes).then(recipes => {
				setRecipes(recipes)
			})
		}
	}, [meals])

	return (
		<>
			<Card className={`mb-4 fade-in ${active ? 'fade-in-active' : ''}`}>
				<Card.Body>
					<Row>
						<Col lg={3}>
							<DisplayCardDate date={date} />
							<Spacer h={0.5} />
							<ScheduleDayButtonAddRecipe date={date} />
						</Col>
						<Col>
							<div className="border border-gray bg-gray-100 h-100 py-3 px-4">
								{recipes.length ? (
									<div>
										{recipes.map((recipe, index) => (
											<div key={index} className="fs-6">
												<Link to={`/recipe/${recipe.id}`} key={index}>
													<i className="far fa-bowl-food" />
													<Spacer w={0.6} />
													{recipe.name}
												</Link>
											</div>
										))}
									</div>
								) : (
									<div className="w-100 h-100 d-flex align-items-center justify-content-center i span text-muted">
										No meals scheduled
									</div>
								)}
							</div>
						</Col>
					</Row>
				</Card.Body>
			</Card>
		</>
	)
}
