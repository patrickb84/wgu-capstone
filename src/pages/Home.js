import { Container } from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import { CONST_APP_NAME } from '../constants'
import routes from '../routes'

const Home = ({ user }) => {
  return (
    <Container fluid className='h-100 w-100'>
      <h1>{CONST_APP_NAME} Home</h1>

      {!user ? (
        <div>
          <p>
            <Link to={routes.LOGIN} className='btn btn-primary'>
              Sign In
            </Link>
          </p>
          <p>
            <Link to={routes.REGISTER} className='btn btn-primary'>
              Register
            </Link>
          </p>
        </div>
      ) : (
        <div>
          <p>
            <Link to={routes.DASHBOARD} className='btn btn-primary'>
              My Dashboard
            </Link>
          </p>
        </div>
      )}
    </Container>
  )
}

export default Home
