import ApiRecipe from './ApiRecipe'
import { Recipe } from './Recipe'

import mealdbRecipe from './Recipe.stub.json'

it('should create recipe object with array of ingredients from mealdb API object', () => {
	const recipe = new Recipe(mealdbRecipe as ApiRecipe)
   expect(mealdbRecipe.strIngredient1).toEqual(recipe.ingredients[0].ingredientName)
   expect(mealdbRecipe.strMeasure1).toEqual(recipe.ingredients[0].measure)
})
