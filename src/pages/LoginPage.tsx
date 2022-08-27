import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import imgCooking from '../assets/img/chef-hat.png'
import { SplitText } from '../components/SplitText'
import { RegisterForm } from '../components/RegisterForm'
import { ROUTES } from '../routes/AppRouter'
import { Link } from 'react-router-dom'
import { GoogleButton } from '../components/GoogleButton'
import { LoginForm } from '../components/LoginForm'
import { MiniLogo } from '../components/MiniLogo'
import { Spacer } from '../components/Spacer'
import { AuthFormFooter } from '../components/AuthFormFooter'

export interface ILoginPageProps {}

export const LoginPage = (props: ILoginPageProps) => {
	return (
		<Container fluid className="h-100">
			<Row className="h-100">
				<Col className="bg-brand d-none d-md-block">
					<div className="d-flex flex-column h-100 align-items-center justify-content-center">
						<img
							src={imgCooking}
							alt="cooking"
							style={{ width: 430, maxWidth: '100%' }}
							className="mb-5 mt-3"
						/>
						<h2 className="text-white font-display">Welcome back, chef!</h2>
					</div>
				</Col>
				<Col
					md={6}
					className="d-flex align-items-center justify-content-center bg-white border-top border-brand border-5">
					<div className="w-100 p-4" style={{ maxWidth: 500 }}>
						<div className="text-center">
							<MiniLogo />
							<Spacer h={1.5} />
							<h2 className="font-display mb-1 mb-lg-2">Sign In!</h2>
							<p className="text-center text-muted">
								Don't have an account? <Link to={ROUTES.REGISTER}>Sign up</Link>
							</p>
						</div>

						<div className="mb-3 pb-lg-1" />
						<LoginForm />
						<AuthFormFooter />
					</div>
				</Col>
			</Row>
		</Container>
	)
}
