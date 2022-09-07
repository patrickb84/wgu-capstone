import { addMonths, isEqual } from 'date-fns'
import { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { formatWithoutTime } from 'utils'

export interface IDatePickerMultiSelectProps {
	selectedDates: Date[]
	setSelectedDates: (dates: Date[]) => void
	datePickerRef?: React.RefObject<HTMLDivElement>
}

export default function DatePickerMultiSelect(props: IDatePickerMultiSelectProps) {
	const { selectedDates, setSelectedDates, datePickerRef } = props
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

	const handleChange = (unformattedDate: Date) => {
		setSelectedDate(unformattedDate)
		const formattedDate = formatWithoutTime(unformattedDate)
		const index = selectedDates.findIndex(d => isEqual(d, formattedDate))
		if (index === -1) {
			setSelectedDates([...selectedDates, formattedDate])
			setSelectedDate(undefined)
		} else {
			setSelectedDates(selectedDates.filter(d => !isEqual(d, formattedDate)))
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
