import { firestore } from 'api/firebase/app'
import DB from 'db/Database'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import MealPlan from 'pages/MealPlans/types/MealPlan'
import ScheduledMeal from 'pages/ScheduledMeals/types/ScheduledMeal'
import { createContext, useState, useContext, useEffect } from 'react'
import { UserRecipe } from 'types/UserRecipe'
import { useUser } from './UserProvider'

export interface IMealPlanContext {
	userPlans: MealPlan[]
	userRecipes: UserRecipe[]
	activatePlan: (planId: string) => Promise<void>
	activePlan: MealPlan | null
	setActivePlan: (plan: MealPlan | null) => void
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

	// useEffect(() => {
	// 	const getMeals = async () => {
	// 		if (!user || !activePlan || !activePlan.id) return

	// 		const meals = await ScheduledMeal.getMealPlanScheduledMeals(activePlan.id)
	// 		const consoleLogWithStyle = (style: string) => (message: string) => console.log(`%c${message}`, style)
	// 		const log = consoleLogWithStyle('color: #00bfa5; font-weight: bold;')
	// 		log('Scheduled meals for active plan:')
	// 		console.table(meals)
	// 	}

	// 	getMeals()
	// }, [activePlan, user])

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
				setActivePlan
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
