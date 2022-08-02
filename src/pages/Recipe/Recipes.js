import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import AutocompleteSearchbox from '../../components/AutocompleteSearchbox'
import useMealDB from '../../context/MealsDBContext'
import SearchValue from '../../models/SearchValue'
import LatestRecipes from './LatestRecipes'

const Recipes = () => {
  const { fetchCategories, fetchAreas, fetchIngredients } = useMealDB()
  const [searchValues, setSearchValues] = useState([])

  useEffect(() => {
    const fetchSearchData = async () => {
      const categories = await fetchCategories()
      const categoryValues = categories.map(
        category => new SearchValue(category.strCategory, 'Category')
      )

      const areas = await fetchAreas()
      const areaValues = areas.map(
        area => new SearchValue(area.strArea, 'Location')
      )

      const ingredients = await fetchIngredients()
      const ingredientValues = ingredients.map(
        ingredient => new SearchValue(ingredient, 'Ingredient')
      )

      const searchValues = [
        ...categoryValues,
        ...areaValues,
        ...ingredientValues,
      ]
      
      console.log(searchValues)
      setSearchValues(searchValues)
    }

    fetchSearchData()
  }, [])

  return (
    <>
      <h1 className='font-display text-secondary'>Recipes</h1>

      <AutocompleteSearchbox data={searchValues} />
      {/* <LatestRecipes /> */}
      {/* <Outlet /> */}
    </>
  )
}

export default Recipes
