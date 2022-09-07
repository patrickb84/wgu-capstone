import { createContext, useState, useContext, useEffect } from 'react'
import Bookmark, { mapDocToBookmark } from 'types/Bookmark'
import { mapDocToScheduledMeal, ScheduledMeal } from 'types/ScheduledMeal'
import IUser from 'types/User'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { firestore as db } from 'api/firebase'

export interface IMealPlanContext {
	scheduledMeals: ScheduledMeal[]
	setScheduledMeals: (scheduledMeals: ScheduledMeal[]) => void
	bookmarks: Bookmark[]
	setBookmarks: (bookmarks: Bookmark[]) => void
}

const MealPlanContext = createContext({} as IMealPlanContext)

interface IPlanProviderProps {
	children: React.ReactNode
	user: IUser | null
}

export const MealPlanProvider = ({ children, user }: IPlanProviderProps) => {
	const [scheduledMeals, setScheduledMeals] = useState<ScheduledMeal[]>([])
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

export const useBookmarks = () => {
	const { bookmarks } = useContext(MealPlanContext)
	const findBookmark = (recipeId: string) => bookmarks.find(b => b.recipeId === recipeId)
	return { bookmarks, findBookmark }
}
