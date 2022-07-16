import axios from 'axios'

const recipes = {}

const runRequest = async options => {
  try {
    const response = await axios.request(options)
    console.log('response: ', response)
    return response
  } catch (error) {
    console.error(error)
  }
}

recipes.autocomplete = async terms => {
  const options = {
    method: 'GET',
    url: 'https://tasty.p.rapidapi.com/recipes/auto-complete',
    params: { prefix: terms },
    headers: {
      'X-RapidAPI-Key': '0a0819751dmsh72652106d367e15p1b4e02jsn8f435742c495',
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
    },
  }
  return runRequest(options)
}

recipes.list = async ({ from = 0, size = 20, tags = 'under_30_minutes' }) => {
  const options = {
    method: 'GET',
    url: 'https://tasty.p.rapidapi.com/recipes/list',
    params: { from, size, tags },
    headers: {
      'X-RapidAPI-Key': '0a0819751dmsh72652106d367e15p1b4e02jsn8f435742c495',
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
    },
  }
  return runRequest(options)
}

const TastyAPI = { recipes }

export default TastyAPI
