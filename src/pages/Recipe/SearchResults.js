import { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { useLocation, useParams } from 'react-router-dom'
import RecipeThumb from '../../components/RecipeThumb'
import useMealDB from '../../context/MealsDBContext'

const SearchResults = () => {
  const [recipes, setRecipes] = useState([])
  const { filterByArea } = useMealDB()
  const params = useParams()
  const { type, term } = params
  console.log({ params })

  const location = useLocation()
  console.log('location: ', location)

  useEffect(() => {
    console.log(type)
    switch (type) {
      case 'area':
        filterByArea(term).then(recipes => {
          console.log(recipes)
          setRecipes(recipes)
        })
        break
      default:
        break
    }
  }, [type, term, filterByArea])

  return (
    <>
      <h1 className='font-display text-secondary mb-3'>
        Search Results{' '}
        {location.state && location.state.searchTerm
          ? location.state.searchTerm
          : ''}
      </h1>
      <Row>
        {recipes.map((recipe, index) => {
          return <RecipeThumb key={index} recipe={recipe} />
        })}
      </Row>
    </>
  )
}

export default SearchResults
