import mealdb from 'api/mealdb'
import { ApiRecipe } from 'api/mealdb/types/ApiRecipe'

export interface IRecipe {
	id: string
	name: string
	ingredients: RecipeIngredient[]
	area?: string
	category?: string
	tags?: string
	description?: string
	instructions?: string[]
	imageUrl?: string
	linkUrl?: string
	youtubeUrl?: string
}

export class Recipe implements IRecipe {
	id: string
	name: string
	ingredients: RecipeIngredient[]
	area?: string
	category?: string
	tags?: string
	instructions?: string[]
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
		this.instructions = recipe.strInstructions?.split('\r\n').filter(e => e)
		this.imageUrl = recipe.strMealThumb
		this.linkUrl = recipe.strSource
		this.youtubeUrl = recipe.strYoutube
	}

	parseIngredients = (recipe: ApiRecipe | any) => {
		const _ingredients: RecipeIngredient[] = []

		for (let i = 1; i <= 20; i++) {
			const name = recipe[`strIngredient${i}`]
			const measure = recipe[`strMeasure${i}`]
			const index = _ingredients.findIndex(ingredient => ingredient.name === name)
			if (name && index === -1) {
				const ingredient: RecipeIngredient = {
					name,
					measure,
					recipe: {
						id: recipe.idMeal,
						name: recipe.strMeal,
						imageUrl: recipe.strMealThumb
					}
				}
				_ingredients.push(ingredient)
			}
		}
		return _ingredients
	}

	static findRecipeById = async (recipeId: string) => {
		const recipe = await mealdb.fetchRecipe(recipeId)
		console.log(recipe)
		return new Recipe(recipe)
	}
}

export interface RecipeIngredient {
	name: string
	measure: string
	recipe: RecipeMetadata
}

export interface RecipeMetadata {
	id: string
	name: string
	imageUrl: string | null
}