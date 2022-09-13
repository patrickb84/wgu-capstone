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
		</>
	)
}
