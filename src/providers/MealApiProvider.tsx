import mealdb from 'api/mealdb'
import { ApiCategory } from 'api/mealdb/types/ApiCategory'
import { ApiIngredient } from 'api/mealdb/types/ApiIngredient'
import { createContext, useContext } from 'react'
import { useEffect, useState } from 'react'

interface IMealApiContextState {
	categories: ApiCategory[]
	ingredients: ApiIngredient[]
	areas: string[]
}

export const MealApiContext = createContext({} as IMealApiContextState)

interface MealApiProviderProps {
	children: React.ReactNode
}

export const MealApiProvider = ({ children }: MealApiProviderProps) => {
	const [categories, setCategories] = useState([])
	const [areas, setAreas] = useState([])
	const [ingredients, setIngredients] = useState([])

	useEffect(() => {
		mealdb.fetchAreas().then(setAreas)
		mealdb.fetchIngredients().then(setIngredients)
		mealdb.fetchCategories().then(setCategories)
	}, [])

	const context: IMealApiContextState = {
		categories,
		areas,
		ingredients
	}

	return <MealApiContext.Provider value={context}>{children}</MealApiContext.Provider>
}

export const useMealApi = () => useContext(MealApiContext)
