import Tippy from '@tippyjs/react'
import mealdb from 'api/mealdb'
import { ApiCategory } from 'api/mealdb/types/ApiCategory'
import Layout from 'components/Layout'
import OverlaySpinner from 'components/OverlaySpinner'
import Spacer from 'components/Spacer'
import { getDayOfYear } from 'date-fns'
import { useUser } from 'hooks/UserProvider'
import { IMeasuredIngredient, IRecipe, Recipe } from 'pages/Recipes/types/Recipe'
import ScheduledMeal from 'pages/ScheduledMeals/types/ScheduledMeal'
import PageHeader, { PageSubtitle, PageTitle } from 'pages/shared/PageHeader'
import * as React from 'react'
import { Button, Card, Col, Collapse, Container, Form, InputGroup, Modal, Row, Table } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import ROUTES from 'routes/routes'
import Papa from 'papaparse'
import jsPDF from 'jspdf'
import { Link } from 'react-router-dom'
import { useActivePlan } from 'hooks/MealPlanProvider'

export interface IGroceryListTableProps {}

type GroceryItemMeta = {
	measure: string
	recipeName: string
	recipeCount: number
}
type GroceryItem = {
	ingredientName: string
	metadata: GroceryItemMeta[]
}

export default function GroceryListTable(props: IGroceryListTableProps) {
	const user = useUser()
	const location = useLocation()
	const navigate = useNavigate()
	const pdfRef = React.createRef<HTMLTableElement>()

	const [scheduledMeals, setScheduledMeals] = React.useState<ScheduledMeal[]>([])
	const [recipes, setRecipes] = React.useState<(IRecipe & { count: number })[]>([])
	const [groceryItems, setGroceryItems] = React.useState<GroceryItem[]>([])
	const [includedItems, setIncludedItems] = React.useState<string[]>([])
	const [show, setShow] = React.useState(false)
	const [searchTerm, setSearchTerm] = React.useState('')
	const { activePlan } = useActivePlan()

	const handleClose = () => setShow(false)
	const [loading, setLoading] = React.useState(false)

	React.useEffect(() => {
		if (!user) navigate(ROUTES.LOGIN, { replace: true, state: { redirect: location.pathname } })
	}, [location.pathname, navigate, user])
	
	React.useEffect(() => {
		try {
			if (activePlan) {
				const fetch2 = async () => {
					setLoading(true)

					// Scheduled Meals
					if (!activePlan.id) throw new Error('No active plan')
					const $meals = await ScheduledMeal.getMealPlanScheduledMeals(activePlan.id)
					const meals = $meals.map(scheduledMeal => new ScheduledMeal(scheduledMeal))
					setScheduledMeals(meals)

					// Recipes
					const $recipes = await Promise.all(
						meals
							.map(scheduledMeal => scheduledMeal.recipeId)
							.map(async recipeId => (await mealdb.fetchRecipe(recipeId)) as ApiCategory)
					)
					const $$recipes = $recipes.filter(e => e).map(recipe => new Recipe(recipe) as IRecipe)

					// Recipe Counts
					function getUniqueRecipesAndCounts(recipes: IRecipe[]) {
						const unique: IRecipe[] = []
						const recipeAndCount: (IRecipe & { count: number })[] = []
						recipes.forEach(recipe => {
							const uniqueIndex = unique.findIndex(u => u.id === recipe.id)
							if (uniqueIndex === -1) {
								unique.push(recipe)
								recipeAndCount.push({ ...recipe, count: 1 })
							} else {
								recipeAndCount[uniqueIndex].count++
							}
						})
						return recipeAndCount
					}
					const recipesWithCount = getUniqueRecipesAndCounts($$recipes)
					setRecipes(recipesWithCount)

					// * Ingredients
					const ingredientsPlus: IngredientPlus[] = recipesWithCount
						.map(recipe =>
							recipe.ingredients.map(
								ingredient =>
									({
										...ingredient,
										recipeId: recipe.id,
										recipeName: recipe.name,
										recipeCount: recipe.count
									} as IngredientPlus)
							)
						)
						.flat()

					type IngredientPlus = IMeasuredIngredient & { recipeCount: number }

					const getUniqueIngredients = (ingredients: IngredientPlus[]) => {
						const unique: string[] = []
						ingredients.forEach(({ ingredientName }) => {
							const uniqueIndex = unique.findIndex(u => u.toLowerCase() === ingredientName.toLowerCase())
							if (uniqueIndex === -1) {
								unique.push(ingredientName)
							}
						})
						return unique
					}

					const uniqueNames = getUniqueIngredients(ingredientsPlus)

					const ingredients = uniqueNames.map(ingredientName => {
						const ingredientPlus = ingredientsPlus.filter(
							ig => ig.ingredientName.toLowerCase() === ingredientName.toLowerCase()
						)
						const metadata = ingredientPlus.map(ig => ({
							measure: ig.measure,
							recipeName: ig.recipeName,
							recipeCount: ig.recipeCount
						}))
						return {
							ingredientName,
							metadata
						}
					})

					setGroceryItems(ingredients)
					setIncludedItems(ingredients.map(ig => ig.ingredientName))
					setLoading(false)
				}

				fetch2()
			}
		} catch (error) {
			console.error(error)
		}
	}, [activePlan])

	const handleToggleIncluded = (ingredientName: string) => {
		const index = includedItems.findIndex(i => i === ingredientName)
		if (index === -1) {
			setIncludedItems([...includedItems, ingredientName])
		} else {
			const newIncludedItems = [...includedItems]
			newIncludedItems.splice(index, 1)
			setIncludedItems(newIncludedItems)
		}
	}

	const isItemIncluded = (ingredientName: string) => {
		return includedItems.findIndex(i => i === ingredientName) !== -1
	}

	const dataFeed = () => {
		let items = groceryItems
		if (searchTerm) {
			items = items.filter(item => item.ingredientName.toLowerCase().includes(searchTerm.toLowerCase()))
		}
		return items.sort((a, b) => a.ingredientName.localeCompare(b.ingredientName))
	}

	const getCSV = () => {
		const csv = groceryItems
			.filter(item => isItemIncluded(item.ingredientName))
			.map(item => {
				const { ingredientName, metadata } = item
				return metadata.map((m, idx) => {
					return {
						ingredientName: idx === 0 ? ingredientName : '',
						measure: m.measure,
						recipeName: m.recipeName,
						recipeCount: m.recipeCount
					}
				})
			})
			.flat()
		return csv
	}

	const getCSV2 = () => {
		const csv = groceryItems
			.filter(item => isItemIncluded(item.ingredientName))
			.map(item => {
				const { ingredientName, metadata } = item
				const measures = metadata.map(m => m.measure)
				const recipeNames = metadata.map(m => m.recipeName)
				const recipeCounts = metadata.map(m => m.recipeCount)
				return {
					ingredientName,
					measures,
					recipeNames,
					recipeCounts
				}
			})
		return csv
	}

	const downloadCSV = () => {
		const csv = getCSV()
		const csvString = Papa.unparse(csv)
		const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
		const url = URL.createObjectURL(blob)
		const link = document.createElement('a')
		link.setAttribute('href', url)
		link.setAttribute('download', 'sous-chef.csv')
		link.style.visibility = 'hidden'
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	const downloadJSON = () => {
		const data = groceryItems.filter(item => isItemIncluded(item.ingredientName))
		const json = JSON.stringify(data, null, 2)
		const blob = new Blob([json], { type: 'application/json;charset=utf-8;' })
		const url = URL.createObjectURL(blob)
		const link = document.createElement('a')
		link.setAttribute('href', url)
		link.setAttribute('download', 'sous-chef.json')
		link.style.visibility = 'hidden'
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	const downloadPDF = () => {
		const data = groceryItems.filter(item => isItemIncluded(item.ingredientName))
		console.log('🚀 ~ downloadPDF ~ data', data)

		const doc = new jsPDF('l', 'mm', [1200, 1210])

		const pdfjs = pdfRef.current ? pdfRef.current : null
		if (pdfjs) {
			doc.html(pdfjs, {
				callback: function (doc) {
					doc.save('grocery-list.pdf')
				},
				x: 10,
				y: 10
			})
		}
	}
	return (
		<>
			{loading && <OverlaySpinner />}
			<Layout>
				<PageHeader variant="secondary">
					<div>
						<PageTitle>Grocery List</PageTitle>
						<PageSubtitle>
							{groceryItems.length} items, {recipes.length} different recipes, {scheduledMeals.length} meals
						</PageSubtitle>
					</div>
				</PageHeader>

				{!scheduledMeals.length ? (
					<>
						<Container className="my-3">
							<div className="py-lg-4 px-lg-5 p-4 mb-3 bg-light rounded-4">
								<div className="mb-4">
									<h2 className="h3">You'll see this page fill up</h2>
									<p className="mb-0">
										Once you've added some meals to your meal plan, you'll see a list of ingredients here. You
										can use this list to create a grocery list, or to see what you have on hand.
									</p>
								</div>
								<hr />
								{!activePlan && (
									<div className="mb-4">
										<h2 className="h5 mb-3">
											Have you created a meal plan? Or maybe you don't have an active one.
										</h2>
										<p className="mb-0">You can create a meal plan by clicking the button below.</p>
										<div className="mt-3">
											<Link to={ROUTES.HOME} className="btn btn-secondary btn-sm">
												Create a meal plan
											</Link>
										</div>
									</div>
								)}
								{!scheduledMeals.length && (
									<div className="mb-4">
										<h2 className="h5 mb-3">You don't have any scheduled meals.</h2>

										<p className="mb-0">
											You can schedule meals by finding recipes and clicking the calendar icon next to them.
										</p>
										<div className="mt-3">
											<Link to={ROUTES.RECIPES} className="btn btn-secondary btn-sm">
												Find recipes
											</Link>
										</div>
									</div>
								)}
							</div>
						</Container>
					</>
				) : (
					<>
						<Container className="my-3 d-flex align-items-center justify-content-end">
							<p className="mb-0">Download</p>
							<Spacer w={0.8} />
							<Button variant="dark" onClick={() => downloadJSON()}>
								<i className="fas fa-download mr-1" /> JSON
							</Button>
							<Spacer w={0.8} />
							<Button variant="dark" onClick={() => downloadCSV()}>
								<i className="fas fa-download" /> CSV
							</Button>
							<Spacer w={0.8} />
							<Button variant="dark" onClick={() => downloadPDF()}>
								<i className="fas fa-download" /> PDF
							</Button>
						</Container>

						<Container className="my-3">
							<Row>
								<Col>
									<Card className="mb-4">
										<Card.Body>
											<Card.Title>Shopping List ({includedItems.length})</Card.Title>
											<div>
												{includedItems.length ? (
													includedItems
														.sort((a, b) => a.localeCompare(b))
														.map((item, index) => {
															return (
																<div key={index}>
																	<Form.Check
																		type="checkbox"
																		checked={isItemIncluded(item)}
																		onChange={e => handleToggleIncluded(item)}
																		label={item}
																	/>
																</div>
															)
														})
												) : (
													<div className="text-muted">No items selected</div>
												)}
											</div>
										</Card.Body>
									</Card>
								</Col>
								<Col lg={8}>
									<Card>
										<Card.Header>
											<div className="d-flex align-items-center justify-content-between">
												<span>Required Ingredients</span>
												{/* <Button variant="primary" onClick={() => setCollapseData(!collapseData)}>
											{collapseData ? 'Expand' : 'Collapse'}
										</Button> */}
												<InputGroup className="ms-auto" style={{ width: 200 }}>
													<Form.Control
														placeholder="Lookup item"
														value={searchTerm}
														onChange={e => setSearchTerm(e.target.value)}
													/>
													{!!searchTerm && (
														<Button variant="light" onClick={() => setSearchTerm('')}>
															<i className="far fa-xmark" />
														</Button>
													)}
												</InputGroup>
											</div>
										</Card.Header>

										<Card.Body>
											<Card.Title>Total ({groceryItems.length})</Card.Title>
											<Spacer h={1} />
											<Table size="sm" bordered ref={pdfRef}>
												<thead>
													<tr>
														<th>
															<div className="px-1">
																<Tippy content="Check/Uncheck all">
																	<Form.Check
																		type="checkbox"
																		checked={includedItems.length === groceryItems.length}
																		onChange={() => {
																			if (includedItems.length === groceryItems.length) {
																				setIncludedItems([])
																			} else {
																				setIncludedItems(groceryItems.map(ig => ig.ingredientName))
																			}
																		}}
																	/>
																</Tippy>
															</div>
														</th>
														<th>Ingredient</th>
														<th>Measure</th>
														<th>Recipe</th>
													</tr>
												</thead>
												<tbody>
													{dataFeed().map((gi, index) => {
														const rowSpan = gi.metadata.length
														return (
															<React.Fragment key={index}>
																{gi.metadata.map((m, i) => {
																	const showCount = m.recipeCount > 1 && (
																		<span className="text-danger">({m.recipeCount})</span>
																	)
																	if (i === 0) {
																		return (
																			<tr key={i}>
																				<td rowSpan={rowSpan}>
																					<div className="px-1">
																						<Form.Check
																							type="checkbox"
																							checked={isItemIncluded(gi.ingredientName)}
																							onChange={() =>
																								handleToggleIncluded(gi.ingredientName)
																							}
																						/>
																					</div>
																				</td>
																				<td
																					className="fw-bold"
																					style={{ textTransform: 'capitalize' }}
																					rowSpan={rowSpan}>
																					{gi.ingredientName}
																				</td>
																				<td className="small">
																					{m.measure} {showCount}
																				</td>
																				<td className="small">
																					{m.recipeName} {showCount}
																				</td>
																			</tr>
																		)
																	}
																	return (
																		<tr key={i}>
																			<td className="small">
																				{m.measure} {showCount}
																			</td>
																			<td className="small">
																				{m.recipeName} {showCount}
																			</td>
																		</tr>
																	)
																})}
															</React.Fragment>
														)
													})}
												</tbody>
											</Table>
										</Card.Body>
									</Card>
								</Col>
							</Row>
						</Container>
					</>
				)}

				<Spacer h={5} />
			</Layout>

			<Modal show={show} onHide={handleClose} size="lg" scrollable>
				<Modal.Header closeButton>
					<Modal.Title>JSON Data</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<pre>
						{JSON.stringify(
							groceryItems.filter(item => isItemIncluded(item.ingredientName)),
							null,
							2
						)}
					</pre>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={handleClose}>
						Ok
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

interface ICollapsible {
	children: React.ReactNode
	title: string
	defaultOpen?: boolean
}

const Collapsible = ({ children, title, defaultOpen }: ICollapsible) => {
	const [open, setOpen] = React.useState(true)

	React.useEffect(() => {
		if (defaultOpen) {
			setOpen(defaultOpen)
		}
	}, [defaultOpen])

	return (
		<>
			<Container className="my-3">
				<Card>
					<Card.Header className="d-flex align-items-center justify-content-start">
						<Button onClick={() => setOpen(!open)} variant="primary" size="sm" className="me-2">
							{open ? <i className="fas fa-chevron-down" /> : <i className="fas fa-chevron-right" />}
						</Button>{' '}
						<span className="">{title}</span>
					</Card.Header>
					<Collapse in={open}>
						<div style={{ maxHeight: '25rem', overflow: 'auto' }}>
							<div className="p-3">
								<>{children}</>
							</div>
						</div>
					</Collapse>
				</Card>
			</Container>
		</>
	)
}

interface IGroceryListTableOther {
	scheduledMeals: ScheduledMeal[]
	recipes: (Recipe & { count?: number })[]
}
export const ScheduledMealsCollapsible = ({ scheduledMeals, recipes }: IGroceryListTableOther) => {
	return (
		<Collapsible title={`Scheduled Meals: ${scheduledMeals.length || 0}`}>
			<Table size="sm" bordered>
				<thead>
					<tr>
						<th className="d-none">id</th>
						<th>meal date</th>
						{/* <th>plan id</th> */}
						<th>recipe id</th>
						<th>recipe name</th>
					</tr>
				</thead>
				<tbody>
					{scheduledMeals
						.sort((a, b) => a.mealDate.getTime() - b.mealDate.getTime())
						.map((scheduledMeal, index) => {
							const rowColor = getDayOfYear(scheduledMeal.mealDate) % 2 === 0 ? 'bg-gray-200' : 'bg-white'
							const recipe = recipes.find(recipe => recipe.id === scheduledMeal.recipeId)
							return (
								<tr key={index} className={rowColor}>
									<td className="d-none">{scheduledMeal.id}</td>
									<td>{scheduledMeal.mealDate.toLocaleDateString()}</td>
									{/* <td>{scheduledMeal.mealPlanId}</td> */}
									<td>{scheduledMeal.recipeId}</td>
									<td>{recipe?.name}</td>
								</tr>
							)
						})}
				</tbody>
			</Table>
		</Collapsible>
	)
}

export const RecipeTableCollapsible = ({ recipes, scheduledMeals }: IGroceryListTableOther) => {
	return (
		<Collapsible title={`Recipes and counts: ${recipes.length || 0}`}>
			<Table size="sm" hover>
				<thead>
					<tr>
						<th>Recipe</th>
						<th>Dates of meal</th>
						<th>Count</th>
					</tr>
				</thead>
				<tbody>
					{recipes
						.sort((a, b) => a.name.localeCompare(b.name))
						.map(recipe => (
							<tr key={recipe.id}>
								<td>{recipe.name}</td>
								<td>
									<ul className="list-unstyled small mb-0">
										{scheduledMeals
											.filter(scheduledMeal => scheduledMeal.recipeId === recipe.id)
											.map(m => m.mealDate.toLocaleDateString())
											.map(d => (
												<li key={d}>{d}</li>
											))}
									</ul>
								</td>
								<td>{recipe.count}</td>
							</tr>
						))}
				</tbody>
			</Table>
		</Collapsible>
	)
}
