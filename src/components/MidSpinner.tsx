import { ClockLoader } from 'react-spinners'

export default function MidSpinner(props: { message?: string }) {
	const { message = 'Loading...' } = props
	return (
		<>
			<div className="bg-white d-flex align-items-center justify-content-center flex-column p-5 rounded">
				<ClockLoader color="#74aa91" size={80} />
				<h2 className="h4 text-tertiary font-display mt-5">{message}</h2>
			</div>
		</>
	)
}
