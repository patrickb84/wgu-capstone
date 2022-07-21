import { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import useFirebaseContext from '../context/FirebaseContext'
import { Link, Navigate } from 'react-router-dom'
import routes from '../routes'
import { CONST_APP_NAME } from '../constants'
import { useNavigate } from 'react-router-dom'

const Login = ({ user }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { auth } = useFirebaseContext()

  const [signInWithEmailAndPassword, __user, loading, error] =
    useSignInWithEmailAndPassword(auth)

  let navigate = useNavigate()

  // const validate = () => {
  //   // TODO: Validate
  //   console.log('validate')
  // }

  const handleSignIn = async () => {
    await signInWithEmailAndPassword(email, password)
  }

  if (loading) {
    console.warn('sign in loading', loading)
  }
  if (error) {
    console.error('sign in error', error)
  }

  const handleGoogleSignIn = () => {
    console.log('handle google sign in')
  }

  if (!user)
    return (
      <Container
        fluid
        className='bg-secondary d-flex justify-content-center align-items-center h-100'>
        <Card
          style={{ width: '30rem', maxWidth: '100%' }}
          className='shadow p-2'>
          <Card.Body>
            <Card.Title className='text-center'>
              <h3>{CONST_APP_NAME}</h3>
            </Card.Title>

            <p className='text-center text-muted mb-4'>
              New to {CONST_APP_NAME}?{' '}
              <Link to={routes.REGISTER}>Sign up now</Link>
            </p>

            <Form.Group className='mb-4' controlId='formBasicEmail'>
              <Form.Control
                type='email'
                placeholder='Email'
                onChange={e => setEmail(e.target.value)}
                value={email}
              />
            </Form.Group>

            <Form.Group className='mb-4' controlId='formBasicPassword'>
              <Form.Control
                type='password'
                placeholder='Password'
                onChange={e => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>
            <div className='mb-4'>
              <Link to={routes.HOME}>Forgot password?</Link>
            </div>

            <Button variant='primary' size='block' onClick={handleSignIn}>
              Sign In
            </Button>

            <Button variant='danger' size='block' onClick={handleGoogleSignIn}>
              Sign in with Google
            </Button>
          </Card.Body>
        </Card>
      </Container>
    )
  return <Navigate to={routes.DASHBOARD} />
}

export default Login
