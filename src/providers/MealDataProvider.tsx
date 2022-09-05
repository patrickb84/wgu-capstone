import mealdb from 'api/mealdb'
import { ApiCategory } from 'api/mealdb/types/ApiCategory'
import { ApiIngredient } from 'api/mealdb/types/ApiIngredient'
import { createContext, useContext } from 'react'
import { useEffect, useState } from 'react'

interface IMealDataContextState {
	categories: ApiCategory[]
	ingredients: ApiIngredient[]
	areas: string[]
}

export const MealDataContext = createContext({} as IMealDataContextState)

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

	return (
		<MealDataContext.Provider
			value={{
				categories,
				areas,
				ingredients
			}}>
			{children}
		</MealDataContext.Provider>
	)
}

export const useMealData = () => useContext(MealDataContext)
