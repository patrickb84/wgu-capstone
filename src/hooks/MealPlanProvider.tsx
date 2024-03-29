import { firestore } from 'api/firebase/app'
import { isBefore } from 'date-fns'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { GroceryItem } from 'pages/GroceryList/GroceryList.Table'
import MealPlan from 'types/MealPlan'
import ScheduledMeal from 'types/ScheduledMeal'
import { createContext, useState, useContext, useEffect } from 'react'
import { UserRecipe } from 'types/UserRecipe'
import { convertTimestamp } from 'utils/time.utils'
import { useRecipeData } from './RecipeDataProvider'
import { useUser } from './UserProvider'

export interface IMealPlanContext {
	userPlans: MealPlan[]
	userRecipes: UserRecipe[]
	activatePlan: (planId: string) => Promise<void>
	activePlan: MealPlan | null
	setActivePlan: (plan: MealPlan | null) => void
	groceryItems: GroceryItem[]
	setGroceryItems: (items: GroceryItem[]) => void
	includedItems: string[]
	setIncludedItems: (items: string[]) => void
	parseMealPlanScheduleAndRecipes: () => Promise<any>
}

export interface IUserData {
	activePlan: string | null
}

const MealPlanContext = createContext({} as IMealPlanContext)

interface IMealPlanProviderProps {
	children: React.ReactNode
}

export const MealPlanProvider = ({ children }: IMealPlanProviderProps) => {
	const user = useUser()
	const [userPlans, setUserPlans] = useState<MealPlan[]>([])
	const [userRecipes, setUserRecipes] = useState<UserRecipe[]>([])
	const [activePlan, setActivePlan] = useState<MealPlan | null>(null)
	const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([])
	const [includedItems, setIncludedItems] = useState<string[]>([])
	const { recipeIndex } = useRecipeData()

	useEffect(() => {
		if (!user) return
		const unsubscribe = MealPlan.subscribe(user.id, setUserPlans)
		return () => unsubscribe()
	}, [user])

	useEffect(() => {
		if (!user) return
		const unsubscribe = UserRecipe.subscribeToUser(user.id, setUserRecipes)
		return () => unsubscribe()
	}, [user])

	const activatePlan = async (planId: string) => {
		try {
			if (!user) throw new Error('No user')
			const userDataRef = doc(firestore, 'userData', user.id)
			const data: IUserData = { activePlan: planId }
			await setDoc(userDataRef, data, { merge: true })
		} catch (error) {
			console.error(error)
		}
	}

	const parseMealPlanScheduleAndRecipes = async () => {
		if (!user || !activePlan || !activePlan.id) return
		const meals = await ScheduledMeal.getMealPlanScheduledMeals(activePlan.id!)
		interface DatePlusRecipeName {
			date: Date
			recipeName: string
		}
		const datesAndRecipes: DatePlusRecipeName[] = meals
			.map(meal => {
				const recipe = recipeIndex.find(recipe => recipe.id === meal.recipeId)
				return {
					date: convertTimestamp(meal.mealDate),
					recipeName: recipe?.recipeName || 'Unknown recipe'
				}
			})
			.sort((a, b) => (isBefore(a.date, b.date) ? -1 : 1))
		return datesAndRecipes
	}

	useEffect(() => {
		try {
			if (!user) return
			if (!userPlans.length) return

			const userDataDoc = doc(firestore, 'userData', user.id)
			const unsub = onSnapshot(userDataDoc, doc => {
				try {
					// console.trace()
					const data = doc.data() as IUserData
					if (!data) throw new Error('No user data')

					if (data.activePlan && data.activePlan) {
						const plan = userPlans.find(plan => plan.id === data.activePlan)
						if (!plan) throw new Error('Active plan not found')
						setActivePlan(plan)
					}
					return () => unsub()
				} catch (error: any) {
					if (error.message === 'No user data')
						console.warn(error.message, [
							'Means no firestore document was found',
							'This is normal for new users',
							'Just activate a plan and it will be created'
						])
				}
			})
		} catch (error) {
			console.error(error)
		}
	}, [user, userPlans])


	return (
		<MealPlanContext.Provider
			value={{
				userPlans,
				userRecipes,
				activatePlan,
				activePlan,
				setActivePlan,
				groceryItems,
				setGroceryItems,
				includedItems,
				setIncludedItems,
				parseMealPlanScheduleAndRecipes
			}}>
			{children}
		</MealPlanContext.Provider>
	)
}

export const useMealPlanContext = () => {
	return useContext(MealPlanContext)
}

export const useUserMealPlans = () => {
	const { userPlans: userMealPlans } = useMealPlanContext()
	return userMealPlans
}

export const useUserRecipes = () => {
	const { userRecipes } = useMealPlanContext()
	return userRecipes
}

export const useActivePlan = () => {
	const { activePlan, activatePlan } = useMealPlanContext()
	return { activePlan, activatePlan }
}

export const useGroceryItems = () => {
	const { groceryItems, setGroceryItems } = useMealPlanContext()
	return { groceryItems, setGroceryItems }
}

export const useIncludedItems = () => {
	const { includedItems, setIncludedItems } = useMealPlanContext()
	return { includedItems, setIncludedItems }
}

export const useRecipeSchedule = () => {
	const { parseMealPlanScheduleAndRecipes } = useMealPlanContext()
	return parseMealPlanScheduleAndRecipes
}