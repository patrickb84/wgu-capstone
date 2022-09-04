import { createContext, useContext, useState } from 'react'
import { auth, firestore as db } from '../api/firebase'
import { IUser } from 'types'
import { useAuthState } from 'react-firebase-hooks/auth'
import { User } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { OverlaySpinner } from 'components/OverlaySpinner'
import useNavbar from './useNavbar'

export interface IAppContextState {
	currentUser: IUser | null
	userId: string | null
	navbar: ReturnType<typeof useNavbar>
}

const AppContext = createContext({} as IAppContextState)

interface IAppProviderProps {
	children: React.ReactNode
}

export const AppProvider = ({ children }: IAppProviderProps) => {
	const [currentUser, setCurrentUser] = useState<IUser | null>(null)
	const navbar = useNavbar()

	const [user, loading, error] = useAuthState(auth, {
		async onUserChanged(user: User | null) {
			handleUserChange(user)
		}
	})

	const handleUserChange = async (user: User | null) => {
		if (!user) return
		try {
			const userRef = doc(db, 'users', user.uid)
			const userSnapshot = await getDoc(userRef)
			if (!userSnapshot.exists()) {
				const userRecord: IUser = {
					displayName: user.displayName,
					email: user.email,
					photoURL: user.photoURL,
					uid: user.uid
				}
				await setDoc(userRef, userRecord)
			}
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		if (user) {
			const currentUser: IUser = {
				displayName: user.displayName || 'Chef!',
				email: user.email || null,
				photoURL: user.photoURL || null,
				uid: user.uid
			}
			setCurrentUser(currentUser)
		} else {
			setCurrentUser(null)
		}
	}, [user])

	console.log('auth --', { user, loading, error })

	const context: IAppContextState = {
		currentUser,
		userId: currentUser && currentUser.uid,
		navbar
	}

	return !loading ? (
		<AppContext.Provider value={context}>{children}</AppContext.Provider>
	) : (
		<OverlaySpinner show />
	)
}

export const useAppContext = () => useContext(AppContext)
