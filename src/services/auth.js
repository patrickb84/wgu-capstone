import { signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { firestore } from '../firebase'

const auth = {}

auth.setUserDocument = async user => {
  console.log('user: ', user)
  const userRef = doc(firestore, 'users', user.uid)
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
    await setDoc(doc(firestore, 'users', user.uid), userDocument)
  }
}

auth.signOut = async () => signOut(auth)

export default auth
