import { useEffect, useState } from 'react'
import { differenceInCalendarDays, addDays } from 'date-fns'
import { ScheduleDayCard } from './DayPlanCard'
import { ScheduledMeal } from 'types/ScheduledMeal'
import { formatWithoutTime } from 'utils'
import { DayPlan } from 'types/DayPlan'
import { DateRangeType } from 'types/DateRangeType'
import { useUser } from 'providers/UserProvider'

export interface IScheduleProps {
	dateRange: DateRangeType
	scheduledMeals: ScheduledMeal[]
	setScheduledMeals: (scheduledMeals: ScheduledMeal[]) => void
}

export function Schedule({ dateRange, scheduledMeals, setScheduledMeals }: IScheduleProps) {
	const user = useUser()
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
		ScheduledMeal.findUsersScheduledMeals(user?.uid).then(setScheduledMeals)
	}, [setScheduledMeals, user?.uid])

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
