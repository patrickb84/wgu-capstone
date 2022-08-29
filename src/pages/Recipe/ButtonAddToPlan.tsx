import Tippy from '@tippyjs/react'

export interface IButtonAddToPlanProps {
	recipeId: string
	userId?: string
}

export function ButtonAddToPlan(props: IButtonAddToPlanProps) {
	return (
		<Tippy content="Add to meal plan">
			<button className="icon-button icon-button-lg text-secondary">
				<i className="far fa-calendar-plus" />
			</button>
		</Tippy>
	)
}
