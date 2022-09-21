import { CollectionReference, DocumentData, Timestamp } from 'firebase/firestore'

export interface IAppResourceModel {
	createdDate?: Date | Timestamp
	createdBy?: string
	updatedDate?: Date | Timestamp
	updatedBy?: string
	id?: string
}

export abstract class DatabaseCollection {
	static add: (i?: any) => any
	static collectionName: string
	static collectionRef: CollectionReference<DocumentData>
	static delete: (i?: any) => any
	static get: (i?: any) => any
	static getAll: (i?: any) => any
}
