import { APIRequest } from '../APIRequest'
import { headers } from './config'

export class Search extends APIRequest {
  _url = 'https://themealdb.p.rapidapi.com/search.php'

  /**
   *
   * @param {string} firstLetter i.e. 'a'
   * @returns
   */
  findMealByFirstLetter = async firstLetter => {
    const options = {
      method: 'GET',
      url: this._url,
      params: { f: firstLetter },
      headers,
    }
    return this.runRequest(options)
  }

  /**
   *
   * @param {string} name i.e. 'Arrabiata'
   * @returns
   */
  findMealByName = async name => {
    const options = {
      method: 'GET',
      url: this._url,
      params: { s: name },
      headers,
    }
    return this.runRequest(options)
  }
}

export default new Search()
