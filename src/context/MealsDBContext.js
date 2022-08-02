import { createContext, useContext, useEffect, useState } from 'react'
import MealDB from '../api/meal.db'

const MealDBContext = createContext(null)

export const MealDBProvider = ({ children }) => {
  const fetchIngredients = async () => {
    const data = await MealDB.list.fetchIngredients()
    console.log(data)
    return data.ingredients
  }

  const fetchCategories = async () => {
    const data = await MealDB.list.fetchCategories()
    const categories = data.meals
    return categories
  }

  const fetchAreas = async () => {
    const data = await MealDB.list.fetchAreas()
    const areas = data.meals
    console.log(areas)
    return areas
  }

  return (
    <MealDBContext.Provider
      value={{
        fetchIngredients,
        fetchCategories,
        fetchAreas,
      }}>
      {children}
    </MealDBContext.Provider>
  )
}

const useMealDB = () => useContext(MealDBContext)

export default useMealDB
