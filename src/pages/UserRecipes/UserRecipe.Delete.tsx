import IGenericButtonProps from 'types/GenericButton'
import { UserRecipe } from 'types/UserRecipe'
import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

export interface IUserRecipeDeleteButtonProps extends IGenericButtonProps {
	userRecipeId: string
}

export function UserRecipeDeleteButton(props: IUserRecipeDeleteButtonProps) {
	const { userRecipeId, variant, size, className, style, children } = props
	const [show, setShow] = useState(false)

	const deleteRecipe = async () => {
		try {
			await UserRecipe.delete(userRecipeId)
			setShow(false)
		} catch (error) {
			console.error('🚀 ~ deleteRecipe ~ error', error)
		}
	}
	return (
		<>
			<Button
				variant={variant}
				className={className}
				size={size}
				style={style}
				onClick={() => setShow(true)}>
				{children}
			</Button>

			<Modal centered show={show} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Delete recipe</Modal.Title>
				</Modal.Header>
				<Modal.Body>Are you sure you want to delete this recipe?</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShow(false)}>
						Cancel
					</Button>
					<Button variant="brand" onClick={deleteRecipe}>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}
