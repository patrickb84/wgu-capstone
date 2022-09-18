import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spacer from 'components/Spacer'
import { PasswordInput } from '../../components/PasswordInput'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FormText } from 'react-bootstrap'
import { errorClass, FormField } from 'components/FormField'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import OverlaySpinner from 'components/OverlaySpinner'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { auth } from 'api/firebase/app'
import { useUser } from 'hooks/UserProvider'
import { useEffect } from 'react'
import ROUTES from 'routes/routes'

interface IFormInputs {
	email: string
	newPassword: string
	// name: string
}

export function RegisterForm() {
	const user = useUser()
	const location = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		if (user) navigate(ROUTES.HOME, { replace: true })
	}, [location.pathname, navigate, user])

	const [createUserWithEmailAndPassword, user$, loading, error] = useCreateUserWithEmailAndPassword(auth)

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<IFormInputs>()

	const onSubmit: SubmitHandler<IFormInputs> = data => {
		console.log(data)
		createUserWithEmailAndPassword(data.email, data.newPassword)
	}

	console.log('register', { currentUser: user, user: user$, loading, error })

	if (user$) return <Navigate to="/" replace />

	if (loading) return <OverlaySpinner />

	return (
		<>
			<Form noValidate onSubmit={handleSubmit(onSubmit)}>
				{error && (
					<div className="d-flex align-items-center flex-column text-danger">
						<p>{error.message}</p>
					</div>
				)}
				<FormField
					label="Email"
					placeholder="Enter email"
					error={errors.email}
					registered={register('email', {
						required: 'Email is required',
						pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i || 'Invalid email address'
					})}
					type="email"
				/>

				<Form.Group className="mb-3">
					<Form.Label className={errorClass(errors.newPassword).text}>Password</Form.Label>
					<PasswordInput creating register={register} error={errors.newPassword} value={watch('newPassword')} />
					<FormText className={errorClass(errors.newPassword).text}>
						Password must be at least 8 characters long.
					</FormText>
				</Form.Group>

				<Spacer h={1} />
				<div className="text-center">
					<Button variant="brand" type="submit" className="px-5 btn-pill">
						Sign Up
					</Button>
				</div>
			</Form>
		</>
	)
}

export default RegisterForm
