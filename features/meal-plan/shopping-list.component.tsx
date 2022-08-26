import { Table } from '../../components/Table'
import { useMealPlan } from './meal-plan.state'

export interface IShoppingListProps {}

export default function ShoppingList(props: IShoppingListProps) {
	const mealPlan = useMealPlan()

	return (
		<>
			<div className="mt-5">
				<h2>Shopping List</h2>
				<Table columns={['item', 'recipes', 'actions']}>
					{mealPlan.shoppingList.map(ingredient => (
						<tr key={ingredient.id}>
							<td>{ingredient.name}</td>
							<td>
								{ingredient.recipesMeta.map(r => (
									<div key={r.recipe}>
										<table>
											<tbody>
												<tr>
													<td>{r.mealDate.toLocaleDateString()}</td>
													<td>
														<strong>{r.recipeName}</strong>
													</td>
													<td>
														<span className="text-danger">{r.recipeIngredientMeasure}</span>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								))}
							</td>
							<td></td>
						</tr>
					))}
				</Table>
			</div>
		</>
	)
}
