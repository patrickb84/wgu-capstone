import * as React from 'react'
import { MiniLogo } from './Logo'
import { Navbar } from './Navbar'

export interface ILayoutProps {
	children: React.ReactNode
}

export default function Layout({ children }: ILayoutProps) {
	return (
		<>
			<Navbar />
			<div className="navbar-ref-height" />
			<div style={{ minHeight: '78vh' }}>
				<>{children}</>
			</div>
			<footer className="bg-white text-brand w-100 py-5 border border-top">
				<div className="container">
					<MiniLogo colorClass="brand" />

					<p className="text-center mt-4 small mb-0">&copy; {new Date().getFullYear()} Sous Chef!</p>
				</div>
			</footer>
		</>
	)
}
