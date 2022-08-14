import axios from 'axios'

const mealDB = {}

async function request(options) {
  try {
    const response = await axios.request(options)
    const { data } = response
    // console.log({ data, response, options })
    return data
  } catch (error) {
    // console.error(error)
    throw MealApiError(error.message, { options })
  }
}

const headers = {
  'X-RapidAPI-Key': '0a0819751dmsh72652106d367e15p1b4e02jsn8f435742c495',
  'X-RapidAPI-Host': 'themealdb.p.rapidapi.com',
}

mealDB.fetchCategories = async () => {
  const data = await request()
  const categories = data.meals
  return categories
}

mealDB.fetchAreas = async () => {
  const data = await request({
    method: 'GET',
    url: 'https://themealdb.p.rapidapi.com/list.php',
    params: { a: 'list' },
    headers,
  })
  const areas = data.meals
  return areas
}

mealDB.fetchIngredients = async () => {
  const data = await request({
    method: 'GET',
    url: 'https://themealdb.p.rapidapi.com/list.php',
    params: { i: 'list' },
    headers,
  })
  const ingredients = data.meals
  return ingredients
}

mealDB.filterRecipesByArea = async area => {
  return await request({
    method: 'GET',
    url: 'https://themealdb.p.rapidapi.com/filter.php',
    params: { a: area },
    headers,
  })
}

mealDB.fetchRandom10Recipes = async () => {
  return await request({
    method: 'GET',
    url: 'https://themealdb.p.rapidapi.com/randomselection.php',
    headers,
  })
}

mealDB.fetchLatestRecipes = async () => {
  return await request({
    method: 'GET',
    url: 'https://themealdb.p.rapidapi.com/latest.php',
    headers,
  })
}

mealDB.fetchRecipe = async id => {
  return await request({
    method: 'GET',
    url: 'https://themealdb.p.rapidapi.com/lookup.php',
    params: { i: id },
    headers,
  })
}

/**
 * Filter by ingredient, i.e. 'chicken_breast'
 * @param {string} ingredient
 * @returns
 */
mealDB.filterRecipesByMainIngredient = async ingredient => {
  return await request({
    method: 'GET',
    url: 'https://themealdb.p.rapidapi.com/filter.php',
    params: { i: ingredient },
    headers,
  })
}

/**
 * Find by comma-separated ingredients i.e. 'chicken_breast,garlic,salt'
 * @param {string} ingredients
 * @returns
 */
mealDB.filterRecipesByIngredients = async ingredients => {
  return await request({
    method: 'GET',
    url: 'https://themealdb.p.rapidapi.com/filter.php',
    params: { i: ingredients },
    headers,
  })
}

/**
 * Filter by category, i.e. 'Seafood'
 * @param {string} category
 * @returns
 */
mealDB.filterRecipesByCategory = async category => {
  return await request({
    method: 'GET',
    url: 'https://themealdb.p.rapidapi.com/filter.php',
    params: { c: category },
    headers,
  })
}

export default mealDB

class MealApiError extends Error {
  constructor(message, data) {
    super(message)
    this.name = 'MealApiError'
    this.data = data
  }
}
