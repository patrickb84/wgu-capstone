import { createContext, useState, useContext } from 'react'
import { ScheduledMeal } from 'types/ScheduledMeal'

export interface IPlanProviderContext {
	scheduleMeals: ScheduledMeal[]
	groceryList: any[]
	setScheduleMeals: (scheduledMeals: ScheduledMeal[]) => void
	setGroceryList: (groceryList: any[]) => void
	bookMarkedRecipes: any[]
   setBookMarkedRecipes: (bookMarkedRecipes: any[]) => void
   
}

const PlanProviderContext = createContext({} as IPlanProviderContext)

interface IPlanProviderProviderProps {
	children: React.ReactNode
}

export const PlanProviderProvider = ({ children }: IPlanProviderProviderProps) => {
	const [scheduleMeals, setScheduleMeals] = useState<ScheduledMeal[]>([])
	const [groceryList, setGroceryList] = useState<any[]>([])
	const [bookMarkedRecipes, setBookMarkedRecipes] = useState<any[]>([])

	return (
		<PlanProviderContext.Provider
			value={{
				scheduleMeals,
				groceryList,
				setScheduleMeals,
				setGroceryList,
				bookMarkedRecipes,
				setBookMarkedRecipes
			}}>
			{children}
		</PlanProviderContext.Provider>
	)
}

export const usePlanProviderContext = () => {
	return useContext(PlanProviderContext)
}
