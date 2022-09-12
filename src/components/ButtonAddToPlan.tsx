import { IconButton, GenericIconButtonProps } from 'components/IconButton'
import { useState } from 'react'
import { Recipezzz } from 'types/ZZZRecipe'
import AddRecipeModal from './AddRecipeModal'

export interface IButtonAddToPlanProps extends GenericIconButtonProps {
	recipe: Recipezzz
}

export default function ButtonAddToPlan(props: IButtonAddToPlanProps) {
	const { iconFaGroup, colorVariant, size, className, recipe } = props

	const [show, setShow] = useState(false)
	const handleShow = () => setShow(true)
	const handleClose = () => setShow(false)

	return (
		<>
			<IconButton
				onClick={handleShow}
				iconFaName="fa-calendar-plus"
				iconFaGroup={iconFaGroup ? iconFaGroup : 'far'}
				colorVariant={colorVariant ? colorVariant : 'secondary'}
				size={size}
				tooltip="Add recipe to meal plan"
				className={className}
			/>
			<AddRecipeModal show={show} handleClose={handleClose} recipe={recipe} />
		</>
	)
}
