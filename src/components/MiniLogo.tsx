import * as React from 'react'

export interface IMiniLogoProps {
	colorClass?: string
}

export function MiniLogo(props: IMiniLogoProps) {
	const { colorClass: color } = props
	return (
		<>
			<div className={`text-center ${color ? `text-${color}` : `text-brand`}`}>
				<i className={`far fa-garlic fa-3x mb-0`} />
				<div className={`small font-display`}>Sous Chef!</div>
			</div>
		</>
	)
}
