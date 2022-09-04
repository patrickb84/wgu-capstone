import { useEffect, useState } from 'react'
import { differenceInCalendarDays, addDays } from 'date-fns'
import { useAppContext } from 'providers/AppProvider'
import { ScheduleDayCard } from './DayPlanCard'
import { ScheduledMeal } from 'types/ScheduledMeal'
import { firestore } from 'api/firebase'
import { formatWithoutTime } from 'utils/dates'
import { DayPlan } from 'types/DayPlan'
import { DateRangeType } from 'types/DateRangeType'

export interface IScheduleProps {
	dateRange: DateRangeType
	scheduledMeals: ScheduledMeal[]
	setScheduledMeals: (scheduledMeals: ScheduledMeal[]) => void
}

export function Schedule({ dateRange, scheduledMeals, setScheduledMeals }: IScheduleProps) {
	const { userId } = useAppContext()
	const [days, setDays] = useState<Date[]>([])
	const [dayPlans, setDayPlans] = useState<DayPlan[]>([])
	const [startDate, endDate] = dateRange

	useEffect(() => {
		if (startDate && endDate) {
			const days = [startDate]
			const numberOfDays = differenceInCalendarDays(endDate, startDate)
			for (let i = 0; i < numberOfDays; i++) {
				days.push(addDays(startDate, i + 1))
			}
			setDays(days.map(day => formatWithoutTime(day)))
		}
	}, [startDate, endDate])

	useEffect(() => {
		ScheduledMeal.findUsersScheduledMeals(firestore, userId).then(setScheduledMeals)
	}, [setScheduledMeals, userId])

	useEffect(() => {
		if (days.length && scheduledMeals.length) {
			setDayPlans(days.map(date => new DayPlan(date, scheduledMeals)))
		}
	}, [scheduledMeals, days])

	if (!userId) return <></>

	return (
		<>
			{dayPlans.map((dayPlan: DayPlan, index: number) => (
				<ScheduleDayCard key={dayPlan.key} dayPlan={dayPlan} index={index + 1} />
			))}
		</>
	)
}
