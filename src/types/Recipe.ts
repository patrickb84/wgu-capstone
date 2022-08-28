import { ApiRecipe } from 'api/mealdb/types/ApiRecipe'

export interface IRecipe {
	id: string
	name: string
	ingredients: MeasuredIngredient[]
	area?: string
	category?: string
	tags?: string
	description?: string
	instructions?: string | string[]
	imageUrl?: string
	linkUrl?: string
	youtubeUrl?: string
}

export class Recipe implements IRecipe {
	id: string
	name: string
	ingredients: MeasuredIngredient[]
	area?: string
	category?: string
	tags?: string
	instructions?: string | string[]
	imageUrl?: string
	linkUrl?: string
	youtubeUrl?: string

	constructor(recipe: ApiRecipe) {
		this.id = recipe.idMeal || 'id not found'
		this.name = recipe.strMeal || 'name not found'
		this.ingredients = this.parseIngredients(recipe)
		this.area = recipe.strArea
		this.category = recipe.strCategory
		this.tags = recipe.strTags
		this.instructions = recipe.strInstructions
		this.imageUrl = recipe.strMealThumb
		this.linkUrl = recipe.strSource
		this.youtubeUrl = recipe.strYoutube
	}

	parseIngredients = (recipe: ApiRecipe | any) => {
		const _ingredients: MeasuredIngredient[] = []

		for (let i = 1; i <= 20; i++) {
			const name = recipe[`strIngredient${i}`]
			const measure = recipe[`strMeasure${i}`]
			const index = _ingredients.findIndex(ingredient => ingredient.name === name)
			if (name && index === -1) {
				const ingredient: MeasuredIngredient = {
					name,
					measure
				}
				_ingredients.push(ingredient)
			}
		}
		return _ingredients
	}
}

export interface MeasuredIngredient {
	name: string
	measure: string
}
