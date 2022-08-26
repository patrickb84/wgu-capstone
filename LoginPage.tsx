import React, { useState, useContext } from 'react'
import { Layout } from '../components/Layout'
import { Form, Button } from 'react-bootstrap'

export interface ILoginPageProps {}

export const LoginPage = (props: ILoginPageProps) => {
	return (
		<Layout>
			<h1>Login</h1>
			<p>User logs in via email and password, or via Google.</p>

			<section>
				<Form>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" placeholder="Enter email" />
						<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" />
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicCheckbox">
						<Form.Check type="checkbox" label="Check me out" />
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			</section>

			<hr />

			<GoogleButton />
		</Layout>
	)
}

export const GoogleButton = () => {
	return (
		<>
			<Button>Sign in with Google</Button>
		</>
	)
}
