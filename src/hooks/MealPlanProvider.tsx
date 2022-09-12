import { addDays, differenceInDays } from 'date-fns'
import DB from 'db/Database'
import MealPlan, { IMealPlan } from 'pages/MealPlans/types/MealPlan'
import { createContext, useState, useContext, useEffect } from 'react'
import { updateUser } from 'types/User'
import { useUser } from './UserProvider'

export interface IMealPlanContext {
	activeMealPlan: string | null
	setActiveMealPlan: (id: string | null) => void
	userMealPlans: MealPlan[]
}

const MealPlanContext = createContext({} as IMealPlanContext)

interface IMealPlanProviderProps {
	children: React.ReactNode
}

export const MealPlanProvider = ({ children }: IMealPlanProviderProps) => {
	const user = useUser()
	const [activeMealPlan, setActiveMealPlan] = useState<string | null>(null)
	const [userMealPlans, setUserMealPlans] = useState<MealPlan[]>([])

	useEffect(() => {
		if (!user) return
		const unsubscribe = MealPlan.subscribe(user.id, setUserMealPlans)
		return () => unsubscribe()
	}, [user])

	useEffect(() => {
      if (user) {
         console.log(user)
			const activePlan = user.activeMealPlanId

			if (activePlan) {
				setActiveMealPlan(activePlan)
			}
		} else {
			setActiveMealPlan(null)
		}
	}, [user])

	useEffect(() => {
		if (user && activeMealPlan) {
         updateUser(user, { activeMealPlanId: activeMealPlan })
         console.log('activated')
		}
	}, [activeMealPlan, user])

	return (
		<MealPlanContext.Provider
			value={{
				activeMealPlan,
				setActiveMealPlan,
				userMealPlans
			}}>
			{children}
		</MealPlanContext.Provider>
	)
}

export const useMealPlanContext = () => {
	return useContext(MealPlanContext)
}

export const useActiveMealPlan = () => {
	const { activeMealPlan, setActiveMealPlan } = useMealPlanContext()
	return { activeMealPlan, setActiveMealPlan }
}

export const useUserMealPlans = () => {
	const { userMealPlans } = useMealPlanContext()
	return userMealPlans
}
