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
import { Badge, Button, Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
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
        console.log('random recipes', data.meals)
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
      <Navbar
        links={[
          {
            to: '/plan',
            name: 'My Plan',
          },
          {
            to: '/recipes',
            name: 'Recipes',
          },
        ]}
      />

      <Routes>
        <Route
          path='/'
          element={
            <div className='mt-5 pt-3 container'>
              <h1>Root of app</h1>
              <p>user: {user ? user.email : 'none'}</p>

              <div className='row'>
                <div className='col-6'></div>
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

        <Route
          path='recipes'
          element={
            <>
              <div className='container pt-3 mt-5'>
                <h1 className='font-display'>Recipes</h1>
                <div className='bg-light p-4 mb-5'>
                  <h2 className='text-center font-display mb-5'>Random 10</h2>

                  {/* {recipes.map(recipe => {
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
                  })} */}
                  <Row>
                    {recipes.map((recipe, idx) => (
                      <Col key={idx} md={4} className='d-flex'>
                        <RecipeCard
                          recipe={recipe}
                          addRecipeToPlan={addRecipeToPlan}
                        />
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
            </>
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

const RecipeCard = ({ recipe, addRecipeToPlan }) => {
  const {
    idMeal,
    strMealThumb,
    strMeal,
    strCategory,
    strArea,
    strInstructions,
    strSource,
    strTags,
    strYoutube,
  } = recipe

  const RecipeTags = () => {
    const tags = []
    if (strArea) tags.push({ bg: 'secondary', label: strArea })
    if (strCategory)
      tags.push(tags.push({ bg: 'gray-500', label: strCategory }))
    // if (strTags)
    //   strTags
    //     .split(',')
    //     .forEach(tag => tags.push({ bg: 'gray-500', label: tag }))

    return tags.map((tag, idx) => (
      <Badge bg={tag.bg} key={idx} className='me-1'>
        {tag.label}
      </Badge>
    ))
  }

  return (
    <Card className='mb-4'>
      <Card.Img src={strMealThumb} variant='top' />
      <Card.Body>
        <Button
          className='w-100 btn-sm mb-3'
          variant='primary'
          onClick={() => addRecipeToPlan(idMeal)}>
          Select For Plan
        </Button>
        <Card.Title>{strMeal}</Card.Title>
        <RecipeTags />
        <div className='mt-1'>
          <a href={strSource}>Source</a>
          <br />
          <a href={strYoutube}>YouTube</a>
          <br />
        </div>
      </Card.Body>
    </Card>
  )
}

export default App
