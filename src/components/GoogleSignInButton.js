import { Button } from 'react-bootstrap'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { Navigate } from 'react-router-dom'
import useFirebaseContext from '../context/FirebaseContext'

const GoogleSignInButton = ({ children }) => {
  const { auth } = useFirebaseContext()
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)

  if (user) return <Navigate to='/' replace />

  return (
    <Button
      variant='secondary'
      className='w-100'
      style={{ backgroundColor: '#DB4437', borderColor: '#DB4437' }}
      onClick={() => signInWithGoogle()}>
      <i className='fa-brands fa-google' />
    </Button>
  )
}

export default GoogleSignInButton
