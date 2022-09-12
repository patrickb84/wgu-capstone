import { convertTimestamp } from 'utils/time.utils'
import Database from 'api/firebase/database.api'
import { query, Timestamp, where } from 'firebase/firestore'
import { IAppResourceModel, DatabaseCollection } from './DatabaseDocument'

export interface IBookmark extends IAppResourceModel {
	recipeId: string
	userId: string
}

export default class Bookmark extends DatabaseCollection implements IBookmark {
	recipeId: string
	userId: string
	createdDate?: Timestamp | Date | undefined
	createdBy?: string | undefined
	id?: string | undefined

	constructor(bookmark: IBookmark) {
		super()
		const { recipeId, userId, createdDate, createdBy, id } = bookmark
		this.recipeId = recipeId
		this.userId = userId
		this.createdDate = createdDate && convertTimestamp(createdDate)
		this.createdBy = createdBy
		this.id = id
	}

	static collectionName = 'bookmarks'
	static get collectionRef() {
		return Database.getCollectionRef(this.collectionName)
	}

	static mapCollectionDocs = (doc: any) => {
		return new Bookmark({
			id: doc.id,
			...(doc.data() as IBookmark)
		})
	}

	public static get = async (id: string) => {
		const doc = (await Database.get(Bookmark.collectionName, id)) as IBookmark
		const bookmark = new Bookmark(doc)
		return bookmark
	}

	static add = async (bookmark: Bookmark) => {
		return Database.add(this.collectionName, bookmark)
	}

	static remove = async (id?: string) => {
		if (!id) return true
		try {
			await Database.delete(this.collectionName, id)
			return true
		} catch (error) {
			console.error(error)
			return false
		}
	}

	static getAll = async (userId: string) => {
		const q = query(this.collectionRef)
		const docs = (await Database.getAll(q)) as IBookmark[]
		const bookmarks = docs.map(doc => new Bookmark(doc))
		return bookmarks
	}

	static getUserBookmarks = async (userId: any) => {
		const q = query(this.collectionRef, where('userId', '==', userId))
		const docs = (await Database.getAll(q)) as IBookmark[]
		const bookmarks = docs.map(doc => new Bookmark(doc))
		return bookmarks
	}

	static getUserBookmarksByRecipeId = async (userId: any, recipeId: string) => {
		const q = query(
			this.collectionRef,
			where('userId', '==', userId),
			where('recipeId', '==', recipeId)
		)
		const docs = (await Database.getAll(q)) as IBookmark[]
		const bookmarks = docs.map(doc => new Bookmark(doc))
		return bookmarks
	}
}
