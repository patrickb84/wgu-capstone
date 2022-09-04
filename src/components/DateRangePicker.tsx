import { addDays, differenceInDays } from 'date-fns'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.min.css'
import { DateRangeType } from 'types/DateRangeType'

export interface IDateRangePickerProps {
	dateRange: DateRangeType
	setDateRange: (dateRange: DateRangeType) => void
}

export function DateRangePicker(props: IDateRangePickerProps) {
	const { dateRange, setDateRange } = props
	const [range, setRange] = useState<DateRangeType>(dateRange)
	const [startDate, endDate] = range

	const handleChange = (range: DateRangeType) => {
		setRange(range)
		if (range[0] && range[1]) {
			setDateRange(range)
		}
	}

	const clearDateRange = () => {
		const rengeReset: DateRangeType = [new Date(), addDays(new Date(), 14)]
		setDateRange(rengeReset)
		setRange(rengeReset)
	}

	const getArrayOfDays = () => {
		if (!startDate || !endDate) return []
		const n = differenceInDays(endDate, startDate)
		return Array.from({ length: n + 1 }, (_, i) => addDays(startDate, i))
	}

	const highlightWithRanges = [
		{
			'react-datepicker__day--selected bg-brand text-white': getArrayOfDays()
		}
	]

	return (
		<>
			<div className="override_drp mb-2" style={{ maxWidth: 243 }}>
				<ReactDatePicker
					selected={startDate}
					selectsRange={true}
					startDate={startDate}
					endDate={endDate}
					onChange={handleChange}
					highlightDates={highlightWithRanges}
					inline
				/>

				<Button variant="light" size="sm" className="mt-1 w-100" onClick={clearDateRange}>
					Reset
				</Button>
			</div>
		</>
	)
}
