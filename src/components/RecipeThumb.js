import { Badge, Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const RecipeThumb = ({ recipe }) => {
  const { idMeal, strMealThumb, strMeal } = recipe
  return (
    <Col md={4}>
      <Link to={`/dashboard/recipe/${idMeal}`}>
        <Card className='mb-4'>
          <Card.Img variant='top' src={strMealThumb} />
          <Card.Body>
            <Card.Text>{strMeal}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  )
}

export default RecipeThumb
