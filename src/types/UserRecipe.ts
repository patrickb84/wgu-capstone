import { Ingredient } from './Ingredient'
import { IMeasuredIngredient } from 'pages/Recipes/types/Recipe'
import { IRecipe } from 'pages/Recipes/types/Recipe'
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
import { Dispatch, SetStateAction } from 'react'

export type UserRecipeIngredient = {
	ingredient: string
	measure: string
}

export interface IUserRecipe extends IAppModel {
	id?: string
	userId: string
	name: string
	ingredients: UserRecipeIngredient[]
	area?: string
	category?: string
	instructions?: string
	imageUrl?: string
}

export class UserRecipe implements IUserRecipe {
	id?: string
	userId: string
	name: string
	ingredients: UserRecipeIngredient[]
	area?: string
	category?: string
	instructions?: string
	imageUrl?: string

	constructor(recipe: IUserRecipe) {
		this.id = recipe.id
		this.userId = recipe.userId
		this.name = recipe.name
		this.ingredients = recipe.ingredients
		this.area = recipe.area
		this.category = recipe.category
		this.instructions = recipe.instructions
		this.imageUrl = recipe.imageUrl
	}

	static collectionName = 'userRecipes'

	static mapIterator = (doc: QueryDocumentSnapshot<DocumentData>): UserRecipe => {
		return new UserRecipe({
			id: doc.id,
			...(doc.data() as UserRecipe)
		})
	}

	static add = async (recipe: Partial<IUserRecipe>, userId: string) => {
		const docRefId = await DB.add(this.collectionName, { ...recipe, userId })
		return docRefId
	}

	static update = async (values: Partial<IUserRecipe>, id: string) => {
		try {
			const docRef = doc(firestore, this.collectionName, id)
			await updateDoc(docRef, values)
		} catch (err) {
			console.error(err)
		}
	}

	static delete = async (id: string) => {
		try {
			await deleteDoc(doc(firestore, this.collectionName, id))
		} catch (err) {
			console.error(err)
		}
	}

	static get = async (id: string) => {
		try {
			const docRef = doc(firestore, this.collectionName, id)
			const docSnap = await getDoc(docRef)
			if (docSnap.exists()) {
				return new UserRecipe({ id: docSnap.id, ...(docSnap.data() as UserRecipe) })
			} else {
				return null
			}
		} catch (err) {
			console.error(err)
		}
	}

	static getAll = async (userId: string) => {
		try {
			const q = query(collection(firestore, this.collectionName), where('userId', '==', userId))
			const querySnapshot = await getDocs(q)
			const recipes: UserRecipe[] = []
			querySnapshot.forEach(doc => {
				recipes.push(this.mapIterator(doc))
			})
			return recipes
		} catch (err) {
			console.error(err)
		}
	}

	static subscribeToUser = (userId: string, callback: Dispatch<SetStateAction<UserRecipe[]>>) => {
		const q = query(collection(firestore, this.collectionName), where('userId', '==', userId))
		const unsubscribe = DB.subscribeToCollection(q, this.mapIterator, callback)
		return unsubscribe
	}

	static subscribeToAll = (callback: Dispatch<SetStateAction<UserRecipe[]>>) => {
		const q = query(collection(firestore, this.collectionName))
		const unsubscribe = DB.subscribeToCollection(q, this.mapIterator, callback)
		return unsubscribe
	}
}
