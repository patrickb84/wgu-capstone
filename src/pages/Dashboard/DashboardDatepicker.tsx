import { DateRangePicker, IDateRangePickerProps } from 'components/DateRangePicker'
import { Button } from 'react-bootstrap'

const DashboardDatepicker = ({ dateRange, setDateRange }: IDateRangePickerProps) => {
	return (
		<div style={{ maxWidth: 243 }}>
			<DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
			<Button variant="secondary-gray" size="sm" className="w-100">
				Show All Planned Dates
			</Button>
		</div>
	)
}

export default DashboardDatepicker
