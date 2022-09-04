import * as React from 'react'
import { Container } from 'react-bootstrap'

export interface IFooterProps {
	hidden?: boolean
}

export function Footer(props: IFooterProps) {
	const { hidden } = props
	if (hidden) {
		return null
	}
	return (
		<>
			<footer className="w-100 bg-secondary position-absolute" style={{ height: '15rem', top: '100%' }}>
				<Container className="text-white h-100 d-flex align-items-center">
					<p>&copy; {new Date().getFullYear()} Recipe App</p>
				</Container>
			</footer>
		</>
	)
}
