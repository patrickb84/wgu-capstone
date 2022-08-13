import { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import Layout from '../../components/Layout'
import SecondaryNavigation from '../../components/SecondaryNavigation/SecondaryNavigation'
import useFirebaseContext from '../../context/FirebaseContext'

const Dashboard = () => {
  const { user } = useFirebaseContext()
  const location = useLocation()

  if (!user) return <Navigate to='/' state={{ from: location.pathname }} />

  return (
    <div className='bg-gray-100'>
      <Container>
        <Row>
          <Col sm={3}>
            <div className='pt-6' style={{ position: 'sticky', top: 0 }}>
              <SecondaryNavigation />
            </div>
          </Col>
          <Col>
            <Layout>
              <Outlet />
            </Layout>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Dashboard
