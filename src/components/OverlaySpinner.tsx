import * as React from 'react'
import { ClockLoader } from 'react-spinners'
import { MiniLogo } from './Logo'

export interface IOverlaySpinnerProps {
	show?: boolean
}

export default function OverlaySpinner(props: IOverlaySpinnerProps) {
	return props.show ? (
		<>
			<div
				className="bg-brand"
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					zIndex: 1000,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
                    flexDirection: 'column'
				}}>
				<div className="mb-5">
					<MiniLogo colorClass="white" />
				</div>
				<ClockLoader color="#fff" size={100} />
				<h2 className="text-white font-display mt-5">Waiting for that timer to ring...</h2>
			</div>
		</>
	) : null
}
