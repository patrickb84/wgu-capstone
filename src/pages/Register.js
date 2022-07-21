import { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import useFirebaseContext from '../context/FirebaseContext'
import { CONST_APP_NAME } from '../constants'
import { Link } from 'react-router-dom'
import routes from '../routes'

const Register = () => {
  /**
   * in form:
   *
   * [] get email
   * [] get password
   * [] or login with gmail
   * [] validate
   * [] validation handling
   */
  const { auth } = useFirebaseContext()
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const validate = () => {
    // TODO: Validate
    console.log('validate')
  }

  const handleRegisterEmail = () => {
    console.log({ email, password })
    createUserWithEmailAndPassword(email, password)
  }

  if (loading) {
    console.warn('sign up loading', loading)
  }
  if (error) {
    console.error('sign up error', error)
  }
  if (user) {
    console.log('sign up -- user', user)
  }

  const handleRegisterGoogle = () => {
    console.log('handle google sign up')
  }

  return (
    <Container
      fluid
      className='bg-secondary d-flex justify-content-center align-items-center h-100'>
      <Card style={{ width: '30rem', maxWidth: '100%' }} className='shadow p-2'>
        <Card.Body>
          <Card.Title className='text-center'>
            <h4>Create a {CONST_APP_NAME} account</h4>
          </Card.Title>

          <p className='text-center text-muted mb-4'>
            Already registered? <Link to={routes.REGISTER}>Sign in</Link>
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
          <Button variant='primary' size='block' onClick={handleRegisterEmail}>
            Sign Up
          </Button>
          <Button variant='danger' size='block' onClick={handleRegisterGoogle}>
            Sign up with Google
          </Button>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Register
