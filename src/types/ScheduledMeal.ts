import { firestore } from 'api/firebase/app'
import DB from 'db/Database'
import {
	collection,
	deleteDoc,
	doc,
	DocumentData,
	getDoc,
	query,
	QueryDocumentSnapshot,
	Timestamp,
	updateDoc,
	where
} from 'firebase/firestore'
import IAppModel from 'types/AppModel'
import { convertTimestamp } from 'utils/time.utils'

export interface IScheduledMeal extends IAppModel {
	id?: string
	userId: string
	mealDate: Date | Timestamp
	mealPlanId: string
	recipeId: string
	isUserRecipe?: boolean
}

export default class ScheduledMeal implements IScheduledMeal {
	static add = async (scheduledMeal: Partial<IScheduledMeal>, userId: string) => {
		const id = await DB.add(this.collectionName, { ...scheduledMeal, userId })
		return id
	}
	static collectionName = 'scheduledMeals'
	static delete = async (id: string) => {
		await deleteDoc(doc(firestore, this.collectionName, id))
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
	static getMealPlanScheduledMeals = async (mealPlanId: string) => {
		const q = query(collection(firestore, this.collectionName), where('mealPlanId', '==', mealPlanId))
		const docs = await DB.getCollectionByQuery(q)
		const elements: IScheduledMeal[] = docs.map(this.mapIterator)
		return elements
	}
	static mapIterator = (doc: QueryDocumentSnapshot<DocumentData>): ScheduledMeal => {
		return new ScheduledMeal({
			id: doc.id,
			...(doc.data() as ScheduledMeal)
		})
	}
	static update = async (values: Partial<IScheduledMeal>, id: string) => {
		try {
			const docRef = doc(firestore, this.collectionName, id)
			await updateDoc(docRef, values)
		} catch (error) {
			console.error(error)
		}
	}
	id?: string
	isUserRecipe?: boolean = false
	mealDate: Date
	mealPlanId: string
	recipeId: string
	userId: string
	constructor(scheduledMeal: IScheduledMeal) {
		const { id, userId, mealDate, mealPlanId, recipeId, isUserRecipe: isUserCreated } = scheduledMeal
		this.id = id
		this.userId = userId
		this.mealDate = convertTimestamp(mealDate)
		this.mealPlanId = mealPlanId
		this.recipeId = recipeId
		this.isUserRecipe = isUserCreated
	}
}
