import { ClockLoader } from 'react-spinners'

export default function MidSpinner(props: { message?: string }) {
	const { message = 'Loading...' } = props
	return (
		<>
			<div className="bg-secondary d-flex align-items-center justify-content-center flex-column p-5 rounded">
				<ClockLoader color="#fff" size={80} />
				<h2 className="h4 text-white font-display mt-5">{message}</h2>
			</div>
		</>
	)
}
