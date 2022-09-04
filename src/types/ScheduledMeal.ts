import { Recipe } from 'types/Recipe'
import { fetchRecipe } from './../api/mealdb/mealdb.api'
import { ApiRecipe } from 'api/mealdb/types/ApiRecipe'
import mealdb from 'api/mealdb'
import { DocumentData, Firestore, QueryDocumentSnapshot, Timestamp } from 'firebase/firestore'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { convertDateToTimestamp, forceTimestampToDate } from 'utils'

export interface IScheduledMeal {
	id?: string
	date: Date | Timestamp
	recipeId: string
	userId: string
	dateAdded: Date | Timestamp
}

const mapDocToScheduledMeal = (doc: QueryDocumentSnapshot<DocumentData>): ScheduledMeal => {
	return new ScheduledMeal({
		id: doc.id,
		...(doc.data() as IScheduledMeal)
	})
}

export class ScheduledMeal implements IScheduledMeal {
	id?: string
	date: Date
	recipeId: string
	userId: string
	dateAdded: Date

	constructor(scheduledMeal: IScheduledMeal) {
		this.id = scheduledMeal.id
		this.date = forceTimestampToDate(scheduledMeal.date)
		this.userId = scheduledMeal.userId
		this.dateAdded = forceTimestampToDate(scheduledMeal.dateAdded)
		this.recipeId = scheduledMeal.recipeId
	}

	static findUsersScheduledMeals = async (db: Firestore, uid: any) => {
		const q = query(collection(db, 'scheduledMeals'), where('userId', '==', uid))
		const querySnapshot = await getDocs(q)
		const scheduledMeals: ScheduledMeal[] = querySnapshot.docs.map(mapDocToScheduledMeal)
		return scheduledMeals
	}

	static findUsersScheduledMealsByDate = async (db: Firestore, uid: any, date: Date) => {
		const q = query(
			collection(db, 'scheduledMeals'),
			where('userId', '==', uid),
			where('date', '==', convertDateToTimestamp(date))
		)
		const querySnapshot = await getDocs(q)
		const scheduledMeals: ScheduledMeal[] = querySnapshot.docs.map(mapDocToScheduledMeal)
		return scheduledMeals
	}

	static findUsersScheduledMealsByDateRange = async (
		db: Firestore,
		uid: any,
		startDate: Date,
		endDate: Date
	) => {
		const q = query(
			collection(db, 'scheduledMeals'),
			where('userId', '==', uid),
			where('date', '>=', convertDateToTimestamp(startDate)),
			where('date', '<=', convertDateToTimestamp(endDate))
		)
		const querySnapshot = await getDocs(q)
		const scheduledMeals: ScheduledMeal[] = querySnapshot.docs.map(mapDocToScheduledMeal)
		return scheduledMeals
	}

	static findUsersScheduledMealsByRecipeId = async (db: Firestore, uid: any, recipeId: string) => {
		const q = query(
			collection(db, 'scheduledMeals'),
			where('userId', '==', uid),
			where('recipeId', '==', recipeId)
		)
		const querySnapshot = await getDocs(q)
		const scheduledMeals: ScheduledMeal[] = querySnapshot.docs.map(mapDocToScheduledMeal)
		return scheduledMeals
	}

	static findUsersScheduledMealsByRecipeIdAndDate = async (
		db: Firestore,
		uid: any,
		recipeId: string,
		date: Date
	) => {
		const q = query(
			collection(db, 'scheduledMeals'),
			where('userId', '==', uid),
			where('recipeId', '==', recipeId),
			where('date', '==', convertDateToTimestamp(date))
		)
		const querySnapshot = await getDocs(q)
		const scheduledMeals: ScheduledMeal[] = querySnapshot.docs.map(
			doc => new ScheduledMeal(doc.data() as IScheduledMeal)
		)
		return scheduledMeals
	}
}
