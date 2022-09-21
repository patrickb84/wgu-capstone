import Tippy from '@tippyjs/react'
import mealdb from 'api/mealdb'
import { ApiCategory } from 'types/ApiCategory'
import Spacer from 'components/Spacer'
import { IMeasuredIngredient, IRecipe, Recipe } from 'types/Recipe'
import ScheduledMeal from 'types/ScheduledMeal'
import * as React from 'react'
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap'
import Papa from 'papaparse'
import jsPDF from 'jspdf'
import { useActivePlan, useGroceryItems, useIncludedItems } from 'hooks/MealPlanProvider'
import MidSpinner from 'components/MidSpinner'
import { GroceryPageInfo } from './InfoMessage'
import ShoppingSublist from './ShoppingSublist'

export interface IGroceryListTableProps {}

export type GroceryItemMeta = {
	measure: string
	recipeName: string
	recipeCount: number
}

export type GroceryItem = {
	ingredientName: string
	metadata: GroceryItemMeta[]
}

export default function GroceryListTable(props: IGroceryListTableProps) {
	const { groceryItems, setGroceryItems } = useGroceryItems()
	const { includedItems, setIncludedItems } = useIncludedItems()
	const [scheduledMeals, setScheduledMeals] = React.useState<ScheduledMeal[]>([])
	const [searchTerm, setSearchTerm] = React.useState('')
	const { activePlan } = useActivePlan()
	const [loading, setLoading] = React.useState(false)

	React.useEffect(() => {
		try {
			if (activePlan) {
				const parseOutIngredientsFromScheduledRecipes = async () => {
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

				parseOutIngredientsFromScheduledRecipes()
			}
		} catch (error) {
			console.error(error)
		}
	}, [activePlan, setGroceryItems, setIncludedItems])

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

	const dataFeed = (items: GroceryItem[]) => {
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
		const doc = new jsPDF('p', 'pt', 'letter')

		const margins = {
			top: 80,
			bottom: 60,
			left: 40,
			width: 522
		}
		doc.html(document.getElementById('pdf')!, {
			margin: [margins.left, margins.top, margins.left, margins.bottom],
			width: margins.width,
			autoPaging: 'text',

			callback: function (doc) {
				doc.save('grocery-list.pdf')
			}
		})
	}

	if (loading) {
		return <MidSpinner />
	}

	return (
		<>
			{!scheduledMeals.length ? (
				<GroceryPageInfo scheduledMeals={scheduledMeals} />
			) : (
				<>
					<div className="my-3 d-flex align-items-center justify-content-end">
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
						<Spacer w={0.8} />
					</div>
					{/* <div className="my-3 d-flex align-items-center justify-content-end">
							<CreateReportButton />
						</div> */}

					<div className="my-3">
						<Row>
							<Col>
								<ShoppingSublist
									includedItems={includedItems}
									isItemIncluded={isItemIncluded}
									handleToggleIncluded={handleToggleIncluded}
								/>
							</Col>
							<Col lg={8}>
								<Card>
									<Card.Header>
										<div className="d-flex align-items-center justify-content-between">
											<span>Required Ingredients</span>
											<InputGroup className="ms-auto" style={{ width: 200 }}>
												<Form.Control
													placeholder="Lookup item"
													value={searchTerm}
													onChange={e => setSearchTerm(e.target.value)}
												/>
												{/* <Button
														variant="light"
														disabled={!searchTerm}
														onClick={() => setSearchTerm('')}>
														<i className="far fa-xmark" />
													</Button> */}
											</InputGroup>
										</div>
									</Card.Header>

									<Card.Body>
										<Card.Title>Total ({groceryItems.length})</Card.Title>
										<Spacer h={1} />
										<table className="table table-sm table-bordered" id="pdfTable">
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
												{dataFeed(groceryItems).map((gi, index) => {
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
										</table>
									</Card.Body>
								</Card>
							</Col>
						</Row>
					</div>
				</>
			)}
			{/* pdf table */}
			<div className="d-none">
				<table id="pdf">
					<tbody>
						<tr style={{ fontWeight: 'bold', fontSize: 10, whiteSpace: 'nowrap' }}>
							<th>Item</th>
							<th>Measure</th>
							<th>Recipe</th>
							<th>Recipe count</th>
						</tr>
						{groceryItems
							.map(gi => gi.metadata.map(m => ({ ...m, ingredientName: gi.ingredientName })))
							.flat()
							.map((m, i) => {
								return (
									<tr key={i} style={{ fontSize: 10, whiteSpace: 'nowrap' }}>
										<td>{m.ingredientName}</td>
										<td>{m.measure} </td>
										<td>{m.recipeName}</td>
										<td>{m.recipeCount}</td>
									</tr>
								)
							})}
					</tbody>
				</table>
			</div>
		</>
	)
}
