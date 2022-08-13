import { useEffect, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import GoogleSignInButton from '../components/GoogleSignInButton'
import LineSplitWord from '../components/LineSplitWord'
import useFirebaseContext from '../context/FirebaseContext'
import { APP_NAME } from '../settings'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const { auth, user } = useFirebaseContext()

  const [createUserWithEmailAndPassword, _user, loading, error] =
    useCreateUserWithEmailAndPassword(auth)

  useEffect(() => {
    console.log('user', user)
    if (user) navigate('/', { replace: true })
  }, [user, navigate])

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

  if (user || _user) {
    console.log('user....', user)
    return <Navigate to="/" replace />
  }

  return (
    <Container
      fluid
      className="bg-secondary d-flex justify-content-center align-items-center h-100"
    >
      <Card style={{ width: '27rem', maxWidth: '100%' }} className="shadow p-2">
        <Card.Body>
          <Card.Title className="text-center font-display text-primary py-2">
            <i className="fa-solid fa-hat-chef fa-2x mb-2" />
            <h3>Create an account</h3>
          </Card.Title>
          <p className="text-muted text-center mb-4">
            Already registered? <Link to="/login">Sign in</Link>
          </p>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
              value={email}
              className="bg-gray-200"
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
              value={password}
              className="bg-gray-200"
            />
          </Form.Group>
          <Button
            variant="secondary"
            className="w-100 mb-2"
            onClick={handleRegisterEmail}
          >
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
