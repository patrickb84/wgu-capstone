import { IMeasuredIngredient, Recipe } from './Recipe'
import { ScheduledMeal } from './ScheduledMeal'

export interface IGroceryListItemData
	extends Pick<IMeasuredIngredient, 'measure' | 'recipeId' | 'recipeName'> {
	recipeCount: number
}

export interface IGroceryListItem {
	itemName: string
	itemData: IGroceryListItemData[]
	included?: boolean
}

export interface IGroceryList {
	userId: string
	items: IGroceryListItem[]
	scheduledMeals: ScheduledMeal[]
	dateCreated?: Date
	excludedItems?: IGroceryListItem[]
}

export class GroceryList implements IGroceryList {
	userId: string
	items: IGroceryListItem[] = []
	scheduledMeals: ScheduledMeal[] = []
	dateCreated?: Date
	excludedItems?: IGroceryListItem[] = []

	constructor(groceryList: IGroceryList) {
		this.userId = groceryList.userId
		this.items = groceryList.items
		this.scheduledMeals = groceryList.scheduledMeals
		this.dateCreated = groceryList.dateCreated
		this.excludedItems = groceryList.excludedItems
	}

	excludeItem(item: IGroceryListItem) {
		if (!this.excludedItems) {
			this.excludedItems = []
		}
		this.excludedItems.push(item)
		this.items = this.items.filter(groceryListItem => groceryListItem.itemName !== item.itemName)
	}

	static generateGroceryList = async (meals: ScheduledMeal[], userId: string) => {
		return new GroceryList({
			userId,
			items: await GroceryList.createListFromMeals(meals),
			scheduledMeals: meals,
			dateCreated: new Date()
		})
	}

	static createListFromMeals = async (meals: ScheduledMeal[]): Promise<IGroceryListItem[]> => {
		const _recipes = [...new Set(meals.map(meal => meal.recipeId))]
		const recipes = await Promise.all(_recipes.map(id => Recipe.findRecipeById(id)))
		const ingredients = recipes.map(recipe => recipe.ingredients).flat(1)
		const groceryListItems = ingredients.reduce((acc: IGroceryListItem[], ingredient) => {
			const { measure, recipeId, ingredientName, recipeName } = ingredient
			const item = acc.find(item => item.itemName === ingredientName)
			const recipeCount = meals.filter(meal => meal.recipeId === recipeId).length
			if (item) {
				item.itemData.push({
					measure,
					recipeId,
					recipeCount,
					recipeName
				})
			} else {
				acc.push({
					itemName: ingredientName,
					itemData: [
						{
							measure,
							recipeId,
							recipeCount,
							recipeName
						}
					]
				})
			}
			return acc
		}, [])

		groceryListItems.sort((a, b) => a.itemName.localeCompare(b.itemName))
		return groceryListItems
	}
}