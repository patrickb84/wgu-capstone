import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Spacer } from 'components/Spacer'
import { PasswordInput } from './PasswordInput'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FormText } from 'react-bootstrap'
import { errorClass, FormField } from 'components/FormField'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useAppContext } from 'providers/AppProvider'
import { OverlaySpinner } from 'components/OverlaySpinner'
import { Navigate } from 'react-router-dom'
import { auth } from 'api/firebase'

interface IFormInputs {
	email: string
	newPassword: string
	// name: string
}

export function RegisterForm() {
	const { currentUser: appUser } = useAppContext()

	const [createUserWithEmailAndPassword, user, loading, error] =
		useCreateUserWithEmailAndPassword(auth)

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<IFormInputs>()

	const onSubmit: SubmitHandler<IFormInputs> = data => {
		console.log(data)
		createUserWithEmailAndPassword(data.email, data.newPassword)

		// error obj
		/**
		 * {
			"appUser": null,
			"loading": false,
			"error": {
				"code": "auth/email-already-in-use",
				"customData": {
					"appName": "[DEFAULT]",
					"_tokenResponse": {
						"error": {
							"code": 400,
							"message": "EMAIL_EXISTS",
							"errors": [
								{
									"message": "EMAIL_EXISTS",
									"domain": "global",
									"reason": "invalid"
								}
							]
						}
					}
				},
				"name": "FirebaseError"
			}
		}
		 */
	}

	console.log('register', { appUser, user, loading, error })

	if (user) return <Navigate to="/" replace />

	if (loading) return <OverlaySpinner show />

	return (
		<>
			<Form noValidate onSubmit={handleSubmit(onSubmit)}>
				<FormField
					label="Email"
					placeholder="Enter email"
					error={errors.email}
					errorMessage="Please enter a valid email address."
					registered={register('email', {
						required: true,
						pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
					})}
				/>

				{/* <FormField
					label="Name"
					placeholder="Enter your name"
					error={errors.name}
					errorMessage="Please enter a user name."
					registered={register('name', { required: true })}
				/> */}

				<Form.Group className="mb-3">
					<Form.Label className={errorClass(errors.newPassword).text}>Password</Form.Label>
					<PasswordInput
						creating
						register={register}
						error={errors.newPassword}
						value={watch('newPassword')}
					/>
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
