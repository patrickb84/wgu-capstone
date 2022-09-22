import * as React from 'react'
import { Link } from 'react-router-dom'
import ROUTES from 'routes/routes'

export interface IMiniLogoProps {
	colorClass?: string
}

export function MiniLogo(props: IMiniLogoProps) {
	const { colorClass: color } = props
	return (
		<>
			<Link to={ROUTES.HOME} className='no-underline' data-testid='logo-link'>
				<div data-testid='logo-wrapper' className={`text-center ${color ? `text-${color}` : `text-brand`}`}>
					<i className={`far fa-garlic fa-3x mb-0`} />
					<div className={`small font-display`}>Sous Chef!</div>
				</div>
			</Link>
		</>
	)
}
