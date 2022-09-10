import {
	addDoc,
	deleteDoc,
	doc,
	DocumentData,
	Firestore,
	QueryDocumentSnapshot,
	Timestamp
} from 'firebase/firestore'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { convertDateToTimestamp, forceTimestampToDate } from 'utils'
import { firestore as db } from 'api/firebase'
import { Recipe } from './Recipe'

type ScheduledMealRecipeData = Pick<Recipe, 'id' | 'name' | 'imageUrl'>

export interface IScheduledMeal {
	id?: string
	userId: string
	date: Date | Timestamp
	dateAdded?: Date | Timestamp
	$recipe: ScheduledMealRecipeData | string
	recipeJson?: string
}

export const mapDocToScheduledMeal = (doc: QueryDocumentSnapshot<DocumentData>): ScheduledMeal => {
	return new ScheduledMeal({
		id: doc.id,
		...(doc.data() as IScheduledMeal)
	})
}

export class ScheduledMeal implements IScheduledMeal {
	id?: string
	date: Date
	userId: string
	dateAdded?: Date = new Date()
	$recipe: ScheduledMealRecipeData

	constructor(scheduledMeal: IScheduledMeal) {
		const { id, date, userId, dateAdded, $recipe } = scheduledMeal
		this.id = id
		this.date = forceTimestampToDate(date)
		this.userId = userId
		this.dateAdded = dateAdded && forceTimestampToDate(dateAdded)
		this.$recipe = $recipe
	}

	static add = async (scheduledMeal: IScheduledMeal) => {
		scheduledMeal.dateAdded = new Date()
		scheduledMeal.recipeJson = JSON.stringify(scheduledMeal.$recipe)

		const docRef = await addDoc(collection(db, 'scheduledMeals'), scheduledMeal)
		scheduledMeal.id = docRef.id
		return scheduledMeal
	}

	static remove = async (scheduledMeal: ScheduledMeal) => {
		if (scheduledMeal.id) {
			await deleteDoc(doc(db, 'scheduledMeals', scheduledMeal.id))
		}
	}

	static queryUserScheduledMeals = (userId: string) =>
		query(collection(db, 'scheduledMeals'), where('userId', '==', userId))

	static findUsersScheduledMeals = async (uid: any) => {
		const q = query(collection(db, 'scheduledMeals'), where('userId', '==', uid))
		const querySnapshot = await getDocs(q)
		const scheduledMeals: ScheduledMeal[] = querySnapshot.docs.map(mapDocToScheduledMeal)
		return scheduledMeals
	}

	static findUsersScheduledMealsByDate = async (uid: any, date: Date) => {
		const q = query(
			collection(db, 'scheduledMeals'),
			where('userId', '==', uid),
			where('date', '==', convertDateToTimestamp(date))
		)
		const querySnapshot = await getDocs(q)
		const scheduledMeals: ScheduledMeal[] = querySnapshot.docs.map(mapDocToScheduledMeal)
		return scheduledMeals
	}

	static findUsersScheduledMealsByDateRange = async (uid: any, startDate: Date, endDate: Date) => {
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

	static findUsersScheduledMealsByRecipeId = async (uid: any, recipeId: string) => {
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
