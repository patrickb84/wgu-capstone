import React from 'react'
import { Button } from 'react-bootstrap'
import imgGoogleIcon from '../assets/img/google-g.png'

export interface IGoogleButtonProps {
	style?: React.CSSProperties
	className?: string
}

export const GoogleButton = ({ style, className }: IGoogleButtonProps) => {
	return (
		<>
			<Button style={style} className={className}>
				<img alt="google" src={imgGoogleIcon} style={{ width: '1.2rem' }} />
				<span style={{ marginRight: '0.5rem' }} />
				Sign in with Google
			</Button>
		</>
	)
}
