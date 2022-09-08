import { useScheduleMeals } from 'providers/MealPlanProvider'
import { useUser } from 'providers/UserProvider'
import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Col, Container, ListGroup, Row, Tab, Table } from 'react-bootstrap'
import { GroceryList, IGroceryListItem } from 'types/GroceryList'
import PageHeader from 'components/PageHeader'
import Layout from 'components/Layout'
import { Link } from 'react-router-dom'
import { IconButton } from 'components/IconButton'

export interface IGroceryListPageProps {}

export function GroceryListPage(props: IGroceryListPageProps) {
	const [items, setItems] = useState<IGroceryListItem[]>([])
	const scheduledMeals = useScheduleMeals()
	const user = useUser()

	useEffect(() => {
		if (user) {
			GroceryList.generateGroceryList(scheduledMeals, user.uid).then(groceryList => {
				console.log(groceryList.items)
				setItems(
					groceryList.items.map(item => {
						return {
							...item,
							included: true
						} as IGroceryListItem
					})
				)
			})
		}
	}, [user, scheduledMeals])

	const toggleIncluded = (item: IGroceryListItem) => {
		setItems(items.map(i => (i.itemName === item.itemName ? { ...i, included: !i.included } : i)))
	}

	const sortPredicate = (a: IGroceryListItem, b: IGroceryListItem) =>
		a.itemName.localeCompare(b.itemName)

	return (
		<>
			<Layout>
				<PageHeader title="Prepare Grocery List" bgColor="tertiary" />
				<Container className="py-5">
					<Row>
						<Col lg={2}>
							<>
								<Button
									variant="primary"
									className="w-100 mb-3"
									onClick={() => {
										setItems(items.map(i => ({ ...i, included: true })))
									}}>
									Include All
								</Button>
								<Button
									variant="primary"
									className="w-100 mb-3"
									onClick={() => {
										setItems(items.map(i => ({ ...i, included: false })))
									}}>
									Exclude All
								</Button>
								<Button
									variant="primary"
									className="w-100 mb-3"
									onClick={() => {
										setItems(items.sort(sortPredicate))
									}}>
									Sort
								</Button>

								<Button variant="brand" className="w-100 mb-3" onClick={() => {}}>
									Approve & Save
								</Button>
							</>
						</Col>
						<Col lg={5}>
							<Card>
								<Card.Header>
									<Card.Title className="mb-0">Items</Card.Title>
								</Card.Header>
								<Card.Body>
									{items.filter(item => item.included).length ? (
										<GroceryListGroup
											items={items.filter(item => item.included).sort(sortPredicate)}
											excludeItem={toggleIncluded}
										/>
									) : (
										<Card.Text>No items included</Card.Text>
									)}
								</Card.Body>
							</Card>
						</Col>
						<Col lg={5}>
							<Card>
								<Card.Header>
									<Card.Title className="mb-0">Excluded Items</Card.Title>
								</Card.Header>
								<Card.Body>
									{items.filter(item => !item.included).length ? (
										<GroceryListGroup
											items={items.filter(item => !item.included).sort(sortPredicate)}
											includeItem={toggleIncluded}
										/>
									) : (
										<Card.Text>No items excluded</Card.Text>
									)}
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</Layout>
		</>
	)
}

export interface IGroceryListGroupProps {
	items: IGroceryListItem[]
	excludeItem?: (item: IGroceryListItem) => void
	includeItem?: (item: IGroceryListItem) => void
}

const GroceryListGroup = ({ items, excludeItem, includeItem }: IGroceryListGroupProps) => {
	return (
		<ListGroup variant="flush">
			{items.map((item: IGroceryListItem) => {
				const { itemName, itemData } = item

				return (
					<ListGroup.Item key={itemName}>
						<div className="d-flex align-items-center justify-content-between">
							<div>
								<div>
									<strong>{itemName}</strong>
								</div>
								<div>
									{itemData.map(data => {
										const { measure, recipeId, recipeCount, recipeName } = data
										const recipeUrl = `/recipes/${recipeId}`
										return (
											<div key={recipeId}>
												<Link to={recipeUrl}>{recipeName}</Link> - {measure}{' '}
												{recipeCount > 1 && (
													<>
														<Badge bg="primary">x{recipeCount}</Badge>
													</>
												)}
											</div>
										)
									})}
								</div>
							</div>
							{excludeItem && (
								<IconButton
									iconFaName="fa-circle-minus"
									iconFaGroup="far"
									colorVariant='brand'
									onClick={() => excludeItem(item)}
									tooltip="Exclude item"
								/>
							)}
							{includeItem && (
								<IconButton
									iconFaName="fa-circle-plus"
									iconFaGroup="far"
									colorVariant='primary'
									onClick={() => includeItem(item)}
									tooltip="Include item"
								/>
							)}
						</div>
					</ListGroup.Item>
				)
			})}
		</ListGroup>
	)
}
