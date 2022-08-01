import { Container } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { Link, Navigate } from 'react-router-dom'
import useFirebaseContext from '../../context/FirebaseContext'

const Home = () => {
  const { user } = useFirebaseContext()
  const location = useLocation()
  console.warn(location)

  if (user)
    return (
      <Navigate
        to={
          location.state && location.state.from
            ? location.state.from
            : '/dashboard'
        }
      />
    )

  return (
    <section className='bg-light pt-5'>
      <Container>
        <div
          style={{
            height: '35rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <h1 className='font-display text-primary display-4 mb-4'>
            Welcome to Sous Chef, try us out
          </h1>
          <div className='pt-5'>
            <Link to='/register' className='btn btn-primary btn-lg px-5'>
              Sign Up
            </Link>
            <Link
              to='/login'
              className='ms-3 btn btn-outline-secondary btn-lg px-5'>
              Sign In
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Home
