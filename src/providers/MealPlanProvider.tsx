import { createContext, useState, useContext, useEffect } from 'react'
import Bookmark, { mapDocToBookmark } from 'types/Bookmark'
import { mapDocToScheduledMeal, ScheduledMeal } from 'types/ScheduledMeal'
import IUser from 'types/User'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { firestore as db } from 'api/firebase'
import { IMeasuredIngredient, Recipe } from 'types/Recipe'

export interface IMealPlanContext {
	scheduledMeals: ScheduledMeal[]
	setScheduledMeals: (scheduledMeals: ScheduledMeal[]) => void
	groceryList: IGroceryListItem[]
	setGroceryList: (groceryList: IGroceryListItem[]) => void
	bookmarks: Bookmark[]
	setBookmarks: (bookmarks: Bookmark[]) => void
}

const MealPlanContext = createContext({} as IMealPlanContext)

interface IPlanProviderProps {
	children: React.ReactNode
	user: IUser | null
}

export interface IGroceryListItemData
	extends Pick<IMeasuredIngredient, 'measure' | 'recipeId' | 'recipeName'> {
	recipeCount: number
}

export interface IGroceryListItem {
	itemName: string
	itemData: IGroceryListItemData[]
}

export const MealPlanProvider = ({ children, user }: IPlanProviderProps) => {
	const [scheduledMeals, setScheduledMeals] = useState<ScheduledMeal[]>([])
	const [groceryList, setGroceryList] = useState<IGroceryListItem[]>([])
	const [bookmarks, setBookmarks] = useState<Bookmark[]>([])

	useEffect(
		function subscribeToUsersScheduledMeals() {
			if (user) {
				const q = ScheduledMeal.queryUserScheduledMeals(user.uid)
				const unsubscribe = onSnapshot(q, querySnapshot =>
					setScheduledMeals(querySnapshot.docs.map(mapDocToScheduledMeal))
				)
				return () => unsubscribe()
			}
		},
		[user]
	)

	useEffect(
		function subscribeToUsersBookmarks() {
			if (user) {
				const q = query(collection(db, 'bookmarks'), where('userId', '==', user?.uid))
				const unsubscribe = onSnapshot(q, querySnapshot =>
					setBookmarks(querySnapshot.docs.map(mapDocToBookmark))
				)
				return () => unsubscribe()
			}
		},
		[user]
	)

	return user ? (
		<MealPlanContext.Provider
			value={{
				scheduledMeals,
				setScheduledMeals,
				groceryList,
				setGroceryList,
				bookmarks,
				setBookmarks
			}}>
			{children}
		</MealPlanContext.Provider>
	) : (
		<>{children}</>
	)
}

export const useScheduleMeals = () => {
	const { scheduledMeals } = useContext(MealPlanContext)
	return scheduledMeals
}

export const useGroceryList = (): [
	IGroceryListItem[],
	(meals?: ScheduledMeal[]) => Promise<void>
] => {
	const { groceryList, setGroceryList, scheduledMeals } = useContext(MealPlanContext)

	const createGroceryList = async (meals: ScheduledMeal[]): Promise<IGroceryListItem[]> => {
		const uniqueRecipeIds = [...new Set(meals.map(meal => meal.recipeId))]
		const recipes = await Promise.all(uniqueRecipeIds.map(id => Recipe.findRecipeById(id)))
		const ingredients = recipes.map(recipe => recipe.ingredients).flat(1)
		const groceryListItems = ingredients.reduce((acc: IGroceryListItem[], ingredient) => {
			const { measure, recipeId, ingredientName, recipeName } = ingredient
			const item = acc.find(item => item.itemName === ingredientName)
			const recipeCount = meals.filter(meal => meal.recipeId === recipeId).length
			if (item) {
				item.itemData.push({
					measure,
					recipeId,
					recipeCount,
					recipeName
				})
			} else {
				acc.push({
					itemName: ingredientName,
					itemData: [
						{
							measure,
							recipeId,
							recipeCount,
							recipeName
						}
					]
				})
			}
			return acc
		}, [])
		groceryListItems.sort((a, b) => a.itemName.localeCompare(b.itemName))
		return groceryListItems
	}

	const setGroceryListItems = async (meals?: ScheduledMeal[]) => {
		const groceryListItems = await createGroceryList(meals || scheduledMeals)
		setGroceryList(groceryListItems)
	}

	return [groceryList, setGroceryListItems]
}

export const useBookmarks = () => {
	const { bookmarks } = useContext(MealPlanContext)
	const findBookmark = (recipeId: string) => bookmarks.find(b => b.recipeId === recipeId)
	return { bookmarks, findBookmark }
}
