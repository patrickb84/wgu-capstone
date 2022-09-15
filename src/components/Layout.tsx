import * as React from 'react'
import { Navbar } from './Navbar'

export interface ILayoutProps {
	children: React.ReactNode
}

export default function Layout({ children }: ILayoutProps) {
	return (
		<>
			<Navbar />
			<div className="navbar-ref-height" />
			<>{children}</>
			<footer className="bg-light w-100 py-5">
				<div className="container">
					<p>&copy; {new Date().getFullYear()} Sous Chef!</p>
				</div>
			</footer>
		</>
	)
}
