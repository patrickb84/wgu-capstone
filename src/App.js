import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import useFirebaseContext from './context/FirebaseContext'
import Error404 from './pages/404'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Home from './pages/Home/Home'
import Feed from './pages/Plan/Feed'
import MealPlanDay from './pages/Plan/MealPlanDay'
import './styles/App.scss'

function App() {
  const { user } = useFirebaseContext()

  return (
    <>
      <Navbar />

      <Routes>
        {!user ? (
          <>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </>
        ) : (
          <>
            <Route index element={<Feed />} />
            <Route path='day/:id' element={<MealPlanDay />} />
          </>
        )}

        <Route path='*' element={<Error404 />} />
      </Routes>
    </>
  )
}

export default App
