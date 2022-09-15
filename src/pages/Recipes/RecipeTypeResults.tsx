import mealdb from 'api/mealdb'
import ApiRecipe from 'api/mealdb/types/ApiRecipe'
import Layout from 'components/Layout'
import PageHeader, { PageSubtitle, PageTitle } from 'pages/shared/PageHeader'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import { useLocation, useParams } from 'react-router-dom'
import bonsole from 'utils/exceptions'
import { RecipeCard } from './Recipe.Card'
import { Recipe } from './types/Recipe'

export interface IRecipeTypeResultsProps {}

export type RecipeType = 'category' | 'ingredient' | 'area'

export function RecipeTypeResults(props: IRecipeTypeResultsProps) {
	const [recipes, setRecipes] = useState<Recipe[]>([])
	const params = useParams()
	const recipeType = params.recipeType as RecipeType
	const location = useLocation()
	const query = new URLSearchParams(location.search)

	const qValue = query.get('q')
	const qTitle = query.get('t')

	useEffect(() => {
		if (!qValue) return
		const fetchRecipes = async () => {
			let interimRecipes: any[] = []
			if (recipeType === 'category') {
				interimRecipes = await mealdb.fetchRecipesByCategory(qValue)
			}
			if (recipeType === 'ingredient') {
				bonsole.info('fetchRecipesByIngredient', qValue)
				interimRecipes = await mealdb.fetchRecipesByIngredients(qValue)
			}
			if (recipeType === 'area') {
				interimRecipes = await mealdb.fetchRecipesByArea(qValue)
			}
			const res = await Promise.all(interimRecipes.map(recipe$ => mealdb.fetchRecipe(recipe$.idMeal)))
			const recipes: Recipe[] = res.map((recipe: ApiRecipe) => new Recipe(recipe))
			setRecipes(recipes)
		}
		fetchRecipes()
	}, [qValue, recipeType])

	console.log('🚀 ~ RecipeTypeResults ~ recipes', recipes)

	return (
		<Layout>
			<PageHeader variant="secondary">
				<div>
					<PageTitle>{qTitle || 'Nothing here!'}</PageTitle>
					<PageSubtitle>{qValue && `${recipes.length} Results for "${qTitle}" as ${recipeType}`}</PageSubtitle>
				</div>
			</PageHeader>
			<Container className="py-4">
				{!recipes.length ? (
					<div className="bg-light p-3">No recipes found.</div>
				) : (
					<PaginatedItems itemsPerPage={12} items={recipes} />
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
		console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`)
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
