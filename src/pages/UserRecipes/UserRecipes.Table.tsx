import Layout from 'components/Layout'
import { useUserRecipes } from 'hooks/MealPlanProvider'
import { useUser } from 'hooks/UserProvider'
import PageHeader, { PageTitle } from 'pages/shared/PageHeader'
import { Container, Table } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import { UserRecipeCreateButton } from './UserRecipe.Create'
import { UserRecipeDeleteButton } from './UserRecipe.Delete'
import { UserRecipeEditButton } from './UserRecipe.Edit'

export interface IUserRecipesTableProps {}

const buttonProps = {
	className: 'mx-1'
}

export function UserRecipesTable(props: IUserRecipesTableProps) {
	const userRecipes = useUserRecipes()
	const user = useUser()

	if (!user) return <Navigate to="/" replace />

	return (
		<Layout>
			<PageHeader variant="brand">
				<PageTitle>Custom Recipes</PageTitle>
				<UserRecipeCreateButton variant="light">Create New Recipe</UserRecipeCreateButton>
			</PageHeader>

			<Container className="py-3">
				{userRecipes.length > 0 ? (
					<Table striped responsive className="border border-light">
						<thead className="bg-secondary text-white">
							<tr>
								<th>Image</th>
								<th>Recipe Name</th>
								<th>Instructions</th>
								<th>Area</th>
								<th>Category</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{userRecipes.map(userRecipe => {
								return (
									<tr key={userRecipe.id}>
										<td>
											{userRecipe.imageUrl ? (
												<img
													src={userRecipe.imageUrl}
													alt={userRecipe.name}
													className="img-fluid"
													style={{ maxWidth: 100 }}
												/>
											) : (
												<></>
											)}
										</td>
										<td>{userRecipe.name}</td>
										<td>
											{userRecipe.instructions
												?.split('\n\n')
												.filter(e => e)
												.map(i => (
													<p key={i}>{i}</p>
												))}
										</td>
										<td>{userRecipe.area}</td>
										<td>{userRecipe.category}</td>
										<td>
											<UserRecipeEditButton {...buttonProps} userRecipe={userRecipe}>
												Edit
											</UserRecipeEditButton>
											<UserRecipeDeleteButton
												{...buttonProps}
												variant="danger"
												userRecipeId={userRecipe.id as string}>
												Delete
											</UserRecipeDeleteButton>
										</td>
									</tr>
								)
							})}
						</tbody>
					</Table>
				) : (
					<div className="text-center my-5">
						<h3 className="text-secondary">No meal plans found.</h3>
						<p className="text-secondary">Click the button below to create a new meal plan.</p>
						<UserRecipeCreateButton variant="secondary" className="mt-3">
							Create New Recipe
						</UserRecipeCreateButton>
					</div>
				)}
			</Container>
		</Layout>
	)
}

export default UserRecipesTable
