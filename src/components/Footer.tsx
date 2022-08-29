import * as React from 'react'
import { Container } from 'react-bootstrap'

export interface IFooterProps {}

export function Footer(props: IFooterProps) {
	return (
		<>
			<footer className="w-100 bg-secondary" style={{ height: '18rem' }}>
				<Container className='text-white h-100 d-flex align-items-center'>
					<p>&copy; {new Date().getFullYear()} Recipe App</p>
				</Container>
			</footer>
		</>
	)
}
