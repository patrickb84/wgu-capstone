import { Badge, Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const RecipeCard = ({
  idMeal,
  strMealThumb,
  strMeal,
  strArea,
  strCategory
}) => {
  return (
    <Col md={4}>
      <Link to={`/dashboard/recipe/${idMeal}`}>
        <Card className='mb-4'>
          <Card.Img variant='top' src={strMealThumb} />
          <Card.Body>
            <Card.Text>{strMeal}</Card.Text>
            <Badge bg='tertiary' className='me-1'>
              {strArea}
            </Badge>
            <Badge bg='secondary'>{strCategory}</Badge>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  )
}

export default RecipeCard
