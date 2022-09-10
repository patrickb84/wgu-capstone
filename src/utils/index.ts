import { format, set } from 'date-fns'
import { Timestamp } from 'firebase/firestore'

export const convertTimestampToDate = (timestamp: Timestamp): Date => {
	return timestamp.toDate()
}

export const convertTimestampToDateString = (date: Timestamp) => {
	return convertTimestampToDate(date).toISOString().split('T')[0]
}

export const convertDateToTimestamp = (date: Date) => Timestamp.fromDate(date)

export const forceTimestampToDate = (date: Date | Timestamp): Date => {
	return date instanceof Date ? date : date.toDate()
}

export const Today = () => format(new Date(), "'Today is a' eeee")

export const stripTime = (date: Date): Date => {
	return set(date, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
}
