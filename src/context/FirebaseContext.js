import { getAuth, signOut as signOutFirebase } from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { firebaseConfig } from '../api/firebase/config'
import { initializeApp } from 'firebase/app'
import { getFirestore, setDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc, getDoc } from 'firebase/firestore'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const FirebaseContext = createContext(null)

export const FirebaseProvider = ({ children }) => {
  const [user, authLoading, authError] = useAuthState(auth)

  // console.log({ user, loading, error })

  const signOut = async () => signOutFirebase(auth)

  const completeSignIn = async user => {
    console.log('user: ', user)
    const userRef = doc(db, 'users', user.uid)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      console.log('USER Document data:', userSnap.data())
    } else {
      console.log('No such document!')
      const userDocument = {
        email: user.email,
        displayName: user.displayName,
        photoUrl: user.photoURL,
        uid: user.uid,
      }
      await setDoc(doc(db, 'users', user.uid), userDocument)
    }
  }

  if (user) completeSignIn(user)

  // const signInSetCookie = () => {}

  return (
    <FirebaseContext.Provider value={{ auth, user, signOut, db }}>
      {children}
    </FirebaseContext.Provider>
  )
}

const useFirebaseContext = () => useContext(FirebaseContext)

export default useFirebaseContext
