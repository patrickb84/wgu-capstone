import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Spacer } from './Spacer'
import { PasswordInput } from './PasswordInput'

export interface IRegisterFormProps {}

export function RegisterForm(props: IRegisterFormProps) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		e.stopPropagation()
		console.log(email, password, name)
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group className="mb-3" controlId="registerEmail">
				<Form.Label>Email address</Form.Label>
				<Form.Control
					type="email"
					placeholder="Enter email"
					value={email}
					onChange={e => setEmail(e.currentTarget.value)}
				/>
				{/* <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text> */}
			</Form.Group>

			<Form.Group className="mb-3" controlId="registerName">
				<Form.Label>Name</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter your name"
					value={name}
					onChange={e => setName(e.currentTarget.value)}
				/>
			</Form.Group>

			<Form.Group className="mb-3" controlId="registerPassword">
				<Form.Label>Password</Form.Label>
				<PasswordInput value={password} onChange={e => setPassword(e.currentTarget.value)} />
			</Form.Group>

			<Spacer h={1} />
			<div className="text-center">
				<Button variant="gray-700" type="submit" className="px-5 btn-pill">
					Sign Up
				</Button>
			</div>
		</Form>
	)
}
