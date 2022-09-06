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
	dateAdded: Date | Timestamp
}

const mapDocToBookmark = (doc: QueryDocumentSnapshot<DocumentData>): Bookmark => {
	return new Bookmark({
		id: doc.id,
		...(doc.data() as IBookmark)
	})
}

export default class Bookmark implements IBookmark {
	id?: string
	recipeId: string
	userId: string
	dateAdded: Date

	constructor(bookmark: IBookmark) {
		this.id = bookmark.id
		this.recipeId = bookmark.recipeId
		this.userId = bookmark.userId
		this.dateAdded = forceTimestampToDate(bookmark.dateAdded)
	}

	addBookmark = async () => {
		const docRef = await addDoc(collection(db, 'bookmarks'), this)
		this.id = docRef.id
	}

	removeBookmark = async () => {
		if (this.id) {
			await deleteDoc(doc(db, 'bookmarks', this.id))
		}
	}

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
