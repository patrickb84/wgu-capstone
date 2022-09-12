import { firestore } from 'api/firebase/app'
import mealdb from 'api/mealdb'
import ApiRecipe from 'api/mealdb/types/ApiRecipe'
import { addDays, differenceInDays } from 'date-fns'
import DB from 'db/Database'
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	DocumentData,
	query,
	QueryDocumentSnapshot,
	Timestamp,
	updateDoc,
	where
} from 'firebase/firestore'
import ScheduledMeal from 'pages/ScheduledMeals/types/ScheduledMeal'
import IAppModel from 'pages/shared/types/AppModel'
import { Dispatch, SetStateAction } from 'react'
import { convertTimestamp } from 'utils/time.utils'

export interface IMealPlan extends IAppModel {
	userId: string
	planName: string
	planDescription?: string
	planStartDate: Date | Timestamp
	planEndDate: Date | Timestamp
}

const dbCollectionName = 'userPlan'

export default class MealPlan implements IMealPlan {
	userId: string
	id?: string
	planName: string
	planDescription?: string
	planStartDate: Date
	planEndDate: Date
	createdBy?: string
	createdOn: Date
	updatedBy?: string
	updatedOn?: Date

	constructor(mealPlan: IMealPlan) {
		const { userId, id, planName, planDescription, planStartDate, planEndDate } = mealPlan
		this.userId = userId
		this.id = id
		this.planName = planName
		this.planDescription = planDescription
		this.planStartDate = convertTimestamp(planStartDate)
		this.planEndDate = convertTimestamp(planEndDate)
		this.createdOn = new Date()
	}

	static collectionName = 'userPlan'

	numberOfDays() {
		return differenceInDays(this.planEndDate, this.planStartDate)
	}

	static mapIterator = (doc: QueryDocumentSnapshot<DocumentData>): MealPlan => {
		return new MealPlan({
			id: doc.id,
			...(doc.data() as MealPlan)
		})
	}

	static add = async (userPlan: Partial<IMealPlan>, userId: string) => {
		console.log(dbCollectionName, userPlan)
		try {
			userPlan.userId = userId
			userPlan.createdOn = new Date()
			const docRef = await addDoc(collection(firestore, dbCollectionName), userPlan)
			return docRef.id
		} catch (error) {
			console.error(error)
		}
	}

	static update = async (values: Partial<IMealPlan>, id: string) => {
		try {
			const docRef = doc(firestore, dbCollectionName, id)
			await updateDoc(docRef, values)
		} catch (error) {
			console.error(error)
		}
	}

	static delete = async (userPlanId: string) => {
		await deleteDoc(doc(firestore, dbCollectionName, userPlanId))
	}

	static getUserMealPlans = async (userId: string) => {
		const queryDocs = await DB.getCollectionByUserId(dbCollectionName, userId)
		const plans: IMealPlan[] = queryDocs.map(this.mapIterator)
		console.log('🚀 ~ MealPlan ~ getUserMealPlans= ~ plans', plans)
		return plans
	}

	static subscribe = (userId: string, callback: Dispatch<SetStateAction<MealPlan[]>>) => {
		const q = query(collection(firestore, this.collectionName), where('userId', '==', userId))
		const unsubscribe = DB.subscribeToCollection(q, this.mapIterator, callback)
		return unsubscribe
	}

	static get = async (planId: string) => {
		const plan = (await DB.get(dbCollectionName, planId)) as IMealPlan
		return new MealPlan(plan)
	}

	static populateNewMealPlan = async (
		startDate: Date,
		endDate: Date,
		planId: string,
		userId: string
	) => {
		const numberOfDays = differenceInDays(endDate, startDate)

		const d = Math.ceil((numberOfDays * 3) / 10)

		const randomMeals = []
		for (let i = 0; i < d; i++) {
			let res = (await mealdb.fetchRandom10Recipes()) as ApiRecipe[]
			let idMeals = res.map(r => r.idMeal as string)
			randomMeals.push(...idMeals)
		}

		console.log(randomMeals)

		for (let i = 0; i <= numberOfDays; i++) {
			const date = addDays(startDate, i)
			for (let j = 0; j < 3; j++) {
				const mealId = randomMeals.pop()

				const scheduledMeal = {
					userId,
					recipeId: mealId as string,
					mealPlanId: planId,
					mealDate: date
				}
				console.log(scheduledMeal)
				ScheduledMeal.add(scheduledMeal, userId).then(id => console.log(id))
			}
		}
	}
}
