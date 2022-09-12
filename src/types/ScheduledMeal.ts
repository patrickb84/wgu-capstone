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
import { convertDateToTimestamp, convertTimestamp } from 'utils/time.utils'
import { firestore as db } from 'api/firebase/app'
import { Recipezzz } from './ZZZRecipe'

type ScheduledMealRecipeData = Pick<Recipezzz, 'id' | 'name' | 'imageUrl'>

export interface IScheduledMealzzz {
	id?: string
	userId: string
	date: Date | Timestamp
	dateAdded?: Date | Timestamp
	$recipe: ScheduledMealRecipeData
}

export const mapDocToScheduledMeal = (doc: QueryDocumentSnapshot<DocumentData>): ScheduledMealzzzz => {
	return new ScheduledMealzzzz({
		id: doc.id,
		...(doc.data() as IScheduledMealzzz)
	})
}

export class ScheduledMealzzzz implements IScheduledMealzzz {
	id?: string
	date: Date
	userId: string
	dateAdded?: Date = new Date()
	$recipe: ScheduledMealRecipeData

	constructor(scheduledMeal: IScheduledMealzzz) {
		const { id, date, userId, dateAdded, $recipe } = scheduledMeal
		this.id = id
		this.userId = userId
		this.dateAdded = dateAdded && convertTimestamp(dateAdded)
		this.$recipe = $recipe
		this.date = date ? convertTimestamp(date) : new Date()
	}

	static add = async (scheduledMeal: ScheduledMealzzzz) => {
		scheduledMeal.dateAdded = new Date()

		const docRef = await addDoc(collection(db, 'scheduledMeals'), scheduledMeal)
		scheduledMeal.id = docRef.id
		return scheduledMeal
	}

	static remove = async (scheduledMeal: ScheduledMealzzzz) => {
		if (scheduledMeal.id) {
			await deleteDoc(doc(db, 'scheduledMeals', scheduledMeal.id))
		}
	}

	static queryUserScheduledMeals = (userId: string) =>
		query(collection(db, 'scheduledMeals'), where('userId', '==', userId))

	static findUsersScheduledMeals = async (uid: any) => {
		const q = query(collection(db, 'scheduledMeals'), where('userId', '==', uid))
		const querySnapshot = await getDocs(q)
		const scheduledMeals: ScheduledMealzzzz[] = querySnapshot.docs.map(mapDocToScheduledMeal)
		return scheduledMeals
	}

	static findUsersScheduledMealsByDate = async (uid: any, date: Date) => {
		const q = query(
			collection(db, 'scheduledMeals'),
			where('userId', '==', uid),
			where('date', '==', convertDateToTimestamp(date))
		)
		const querySnapshot = await getDocs(q)
		const scheduledMeals: ScheduledMealzzzz[] = querySnapshot.docs.map(mapDocToScheduledMeal)
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
		const scheduledMeals: ScheduledMealzzzz[] = querySnapshot.docs.map(mapDocToScheduledMeal)
		return scheduledMeals
	}

	static findUsersScheduledMealsByRecipeId = async (uid: any, recipeId: string) => {
		const q = query(
			collection(db, 'scheduledMeals'),
			where('userId', '==', uid),
			where('recipeId', '==', recipeId)
		)
		const querySnapshot = await getDocs(q)
		const scheduledMeals: ScheduledMealzzzz[] = querySnapshot.docs.map(mapDocToScheduledMeal)
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
		const scheduledMeals: ScheduledMealzzzz[] = querySnapshot.docs.map(
			doc => new ScheduledMealzzzz(doc.data() as IScheduledMealzzz)
		)
		return scheduledMeals
	}
}
