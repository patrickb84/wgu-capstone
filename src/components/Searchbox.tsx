import React, { useEffect, useState } from 'react'
import { Form, InputGroup, ListGroup } from 'react-bootstrap'
import { useCombobox } from 'downshift'
import { Link, useNavigate } from 'react-router-dom'
import { useSearchData } from 'hooks/RecipeDataProvider'
import ROUTES from 'routes/routes'
import bonsole from 'utils/exceptions'

export type SearchItemType = 'Category' | 'Ingredient' | 'Area' | 'Recipe' | 'Separator'

export interface ISearchItem {
	text: string
	type: SearchItemType
	url?: string
	id?: string
}

function getFilter(inputValue: string) {
	return function regularFilter(item: ISearchItem) {
		return !inputValue || item.text.toLowerCase().includes(inputValue) || item.type.toLowerCase().includes(inputValue)
	}
}

export const filterDataByParam = (data: ISearchItem[], param: string) => {
	const filtered = data.filter(getFilter(param.toLowerCase()))
	console.log('filtered', filtered)
	return filtered
}

export const getTypeIcon = (type: SearchItemType) => {
	switch (type) {
		case 'Recipe':
			return 'fa-plate-utensils text-brand'
		case 'Category':
			return 'fa-utensils text-primary'
		case 'Area':
			return 'fa-globe-americas text-secondary'
		case 'Ingredient':
			return 'fa-meat text-tertiary'
		default:
			return ''
	}
}

const Searchbox = () => {
	const searchData = useSearchData()
	const [resultItems, setResultItems] = useState(searchData)
	const [inputValue, setInputValue] = useState('')
	const navigate = useNavigate()

	const { isOpen, getMenuProps, getInputProps, getComboboxProps, highlightedIndex, getItemProps, selectedItem } =
		useCombobox({
			onInputValueChange({ inputValue }: any) {
				console.log('inputValue', inputValue)
				setInputValue(inputValue)
				setResultItems(searchData.filter(getFilter(inputValue.toLowerCase())))
			},
			items: resultItems,
			itemToString(item: any) {
				return item ? item.name : ''
			}
		})

	const handleDisplayResults = () => {
		const resultSlice = resultItems.slice(0, 8)
		let displayResults: ISearchItem[] = []
		const divideResults = (r: ISearchItem[]) => {
			const recipes = r.filter(i => i.type === 'Recipe')
			const categories = r.filter(i => i.type === 'Category')
			const areas = r.filter(i => i.type === 'Area')
			const ingredients = r.filter(i => i.type === 'Ingredient')
			return { recipes, categories, areas, ingredients }
		}

		const { recipes, categories, areas, ingredients } = divideResults(resultSlice)
		const {
			recipes: allRecipes,
			categories: allCategories,
			areas: allAreas,
			ingredients: allIngredients
		} = divideResults(resultItems)

		const createSeperator = (itemsOfType: ISearchItem[], category?: boolean) => {
			const pluralize = category
				? `${itemsOfType.length > 1 ? 'Categories' : 'Category'}`
				: `${itemsOfType[0].type}${itemsOfType.length > 1 ? 's' : ''}`

			const text = `${itemsOfType.length} ${pluralize}`
			return { text, type: 'Separator' } as ISearchItem
		}

		if (recipes.length > 0) {
			displayResults.push(createSeperator(allRecipes))
			displayResults = displayResults.concat(recipes)
		}
		if (categories.length > 0) {
			displayResults.push(createSeperator(allCategories, true))
			displayResults = displayResults.concat(categories)
		}
		if (areas.length > 0) {
			displayResults.push(createSeperator(allAreas))
			displayResults = displayResults.concat(areas)
		}
		if (ingredients.length > 0) {
			displayResults.push(createSeperator(allIngredients))
			displayResults = displayResults.concat(ingredients)
		}

		bonsole.fire('ingredients', ingredients)

		return displayResults
	}

	return (
		<>
			<div className="autocomplete-searchbox position-relative">
				<InputGroup className="mb-1" {...getComboboxProps()}>
					<InputGroup.Text className='bg-brand border-0 text-white'>
						<i className="fas fa-magnifying-glass" />
					</InputGroup.Text>
					<Form.Control placeholder="Find a recipe, category, area or ingredient" {...getInputProps()} />
				</InputGroup>

				{/* Dropdown */}
				<div {...getMenuProps()} className="w-100 position-absolute" style={{ zIndex: 1000 }}>
					{isOpen && resultItems.length > 0 && (
						<ListGroup>
							{handleDisplayResults().map((item, index) => {
								const { text, type, url } = item

								if (type === 'Separator') {
									return (
										<ListGroup.Item key={index} className="bg-light small">
											{text}
										</ListGroup.Item>
									)
								}
								return (
									<Link
										{...getItemProps({ item, index })}
										key={index}
										to={url || '/'}
										style={{ textDecoration: 'none' }}
										state={{ searchTerm: text }}
										replace>
										<ListGroup.Item
											className={`d-flex justify-content-start align-items-center ${
												highlightedIndex === index && selectedItem !== item && 'bg-gray-200'
											} ${selectedItem === item && 'active bg-secondary border-secondary'}`}
											style={{ lineHeight: 0.95 }}>
											<div className="ms-1 text-center" style={{ width: 32, fontSize: '1.25rem' }}>
												<i className={`fad ${getTypeIcon(type)}`} />
											</div>
											<div className="ms-2 me-auto">
												<div className="fw-bold">{item.text}</div>
												<small style={{ opacity: 0.6 }}>{type}</small>
											</div>
										</ListGroup.Item>
									</Link>
								)
							})}
							{resultItems.length && (
								<ListGroup.Item
									className="text-center combobox-see-all-results bg-tertiary text-white"
									as="button"
									onClick={() => navigate(ROUTES.TO_SEARCH(inputValue))}>
									See all results ...
								</ListGroup.Item>
							)}
						</ListGroup>
					)}
				</div>
			</div>
		</>
	)
}

export default Searchbox
