import Tippy from '@tippyjs/react'
import { Link } from 'react-router-dom'

export interface IButtonViewDetailsProps {
	recipeId: string
}

export function ButtonViewDetails({ recipeId }: IButtonViewDetailsProps) {
	return (
		<Tippy content="View recipe details">
			<Link to={`/recipe/${recipeId}`} className="icon-button icon-button-lg text-secondary">
				<i className="far fa-book" />
			</Link>
		</Tippy>
	)
}
