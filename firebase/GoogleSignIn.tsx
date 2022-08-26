import * as React from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from './FirebaseProvider'

export interface IGoogleButtonProps {}

export function GoogleButton(props: IGoogleButtonProps) {
	const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)
	return (
		<div>
			<p>Auth:</p>
		</div>
	)
}
