import { APIRequest } from '../APIRequest'
import { headers } from './config'

export class List extends APIRequest {
  /**
   *
   * @returns
   */
  fetchMealCategories = async () => {
    const options = {
      method: 'GET',
      url: 'https://themealdb.p.rapidapi.com/categories.php',
      headers
    }
    return this.runRequest(options)
  }

  /**
   *
   * @returns
   */
  fetchLatestMeals = async () => {
    const options = {
      method: 'GET',
      url: 'https://themealdb.p.rapidapi.com/latest.php',
      headers: {
        'X-RapidAPI-Key': '0a0819751dmsh72652106d367e15p1b4e02jsn8f435742c495',
        'X-RapidAPI-Host': 'themealdb.p.rapidapi.com'
      }
    }
    return this.runRequest(options)
  }

  /**
   *
   * @returns
   */
  fetchCategories = async () => {
    const options = {
      method: 'GET',
      url: 'https://themealdb.p.rapidapi.com/list.php',
      params: { c: 'list' },
      headers: {
        'X-RapidAPI-Key': '0a0819751dmsh72652106d367e15p1b4e02jsn8f435742c495',
        'X-RapidAPI-Host': 'themealdb.p.rapidapi.com'
      }
    }
    const data = await this.runRequest(options)
    const categories = data.meals

    return categories
  }

  /**
   *
   * @returns
   */
  fetchAreas = async () => {
    const options = {
      method: 'GET',
      url: 'https://themealdb.p.rapidapi.com/list.php',
      params: { a: 'list' },
      headers
    }
    const data = await this.runRequest(options)
    const areas = data.meals

    return areas
  }

  /**
   *
   * @returns
   */
  fetchIngredients = async () => {
    const options = {
      method: 'GET',
      url: 'https://themealdb.p.rapidapi.com/list.php',
      params: { i: 'list' },
      headers
    }
    const data = await this.runRequest(options)
    const ingredients = data.meals

    return ingredients
  }
}

export default new List()
