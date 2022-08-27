import { useState, useRef } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Overlay from 'react-bootstrap/Overlay'
import Tooltip from 'react-bootstrap/Tooltip'
import { UseFormRegister } from 'react-hook-form'
import { errorClass } from './FormField'

export interface IPasswordInputProps {
	register: UseFormRegister<any>
	error: any
	value: string
	creating?: boolean
}

export function PasswordInput(props: IPasswordInputProps) {
	const { register, error, value, creating } = props

	const target = useRef(null)
	const [showPassword, setShowPassword] = useState(false)
	const [showTooltip, setShowTooltip] = useState(false)

	return (
		<>
			<InputGroup>
				<Form.Control
					className={errorClass(error).border}
					type={showPassword ? 'text' : 'password'}
					placeholder="Password"
					autoComplete={creating ? 'new-password' : undefined}
					{...register(creating ? 'newPassword' : 'password', {
						required: true,
						minLength: 8
					})}
				/>
				<Button
					ref={target}
					onMouseEnter={() => setShowTooltip(true)}
					onMouseLeave={() => setShowTooltip(false)}
					disabled={!value}
					variant="brand"
					className="text-white"
					onClick={() => setShowPassword(!showPassword)}>
					<i style={{ width: 20 }} className={`far fa-eye${showPassword ? '-slash' : ''}`} />
				</Button>

				<Overlay target={target.current} show={showTooltip} placement="bottom">
					{props => (
						<Tooltip id="toggle-password" {...props}>
							{!showPassword ? 'Show Password' : 'Hide Password'}
						</Tooltip>
					)}
				</Overlay>
			</InputGroup>
		</>
	)
}
