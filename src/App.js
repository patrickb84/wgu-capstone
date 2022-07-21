import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import routes from './routes'
import Dashboard from './pages/Dashboard'

import './styles/App.css'
import './styles/bootstrap.css'
import useFirebaseContext from './context/FirebaseContext'
import { useAuthState } from 'react-firebase-hooks/auth'
import Navigation from './components/Navigation'

// https://www.robinwieruch.de/react-router-private-routes/
// PROTECTED ROUTES

function App() {
  const { auth } = useFirebaseContext()
  const [user, loading, error] = useAuthState(auth)

  return (
    <>
      <Navigation user={user} />

      <main id='layout'>
        <Routes>
          <Route index element={<Home user={user} />} />
          <Route path={routes.LOGIN} element={<Login user={user} />} />
          <Route path={routes.REGISTER} element={<Register user={user} />} />
          <Route path={routes.DASHBOARD} element={<Dashboard user={user} />} />
        </Routes>
      </main>
    </>
  )
}

export default App
