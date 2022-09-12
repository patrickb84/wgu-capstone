import { firestore } from 'api/firebase/app'
import { addDays, differenceInDays } from 'date-fns'
import DB from 'db/Database'
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	DocumentData,
	getDoc,
	getDocs,
	query,
	QueryDocumentSnapshot,
	Timestamp,
	updateDoc,
	where
} from 'firebase/firestore'
import IAppModel from 'pages/shared/types/AppModel'
import { convertTimestamp } from 'utils/time.utils'

export interface IScheduledMeal extends IAppModel {
	id?: string
	userId: string
	mealDate: Date | Timestamp
	mealPlanId: string
	recipeId: string
}

export default class ScheduledMeal implements IScheduledMeal {
	id?: string
	userId: string
	mealDate: Date
	mealPlanId: string
	recipeId: string

	static collectionName = 'scheduledMeals'

	constructor(scheduledMeal: IScheduledMeal) {
		const { id, userId, mealDate, mealPlanId, recipeId } = scheduledMeal
		this.id = id
		this.userId = userId
		this.mealDate = convertTimestamp(mealDate)
		this.mealPlanId = mealPlanId
		this.recipeId = recipeId
	}

	static mapIterator = (doc: QueryDocumentSnapshot<DocumentData>): ScheduledMeal => {
		return new ScheduledMeal({
			id: doc.id,
			...(doc.data() as ScheduledMeal)
		})
	}

	static add = async (scheduledMeal: Partial<IScheduledMeal>, userId: string) => {
		await DB.add(this.collectionName, { ...scheduledMeal, userId })
	}

	static update = async (values: Partial<IScheduledMeal>, id: string) => {
		try {
			const docRef = doc(firestore, this.collectionName, id)
			await updateDoc(docRef, values)
		} catch (error) {
			console.error(error)
		}
	}

	static delete = async (id: string) => {
		await deleteDoc(doc(firestore, this.collectionName, id))
	}

	static getMealPlanScheduledMeals = async (mealPlanId: string) => {
		const q = query(
			collection(firestore, this.collectionName),
			where('mealPlanId', '==', mealPlanId)
		)
		const docs = await DB.getCollectionByQuery(q)
		const elements: IScheduledMeal[] = docs.map(this.mapIterator)
		return elements
	}

	static get = async (id: string) => {
		const docRef = doc(firestore, this.collectionName, id)
		const docSnap = await getDoc(docRef)
		if (docSnap.exists()) {
			return this.mapIterator(docSnap)
		} else {
			return null
		}
	}
}
