import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth'

export const createUserWithPassword = async (email, password) => {
  const auth = getAuth()
  const userCredential = createUserWithEmailAndPassword(auth, email, password)

  try {
    const { user } = userCredential
    console.log('user: ', user)
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    console.log({ errorCode, errorMessage })
  }
}

export const signInWithPassword = async (email, password) => {
  const auth = getAuth()
  const userCredential = signInWithEmailAndPassword(auth, email, password)

  try {
    const { user } = userCredential
    console.log('user: ', user)
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    console.log({ errorCode, errorMessage })
  }
}

export const onAuthChange = async user => {
  const auth = getAuth()

  onAuthStateChanged(auth, user => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid
      // ...
    } else {
      // User is signed out
      // ...
    }
  })
}
