import { initializeApp } from 'firebase/app'
import { getAuth, User } from 'firebase/auth'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import { createContext, useContext } from 'react'
import { firebaseConfig } from './config'
import { useAuthState } from 'react-firebase-hooks/auth'

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

interface IFirebaseContextState {
	app: typeof app
	auth: typeof auth
	db: typeof db
}

const AuthContext = createContext({} as IFirebaseContextState)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	useAuthState(auth, {
		async onUserChanged(user: User | null) {
			console.log('onUserChanged', user)
			if (user) {
				const userRef = doc(db, 'users', user.uid)
				const userSnapshot = await getDoc(userRef)
				if (!userSnapshot.exists) {
					const userData = {
						displayName: user.displayName,
						email: user.email,
						photoURL: user.photoURL,
						uid: user.uid
					}
					await setDoc(userRef, userData)
				}
			}
		}
	})

	const firebaseContext: IFirebaseContextState = {
		app,
		auth,
		db
	}

	return <AuthContext.Provider value={firebaseContext}>{children}</AuthContext.Provider>
}

export const useFirebase = () => {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error('useFirebase must be used within a FirebaseProvider')
	}
	return context
}
