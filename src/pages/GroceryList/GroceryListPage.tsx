import { useScheduleMeals } from 'providers/MealPlanProvider'
import { useUser } from 'providers/UserProvider'
import { useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { GroceryList } from 'types/GroceryList'
import PageHeader from 'components/PageHeader'
import Layout from 'components/Layout'

export interface IGroceryListPageProps {}

export function GroceryListPage(props: IGroceryListPageProps) {
	const [groceryList, setGroceryList] = useState<GroceryList | null>(null)
	const scheduledMeals = useScheduleMeals()
	const user = useUser()

	useEffect(() => {
		if (user) {
			GroceryList.generateGroceryList(scheduledMeals, user.uid).then(setGroceryList)
		}
	}, [user, scheduledMeals])

	return (
		<>
			<Layout>
				<PageHeader title="Grocery List" bgColor="tertiary" />

				<Container className="py-5">
					<Row>
						{/* {groceryList?.items.map(item => (
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
							))} */}

						<Col></Col>
						<Col lg={8}>
							<Table>
								{/* <thead>
									<tr>
										{['Item', 'Recipe', 'Measure'].map((header, index) => (
											<th key={index}>{header}</th>
										))}
									</tr>
								</thead> */}
								{groceryList?.items.map(item => {
									return (
										<tbody key={item.itemName}>
											<tr>
												<td colSpan={3} className="fw-bold">
													{item.itemName}
												</td>
											</tr>
											{item.itemData.map(data => {
												const { measure, recipeId, recipeCount, recipeName } = data
												return (
													<tr key={recipeId}>
														<td colSpan={2}>
															{recipeName} ({`x${recipeCount}`})
														</td>
														<td>{`${measure}`}</td>
													</tr>
												)
											})}
										</tbody>
									)
								})}
							</Table>
                  </Col>
                  <Col></Col>
					</Row>
				</Container>
			</Layout>
		</>
	)
}
