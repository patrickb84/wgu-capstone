import mealdb from 'api/mealdb'
import { ApiArea } from 'types/ApiArea'
import { ApiCategory } from 'types/ApiCategory'
import { ApiIngredient } from 'types/ApiIngredient'
import ApiRecipe from 'types/ApiRecipe'
import { ISearchItem } from 'components/Searchbox'
import { createContext, useContext } from 'react'
import { useEffect, useState } from 'react'
import ROUTES from 'routes/routes'

interface IRecipeData {
	categories: ApiCategory[]
	ingredients: ApiIngredient[]
	areas: ApiArea[]
	recipeIndex: RecipeIndex[]
	searchData: ISearchItem[]
}

type RecipeIndex = { id: string; recipeName: string }

export const RecipeDataContext = createContext({} as IRecipeData)

interface IProviderProps {
	children: React.ReactNode
}

export const RecipeDataProvider = ({ children }: IProviderProps) => {
	const [categories, setCategories] = useState<ApiCategory[] | []>([])
	const [areas, setAreas] = useState<ApiArea[] | []>([])
	const [ingredients, setIngredients] = useState<ApiIngredient[] | []>([])
	const [recipeIndex, setRecipeIndex] = useState<RecipeIndex[] | []>([])
	const [searchData, setSearchData] = useState<ISearchItem[]>([])

	useEffect(() => {
		const data: ISearchItem[] = []
		recipeIndex.forEach(recipe => {
			data.push({
				text: recipe.recipeName,
				type: 'Recipe',
				url: ROUTES.TO_RECIPE(recipe.id),
				id: recipe.id
			})
		})
		areas.forEach(area => {
			data.push({
				text: area.strArea || '',
				type: 'Area',
				id: area.strArea?.toLowerCase().split(' ').join('_') || '',
				url: ROUTES.TO_RECIPE_TYPE_VIEW('area', area.strArea?.toLowerCase().split(' ').join('_') || '', area.strArea || '')
			})
		})
		categories.forEach(category => {
			data.push({
				text: category.strCategory || '',
				type: 'Category',
				id: category.strCategory?.toLowerCase().split(' ').join('_') || '',
				url: ROUTES.TO_RECIPE_TYPE_VIEW('category', category.strCategory?.toLowerCase().split(' ').join('_') || '', category.strCategory || '')
			})
		})
		ingredients.forEach(ingredient => {
			data.push({
				text: ingredient.strIngredient || '',
				type: 'Ingredient',
				id: ingredient.strIngredient?.toLowerCase().split(' ').join('_') || '',
				url: ROUTES.TO_RECIPE_TYPE_VIEW('ingredient', ingredient.strIngredient?.toLowerCase().split(' ').join('_') || '', ingredient.strIngredient || '')
			})
		})
		
		data.sort((a, b) => {
			if (a.text < b.text) {
				return -1
			}
			if (a.text > b.text) {
				return 1
			}
			return 0
		})
		setSearchData(data)
	}, [categories, ingredients, areas, recipeIndex])

	useEffect(() => {
		mealdb.fetchAreas().then(setAreas)
		mealdb.fetchIngredients().then(setIngredients)
		mealdb.fetchCategories().then(setCategories)
		mealdb.fetchAllRecipes().then(recipes => {
			const recipeIndex = recipes.map((recipe: ApiRecipe) => ({
				id: recipe.idMeal,
				recipeName: recipe.strMeal
			}))
			setRecipeIndex(recipeIndex)
		})
	}, [])

	return (
		<RecipeDataContext.Provider
			value={{
				categories,
				areas,
				ingredients,
				recipeIndex,
				searchData
			}}>
			{children}
		</RecipeDataContext.Provider>
	)
}

export const useRecipeData = () => useContext(RecipeDataContext)
export const useSearchData = () => useContext(RecipeDataContext).searchData