import { format } from 'date-fns'

const DisplayCardDate = ({ date }: { date: Date }) => {
	return (
		<>
			<div className="fw-bold">{format(date, 'EEEE')}</div>
			<div className='text-muted'>{date.toLocaleDateString()}</div>
		</>
	)
}

export default DisplayCardDate
