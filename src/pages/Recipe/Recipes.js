import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import useMealDB from '../../context/MealsDBContext'
import LatestRecipes from './LatestRecipes'

const Recipes = () => {
  const { fetchCategories, fetchAreas } = useMealDB()

  useEffect(() => {
    fetchCategories()
    fetchAreas()
  }, [fetchCategories, fetchAreas])

  return (
    <>
      <h1>Recipes</h1>

      <LatestRecipes />
      {/* <Outlet /> */}
    </>
  )
}

export default Recipes
