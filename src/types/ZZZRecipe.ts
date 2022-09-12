import mealdb from 'api/mealdb'
import ApiRecipe from 'api/mealdb/types/ApiRecipe'

export interface IRecipezzz {
	id: string
	name: string
	ingredients: IMeasuredIngredientzzz[]
	area?: string
	category?: string
	tags?: string
	description?: string
	instructions?: string[]
	imageUrl?: string
	linkUrl?: string
	youtubeUrl?: string
}

export class Recipezzz implements IRecipezzz {
	id: string
	name: string
	ingredients: IMeasuredIngredientzzz[]
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
		const _ingredients: IMeasuredIngredientzzz[] = []

		for (let i = 1; i <= 20; i++) {
			const name = recipe[`strIngredient${i}`]
			const measure = recipe[`strMeasure${i}`]
			const index = _ingredients.findIndex(ingredient => ingredient.ingredientName === name)
			if (name && index === -1) {
				const ingredient: IMeasuredIngredientzzz = {
					ingredientName: name,
					measure,
					recipeId: recipe.idMeal,
					recipeName: recipe.strMeal
				}
				_ingredients.push(ingredient)
			}
		}
		return _ingredients
	}

	static findRecipeById = async (recipeId: string) => {
		const recipe = await mealdb.fetchRecipe(recipeId)
		console.log(recipe)
		return new Recipezzz(recipe)
	}

	static findRecipesByIds = async (recipeIds: string[]) => {
		const recipes = await Promise.all(recipeIds.map(id => mealdb.fetchRecipe(id)))
		return recipes.map(recipe => new Recipezzz(recipe))
	}

	static findRecipesByCategory = async (categoryName: string) => {
		const recipes: ApiRecipe[] = await mealdb.fetchRecipesByCategory(categoryName)
		return recipes.map(recipe => new Recipezzz(recipe))
	}

	static findRecipesByIngredient = async (ingredientNames: string[]) => {
		const recipes: ApiRecipe[] = await mealdb.fetchRecipesByIngredients(ingredientNames.join(','))
		return recipes.map(recipe => new Recipezzz(recipe))
	}

	static findRecipesByArea = async (areaName: string) => {
		const recipes: ApiRecipe[] = await mealdb.fetchRecipesByArea(areaName)
		return recipes.map(recipe => new Recipezzz(recipe))
	}

	static findRandomRecipe = async () => {
		const recipe: ApiRecipe = await mealdb.fetchRandomRecipe()
		return new Recipezzz(recipe)
	}

	static findRandom10Recipes = async () => {
		const recipes: ApiRecipe[] = await mealdb.fetchRandom10Recipes()
		return recipes.map(recipe => new Recipezzz(recipe))
	}

}

export interface IMeasuredIngredientzzz {
	ingredientName: string
	measure: string
	recipeId: string
	recipeName: string
}
