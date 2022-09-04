import { format } from 'date-fns'

const DisplayCardDate = ({ date }: { date: Date }) => {
	const formattedDate = format(date, 'EEE')
	return (
		<>
			<div className="">
				<div className="-font-hand fs-4">{formattedDate}</div>
				<div>{date.toLocaleDateString()}</div>
			</div>
		</>
	)
}

export default DisplayCardDate
