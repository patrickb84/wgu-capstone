import { useState } from 'react'
import { Button } from 'react-bootstrap'
import IGenericButtonProps from 'types/GenericButton'
import UserRecipeModal from './UserRecipe.Form'

export interface IUserRecipeCreateButtonProps {}

export function UserRecipeCreateButton(props: IUserRecipeCreateButtonProps & IGenericButtonProps) {
	const [showModal, setShowModal] = useState(false)

	const createNewRecipe = () => {
		setShowModal(true)
	}

	const hideModal = () => {
		setShowModal(false)
	}

	return (
		<>
			<Button variant={props.variant} onClick={createNewRecipe}>
				{props.children}
			</Button>

			<UserRecipeModal show={showModal} onHide={hideModal} />
		</>
	)
}
