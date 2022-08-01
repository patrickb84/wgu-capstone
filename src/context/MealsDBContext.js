import { createContext, useContext, useEffect, useState } from 'react'
import MealDB from '../api/meal.db'

const MealDBContext = createContext(null)

export const MealDBProvider = ({ children }) => {
  const [comboBoxValues, setComboBoxValues] = useState([])

  const fetchIngredients = async () => {
    const data = await MealDB.list.fetchIngredients()
    console.log(data)
    return data.ingredients
  }

  const fetchCategories = async () => {
    const data = await MealDB.list.fetchCategories()
    console.log(data)
    return data.categories
  }

  const fetchAreas = async () => {
    const data = await MealDB.list.fetchAreas()
    console.log(data)
    return data.meals
  }

  useEffect(() => {
    fetchAreas().then(data => {
      const values = data.meals.map(area => ({
        type: 'area',
        value: area.strArea,
      }))
      setComboBoxValues([...comboBoxValues, ...values])
    })
    fetchCategories().then(data => {
      console.log(data)
      const values = data.meals.map(category => ({
        type: 'category',
        value: category.strCategory,
      }))
      setComboBoxValues([...comboBoxValues, ...values])
    })
  }, [comboBoxValues])

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
