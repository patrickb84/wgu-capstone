import { Button, Card, Col, Row } from 'react-bootstrap'
import format from 'date-fns/format'
import { useNavigate } from 'react-router-dom'

export interface IScheduleDayCardProps {
	date: Date
	uid: string | undefined
}

export function ScheduleDayCard({ date, uid }: IScheduleDayCardProps) {
	let navigate = useNavigate()

	const addMealToPlan = () => {
		console.log('add meal to plan')
	}

	return (
		<>
			<Card className="mb-4">
				<Card.Body>
					<Row>
						<Col lg={3}>
							<div>{date.toLocaleDateString()}</div>
							<div>{format(date, 'EEEE')}</div>
						</Col>
						<Col>
							<Button variant="primary" onClick={() => null}>
								Add Meal
							</Button>
						</Col>
					</Row>
				</Card.Body>
			</Card>
		</>
	)
}
