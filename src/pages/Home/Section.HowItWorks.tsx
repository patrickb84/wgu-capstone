import { Link } from 'react-router-dom'
import { Card, Col, Container, Row } from 'react-bootstrap'
import img_1 from 'styles/img/arch_cooks/009-cooking.png'
import img_2 from 'styles/img/arch_cooks/016-cooking.png'
import img_3 from 'styles/img/arch_cooks/013-cooking.png'
import Spacer from 'components/Spacer'
import ROUTES from 'routes/routes'

export function HomePageSectionHowItWorks() {
	return (
		<section className="py-5" data-testid='home-howitworks'>
			<Container className="py-5">
				<h1 className="text-center mb-5 display-4">How it works</h1>
				<Row>
					<Col lg={4}>
						<Card className="border-0 mb-3">
							<img data-testid='image' src={img_1} alt="plan" className="w-100 mb-2 mx-auto" style={{ maxWidth: 250 }} />
							<Card.Body className="px-lg-5 text-center">
								<Card.Title>Create a meal plan</Card.Title>
								<Card.Text>For whatever time frame you'd like, however many plans you want or need</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col lg={4}>
						<Card className="border-0 mb-3">
							<img data-testid='image' src={img_2} alt="find" className="w-100 mb-2 mx-auto" style={{ maxWidth: 250 }} />
							<Card.Body className="px-lg-5 text-center">
								<Card.Title>Add recipes</Card.Title>
								<Card.Text>
									Once you create a meal plan, we'll automatically fill it in with recipes that fit. At any
									time you can add or remove recipes.
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col lg={4}>
						<Card className="border-0 mb-3">
							<img data-testid='image' src={img_3} alt="save" className="w-100 mb-2 mx-auto" style={{ maxWidth: 250 }} />
							<Card.Body className="px-lg-5 text-center">
								<Card.Title>Get a shopping list</Card.Title>
								<Card.Text>
									When you're ready, a shopping list will be prepared for you, just exclude the items you don't
									need and be on your way!
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>

				<Spacer h={2} />
				<div className="text-center">
					<Link to={ROUTES.HOW_IT_WORKS} className="btn btn-brand btn-lg mx-auto px-5">
						More Details
					</Link>
				</div>
			</Container>
		</section>
	)
}
