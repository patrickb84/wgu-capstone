import { APIRequest } from '../APIRequest'
import { headers } from './config'

export class Filter extends APIRequest {
  _url = 'https://themealdb.p.rapidapi.com/filter.php'

  /**
   *
   * @param {string} ingredient i.e. 'chicken_breast'
   * @returns
   */
  filterMainIngredient = async ingredient => {
    const options = {
      method: 'GET',
      url: this._url,
      params: { i: ingredient },
      headers,
    }
    return this.runRequest(options)
  }

  /**
   *
   * @param {string} ingredients comma-separated i.e. 'chicken_breast,garlic,salt'
   * @returns
   */
  filterMultiIngredient = async ingredients => {
    const options = {
      method: 'GET',
      url: this._url,
      params: { i: ingredients },
      headers,
    }
    return this.runRequest(options)
  }

  /**
   *
   * @param {string} category i.e. 'Seafood'
   * @returns
   */
  filterByCategory = async category => {
    const options = {
      method: 'GET',
      url: this._url,
      params: { c: category },
      headers,
    }
    return this.runRequest(options)
  }

  /**
   *
   * @param {string} area i.e. 'Canadian'
   * @returns
   */
  filterByArea = async area => {
    const options = {
      method: 'GET',
      url: this._url,
      params: { a: area },
      headers,
    }
    const data = await this.runRequest(options)
    
    return data.meals
  }
}

export default new Filter()
