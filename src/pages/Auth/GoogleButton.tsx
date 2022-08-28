import React from 'react'
import { OverlaySpinner } from 'components/OverlaySpinner'
import { useAppContext } from 'providers/AppProvider'
import { Button } from 'react-bootstrap'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { Navigate } from 'react-router-dom'
import { ROUTES } from 'routes/AppRouter'
import imgGoogleIcon from 'assets/img/google-g.png'

export interface IGoogleButtonProps {
	style?: React.CSSProperties
	className?: string
}

export const GoogleButton = ({ style, className }: IGoogleButtonProps) => {
	const { auth } = useAppContext()
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
