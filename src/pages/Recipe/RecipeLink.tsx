import * as React from 'react'
import { Link } from 'react-router-dom'

export interface IRecipeLinkProps {
	url: string
}

export function RecipeLink({ url }: IRecipeLinkProps) {
	return (
		<>
			<div className="pt-4 text-end pe-2 small i">
				<Link className="text-tertiary" to={url}>
					Original Source
				</Link>
			</div>
		</>
	)
}
