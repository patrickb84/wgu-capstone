import React from 'react'
import { Button } from 'react-bootstrap'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { Navigate } from 'react-router-dom'
import ROUTES from 'routes/routes'
import imgGoogleIcon from 'styles/img/google-g.png'
import { auth } from 'api/firebase/app'

export interface IGoogleButtonProps {
	style?: React.CSSProperties
	className?: string
}

export const GoogleButton = ({ style, className }: IGoogleButtonProps) => {
	const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)

	console.log('GoogleButton', { user, loading, error })

	if (user) return <Navigate to={ROUTES.HOME} />

	return (
		<>
			<Button style={style} className={className} onClick={() => signInWithGoogle()}>
				<img alt="google" src={imgGoogleIcon} style={{ width: '1.2rem' }} />
				<span style={{ marginRight: '0.5rem' }} />
				Sign in with Google
			</Button>
		</>
	)
}
