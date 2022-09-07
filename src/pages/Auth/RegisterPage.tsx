import { Row, Col, Container } from 'react-bootstrap'
import imgCooking from 'assets/img/cooking.png'
import RegisterForm from 'pages/Auth/RegisterForm'
import { ROUTES } from 'routes/AppRouter'
import { Link } from 'react-router-dom'
import { AuthFormFooter } from 'pages/Auth/AuthFormFooter'
import { MiniLogo } from 'components/Logo'

export interface IRegisterPageProps {}

export const RegisterPage = (props: IRegisterPageProps) => {
	return (
		<>
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
								<MiniLogo />
								<h1 className="font-display mb-1 mb-lg-2">Register Now!</h1>
								<p className="text-center text-muted text-lg fs-6">
									Already have an account? <Link to={ROUTES.LOGIN}>Sign in</Link>
								</p>
							</div>

							<div className="mb-3 pb-lg-1" />
							<RegisterForm />
							<AuthFormFooter />
						</div>
					</Col>
				</Row>
			</Container>
		</>
	)
}
