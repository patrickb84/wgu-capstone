import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	DocumentData,
	getDocs,
	query,
	QueryDocumentSnapshot,
	Timestamp,
	where
} from 'firebase/firestore'
import { forceTimestampToDate } from 'utils'
import { firestore as db } from 'api/firebase'

export interface IBookmark {
	id?: string
	recipeId: string
	userId: string
	dateCreated: Date | Timestamp
}

export const mapDocToBookmark = (doc: QueryDocumentSnapshot<DocumentData>): Bookmark => {
	return new Bookmark({
		id: doc.id,
		...(doc.data() as IBookmark)
	})
}

export default class Bookmark implements IBookmark {
	id?: string
	recipeId: string
	userId: string
	dateCreated: Date

	constructor(bookmark: IBookmark) {
		this.id = bookmark.id
		this.recipeId = bookmark.recipeId
		this.userId = bookmark.userId
		this.dateCreated = forceTimestampToDate(bookmark.dateCreated)
	}

	static addBookmark = async (bookmark: IBookmark): Promise<Bookmark | undefined> => {
		try {
			const docRef = await addDoc(collection(db, 'bookmarks'), bookmark)
			return new Bookmark({ id: docRef.id, ...bookmark })
		} catch (error) {
			console.error(error)
			return undefined
		}
	}

	static removeBookmark = async (bookmarkId?: string) => {
		if (!bookmarkId) return true
		try {
			await deleteDoc(doc(db, 'bookmarks', bookmarkId))
			return true
		} catch (error) {
			console.error(error)
			return false
		}
	}

	// addBookmark = async () => {
	// 	const docRef = await addDoc(collection(db, 'bookmarks'), this)
	// 	this.id = docRef.id
	// }

	// removeBookmark = async () => {
	// 	if (this.id) {
	// 		await deleteDoc(doc(db, 'bookmarks', this.id))
	// 	}
	// }

	static findUsersBookmarks = async (uid: any) => {
		const q = query(collection(db, 'bookmarks'), where('userId', '==', uid))
		const querySnapshot = await getDocs(q)
		const bookmarks: Bookmark[] = querySnapshot.docs.map(mapDocToBookmark)
		return bookmarks
	}

	static findUsersBookmarksByRecipeId = async (uid: any, recipeId: string) => {
		const q = query(
			collection(db, 'bookmarks'),
			where('userId', '==', uid),
			where('recipeId', '==', recipeId)
		)
		const querySnapshot = await getDocs(q)
		const bookmarks: Bookmark[] = querySnapshot.docs.map(mapDocToBookmark)
		return bookmarks
	}

	static findUsersBookmarksByRecipeIds = async (uid: any, recipeIds: string[]) => {
		const q = query(
			collection(db, 'bookmarks'),
			where('userId', '==', uid),
			where('recipeId', 'in', recipeIds)
		)
		const querySnapshot = await getDocs(q)
		const bookmarks: Bookmark[] = querySnapshot.docs.map(mapDocToBookmark)
		return bookmarks
	}

	static findUsersBookmarksByDateRange = async (uid: any, startDate: Date, endDate: Date) => {
		const q = query(
			collection(db, 'bookmarks'),
			where('userId', '==', uid),
			where('dateAdded', '>=', startDate),
			where('dateAdded', '<=', endDate)
		)
		const querySnapshot = await getDocs(q)
		const bookmarks: Bookmark[] = querySnapshot.docs.map(mapDocToBookmark)
		return bookmarks
	}
}
