import { Button, Card, Col, Row } from 'react-bootstrap'
import format from 'date-fns/format'

export interface IScheduleDayCardProps {
	date: Date
	userId: string | undefined
	meals?: any[]
}

export function ScheduleDayCard({ date, userId }: IScheduleDayCardProps) {
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
