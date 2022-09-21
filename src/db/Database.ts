import { firestore } from 'api/firebase/app'
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	DocumentData,
	getDoc,
	getDocs,
	onSnapshot,
	Query,
	query,
	QueryDocumentSnapshot,
	setDoc,
	updateDoc,
	where
} from 'firebase/firestore'
import IAppModel from 'types/AppModel'

export default class DB {
	static add = async (collectionName: string, values: any) => {
		console.log('DB.add', collectionName, values)
		try {
			values.createdOn = new Date()
			const docRef = await addDoc(collection(firestore, collectionName), values)
			return docRef.id
		} catch (error) {
			console.error(error)
		}
	}
	static delete = async (collectionName: string, id: string) => {
		await deleteDoc(doc(firestore, collectionName, id))
	}
	static generateQuery = (collectionName: string, field: string, operator: any, value: any) => {
		return query(collection(firestore, collectionName), where(field, operator, value))
	}
	static get = async (collectionName: string, id: string) => {
		const docRef = doc(firestore, collectionName, id)
		const docSnap = await getDoc(docRef)

		if (docSnap.exists()) {
			return { ...docSnap.data(), id: docSnap.id }
		} else {
			return null
		}
	}
	static getCollectionByQuery = async (query: Query<DocumentData>) => {
		const querySnapshot = await getDocs(query)
		return querySnapshot.docs
	}
	static getCollectionByUserId = async (collectionName: string, userId: string) => {
		const querySnapshot = await getDocs(
			query(collection(firestore, collectionName), where('userId', '==', userId))
		)
		return querySnapshot.docs
	}
	static set = async (collectionName: string, id: string, object: any) => {
		await setDoc(doc(firestore, collectionName, id), { ...object })
	}
	static subscribeToCollection = (
		$query: Query<DocumentData>,
		mapIterator: (doc: QueryDocumentSnapshot<DocumentData>) => any,
		callback: any
	) => {
		const unsubscribe = onSnapshot($query, querySnapshot => {
			const elements: IAppModel[] = querySnapshot.docs.map(mapIterator)
			callback(elements)
		})
		return unsubscribe
	}
	static update = async (collectionName: string, values: any, id: string) => {
		try {
			const docRef = doc(firestore, collectionName, id)
			await updateDoc(docRef, values)
		} catch (error) {
			console.error(error)
		}
	}
}
