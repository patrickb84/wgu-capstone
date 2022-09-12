import * as React from 'react'
import { Container } from 'react-bootstrap'

export interface IFooterProps {
	hidden?: boolean
	footerRef: React.RefObject<HTMLDivElement>
}

export function Footer(props: IFooterProps) {
	const { hidden, footerRef } = props
	if (hidden) {
		return null
	}
	return (
		<>
			<footer
				ref={footerRef}
				className="w-100 bg-secondary position-lg-absolute"
				style={{ height: '10rem', bottom: 0 }}>
				<Container className="text-white h-100 d-flex align-items-center">
					<div>&copy; {new Date().getFullYear()} Recipe App</div>
				</Container>
			</footer>
		</>
	)
}
