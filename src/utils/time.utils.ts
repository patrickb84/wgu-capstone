import { addDays, differenceInDays, format, set } from 'date-fns'
import { Timestamp } from 'firebase/firestore'

export const convertTimestampToDate = (timestamp: Timestamp): Date => {
	return timestamp.toDate()
}

export const convertTimestampToDateString = (date: Timestamp) => {
	return convertTimestampToDate(date).toISOString().split('T')[0]
}

export const convertDateToTimestamp = (date: Date) => Timestamp.fromDate(date)

export const convertTimestamp = (date?: Date | Timestamp | null): Date => {
	if (!date) return new Date()
	if (date instanceof Timestamp) return date.toDate()
	return date
}

export const Today = (d = new Date()) => format(d, "'Today is a' eeee")

export const stripTime = (date: Date): Date => {
	return set(date, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
}

export const dateFromYYYYMMDD = (dateString: string): Date => {
	const [year, month, day] = dateString.split('-')
	return new Date(+year, +month - 1, +day)
}

export const getDateArray = (start: Date, end: Date): Date[] => {
	const diff = differenceInDays(end, start)
	const days: Date[] = []
	for (let i = 0; i <= diff; i++) {
		const day = new Date(addDays(start, i))
		days.push(day)
	}
	return days
}
