import * as React from 'react'

export interface IMiniLogoProps {}

export function MiniLogo(props: IMiniLogoProps) {
	return (
		<>
			<div className={`text-brand`}>
				<i className={`far fa-garlic fa-3x mb-0`} />
				<div className={`small font-display`}>Sous Chef!</div>
			</div>
		</>
	)
}
