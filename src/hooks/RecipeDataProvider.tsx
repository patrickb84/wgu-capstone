import mealdb from 'api/mealdb'
import { ApiCategory } from 'api/mealdb/types/ApiCategory'
import { ApiIngredient } from 'api/mealdb/types/ApiIngredient'
import { createContext, useContext } from 'react'
import { useEffect, useState } from 'react'

interface IRecipeData {
	categories: ApiCategory[]
	ingredients: ApiIngredient[]
	areas: string[]
}

export const RecipeDataContext = createContext({} as IRecipeData)

interface IProviderProps {
	children: React.ReactNode
}

export const RecipeDataProvider = ({ children }: IProviderProps) => {
	const [categories, setCategories] = useState([])
	const [areas, setAreas] = useState([])
	const [ingredients, setIngredients] = useState([])

	useEffect(() => {
		mealdb.fetchAreas().then(setAreas)
		mealdb.fetchIngredients().then(setIngredients)
		mealdb.fetchCategories().then(setCategories)
	}, [])

	return (
		<RecipeDataContext.Provider
			value={{
				categories,
				areas,
				ingredients
			}}>
			{children}
		</RecipeDataContext.Provider>
	)
}

export const useRecipeData = () => useContext(RecipeDataContext)
