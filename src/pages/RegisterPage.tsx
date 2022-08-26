import React, { useState, useContext } from 'react'
import { Layout } from '../components/Layout'
import { Form, Button, Card, Row, Col, Container } from 'react-bootstrap'
import imgCooking from '../assets/img/cooking.png'
import { SplitText } from '../components/SplitText'
import imgGoogleIcon from '../assets/img/google-g.png'
import { RegisterForm } from '../components/RegisterForm'
import { Spacer } from '../components/Spacer'

export interface IRegisterPageProps {
}

export const RegisterPage = (props: IRegisterPageProps) => {

	return (
		<div className="bg-secondary h-100">
			<Container fluid className="h-100 d-flex flex-column h-100 align-items-center justify-content-center">
				<Card style={{ width: '80%', height: '80%', overflow: 'hidden' }} className="shadow-lg">
					<Row className="h-100">
						<Col className="bg-tertiary">
							<div className="d-flex flex-column h-100 align-items-center justify-content-center">
								<img src={imgCooking} alt="cooking" style={{ maxWidth: 360 }} className="mb-5 mt-3" />
								<h2 className="text-white font-display">Sous Chef!</h2>
								<h4 className="text-white" style={{ opacity: 0.9 }}>
									Be the master of your menu
								</h4>
							</div>
						</Col>
						<Col md={6} className="d-flex align-items-center justify-content-center">
							<div className="w-100" style={{ maxWidth: 370 }}>
								<h2 className="font-display text-center">Register Now!</h2>
								<Spacer h={2} />

								<RegisterForm />

								<Spacer h={1.5} />
								<SplitText>or</SplitText>
								<Spacer h={1.5} />
								<div className="text-center">
									<GoogleButton className="btn-square btn-gray-200" />
								</div>
							</div>
						</Col>
					</Row>
				</Card>
			</Container>
		</div>
	)
}

interface GoogleButtonProps {
	style?: React.CSSProperties
	className?: string
}
export const GoogleButton = ({ style, className }: GoogleButtonProps) => {
	return (
		<>
			<Button style={style} className={className}>
				<img alt="google" src={imgGoogleIcon} style={{ width: '1.2rem' }} />{' '}
				<span style={{ marginRight: '0.5rem' }} />
				Register with Google
			</Button>
		</>
	)
}
