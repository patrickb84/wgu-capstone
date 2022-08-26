import * as React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Overlay from 'react-bootstrap/Overlay'
import Tooltip from 'react-bootstrap/Tooltip'

export interface IPasswordInputProps {
	value: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function PasswordInput(props: IPasswordInputProps) {
	const [showPassword, setShowPassword] = React.useState(false)
	const target = React.useRef(null)
	const [show, setShow] = React.useState(false)
	return (
		<InputGroup>
			<Form.Control
				type={showPassword ? 'text' : 'password'}
				placeholder="Password"
				value={props.value}
				onChange={props.onChange}
				autoComplete="new-password"
			/>
			<>
				<Button
					ref={target}
					onMouseEnter={() => setShow(true)}
					onMouseLeave={() => setShow(false)}
					disabled={!props.value.length}
               variant="primary"
               className='text-white'
					onClick={() => setShowPassword(!showPassword)}>
					<i style={{ width: 20 }} className={showPassword ? 'far fa-eye-slash' : 'far fa-eye'} />
				</Button>

				<Overlay target={target.current} show={show} placement="bottom">
					{props => (
						<Tooltip id="toggle-password" {...props}>
							{!showPassword ? 'Show Password' : 'Hide Password'}
						</Tooltip>
					)}
				</Overlay>
			</>
		</InputGroup>
	)
}
