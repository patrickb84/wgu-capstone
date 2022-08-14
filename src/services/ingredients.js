import mealDB from './mealDB'

const recipeService = {}

// should be a model?

recipeService.parseIngredients = async mealId => {
  const ingredients = []

  const recipe = await mealDB.fetchRecipe(mealId)

  for (let i = 1; i <= 20; i++) {
    const ingredient = `strIngredient${i}`
    const measure = `strMeasure${i}`
    if (recipe[ingredient]) {
      ingredients.push({
        ingredient: recipe[ingredient],
        measure: recipe[measure],
      })
    }
  }
  return ingredients
}

recipeService.parseIngredientsFromRecipes = async mealIds => {
  return Promise.all(mealIds.map(id => recipeService.parseIngredients(id)))
}

export default recipeService