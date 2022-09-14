import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, initializeFirestore } from 'firebase/firestore'
import { firebaseConfig } from './config'

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

initializeFirestore(app, {
	ignoreUndefinedProperties: true
})
export const firestore = getFirestore(app)
