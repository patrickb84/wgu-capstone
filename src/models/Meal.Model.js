export default class MealModel {
  ingredients = []

  constructor(apiMeal) {
    const {
      idMeal,
      strMeal,
      strDrinkAlternate,
      strCategory,
      strArea,
      strInstructions,
      strMealThumb,
      strTags,
      strYoutube,
      strSource,
      dateModified,
      dateCreated,
    } = apiMeal

    this.idMeal = idMeal
    this.strMeal = strMeal
    this.strDrinkAlternate = strDrinkAlternate
    this.strCategory = strCategory
    this.strArea = strArea
    this.strInstructions = strInstructions
    this.strMealThumb = strMealThumb
    this.strTags = strTags
    this.strYoutube = strYoutube
    this.strSource = strSource
    this.dateModified = dateModified
    this.dateCreated = dateCreated

    for (let i = 0; i < 20; i++) {
      const ingredient = apiMeal[`strIngredient${i}`]
      const measure = apiMeal[`strMeasure${i}`]
      if (ingredient) {
        this.ingredients.push({ ingredient, measure })
      }
    }
  }
}
