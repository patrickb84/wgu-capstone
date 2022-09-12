import { Timestamp } from 'firebase/firestore'

export default interface IAppModel {
	id?: string
	createdBy?: string
	createdOn?: Date | Timestamp
	updatedBy?: string
	updatedOn?: Date | Timestamp
	[key: string]: any
}
