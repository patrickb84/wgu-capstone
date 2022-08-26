
import { Ingredient } from '@/types/Ingredient'
import recipesApi from '../../features/recipe-data/api'
import { isEqual } from 'date-fns'
import { RecipeIngredient } from '../recipe-data/types/RecipeAdapter'

export class MealPlan {
   id: string
   userId: string
   meals: Meal[]
   shoppingList: ShoppingListItem[]

   constructor({ id, userId, meals }: IMealPlan) {
      this.id = id
      this.userId = userId
      this.meals = meals
      this.shoppingList = []
   }

   addMeal(date: Date, recipeId: string, recipeName: string) {
      const uniqueId = `${new Date().getTime()}-${recipeId}`
      this.meals.push({ date, recipeId, recipeName, id: uniqueId })
      console.log(this.meals)
   }

   removeMeal(id: string) {
      this.meals = this.meals.filter(meal => meal.id !== id)
   }

   getMealsForDay(date: Date) {
      let sched = this.meals.filter(meal => isEqual(meal.date, date))
      // console.warn({ sched })
      return sched
   }

   public async deriveShoppingList() {
      let allRecipeIngredients: any[] = await Promise.all(
         this.meals.map(async meal => {
            const recipe = await recipesApi.fetchRecipe(meal.recipeId)
            const ingredients = recipe.ingredients
            return ingredients.map((ingredient: RecipeIngredient) => {
               const shoppingListIngredient: ShoppingListIngredient = {
                  ...ingredient,
                  id: ingredient.id,
                  meta: {
                     recipe: meal.recipeId,
                     recipeName: meal.recipeName,
                     recipeIngredientMeasure: ingredient.measure,
                     mealDate: meal.date
                  }
               }
               return shoppingListIngredient
            })
         })
      )

      const shoppingList: ShoppingListItem[] = []

      allRecipeIngredients.flat(1).forEach((item: ShoppingListIngredient) => {
         const { id, name, meta } = item
         const itemIndex = shoppingList.findIndex(i => i.name === name)
         if (itemIndex === -1) {
            const newItem: ShoppingListItem = {
               id,
               name,
               recipesMeta: [meta]
            }
            shoppingList.push(newItem)
         } else {
            shoppingList[itemIndex].recipesMeta.push(meta)
         }
      })
      console.log({ shoppingList })
      this.shoppingList = shoppingList
      return shoppingList
   }
}

export interface IMealPlan {
   id: string
   userId: string
   meals: Meal[]
}

export interface Meal {
   id: string
   date: Date
   recipeId: string
   recipeName: string
}

interface ShoppingListIngredient {
   id: string
   name: string
   meta: ShoppingListIngredientMeta
}

export interface ShoppingListIngredientMeta {
   recipe: string
   recipeName: string
   recipeIngredientMeasure: string | undefined
   mealDate: Date
}

interface ShoppingListItem extends Ingredient {
   name: string
   recipesMeta: ShoppingListIngredientMeta[]
}
