import Layout from 'components/Layout'
import { useUserRecipes } from 'hooks/MealPlanProvider'
import PageHeader, { PageTitle } from 'pages/shared/PageHeader'
import { Container, Table } from 'react-bootstrap'
import { UserRecipeCreateButton } from './UserRecipe.Create'
import { UserRecipeDeleteButton } from './UserRecipe.Delete'
import { UserRecipeEditButton } from './UserRecipe.Edit'

export interface IUserRecipesTableProps {}

const buttonProps = {
	className: 'mx-1'
}

export function UserRecipesTable(props: IUserRecipesTableProps) {
	const userRecipes = useUserRecipes()

	return (
		<Layout>
			<PageHeader variant="brand">
				<PageTitle>Custom Recipes</PageTitle>
				<UserRecipeCreateButton variant="light">Create New Recipe</UserRecipeCreateButton>
			</PageHeader>

			<Container className="py-3">
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
			</Container>
		</Layout>
	)
}

export default UserRecipesTable
