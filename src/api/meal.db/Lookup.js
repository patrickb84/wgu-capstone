import { APIRequest } from '../APIRequest'
import { headers } from './config'

export class Lookup extends APIRequest {
  /**
   *
   * @param {string} id i.e. '52772'
   * @returns
   */
  fetchMealDetails = async id => {
    const options = {
      method: 'GET',
      url: 'https://themealdb.p.rapidapi.com/lookup.php',
      params: { i: id },
      headers,
    }
    return this.runRequest(options)
  }

  /**
   *
   * @returns
   */
  fetchRandomMeal = async () => {
    const options = {
      method: 'GET',
      url: 'https://themealdb.p.rapidapi.com/random.php',
      headers,
    }
    return this.runRequest(options)
  }

  /**
   *
   * @returns
   */
  fetchRandomMeals10 = async () => {
    const options = {
      method: 'GET',
      url: 'https://themealdb.p.rapidapi.com/randomselection.php',
      headers,
    }
    return this.runRequest(options)
  }
}

export default new Lookup()
