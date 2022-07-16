import { Routes, Route } from 'react-router-dom'
import Groceries from './pages/Groceries'
import Home from './pages/Home'
import Inventory from './pages/Inventory'
import routes from './routes'
import Navigation from './components/Navigation'

import './styles/App.css'
import './styles/bootstrap.css'

function App() {
  return (
    <>
      <Navigation />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path={routes.GROCERIES} element={<Groceries />} />
        <Route path={routes.INVENTORY} element={<Inventory />} />
      </Routes>
    </>
  )
}

export default App
