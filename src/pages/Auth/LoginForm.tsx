import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Spacer } from 'components/Spacer'
import { PasswordInput } from './PasswordInput'
import { useForm, SubmitHandler } from 'react-hook-form'
import { errorClass, FormField } from 'components/FormField'
import { useAppContext } from 'providers/AppProvider'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { OverlaySpinner } from 'components/OverlaySpinner'
import { Navigate } from 'react-router-dom'

interface IFormInputs {
	email: string
	password: string
}

export function LoginForm() {
	const { auth } = useAppContext()
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
		// error obj:
		/**
		 * {
				"loading": false,
				"error": {
					"code": "auth/user-not-found",
					"customData": {},
					"name": "FirebaseError"
				}
			}
		 */
	}

	if (user) return <Navigate to="/" replace />

	if (loading) return <OverlaySpinner show />

	console.log('login', { user, loading, error })

	return (
		<>
			<Form noValidate onSubmit={handleSubmit(onSubmit)}>
				<FormField
					label="Email"
					placeholder="Enter email"
					error={errors.email}
					errorMessage="Todo..." // TODO: add error message
					registered={register('email', {
						required: true
					})}
				/>

				<Form.Group className="mb-3">
					<Form.Label className={errorClass(errors.password).text}>Password</Form.Label>
					<PasswordInput
						register={register}
						error={errors.password}
						value={watch('password')}
					/>
				</Form.Group>

				<Spacer h={1} />
				<div className="text-center">
					<Button variant="brand" type="submit" className="px-5 btn-pill">
						Sign In
					</Button>
				</div>
			</Form>
		</>
	)
}
