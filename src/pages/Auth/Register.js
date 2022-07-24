import { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { Link, Navigate } from 'react-router-dom'
import GoogleSignInButton from '../../components/GoogleSignInButton'
import LineSplitWord from '../../components/LineSplitWord'
import useFirebaseContext from '../../context/FirebaseContext'
import { APP_NAME } from '../../settings'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { auth } = useFirebaseContext()

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth)

  const validate = () => {
    // TODO: Validate
    console.log('validate')
  }

  const handleRegisterEmail = () => {
    console.log({ email, password })
    createUserWithEmailAndPassword(email, password)
  }

  if (loading) {
    console.warn('sign in loading', loading)
  }

  if (error) {
    console.error('sign in error', error)
  }

  if (user) return <Navigate to='/' replace />

  return (
    <Container
      fluid
      className='bg-secondary d-flex justify-content-center align-items-center h-100'>
      <Card style={{ width: '27rem', maxWidth: '100%' }} className='shadow p-2'>
        <Card.Body>
          <Card.Title className='text-center font-display'>
            <i className='fa-regular fa-hat-chef fa-2x mb-2' />
            <h4>Create a {APP_NAME} account</h4>
          </Card.Title>

          <p className='text-center text-muted mb-4'>
            Already registered? <Link to={'/login'}>Sign in</Link>
          </p>

          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Control
              type='email'
              placeholder='Email'
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
            <Form.Text className='text-muted'>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-4' controlId='formBasicPassword'>
            <Form.Control
              type='password'
              placeholder='Password'
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
          </Form.Group>
          <Button
            variant='primary'
            className='w-100 mb-2'
            onClick={handleRegisterEmail}>
            Sign Up
          </Button>
          <LineSplitWord>or</LineSplitWord>
          <GoogleSignInButton />
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Register
