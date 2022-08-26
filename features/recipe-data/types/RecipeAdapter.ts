import recipesApi from '../api'
import { Ingredient } from '@/types/Ingredient'
import { Recipe } from '@/types/Recipe'
import { ApiRecipe } from './ApiRecipe'

export class RecipeAdapter implements Recipe {
   id: any
   name: string
   metaIngredients: PartialIngredient[] = []
   ingredients: RecipeIngredient[] = []
   category?: string
   area?: string
   tags?: string
   private _apiRecipe: any

   constructor(apiRecipe: ApiRecipe) {
      this._apiRecipe = apiRecipe
      this.id = apiRecipe.idMeal
      this.name = apiRecipe.strMeal || 'Recipe name not found'
      this.category = apiRecipe.strCategory
      this.area = apiRecipe.strArea
      this.tags = apiRecipe.strTags
      this.metaIngredients = this.parseIngredients()
   }

   parseIngredients = () => {
      const metaIngredients: PartialIngredient[] = []
      for (let i = 1; i <= 20; i++) {
         const name = this._apiRecipe[`strIngredient${i}`]
         const measure = this._apiRecipe[`strMeasure${i}`]
         const index = metaIngredients.findIndex(
            ingredient => ingredient.name === name
         )
         if (name && index === -1) {
            const ingredient: PartialIngredient = {
               name,
               measure
            }
            metaIngredients.push(ingredient)
         }
      }
      return metaIngredients
   }

   public async lookupIngredients() {
      const lookupTable: Ingredient[] = await recipesApi.fetchIngredients()
      const ingredients: RecipeIngredient[] = this.metaIngredients.map(
         metaIngredient => {
            const listIndex = lookupTable.findIndex(
               i => i.name === metaIngredient.name
            )
            const ingredient: Partial<RecipeIngredient> = {
               measure: metaIngredient.measure,
               recipeId: this.id
            }
            return listIndex !== -1
               ? ({
                    ...lookupTable[listIndex],
                    ...ingredient
                 } as RecipeIngredient)
               : ({
                    ...metaIngredient,
                    ...ingredient,
                    id: 'id not found'
                 } as RecipeIngredient)
         }
      )
      this.ingredients = ingredients
   }

   public static async Init(apiRecipe: any) {
      const lookupTable: Ingredient[] = await recipesApi.fetchIngredients()
      const ingredients: RecipeIngredient[] = []
      for (let i = 1; i <= 20; i++) {
         const name = apiRecipe[`strIngredient${i}`]

         if (name) {
            const measure = apiRecipe[`strMeasure${i}`]
            const listIndex = lookupTable.findIndex(i => i.name === name)
            if (listIndex !== -1) {
               const ingredient: RecipeIngredient = {
                  ...lookupTable[listIndex],
                  measure: measure || '',
                  recipeId: apiRecipe.idMeal
               }
               ingredients.push(ingredient)
            }
         }
      }

      const recipe: Recipe = new RecipeAdapter(apiRecipe)
      recipe.ingredients = ingredients
      return recipe
   }
}

interface PartialIngredient {
   name: string
   measure: string
}

export interface RecipeIngredient extends Ingredient {
   id: string
   recipeId: string
   name: string
   measure: string
}

