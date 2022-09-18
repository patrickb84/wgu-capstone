import Form from 'react-bootstrap/Form'
import { FormText } from 'react-bootstrap'
import { FieldError } from 'react-hook-form'
import { createRef, useEffect } from 'react'

export interface IFormFieldProps {
	error?: FieldError | undefined
	registered?: any
	label: string
	placeholder?: string
	type?: 'text' | 'password' | 'email' | 'number' | 'date' | 'textarea'
	onChange?: (e: any) => void
	value?: any
	rows?: number
}

export const FormField = ({
	error,
	registered,
	label,
	placeholder,
	type,
	onChange,
	value,
	rows,
	...props
}: IFormFieldProps) => {
	return (
		<Form.Group className="mb-3">
			<Form.Label className={errorClass(error).text}>{label}</Form.Label>
			<Form.Control
				type={type}
				className={errorClass(error).border}
				placeholder={placeholder}
				{...registered}
				as={type === 'textarea' ? 'textarea' : undefined}
				onChange={onChange}
				value={value}
				rows={rows}
			/>
			{error && <FormText className="text-danger">{error.message}</FormText>}
		</Form.Group>
	)
}

export const errorClass = (error: any) => {
	return {
		text: `${error && 'text-danger'}`,
		border: `${error && 'border-danger'}`
	}
}

export default FormField
