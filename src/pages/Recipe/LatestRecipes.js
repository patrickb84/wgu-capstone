import { useEffect, useState } from 'react'
import { Badge, Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MealDB from '../../api/meal.db'
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
          return (
            <Col md={4} key={index}>
              <Link to={`/dashboard/recipe/${recipe.idMeal}`}>
                <Card key={index} className='mb-4'>
                  <Card.Img variant='top' src={recipe.strMealThumb} />
                  <Card.Body>
                    <Card.Text>{recipe.strMeal}</Card.Text>
                    <Badge bg='tertiary' className='me-1'>
                      {recipe.strArea}
                    </Badge>
                    <Badge bg='secondary'>{recipe.strCategory}</Badge>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default LatestRecipes
