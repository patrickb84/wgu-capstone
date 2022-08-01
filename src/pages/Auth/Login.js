import { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { Link, Navigate } from 'react-router-dom'
import GoogleSignInButton from '../../components/GoogleSignInButton'
import LineSplitWord from '../../components/LineSplitWord'
import useFirebaseContext from '../../context/FirebaseContext'
import { APP_NAME } from '../../settings'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { auth, user } = useFirebaseContext()

  const [signInWithEmailAndPassword, _user, loading, error] =
    useSignInWithEmailAndPassword(auth)

  const handleSignIn = async () => {
    await signInWithEmailAndPassword(email, password)
  }

  if (loading) {
    console.warn('sign in loading', loading)
  }

  if (error) {
    console.error('sign in error', error)
  }

  if (user) {
    console.log('user....', user)
    return <Navigate to='/' replace />
  }

  return (
    <Container
      fluid
      className='bg-secondary d-flex justify-content-center align-items-center h-100'>
      <Card style={{ width: '27rem', maxWidth: '100%' }} className='shadow p-2'>
        <Card.Body>
          <Card.Title className='text-center font-display text-primary py-2'>
            <i className='fa-solid fa-hat-chef fa-2x mb-2' />
            <h3>Sign In</h3>
          </Card.Title>

          <p className='text-center text-muted mb-4 py-1'>
            New to {APP_NAME}? <Link to={'/register'}>Sign up now</Link>
          </p>

          <Form.Group className='mb-4' controlId='email'>
            <Form.Control
              type='email'
              placeholder='Email'
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
          </Form.Group>

          <Form.Group className='mb-4' controlId='password'>
            <Form.Control
              type='password'
              placeholder='Password'
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
          </Form.Group>
          <div className='mb-4'>
            <Link to={'/recover'}>Forgot password?</Link>
          </div>

          <Button
            variant='secondary'
            className='w-100 mb-2'
            onClick={handleSignIn}>
            Sign In
          </Button>
          <LineSplitWord>or</LineSplitWord>
          <GoogleSignInButton />
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Login
