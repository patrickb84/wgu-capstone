import mealdb from 'api/mealdb'
import Layout from 'components/Layout'
import { filterDataByParam, getTypeIcon, ISearchItem, SearchItemType } from 'components/Searchbox'
import { useSearchData } from 'hooks/RecipeDataProvider'
import PageHeader, { PageSubtitle, PageTitle } from 'pages/shared/PageHeader'
import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import { useLocation, useNavigate } from 'react-router-dom'
import ROUTES from 'routes/routes'
import { RecipeCard } from './Recipe.Card'
import { RecipeType } from './RecipeTypeResults'
import { Recipe } from './types/Recipe'

export interface ISearchResultsProps {}

export function SearchResults(props: ISearchResultsProps) {
	const [searchResults, setSearchResults] = useState<ISearchItem[]>([])
	const location = useLocation()
	const query = new URLSearchParams(location.search)
	const searchParam = query.get('q')
	const searchData = useSearchData()

	useEffect(() => {
		if (searchParam && searchData) {
			console.log('🚀 ~ useEffect ~ searchParam', searchParam)

			const results = filterDataByParam(searchData, searchParam)
			console.log('🚀 ~ useEffect ~ results', results)
			setSearchResults(results)
		}
	}, [searchParam, searchData])

	return (
		<Layout>
			<PageHeader>
				<div>
					<PageTitle>Search Results</PageTitle>
					<PageSubtitle>
						{searchResults.length} results for "{searchParam}"
					</PageSubtitle>
				</div>
			</PageHeader>
			<Container className="py-4">
				<PaginatedItems itemsPerPage={20} items={searchResults} />
			</Container>
		</Layout>
	)
}

function Items({ currentItems }: { currentItems: ISearchItem[] }) {
	const [recipes, setRecipes] = useState<Recipe[]>([])
	const navigate = useNavigate()

	useEffect(() => {
		const fetchRecipes = async () => {
			const recipes = await Promise.all(
				currentItems
					.filter(item => item.type === 'Recipe')
					.map(item => item.id && mealdb.fetchRecipe(item.id))
			)
			console.log('🚀 ~ fetchRecipes ~ recipes', recipes)

			setRecipes(recipes.map(r => new Recipe(r)))
		}
		fetchRecipes()
	}, [currentItems])

	const RecipeHandler = ({ recipeId }: { recipeId: string | undefined }) => {
		if (!recipeId) return <></>
		const recipeRef = recipes.find(r => r.id === recipeId)
		if (recipeRef) {
			return <RecipeCard recipe={recipeRef} />
		}
		return <></>
	}

	const TypeHandler = ({ item }: { item: ISearchItem }) => {
		let variant = 'primary'
		let icon = getTypeIcon(item.type).split(' ')[0]

		switch (item.type as SearchItemType) {
			case 'Category':
				variant = 'secondary'
				break
			case 'Area':
				variant = 'primary'
				break
			case 'Ingredient':
				variant = 'tertiary'
				break
		}
		const handleClick = () => {
			const url = ROUTES.TO_RECIPE_TYPE_VIEW(
				item.type as RecipeType,
				item.id as string,
				item.text
			)
			navigate(url)
		}
		return (
			<Card
				onClick={handleClick}
				className={`bg-${variant} w-100 h-100 d-flex align-items-center justify-content-center`}
				style={{ minHeight: '23rem' }}>
				<Card.Body className="text-white w-100 h-100 d-flex align-items-center justify-content-center">
					<div className="text-center">
						<i className={`fas ${icon} fa-2x`}></i>
						<h3 className="text-center mt-2">{item.text}</h3>
						<p>{item.type}</p>
					</div>
				</Card.Body>
			</Card>
		)
	}

	return (
		<>
			<Container className="py-4">
				<Row>
					{currentItems.map((item, index) => (
						<Col key={index} xs={12} md={4} lg={3} className="mb-4 d-flex">
							{item.type === 'Recipe' ? (
								<RecipeHandler recipeId={item.id} />
							) : (
								<TypeHandler item={item} />
							)}
						</Col>
					))}
				</Row>
			</Container>
		</>
	)
}

function PaginatedItems({ itemsPerPage, items }: { itemsPerPage: number; items: ISearchItem[] }) {
	const [currentItems, setCurrentItems] = useState<ISearchItem[] | []>([])
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
