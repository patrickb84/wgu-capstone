import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import MealDB from '../../api/meal.db'
import MealModel from '../../models/Meal.Model'

const Recipe = () => {
  const { recipeId } = useParams()
  const [recipe, setRecipe] = useState(null)

  useEffect(() => {
    console.log(recipeId)
    MealDB.lookup.fetchMealDetails(recipeId).then(data => {
      const recipe = new MealModel(data.meals[0])
      setRecipe(recipe)
    })
  }, [recipeId])

  if (!recipe) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <>
      <Link to='/dashboard/recipes' style={{ textDecoration: 'none' }}>
        <i className='fa-regular fa-angles-left' /> Back to recipes
      </Link>
      <h1 className='mt-4'>{recipe.strMeal}</h1>

      <img src={recipe.strMealThumb} alt='' className='w-100' />

      <h2 className='mt-4'>Ingredients</h2>
      <ul>
        {recipe.ingredients &&
          recipe.ingredients.map(({ ingredient, measure }, index) => {
            return (
              <li key={index}>
                {ingredient}, {measure}
              </li>
            )
          })}
      </ul>
      <h2 className='mt-4'>Instructions</h2>
      {recipe.strInstructions.split('.').map((instruction, index) => {
        instruction = instruction.trim()
        if (!instruction) return null
        return <p key={index}>{instruction.trim()}.</p>
      })}
    </>
  )
}

export default Recipe
