import { useEffect, useState } from 'react'
import { differenceInCalendarDays, addDays } from 'date-fns'
import format from 'date-fns/format'
import { useAppContext } from 'providers/AppProvider'
import { ScheduleDayCard } from './ScheduleDay'

export interface IScheduleProps {
	startDate: Date | null
	endDate: Date | null
}

export function Schedule({ startDate, endDate }: IScheduleProps) {
	const { appUser } = useAppContext()
	const [days, setDays] = useState<any>([])

	useEffect(() => {
		if (startDate && endDate) {
			const days = [startDate]
			const numberOfDays = differenceInCalendarDays(endDate, startDate)
			for (let i = 0; i < numberOfDays; i++) {
				days.push(addDays(startDate, i + 1))
			}
			setDays(days)
		} else {
			setDays([])
		}
	}, [startDate, endDate])

	if (!startDate || !endDate) return null

	return (
		<>
			{days.map((date: any) => (
				<ScheduleDayCard key={date} date={date} userId={appUser?.uid} />
			))}
		</>
	)
}

export const Today = () => {
	return format(new Date(), "'Today is a' eeee")
}
