import mealdb from 'api/mealdb'
import ApiRecipe from 'types/ApiRecipe'
import Breadcrumbs from 'components/Breadcrumbs'
import Layout from 'components/Layout'
import MidSpinner from 'components/MidSpinner'
import PageHeader, { PageSubtitle, PageTitle } from 'components/PageHeader'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import { useLocation, useParams } from 'react-router-dom'
import { RecipeCard } from './Recipe.Card'
import { Recipe } from '../../types/Recipe'
import { Link } from 'react-router-dom'

export interface IRecipeTypeResultsProps {}

export type RecipeType = 'category' | 'ingredient' | 'area'

export function RecipeTypeResults(props: IRecipeTypeResultsProps) {
	const [recipes, setRecipes] = useState<Recipe[]>([])
	const params = useParams()
	const recipeType = params.recipeType as RecipeType
	const location = useLocation()
	const query = new URLSearchParams(location.search)
	const [isLoading, setIsLoading] = useState(true)
	const [noneFound, setNoneFound] = useState(false)

	const qValue = query.get('q')
	const qTitle = query.get('t')

	useEffect(() => {
		if (!qValue) return
		const fetchRecipes = async () => {
			setIsLoading(true)
			let interimRecipes: any[] = []
			if (recipeType === 'category') {
				interimRecipes = await mealdb.fetchRecipesByCategory(qValue)
			}
			if (recipeType === 'ingredient') {
				interimRecipes = await mealdb.fetchRecipesByIngredients(qValue)
			}
			if (recipeType === 'area') {
				interimRecipes = await mealdb.fetchRecipesByArea(qValue)
			}
			if (!interimRecipes) {
				setNoneFound(true)
				setIsLoading(false)
				return
			}

			const res = await Promise.all(interimRecipes.map(recipe$ => mealdb.fetchRecipe(recipe$.idMeal)))
			const recipes: Recipe[] = res.map((recipe: ApiRecipe) => new Recipe(recipe))
			setRecipes(recipes)
			setIsLoading(false)
		}
		fetchRecipes()
	}, [qValue, recipeType])

	return (
		<Layout>
			<PageHeader variant="secondary">
				<div>
					<Breadcrumbs
						items={[
							{
								to: '/recipes',
								label: 'Recipes'
							}
						]}
					/>
					<PageTitle>{qTitle || 'Nothing here!'}</PageTitle>
					<PageSubtitle>{qValue && `${recipes.length} Results for "${qTitle}" as ${recipeType}`}</PageSubtitle>
				</div>
			</PageHeader>
			<Container className="py-4">
				{isLoading ? (
					<MidSpinner />
				) : (
					<>

						{!recipes.length || noneFound ? (
								<div className="text-center bg-light p-3 py-lg-5">
									<h3 className='font-display mb-4'>
										We couldn't find recipes for {qTitle}!
									</h3>
									<Link to='/recipes' className='btn btn-primary'>
										Back to Recipes
									</Link>
							</div>
						) : (
							<PaginatedItems itemsPerPage={12} items={recipes} />
						)}
					</>
				)}
			</Container>
		</Layout>
	)
}

function Items({ currentItems }: { currentItems: Recipe[] }) {
	return (
		<>
			<Row>
				{currentItems.map((recipe: Recipe) => (
					<React.Fragment key={recipe.id}>
						<Col xs={12} md={4} lg={3} className="mb-4">
							<RecipeCard recipe={recipe} />
						</Col>
					</React.Fragment>
				))}
			</Row>
		</>
	)
}

function PaginatedItems({ itemsPerPage, items }: { itemsPerPage: number; items: Recipe[] }) {
	const [currentItems, setCurrentItems] = useState<Recipe[] | []>([])
	const [pageCount, setPageCount] = useState(0)
	const [itemOffset, setItemOffset] = useState(0)

	useEffect(() => {
		const endOffset = itemOffset + itemsPerPage
		setCurrentItems(items.slice(itemOffset, endOffset))
		setPageCount(Math.ceil(items.length / itemsPerPage))
	}, [itemOffset, itemsPerPage, items])

	// Invoke when user click to request another page.
	const handlePageClick = (event: any) => {
		const newOffset = (event.selected * itemsPerPage) % items.length
		setItemOffset(newOffset)
	}

	return (
		<>
			<div className="mb-4">
				<Items currentItems={currentItems || []} />
			</div>
			<ReactPaginate
				nextLabel="next >"
				onPageChange={handlePageClick}
				pageRangeDisplayed={3}
				marginPagesDisplayed={2}
				pageCount={pageCount}
				previousLabel="< previous"
				pageClassName="page-item"
				pageLinkClassName="page-link"
				previousClassName="page-item"
				previousLinkClassName="page-link"
				nextClassName="page-item"
				nextLinkClassName="page-link"
				breakLabel="..."
				breakClassName="page-item"
				breakLinkClassName="page-link"
				containerClassName="pagination"
				activeClassName="active"
				renderOnZeroPageCount={undefined}
			/>
		</>
	)
}
