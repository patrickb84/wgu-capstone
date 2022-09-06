import * as React from 'react'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

export interface ILayoutProps {
	children: React.ReactNode
}

export default function Layout({ children }: ILayoutProps) {
	const navbarRef = React.useRef<HTMLDivElement>(null)
	const [navbarHeight, setNavbarHeight] = React.useState(0)

	React.useEffect(() => {
		if (navbarRef.current) {
			setNavbarHeight(navbarRef.current.offsetHeight)
		}
	}, [navbarRef])

	return (
		<main className="min-h-100 position-relative">
			<Navbar navbarRef={navbarRef} />
			<div style={{ marginTop: navbarHeight }} />

			<>{children}</>

			<Footer />
		</main>
	)
}
