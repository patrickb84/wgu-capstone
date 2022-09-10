import { addMonths, isEqual, isSameDay } from 'date-fns'
import { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { stripTime } from 'utils'

export interface IDatePickerMultiSelectProps {
	selectedDates: Date[]
	setSelectedDates: (dates: Date[]) => void
	datePickerRef?: React.RefObject<HTMLDivElement>
}

export default function DatePickerMultiSelect(props: IDatePickerMultiSelectProps) {
	const { selectedDates, setSelectedDates, datePickerRef } = props
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

	useEffect(() => setSelectedDate(undefined), [selectedDates])

	const handleChange = (date: Date) => {
		setSelectedDate(date)
		const index = selectedDates.findIndex(d => isSameDay(d, date))
		if (index === -1) {
			setSelectedDates([...selectedDates, date])
		} else {
			setSelectedDates(selectedDates.filter(d => !isSameDay(d, date)))
		}
	}

	const highlightWithRanges = [
		{
			'react-datepicker__day--selected bg-brand text-white': selectedDates
		}
	]

	return (
		<>
			<div ref={datePickerRef} className="modal-date-picker d-inline-block">
				<ReactDatePicker
					selected={selectedDate}
					onChange={(date: Date) => handleChange(date)}
					highlightDates={highlightWithRanges}
					inline
					minDate={new Date()}
					maxDate={addMonths(new Date(), 1)}
				/>
			</div>
		</>
	)
}
