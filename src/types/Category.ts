import mealdb from "api/mealdb"
import { ApiCategory } from "types/ApiCategory"

export interface ICategory {
	id?: string
	name: string
	description?: string
	imageUrl?: string
}

export class Category implements ICategory {
	private findAllApiCategories = async () => {
		const categories: ApiCategory[] = await mealdb.fetchCategories()
		return categories.map(category => new Category(category))
	}
	private findCategoryByName = async (name: string) => {
		const categories: ICategory[] = await this.findAllApiCategories()
		return categories.find(category => category.name === name)
   }
	description?: string
	id?: string
	imageUrl?: string
	name: string
	constructor(category: ApiCategory) {
		this.id = category.idCategory
		this.name = category.strCategory || 'name not found'
		this.description = category.strCategoryDescription
		this.imageUrl = category.strCategoryThumb
	}
}
