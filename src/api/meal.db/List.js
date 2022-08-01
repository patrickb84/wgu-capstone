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
      headers,
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
        'X-RapidAPI-Host': 'themealdb.p.rapidapi.com',
      },
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
        'X-RapidAPI-Host': 'themealdb.p.rapidapi.com',
      },
    }
    return this.runRequest(options)
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
      headers,
    }
    return this.runRequest(options)
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
      headers,
    }
    return this.runRequest(options)
  }
}

export default new List()
