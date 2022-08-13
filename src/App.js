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
import { Badge, Button, Card, Col, Row, Table } from 'react-bootstrap'
import { useParams, Link, Route, Routes } from 'react-router-dom'
import MealDB from './api/meal_db'
import Navbar from './components/Navbar'
import useFirebaseContext from './context/FirebaseContext'
import Login from './pages/Login'
import Register from './pages/Register'
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
          {
            to: '/ingredients',
            name: 'Ingredients',
          },
        ]}
      />

      <Routes>
        <Route
          path='plan'
          element={
            <MyPlan
              {...{ fetchUserRecipes, removeRecipeFromPlan, userRecipes, user }}
            />
          }
        />
        <Route
          path='/'
          element={
            <div className='mt-5 pt-3 container'>
              <h1>Root of app</h1>
              <p>user: {user ? user.email : 'none'}</p>

              <div className='row'>
                <div className='col-6' />
                <div className='col-6' />
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

        <Route path='recipe/:mealId' element={<RecipePage />} />

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
    if (strCategory) {
      tags.push(tags.push({ bg: 'gray-500', label: strCategory }))
    }
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
        <Link
          to={`/recipe/${idMeal}`}
          className='w-100 btn btn-sm mb-3 btn-tertiary'>
          View Details
        </Link>
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

const RecipePage = () => {
  const params = useParams()
  console.log(params)
  const [mealDetails, setMealDetails] = useState(null)
  const [ingredients, setIngredients] = useState([])
  const { mealId } = params

  useEffect(() => {
    const getDetails = async () => {
      const mealDetails = await MealDB.lookup.fetchMealDetails(params.mealId)
      console.log('🚀 ~ getDetails ~ mealDetails', mealDetails)
      setMealDetails(mealDetails)
    }
    getDetails()
  }, [params.mealId])

  useEffect(() => {
    if (mealDetails) {
      getMealIngredients(mealId).then(ingredients => {
        setIngredients(ingredients)
        console.log('🚀 ~ useEffect ~ ingredients', ingredients)
      })
    }
  }, [mealDetails, mealId])

  return !mealDetails ? (
    <LoadingScreen />
  ) : (
    <div className='container pt-3 mt-5'>
      <h1 className='font-display'>{mealDetails.strMeal}</h1>
      <IngredientsTable ingredients={ingredients} />
    </div>
  )
}

const IngredientsTable = ({ ingredients }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Ingredient</th>
          <th>Measure</th>
        </tr>
      </thead>
      <tbody>
        {ingredients.map((ing, index) => (
          <tr key={index}>
            <td>{ing.ingredient}</td>
            <td>{ing.measure}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

const getMealIngredients = async mealId => {
  const mealDetails = await MealDB.lookup.fetchMealDetails(mealId)

  if (mealDetails) {
    const ingredients = []
    for (let i = 1; i <= 20; i++) {
      const f1 = `strIngredient${i}`
      const f2 = `strMeasure${i}`
      if (mealDetails[f1]) {
        ingredients.push({
          ingredient: mealDetails[f1],
          measure: mealDetails[f2],
        })
      }
    }
    // console.log('🚀 ~ useEffect ~ ingredients', ingredients)
    return ingredients
  }
}

const GetMealsIngredients = async mealIds => {
  const m = mealIds.map(id => getMealIngredients(id))
  console.log('🚀 ~ GetMealsIngredients ~ m', m)
  const k = Promise.all(m)
  console.log('🚀 ~ GetMealsIngredients ~ k', k)
  return k
}

const LoadingScreen = () => {
  return (
    <div className='container pt-3 mt-5'>
      <h1 className='font-display'>LOADING</h1>
    </div>
  )
}

const MyPlan = ({ userRecipes, removeRecipeFromPlan, user }) => {
  const [allIngredients, setAllIngredients] = useState([])
  useEffect(() => {
    const mealIds = userRecipes.map(ur => ur.recipe.idMeal)
    const go = async () => {
      const all = await GetMealsIngredients(mealIds)
      console.log('🚀 ~ go ~ all', all)

      const arra = []
      all.forEach(f => f.forEach(ff => arra.push(ff)))
      arra.sort((a, b) => a.ingredient.localeCompare(b.ingredient))
      setAllIngredients(arra.sort())
    }
    go()
  }, [userRecipes])

  return (
    <div className='mt-5 pt-3 container'>
      <h1 className='font-display'>Plan</h1>
      <div className='row pt-5'>
        <div className='col-md-6'>
          <div className='bg-light p-4'>
            <h2 className='text-center font-display mb-5'>Added to user</h2>

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
        <div className='col-md-6'>
          <div className='p-4'>
            <h2 className='font-display'>Ingredients...</h2>
            <IngredientsTable ingredients={allIngredients} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default App
