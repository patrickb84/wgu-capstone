import axios from 'axios'
import { runRequest } from './api'

const headers = {
  'X-RapidAPI-Key': '0a0819751dmsh72652106d367e15p1b4e02jsn8f435742c495',
  'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
}

const recipes = {}

recipes.autocomplete = async prefix => {
  console.log('called')
  const options = {
    method: 'GET',
    url: 'https://tasty.p.rapidapi.com/recipes/auto-complete',
    params: { prefix },
    headers,
  }
  const response = await runRequest(options)
  const { results } = response.data
  return results
}

/**
 *
 * @param {*} tags 'under_30_minutes'
 * @param {*} from 0
 * @param {*} size 20
 * @returns
 */
recipes.list = async ({ tags = 'under_30_minutes', from = 0, size = 20 }) => {
  const options = {
    method: 'GET',
    url: 'https://tasty.p.rapidapi.com/recipes/list',
    params: { from, size, tags },
    headers,
  }
  const response = await runRequest(options)
  const { results } = response.data
  return results
}

recipes.listSimilarities = async recipe_id => {
  const options = {
    method: 'GET',
    url: 'https://tasty.p.rapidapi.com/recipes/list-similarities',
    params: { recipe_id },
    headers: {
      'X-RapidAPI-Key': '0a0819751dmsh72652106d367e15p1b4e02jsn8f435742c495',
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
    },
  }
  const response = await runRequest(options)
  const { results } = response.data
  return results
}

recipes.getMoreInfo = async recipe_id => {
  const options = {
    method: 'GET',
    url: 'https://tasty.p.rapidapi.com/recipes/get-more-info',
    params: { id: recipe_id },
    headers: {
      'X-RapidAPI-Key': '0a0819751dmsh72652106d367e15p1b4e02jsn8f435742c495',
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
    },
  }
  return runRequest(options)
}

const tips = {}

/**
 *
 * @param {*} id - recipe
 * @param {*} from
 * @param {*} size
 * @returns
 */
tips.list = async ({ id, from = 0, size = 30 }) => {
  const options = {
    method: 'GET',
    url: 'https://tasty.p.rapidapi.com/tips/list',
    params: { id, from, size },
    headers,
  }
  return runRequest(options)
}

const tags = {}

tags.list = async () => {
  const options = {
    method: 'GET',
    url: 'https://tasty.p.rapidapi.com/tags/list',
    headers,
  }
  return runRequest(options)
}

const feeds = {}

/**
 *
 * @param {string} size - '5'
 * @param {string} timezone '+0700'
 * @param {string} vegetarian 'false'
 * @param {string} from '0'
 * @returns
 */
feeds.list = async ({
  size = '5',
  timezone = '+0700',
  vegetarian = 'false',
  from = '0',
}) => {
  const options = {
    method: 'GET',
    url: 'https://tasty.p.rapidapi.com/feeds/list',
    params: { size, timezone, vegetarian, from },
    headers,
  }
  return runRequest(options)
}

const TastyAPI = { recipes, tips, tags }

export default TastyAPI
