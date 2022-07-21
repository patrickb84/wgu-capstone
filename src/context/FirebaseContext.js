import { getAuth } from 'firebase/auth'
import { createContext, useContext } from 'react'
import { app } from '../firebase/config'

const FirebaseContext = createContext(null)

export const FirebaseProvider = ({ children }) => {
  const auth = getAuth(app)

  return (
    <FirebaseContext.Provider value={{ auth }}>
      {children}
    </FirebaseContext.Provider>
  )
}

const useFirebaseContext = () => {
  return useContext(FirebaseContext)
}

export default useFirebaseContext
