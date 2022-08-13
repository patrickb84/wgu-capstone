import { createContext, useContext, useEffect, useState } from 'react'
import MealDB from '../api/meal_db'

const MealApiContext = createContext(null)

export const MealApiProvider = ({ children }) => {
  const fetchIngredients = async () => {
    const data = await MealDB.list.fetchIngredients()
    return data
  }

  const fetchCategories = async () => {
    const categories = await MealDB.list.fetchCategories()

    console.log(categories)
    return categories
  }

  const fetchAreas = async () => {
    const areas = await MealDB.list.fetchAreas()
    return areas
  }

  const filterByArea = async area => {
    const recipes = await MealDB.filter.filterByArea(area)
    return recipes
  }

  return (
    <MealApiContext.Provider
      value={{
        fetchIngredients,
        fetchCategories,
        fetchAreas,
        filterByArea
      }}
    >
      {children}
    </MealApiContext.Provider>
  )
}

const useMealDB = () => useContext(MealApiContext)

export default useMealDB
