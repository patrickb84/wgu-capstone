import { Container } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import routes from '../routes'

const Dashboard = ({ user }) => {
  if (!user) return <Navigate to={routes.HOME} replace />

  return (
    <Container fluid>
      <h1>Dashboard</h1>

      {user && <p>Logged in as: {user.email}</p>}
    </Container>
  )
}

export default Dashboard
