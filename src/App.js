import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import useFirebaseContext from './context/FirebaseContext'
import Error404 from './pages/404'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import Home from './pages/Home/Home'
import Feed from './pages/Plan/Feed'
import MealPlanDay from './pages/Plan/MealPlanDay'
import Recipe from './pages/Recipe/Recipe'
import Recipes from './pages/Recipe/Recipes'
import Search from './pages/Recipe/Search'
import SearchResults from './pages/Recipe/SearchResults'
import './styles/App.scss'

function App() {
  const { user } = useFirebaseContext()

  return (
    <>
      <Navbar />

      <Routes>
        <Route index element={<Home />} />

        <Route path='dashboard' element={<Dashboard />}>
          <Route index element={<Feed />} />

          <Route path='recipes' element={<Recipes />}>
            <Route index element={<Search />} />
            <Route path='search/:type/:term' element={<SearchResults />} />
          </Route>

          <Route path='recipe/:recipeId' element={<Recipe />} />
          <Route path='*' element={<Error404 />} />
        </Route>

        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />

        <Route path='*' element={<Error404 />} />
      </Routes>
    </>
  )
}

export default App
