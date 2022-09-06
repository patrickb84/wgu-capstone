import mealdb from "api/mealdb"
import { ApiCategory } from "api/mealdb/types/ApiCategory"

export interface ICategory {
	id?: string
	name: string
	description?: string
	imageUrl?: string
}

export class Category implements ICategory {
	id?: string
	name: string
	description?: string
	imageUrl?: string

	constructor(category: ApiCategory) {
		this.id = category.idCategory
		this.name = category.strCategory || 'name not found'
		this.description = category.strCategoryDescription
		this.imageUrl = category.strCategoryThumb
	}

	findAllApiCategories = async () => {
		const categories: ApiCategory[] = await mealdb.fetchCategories()
		return categories.map(category => new Category(category))
	}

	findCategoryByName = async (name: string) => {
		const categories: ICategory[] = await this.findAllApiCategories()
		return categories.find(category => category.name === name)
   }
}
