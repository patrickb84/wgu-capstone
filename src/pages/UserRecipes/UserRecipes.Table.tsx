import Layout from 'components/Layout'
import { useUserRecipes } from 'hooks/MealPlanProvider'
import { useUser } from 'hooks/UserProvider'
import PageHeader, { PageTitle } from 'pages/shared/PageHeader'
import { useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import ROUTES from 'routes/routes'
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
	const location = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		if (!user) navigate(ROUTES.LOGIN, { replace: true, state: { redirect: location.pathname } })
	}, [location.pathname, navigate, user])

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
													onError={e => {
														// @ts-ignore
														e.target.src = 'https://via.placeholder.com/100'
													}}
												/>
											) : (
												<></>
											)}
										</td>
										<td>{userRecipe.name}</td>
										<td>
											{userRecipe.instructions
												?.split('\n')
												.filter(e => e)
												.map((msg, idx) => (
													<p key={idx}>{msg}</p>
												))}
										</td>
										<td>{userRecipe.area}</td>
										<td>{userRecipe.category}</td>
										<td>
											{userRecipe.id ? (
												<>
													{/* <Link
														to={ROUTES.TO_USER_RECIPE(userRecipe.id)}
														className="btn btn-secondary me-1">
														View
													</Link> */}
													<UserRecipeEditButton {...buttonProps} userRecipe={userRecipe}>
														Edit
													</UserRecipeEditButton>
													<UserRecipeDeleteButton
														{...buttonProps}
														variant="danger"
														userRecipeId={userRecipe.id}>
														Delete
													</UserRecipeDeleteButton>
												</>
											) : (
												<></>
											)}
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
