import Tippy from '@tippyjs/react'
import mealdb from 'api/mealdb'
import { ApiCategory } from 'api/mealdb/types/ApiCategory'
import Layout from 'components/Layout'
import Spacer from 'components/Spacer'
import { compareAsc, getDayOfYear } from 'date-fns'
import { useActiveMealPlan } from 'hooks/MealPlanProvider'
import { IMeasuredIngredient, IRecipe, Recipe } from 'pages/Recipes/types/Recipe'
import ScheduledMeal, { IScheduledMeal } from 'pages/ScheduledMeals/types/ScheduledMeal'
import PageHeader, { PageTitle } from 'pages/shared/PageHeader'
import * as React from 'react'
import {
	Accordion,
	Button,
	Card,
	Col,
	Collapse,
	Container,
	Form,
	InputGroup,
	Modal,
	Row,
	Tab,
	Table
} from 'react-bootstrap'
import bonsole from 'utils/exceptions'

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
	const { activeMealPlan } = useActiveMealPlan()

	// const [scheduledMeals, setScheduledMeals] = React.useState<ScheduledMeal[]>([])
	// const [recipes, setRecipes] = React.useState<(IRecipe & { count: number })[]>([])
	const [groceryItems, setGroceryItems] = React.useState<GroceryItem[]>([])
	const [includedItems, setIncludedItems] = React.useState<string[]>([])
	const [show, setShow] = React.useState(false)
	const [searchTerm, setSearchTerm] = React.useState('')

	const handleClose = () => setShow(false)

	React.useEffect(() => {
		if (activeMealPlan) {
			const fetch2 = async () => {
				// Scheduled Meals
				const $meals = await ScheduledMeal.getMealPlanScheduledMeals(activeMealPlan)
				const meals = $meals.map(scheduledMeal => new ScheduledMeal(scheduledMeal))
				bonsole.data('sched meals', meals)
				// setScheduledMeals(meals)

				// Recipes
				const $recipes = await Promise.all(
					meals
						.map(scheduledMeal => scheduledMeal.recipeId)
						.map(async recipeId => (await mealdb.fetchRecipe(recipeId)) as ApiCategory)
				)
				const $$recipes = $recipes.map(recipe => new Recipe(recipe) as IRecipe)

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
				// bonsole.data('recipesWithCount', recipesWithCount)
				// setRecipes(recipesWithCount)

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

				bonsole.data('ingredients', ingredientsPlus)

				type IngredientPlus = IMeasuredIngredient & { recipeCount: number }

				const getUniqueIngredients = (ingredients: IngredientPlus[]) => {
					const unique: string[] = []
					ingredients.forEach(({ ingredientName }) => {
						const uniqueIndex = unique.findIndex(
							u => u.toLowerCase() === ingredientName.toLowerCase()
						)
						if (uniqueIndex === -1) {
							unique.push(ingredientName)
						}
					})
					return unique
				}

				const uniqueNames = getUniqueIngredients(ingredientsPlus)

				bonsole.data('unique ingredients', uniqueNames)

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

				bonsole.success('ingredients', ingredients)

				setGroceryItems(ingredients)
				setIncludedItems(ingredients.map(ig => ig.ingredientName))
			}

			fetch2()
		}
	}, [activeMealPlan])

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
			items = items.filter(item =>
				item.ingredientName.toLowerCase().includes(searchTerm.toLowerCase())
			)
		}
		return items.sort((a, b) => a.ingredientName.localeCompare(b.ingredientName))
	}

	return (
		<>
			<Layout>
				<PageHeader variant="secondary">
					<PageTitle>Grocery List</PageTitle>
					<Button variant="light" onClick={() => setShow(true)}>
						View Data
					</Button>
				</PageHeader>

				<Container className="my-3">
					<Row>
						<Col>
							<Card>
								<Card.Body>
									<Card.Title>Shopping List</Card.Title>
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
							{/* <Form.Group className="mb-3 ms-auto" style={{ width: 300 }}>
							<Form.Control placeholder="Search by ingredient" />
						</Form.Group> */}
							<Card>
								<Card.Header>
									<div className="d-flex align-items-center justify-content-between">
										<span>{groceryItems.length} Items</span>
										{/* <Button variant="primary" onClick={() => setCollapseData(!collapseData)}>
										{collapseData ? 'Expand' : 'Collapse'}
									</Button> */}
										<InputGroup className="ms-auto" style={{ width: 300 }}>
											<Form.Control
												placeholder="Filter by ingredient"
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
									<Table size="sm" bordered>
										<thead>
											<tr>
												<th>
													<div className="px-1">
														<Tippy content="Check/Uncheck all">
															<Form.Check
																type="checkbox"
																checked={
																	includedItems.length === groceryItems.length
																}
																onChange={() => {
																	if (
																		includedItems.length === groceryItems.length
																	) {
																		setIncludedItems([])
																	} else {
																		setIncludedItems(
																			groceryItems.map(ig => ig.ingredientName)
																		)
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
																<span className="text-danger">
																	({m.recipeCount})
																</span>
															)
															if (i === 0) {
																return (
																	<tr key={i}>
																		<td rowSpan={rowSpan}>
																			<div className="px-1">
																				<Form.Check
																					type="checkbox"
																					checked={isItemIncluded(
																						gi.ingredientName
																					)}
																					onChange={() =>
																						handleToggleIncluded(
																							gi.ingredientName
																						)
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
						<Button
							onClick={() => setOpen(!open)}
							variant="primary"
							size="sm"
							className="me-2">
							{open ? (
								<i className="fas fa-chevron-down" />
							) : (
								<i className="fas fa-chevron-right" />
							)}
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
							const rowColor =
								getDayOfYear(scheduledMeal.mealDate) % 2 === 0 ? 'bg-gray-200' : 'bg-white'
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
