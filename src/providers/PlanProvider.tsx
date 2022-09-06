import { createContext, useState, useContext } from 'react'
import Bookmark from 'types/Bookmark'
import { ScheduledMeal } from 'types/ScheduledMeal'

export interface IPlanProviderContext {
	scheduleMeals: ScheduledMeal[]
	groceryList: any[]
	bookmarks: Bookmark[]
}

const PlanProviderContext = createContext({} as IPlanProviderContext)

interface IPlanProviderProviderProps {
	children: React.ReactNode
	userId: string
}

export const PlanProviderProvider = ({ children, userId }: IPlanProviderProviderProps) => {
	const [scheduleMeals, setScheduleMeals] = useState<ScheduledMeal[]>([])
	const [groceryList, setGroceryList] = useState<any[]>([])
	const [bookmarks, setBookmarks] = useState<Bookmark[]>([])

	return (
		<PlanProviderContext.Provider
			value={{
				scheduleMeals,
				groceryList,
				bookmarks
			}}>
			{children}
		</PlanProviderContext.Provider>
	)
}

export const usePlanProviderContext = () => {
	return useContext(PlanProviderContext)
}

export const useScheduleMeals = () => {
	const { scheduleMeals } = usePlanProviderContext()
	return scheduleMeals
}

export const useGroceryList = () => {
	const { groceryList } = usePlanProviderContext()
	return groceryList
}

export const useBookmarks = () => {
	const { bookmarks } = usePlanProviderContext()
	return bookmarks
}
