import { ClockLoader } from 'react-spinners'
import { MiniLogo } from './Logo'

export default function OverlaySpinner() {
	return <>
		<div
			className="bg-secondary"
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				zIndex: 1000,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column',
			}}>
			<div className="mb-5">
				<MiniLogo colorClass="white" />
			</div>
			<ClockLoader color="#fff" size={100} />
			<h2 className="h4 text-white font-display mt-5">Somethin's cookin'...</h2>
		</div>
	</>
}
