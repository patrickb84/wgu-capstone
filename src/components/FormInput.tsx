import { useState } from 'react'
import { Form } from 'react-bootstrap'

export interface IAuthInputProps {
	value: string
	controlId: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

interface InputWrapperProps extends IAuthInputProps {
	type: 'email' | 'password' | 'passwordConfirm' | 'text'
	label: string
	placeholder?: string
	formText?: string | false
}

const InputWrapper = ({ type, value, onChange, controlId, label, placeholder, formText }: InputWrapperProps) => {
	return (
		<Form.Group className="mb-3">
			<Form.Label>{label}</Form.Label>
			<Form.Control type={type} placeholder={placeholder} />
			{formText && <Form.Text className="text-muted">{formText}</Form.Text>}
		</Form.Group>
	)
}

interface EmailInputProps extends IAuthInputProps {
	includeText?: boolean
}

const Email = (props: EmailInputProps) => {
	const { value, controlId, onChange, includeText } = props

	return (
		<InputWrapper
			type="email"
			value={value}
			onChange={onChange}
			controlId={controlId}
			label="Email"
			placeholder="Enter email"
			formText={includeText && "We'll never share your email with anyone else."}
		/>
	)
}

const Password = (props: IAuthInputProps) => {
	const { value, controlId, onChange } = props

	return (
		<InputWrapper
			type="password"
			value={value}
			onChange={onChange}
			controlId={controlId}
			label="Password"
			placeholder="Password"
		/>
	)
}

const PasswordConfirm = (props: IAuthInputProps) => {
	const { value, controlId, onChange } = props

	return (
		<InputWrapper
			type="password"
			value={value}
			onChange={onChange}
			controlId={controlId}
			label="Password Confirm"
			placeholder="Password Confirm"
			formText="Passwords must match"
		/>
	)
}

const Name = (props: EmailInputProps) => {
	const { value, controlId, onChange } = props

	return (
		<InputWrapper
			type="text"
			value={value}
			onChange={onChange}
			controlId={controlId}
			label="Name"
			placeholder="Enter your name"
		/>
	)
}

const AuthInput = {
	Password,
	PasswordConfirm,
	Email,
	Name
}

export default AuthInput
