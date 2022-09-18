import mealdb from 'api/mealdb'
import ApiRecipe from 'api/mealdb/types/ApiRecipe'

export interface IRecipe {
	id: string
	name: string
	ingredients: IMeasuredIngredient[]
	area?: string
	category?: string
	instructions?: string[]
	imageUrl?: string
	isUserCreated?: boolean
	linkUrl?: string
}

export class Recipe implements IRecipe {
	id: string
	name: string
	ingredients: IMeasuredIngredient[]
	area?: string
	category?: string
	instructions?: string[]
	imageUrl?: string
	linkUrl?: string

	constructor(recipe: ApiRecipe) {
		this.id = recipe.idMeal || 'id not found'
		this.name = recipe.strMeal || 'name not found'
		this.ingredients = this.parseIngredients(recipe)
		this.area = recipe.strArea
		this.category = recipe.strCategory
		this.instructions = recipe.strInstructions?.split('\r\n').filter(e => e)
		this.imageUrl = recipe.strMealThumb
		this.linkUrl = recipe.strSource
   }

	parseIngredients = (recipe: ApiRecipe | any) => {
		const $ingredients: IMeasuredIngredient[] = []
		for (let i = 1; i <= 20; i++) {
			const name = recipe[`strIngredient${i}`]
			const measure = recipe[`strMeasure${i}`]
			const index = $ingredients.findIndex(ingredient => ingredient.ingredientName === name)
			if (name && index === -1) {
				const ingredient: IMeasuredIngredient = {
					ingredientName: name,
					measure,
					recipeId: recipe.idMeal,
					recipeName: recipe.strMeal
				}
				$ingredients.push(ingredient)
			}
		}
		return $ingredients
	}

	static findRecipeById = async (recipeId: string) => {
		const recipe = await mealdb.fetchRecipe(recipeId)
		console.log(recipe)
		return new Recipe(recipe)
	}

	static findRecipesByIds = async (recipeIds: string[]) => {
		const recipes = await Promise.all(recipeIds.map(id => mealdb.fetchRecipe(id)))
		return recipes.map(recipe => new Recipe(recipe))
	}

	static findRecipesByCategory = async (categoryName: string) => {
		const recipes: ApiRecipe[] = await mealdb.fetchRecipesByCategory(categoryName)
		return recipes.map(recipe => new Recipe(recipe))
	}

	static findRecipesByIngredient = async (ingredientNames: string[]) => {
		const recipes: ApiRecipe[] = await mealdb.fetchRecipesByIngredients(ingredientNames.join(','))
		return recipes.map(recipe => new Recipe(recipe))
	}

	static findRecipesByArea = async (areaName: string) => {
		const recipes: ApiRecipe[] = await mealdb.fetchRecipesByArea(areaName)
		return recipes.map(recipe => new Recipe(recipe))
	}

	static findRandomRecipe = async () => {
		const recipe: ApiRecipe = await mealdb.fetchRandomRecipe()
		return new Recipe(recipe)
	}

	static findRandom10Recipes = async () => {
		const recipes: ApiRecipe[] = await mealdb.fetchRandom10Recipes()
		return recipes.map(recipe => new Recipe(recipe))
	}
}

export interface IMeasuredIngredient {
	ingredientName: string
	measure: string
	recipeId: string
	recipeName: string
	isUserRecipe?: boolean
}
