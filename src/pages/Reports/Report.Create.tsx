import { HelperModal } from 'components/HelperModal'
import Spacer from 'components/Spacer'
import { useGroceryItems, useIncludedItems, useRecipeSchedule } from 'hooks/MealPlanProvider'
import * as React from 'react'
import { Button, ButtonGroup, Modal } from 'react-bootstrap'

export interface ICreateReportButtonProps {}

export function CreateReportButton(props: ICreateReportButtonProps) {
	const { groceryItems } = useGroceryItems()
	const { includedItems } = useIncludedItems()
	const getSchedule = useRecipeSchedule()
	const [show, setShow] = React.useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const handleClicked = async () => {
		const includedGroceryItems = includedItems.map(itemName => {
			return groceryItems.find(item => item.ingredientName === itemName)
		})
		console.log(includedGroceryItems)
		const schedule = await getSchedule()
		console.log(schedule)
	}

	return (
		<>
			<div>
				<ButtonGroup>
					<Button variant="primary" onClick={handleClicked}>
						Generate Report
					</Button>
					<HelperModal title="Meal Plan Report" asButton>
						<>
							<p>
								A meal plan report is a summary of your meal plan. It includes a list of all the meals you have
								planned for the week, as well as a grocery list of all the ingredients you need to buy.
							</p>
							<p>
								You can print this report and take it with you to the grocery store to make sure you don't
								forget anything.
							</p>
						</>
					</HelperModal>
				</ButtonGroup>
			</div>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Creating Meal Plan Report</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Report</p>
					<Button variant="outline-secondary" className="w-100" onClick={handleClicked}>
						Test
					</Button>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}
