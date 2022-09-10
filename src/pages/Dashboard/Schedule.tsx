import { useEffect, useState } from 'react'
import { differenceInCalendarDays, addDays } from 'date-fns'
import { ScheduleDayCard } from './DayPlanCard'
import { stripTime } from 'utils'
import { DayPlan } from 'types/DayPlan'
import { DateRangeType } from 'types/DateRangeType'
import { useUser } from 'providers/UserProvider'
import { useScheduleMeals } from 'providers/MealPlanProvider'

export interface IScheduleProps {
	dateRange: DateRangeType
}

export function Schedule({ dateRange }: IScheduleProps) {
	const user = useUser()
	const scheduledMeals = useScheduleMeals()
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
			setDays(days.map(day => stripTime(day)))
		}
	}, [startDate, endDate])

	useEffect(() => {
		if (days.length && scheduledMeals.length) {
			setDayPlans(days.map(date => new DayPlan(date, scheduledMeals)))
		}
	}, [scheduledMeals, days])

	if (!user) return <></>

	return (
		<>
			{dayPlans.map((dayPlan: DayPlan, index: number) => (
				<ScheduleDayCard key={dayPlan.key} dayPlan={dayPlan} index={index + 1} />
			))}
		</>
	)
}
