import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Spacer } from './Spacer'
import { PasswordInput } from './PasswordInput'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FormText } from 'react-bootstrap'
import { errorClass, FormField } from './FormField'

interface IFormInputs {
	email: string
	password: string
}

const onSubmit: SubmitHandler<IFormInputs> = data => {
	console.log(data)
}

export function LoginForm() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<IFormInputs>()

	return (
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
				<PasswordInput register={register} error={errors.password} value={watch('password')} />
			</Form.Group>

			<Spacer h={1} />
			<div className="text-center">
				<Button variant="brand" type="submit" className="px-5 btn-pill">
					Sign Up
				</Button>
			</div>
		</Form>
	)
}
