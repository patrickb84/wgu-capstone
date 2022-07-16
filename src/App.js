import { Routes, Route } from 'react-router-dom'
import Groceries from './pages/Groceries'
import Home from './pages/Home'
import Inventory from './pages/Inventory'
import routes from './routes'
import Navigation from './components/Navigation'

import './styles/App.css'
import './styles/bootstrap.css'
import Reports from './pages/Reports'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path={routes.GROCERIES} element={<Groceries />} />
      <Route path={routes.INVENTORY} element={<Inventory />} />
      <Route path={routes.REPORTS} element={<Reports />} />
    </Routes>
  )
}

export default App
