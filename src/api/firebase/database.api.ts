import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	DocumentData,
	getDoc,
	getDocs,
	Query
} from 'firebase/firestore'
import { IAppResourceModel } from 'types/DatabaseDocument'
import { firestore as db } from './app'

export default class Database {
	static get = async (collectionName: string, id: string): Promise<IAppResourceModel | null> => {
		const docRef = doc(db, collectionName, id)
		const docSnap = await getDoc(docRef)

		if (!docSnap.exists()) return null

		const model = { id: docSnap.id, ...docSnap.data() } as IAppResourceModel
		return model
	}

	static getAll = async (query: Query<DocumentData>) => {
		const querySnapshot = await getDocs(query)
		const docs = querySnapshot.docs.map(doc => doc.data())
		return docs
	}

	static delete = async (collectionName: string, id: string) => {
		await deleteDoc(doc(db, collectionName, id))
	}

	/**
	 *
	 * @param collectionName
	 * @param element
	 * @returns Document ID
	 */
	static add = async (collectionName: string, element: any) => {
		element.dateCreated = new Date()
		const docRef = await addDoc(collection(db, collectionName), element)
		return docRef.id
	}

	static getCollectionRef = (collectionName: string) => {
		return collection(db, collectionName)
	}
}

// TODO: Add exception handling
