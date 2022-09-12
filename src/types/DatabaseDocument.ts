import { CollectionReference, DocumentData, Timestamp } from 'firebase/firestore'

export interface IAppResourceModel {
	createdDate?: Date | Timestamp
	createdBy?: string
	updatedDate?: Date | Timestamp
	updatedBy?: string
	id?: string
}

export abstract class DatabaseCollection {
	static collectionName: string
	static collectionRef: CollectionReference<DocumentData>
	static get: (i?: any) => any
	static getAll: (i?: any) => any
	static add: (i?: any) => any
	static delete: (i?: any) => any
}
