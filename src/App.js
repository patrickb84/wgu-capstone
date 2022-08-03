import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  Timestamp,
  where,
} from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import MealDB from './api/meal.db'
import Navbar from './components/Navbar'
import useFirebaseContext from './context/FirebaseContext'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import './styles/App.scss'

function App() {
  const { user, db } = useFirebaseContext()
  const [recipes, setRecipes] = useState([])
  const [userRecipes, setUserRecipes] = useState([])

  // const [value, loading, error] = useCollection(collection(db, 'userRecipes'))

  useEffect(() => {
    if (user) {
      MealDB.lookup.fetchRandomMeals10().then(data => {
        if (data.meals) setRecipes(data.meals)
      })
    }
  }, [user])

  const fetchUserRecipes = async () => {
    console.log('🕐 fetching...')
    const userRecipesRef = collection(db, 'userRecipes')
    const q = query(userRecipesRef, where('idUser', '==', user.uid))
    const querySnapshot = await getDocs(q)
    const res = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    const userRecipesPromise = res.map(async ({ id, idMeal }) => {
      const recipe = await MealDB.lookup.fetchMealDetails(idMeal)
      return { id, recipe }
    })
    const userRecipes = await Promise.all(userRecipesPromise)
    setUserRecipes(userRecipes)
    console.log('🔔 done!')
  }

  const cbFetchUserRecipes = useCallback(fetchUserRecipes, [db, user])

  useEffect(() => {
    if (user && db) cbFetchUserRecipes()
  }, [db, cbFetchUserRecipes, user])

  const addRecipeToPlan = async idMeal => {
    console.log('🕐 adding...')
    const { uid } = user
    try {
      await addDoc(collection(db, 'userRecipes'), {
        idUser: uid,
        idMeal,
        dateCreated: Timestamp.now(),
      })
      cbFetchUserRecipes()
    } catch (error) {
      console.error(error)
    }
  }

  const removeRecipeFromPlan = async userRecipeId => {
    console.log('🕐 removing...')
    try {
      await deleteDoc(doc(db, 'userRecipes', userRecipeId))
      cbFetchUserRecipes()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path='/'
          element={
            <div className='mt-5 pt-3 container'>
              <h1>Root of app</h1>
              <p>user: {user ? user.email : 'none'}</p>

              <div className='row'>
                <div className='col-6'>
                  <div className='bg-light p-4 mb-5'>
                    <h2 className='text-center font-display mb-5'>Random 10</h2>

                    {recipes.map(recipe => {
                      return (
                        <div key={recipe.idMeal} className='mb-4 d-flex'>
                          <div className='d-flex me-4'>
                            <button
                              disabled={!user}
                              onClick={() => addRecipeToPlan(recipe.idMeal)}
                              className='btn btn-primary btn-sm me-4'>
                              Add
                            </button>
                          </div>
                          <div>{recipe.strMeal}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className='col-6'>
                  <div className='bg-light p-4'>
                    <h2 className='text-center font-display mb-5'>
                      Added to user
                    </h2>

                    {userRecipes.map(({ id, recipe }) => {
                      return (
                        <div key={id} className='mb-4 d-flex'>
                          <div className='d-flex me-4'>
                            <button
                              disabled={!user}
                              onClick={() => removeRecipeFromPlan(id)}
                              className='btn btn-dark btn-sm'>
                              Remove
                            </button>
                          </div>
                          <div>{recipe.strMeal}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          }
        />

        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        {/* <Route index element={<Home />} />

        <Route path='dashboard' element={<Dashboard />}>
          <Route index element={<Feed />} />

          <Route path='recipes' element={<Recipes />}>
            <Route index element={<Search />} />
            <Route path='search/:type/:term' element={<SearchResults />} />
          </Route>

          <Route path='recipe/:recipeId' element={<Recipe />} />
          <Route path='*' element={<Error404 />} />
        </Route>

        <Route path='*' element={<Error404 />} /> */}
      </Routes>
    </>
  )
}

export default App
