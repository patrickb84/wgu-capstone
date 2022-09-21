import mealdb from 'api/mealdb'
import { ApiIngredient } from 'types/ApiIngredient'

export interface IIngredient {
	id?: string
	name: string
	description?: string
	type?: string
}

export class Ingredient implements IIngredient {
	private fetchApiIngredients = async () => {
		const ingredients: ApiIngredient[] = await mealdb.fetchIngredients()
		return ingredients.map(ingredient => new Ingredient(ingredient))
	}
	private findIngredientByName = async (name: string) => {
		const ingredients: IIngredient[] = await this.fetchApiIngredients()
		return ingredients.find(ingredient => ingredient.name === name)
	}
	description?: string
	id?: string
	name: string
	type?: string

	constructor(ingredient: ApiIngredient) {
		this.id = ingredient.idIngredient
		this.name = ingredient.strIngredient || 'name not found'
		this.description = ingredient.strDescription
		this.type = ingredient.strType
	}
}
