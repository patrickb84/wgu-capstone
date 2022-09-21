import { convertTimestamp } from 'utils/time.utils'
import { DocumentData, query, QueryDocumentSnapshot, Timestamp, where } from 'firebase/firestore'
import { IAppResourceModel, DatabaseCollection } from './DatabaseDocument'
import DB from 'db/Database'

export interface IBookmark extends IAppResourceModel {
	recipeId: string
	userId: string
}

export default class Bookmark extends DatabaseCollection implements IBookmark {
	static add = async (bookmark: Bookmark) => {
		return DB.add(this.collectionName, bookmark)
	}
	static collectionName = 'bookmarks'
	public static get = async (id: string) => {
		const doc = (await DB.get(this.collectionName, id)) as Bookmark
		const bookmark = new Bookmark(doc)
		return bookmark
	}
	static getBookmarkByRecipeId = async (recipeId: string, userId: string) => {
		const queryDocs = await DB.getCollectionByUserId(this.collectionName, userId)
		const bookmarks: IBookmark[] = queryDocs.map(this.mapIterator)
		const bookmark = bookmarks.find(b => b.recipeId === recipeId)
		return bookmark
	}
	static getUserBookmarks = async (userId: string) => {
		const queryDocs = await DB.getCollectionByUserId(this.collectionName, userId)
		const bookmarks: IBookmark[] = queryDocs.map(this.mapIterator)
		return bookmarks
	}
	static mapCollectionDocs = (doc: any) => {
		return new Bookmark({
			id: doc.id,
			...(doc.data() as IBookmark)
		})
	}
	static mapIterator = (doc: QueryDocumentSnapshot<DocumentData>): Bookmark => {
		return new Bookmark({
			id: doc.id,
			...(doc.data() as Bookmark)
		})
	}
	static remove = async (id?: string) => {
		if (!id) return true
		try {
			await DB.delete(this.collectionName, id)
			return true
		} catch (error) {
			console.error(error)
			return false
		}
	}
	createdBy?: string | undefined
	createdDate?: Timestamp | Date | undefined
	id?: string | undefined
	recipeId: string
	userId: string
	constructor(bookmark: IBookmark) {
		super()
		const { recipeId, userId, createdDate, createdBy, id } = bookmark
		this.recipeId = recipeId
		this.userId = userId
		this.createdDate = createdDate && convertTimestamp(createdDate)
		this.createdBy = createdBy
		this.id = id
	}
}
