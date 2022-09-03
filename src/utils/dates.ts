import { set } from 'date-fns'

export const formatWithoutTime = (date: Date): Date => {
	return set(date, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
}
