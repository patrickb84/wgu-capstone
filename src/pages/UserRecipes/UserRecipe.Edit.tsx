import { useState } from 'react'
import { Button } from 'react-bootstrap'
import IGenericButtonProps from 'types/GenericButton'
import { UserRecipe } from 'types/UserRecipe'
import UserRecipeModal from './UserRecipe.Form'

export interface IUserRecipeEditButtonProps {
	userRecipe: EditingUserRecipe
}

type EditingUserRecipe = Partial<UserRecipe>

export function UserRecipeEditButton(props: IUserRecipeEditButtonProps & IGenericButtonProps) {
	const [showModal, setShowModal] = useState(false)
	const [userRecipeToEdit, setUserRecipeToEdit] = useState<UserRecipe | undefined>(undefined)

	const editRecipe = (userRecipe: UserRecipe) => {
		setUserRecipeToEdit(userRecipe)
		setShowModal(true)
	}

	const hideModal = () => {
		setShowModal(false)
		setUserRecipeToEdit(undefined)
	}

	return (
		<>
			<Button
				variant={props.variant}
				className={props.className}
				onClick={() => editRecipe(props.userRecipe as UserRecipe)}>
				{props.children}
			</Button>

			<UserRecipeModal show={showModal} onHide={hideModal} userRecipe={userRecipeToEdit} />
		</>
	)
}
