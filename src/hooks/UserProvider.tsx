import { createContext, useContext, useState } from 'react'
import { auth, firestore as db } from 'api/firebase/app'
import IUser from 'types/User'
import { useAuthState } from 'react-firebase-hooks/auth'
import { User } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import OverlaySpinner from 'components/OverlaySpinner'

export interface IUserContextState {
	currentUser: IUser | null
}

const UserContext = createContext({} as IUserContextState)

interface IUserProviderProps {
	children: React.ReactNode
}

export const UserProvider = ({ children }: IUserProviderProps) => {
	const [currentUser, setCurrentUser] = useState<IUser | null>(null)

	const [firebaseUser, firebaseUserLoading, firebaseUserError] = useAuthState(auth, {
		async onUserChanged(user: User | null) {
			handleUserChange(user)
		}
	})

	if (firebaseUserError) {
		console.error('firebaseUserError', firebaseUserError)
	}

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
					id: user.uid
				}
				await setDoc(userRef, userRecord)
			}
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		if (firebaseUser) {
			const $user: IUser = {
				displayName: firebaseUser.displayName || 'Chef!',
				email: firebaseUser.email || null,
				photoURL: firebaseUser.photoURL || null,
				id: firebaseUser.uid
			}

			setCurrentUser($user)
		} else {
			setCurrentUser(null)
		}
	}, [firebaseUser])

	return !firebaseUserLoading ? (
		<UserContext.Provider value={{ currentUser }}>{children}</UserContext.Provider>
	) : (
		<OverlaySpinner />
	)
}

export const useUser = () => {
	const { currentUser } = useContext(UserContext)
	return currentUser
}

// export const useIfNoUser = () => {
// 	const { currentUser } = useContext(UserContext)
// 	const navigate = useNavigate()

// 	if (!currentUser) navigate('/')
// }
