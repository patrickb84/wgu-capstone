import { IGroceryListItem, useGroceryList } from 'providers/MealPlanProvider'
import * as React from 'react'
import { Container } from 'react-bootstrap'

export interface IGroceryListPageProps {}

export function GroceryListPage(props: IGroceryListPageProps) {
	const [groceryList, setGroceryList] = useGroceryList()

	React.useEffect(() => {
		setGroceryList()
	}, [setGroceryList])

	return (
		<div>
			<Container>
				<h1 className="display-1">Grocery List</h1>

				{groceryList.map(item => (
					<div key={item.itemName} className="mb-3">
						<div>{item.itemName}</div>
						<div className="text-brand small">
							{item.itemData.map(data => {
								const { measure, recipeId, recipeCount, recipeName } = data
								return (
									<div key={recipeId} className="d-flex justify-content-between">
										<div>{recipeName}</div>
										<div>{`${measure} x ${recipeCount}`}</div>
									</div>
								)
							})}
						</div>
					</div>
				))}
			</Container>
		</div>
	)
}
