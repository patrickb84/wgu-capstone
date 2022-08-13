import { useEffect, useState } from 'react'
import AutocompleteSearchbox from '../../components/AutocompleteSearchbox'
import useMealDB from '../../context/MealsDBContext'
import Area from '../../models/AreaModel'
import Category from '../../models/CategoryModel'
import Ingredient from '../../models/IngredientModel'

const Search = () => {
  const { fetchCategories, fetchAreas, fetchIngredients } = useMealDB()
  const [SearchItems, setSearchItems] = useState([])

  useEffect(() => {
    const fetchSearchData = async () => {
      const categories = await fetchCategories()
      const categoryValues = categories.map(category => new Category(category))

      const areas = await fetchAreas()
      const areaValues = areas.map(area => new Area(area))

      const ingredients = await fetchIngredients()
      const ingredientValues = ingredients.map(
        ingredient => new Ingredient(ingredient)
      )

      const SearchItems = [
        ...categoryValues,
        ...areaValues,
        ...ingredientValues
      ]

      console.log(SearchItems)
      setSearchItems(SearchItems)
    }

    fetchSearchData()
  }, [])

  return (
    <>
      <h1 className='font-display text-secondary'>Search Recipes</h1>

      <AutocompleteSearchbox data={SearchItems} />
    </>
  )
}

export default Search
