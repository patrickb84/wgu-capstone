import { createContext, useContext, useState } from 'react'
import app, { auth, firestore as db } from '../api/firebase'
import { IUser } from 'types'
import { useAuthState } from 'react-firebase-hooks/auth'
import { User } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { OverlaySpinner } from 'components/OverlaySpinner'

export interface IAppContextState {
	firebase: typeof app
	auth: typeof auth
	db: typeof db
	appUser: IUser | null
}

const AppContext = createContext({} as IAppContextState)

interface IAppProviderProps {
	children: React.ReactNode
}

export const AppProvider = ({ children }: IAppProviderProps) => {
	const [appUser, setAppUser] = useState<IUser | null>(null)

	const [user, loading, error] = useAuthState(auth, {
		async onUserChanged(user: User | null) {
			try {
				if (user) {
					const userRef = doc(db, 'users', user.uid)
					const userSnapshot = await getDoc(userRef)
					if (!userSnapshot.exists()) {
						const appUser: IUser = {
							displayName: user.displayName,
							email: user.email,
							photoURL: user.photoURL,
							uid: user.uid
						}
						await setDoc(userRef, appUser)
					}
				}
			} catch (error) {
				console.error(error)
			}
		}
	})

	useEffect(() => {
		if (user) {
			let appUser: IUser = {
				displayName: user.displayName || 'Chef!',
				email: user.email || null,
				photoURL: user.photoURL || null,
				uid: user.uid
			}
			setAppUser(appUser)
		} else {
			setAppUser(null)
		}
	}, [user])

	console.log('auth providor', { user, loading, error })

	const context: IAppContextState = {
		firebase: app,
		auth: auth,
		db: db,
		appUser
	}

	if (loading) return <OverlaySpinner show />

	return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
	return useContext(AppContext)
}
