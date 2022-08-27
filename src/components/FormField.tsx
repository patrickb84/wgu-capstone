import Form from 'react-bootstrap/Form'
import { FormText } from 'react-bootstrap'

export interface IFormFieldProps {
	error: any
	registered: any
	label: string
	placeholder: string
	errorMessage: string
}

export const FormField = ({
	error,
	registered,
	label,
	placeholder,
	errorMessage
}: IFormFieldProps) => {
	return (
		<Form.Group className="mb-3">
			<Form.Label className={errorClass(error).text}>{label}</Form.Label>
			<Form.Control
				className={errorClass(error).border}
				placeholder={placeholder}
				{...registered}
			/>
			{error && <FormText className="text-danger">{errorMessage}</FormText>}
		</Form.Group>
	)
}

export const errorClass = (error: any) => {
	return {
		text: `${error && 'text-danger'}`,
		border: `${error && 'border-danger'}`
	}
}
