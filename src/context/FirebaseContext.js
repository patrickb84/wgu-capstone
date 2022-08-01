import { getAuth, signOut as signOutFirebase } from 'firebase/auth'
import { createContext, useContext } from 'react'
import { firebaseConfig } from '../api/firebase/config'
import { initializeApp } from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth'

const app = initializeApp(firebaseConfig)

const FirebaseContext = createContext(null)

export const FirebaseProvider = ({ children }) => {
  const auth = getAuth(app)
  const [user, loading, error] = useAuthState(auth)

  console.log([user, loading, error])

  const signOut = async () => signOutFirebase(auth)

  return (
    <FirebaseContext.Provider value={{ auth, user, signOut }}>
      {children}
    </FirebaseContext.Provider>
  )
}

const useFirebaseContext = () => {
  return useContext(FirebaseContext)
}

export default useFirebaseContext
