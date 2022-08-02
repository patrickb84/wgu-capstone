import { useEffect, useState } from 'react'
import { Badge, Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MealDB from '../../api/meal.db'
import RecipeCard from '../../components/RecipeCard'
import MealModel from '../../models/Meal.Model'

const LatestRecipes = () => {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    MealDB.list.fetchLatestMeals().then(data => {
      const recipes = data.meals.map(meal => new MealModel(meal))
      setRecipes(recipes)
    })
  }, [])

  return (
    <div>
      <h3>Latest Recipes</h3>

      <Row>
        {recipes.map((recipe, index) => {
          return <RecipeCard key={index} recipe={recipe} />
        })}
      </Row>
    </div>
  )
}

export default LatestRecipes
