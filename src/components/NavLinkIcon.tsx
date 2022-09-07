import * as React from 'react'
import { NavLink } from 'react-router-dom'

export interface INavLinkIconProps {
	to: string
	faIcon?: string
	activeClassName?: string
	label?: string
}

export function NavLinkIcon({ to, faIcon, activeClassName, label }: INavLinkIconProps) {
	const className = 'mx-2 no-custom'
	const activeClass = activeClassName || 'text-secondary'
	const inactiveClass = 'text-tertiary'

	return (
		<NavLink
			to={to}
			className={({ isActive }) => `${className} ${isActive ? activeClass : inactiveClass}`}>
			{/* <i className={`${faIcon} fs-4`}></i> */}
			<span className="font-display">{label}</span>
		</NavLink>
	)
}
