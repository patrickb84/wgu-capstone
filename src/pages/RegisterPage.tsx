import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import imgCooking from '../assets/img/cooking.png'
import { SplitText } from '../components/SplitText'
import { RegisterForm } from '../components/RegisterForm'
import { ROUTES } from '../routes/AppRouter'
import { Link } from 'react-router-dom'
import { GoogleButton } from '../components/GoogleButton'

export interface IRegisterPageProps {}

export const RegisterPage = (props: IRegisterPageProps) => {
	return (
		<Container fluid className="h-100">
			<Row className="h-100">
				<Col className="bg-secondary d-none d-md-block">
					<div className="d-flex flex-column h-100 align-items-center justify-content-center">
						<img
							src={imgCooking}
							alt="cooking"
							style={{ maxWidth: 360 }}
							className="mb-5 mt-3"
						/>
						<h3 className="text-white font-display">Be the master of your menu</h3>
					</div>
				</Col>
				<Col
					md={6}
					className="d-flex align-items-center justify-content-center bg-white border-top border-brand border-5">
					<div className="w-100 p-4" style={{ maxWidth: 500 }}>
						<div className="text-center">
							<div className="mb-3">
								<i className="text-brand far fa-garlic fa-3x mb-0" />
								<div className="text-brand small font-display">Sous Chef!</div>
							</div>
							<h1 className="font-display mb-1 mb-lg-2">Register Now!</h1>
							<p className="text-center text-muted text-lg fs-6">
								Already have an account? <Link to={ROUTES.LOGIN}>Sign in</Link>
							</p>
						</div>

						<div className="mb-3 pb-lg-1" />
						<RegisterForm />
						<div className="mb-3" />
						<SplitText>or</SplitText>
						<div className="mb-3" />
						<div className="text-center d-flex flex-column px-5">
							<GoogleButton className="btn-gray-200" />
							<Link className="btn btn-link mt-2" to={ROUTES.HOME}>
								Back to Home Page
							</Link>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	)
}
