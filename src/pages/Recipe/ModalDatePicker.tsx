import { isEqual } from 'date-fns'
import { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { formatWithoutTime } from 'utils/dates'

export interface IModalDatePickerProps {
	selectedDates: Date[]
	setSelectedDates: (dates: Date[]) => void
}

export function ModalDatePicker(props: IModalDatePickerProps) {
	const { selectedDates, setSelectedDates } = props
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
	console.log({ selectedDates })

	const highlightWithRanges = [
		{
			'react-datepicker__day--selected bg-brand text-white': selectedDates
		}
	]

	return (
		<>
			<div className="modal-date-picker d-flex w-100 justify-content-center">
				<ReactDatePicker
					selected={selectedDate}
					onChange={(date: Date) => handleChange(date)}
					highlightDates={highlightWithRanges}
					inline
				/>
			</div>
		</>
	)
}
