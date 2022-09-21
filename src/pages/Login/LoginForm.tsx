import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spacer from 'components/Spacer'
import { PasswordInput } from '../../components/PasswordInput'
import { useForm, SubmitHandler, UseFormRegister } from 'react-hook-form'
import { errorClass } from 'components/FormField'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import OverlaySpinner from 'components/OverlaySpinner'
import { Navigate } from 'react-router-dom'
import { auth } from 'api/firebase/app'
import { useUser } from 'hooks/UserProvider'
import { FormText } from 'react-bootstrap'
import React from 'react'
import ROUTES from 'routes/routes'

interface IFormInputs {
	email: string
	password: string
}

export function LoginForm() {
	const currentUser = useUser()
	const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth)

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<IFormInputs>()

	const onSubmit: SubmitHandler<IFormInputs> = data => {
		console.log(data)
		signInWithEmailAndPassword(data.email, data.password)
	}

	if (user) return <Navigate to="/" />

	if (loading) return <OverlaySpinner />

	if (error) {
		console.error(error)
	}

	console.log('login', { user, loading, error })

	if (currentUser) return <Navigate to={ROUTES.MEAL_PLANS} />

	return (
		<>
			{error && (
				<div className="d-flex align-items-center flex-column text-danger">
					<p>{error.message}</p>
				</div>
			)}

			<Form aria-disabled="true" noValidate onSubmit={handleSubmit(onSubmit)}>
				<Form.Group className="mb-3">
					<EmailInput
						label="Email"
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: 'invalid email address'
							}
						})}
					/>
					{errors.email && <FormText className="text-danger">{errors.email.message}</FormText>}
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label className={errorClass(errors.password).text}>Password</Form.Label>
					<PasswordInput register={register} error={errors.password} value={watch('password')} />
				</Form.Group>

				<Spacer h={1} />
				<div className="text-center">
					<Button variant="brand" type="submit" className="px-5 btn-pill" data-testid='sign-in-button'>
						Sign In
					</Button>
				</div>
			</Form>
		</>
	)
}

interface IFormValues {
	email: string
}
const EmailInput = React.forwardRef<HTMLInputElement, { label: string } & ReturnType<UseFormRegister<IFormValues>>>(
	({ onChange, onBlur, label, name }, ref) => {
		return (
			<>
				<Form.Label>{label}</Form.Label>
				<Form.Control
					data-testid="email-input"
					type="text"
					placeholder={'Enter email'}
					onChange={onChange}
					onBlur={onBlur}
					name={name}
					ref={ref}
				/>
			</>
		)
	}
)
