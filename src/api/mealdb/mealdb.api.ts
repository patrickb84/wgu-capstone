import { IRequestOptions } from 'types/RequestOptions'
import request from './request'
import { headers } from './config'

export const fetchCategories = async () => {
	const data = await request({
		method: 'GET',
		url: 'https://themealdb.p.rapidapi.com/categories.php',
		headers
	})
	return data.categories
}

export const fetchAreas = async () => {
	const data = await request({
		method: 'GET',
		url: 'https://themealdb.p.rapidapi.com/list.php',
		params: { a: 'list' },
		headers
	})
	return data.meals
}

export const fetchIngredients = async () => {
	const data = await request({
		method: 'GET',
		url: 'https://themealdb.p.rapidapi.com/list.php',
		params: { i: 'list' },
		headers
	})
	return data.meals
}

export const fetchRandom10Recipes = async () => {
	const data = await request({
		method: 'GET',
		url: 'https://themealdb.p.rapidapi.com/randomselection.php',
		headers
	})
	return data.meals
}

export const fetchRandomRecipe = async () => {
	const data = await request({
		method: 'GET',
		url: 'https://themealdb.p.rapidapi.com/random.php',
		headers
	})
	return data.meals[0]
}

export const fetchLatestRecipes = async () =>
	await request({
		method: 'GET',
		url: 'https://themealdb.p.rapidapi.com/latest.php',
		headers
	})

export const fetchRecipe = async (id: string | number) => {
	try {
		const data = await request({
			method: 'GET',
			url: `https://themealdb.p.rapidapi.com/lookup.php`,
			params: { i: id },
			headers
		})
		return data.meals[0]
	} catch (error) {
		console.error('🚀 ~ file: api.ts ~ line 68 ~ fetchRecipe ~ error', error)
		throw error
	}
}

export const fetchRecipesByFirstLetter = async (letter: string) => {
	const data = await request({
		method: 'GET',
		url: `https://themealdb.p.rapidapi.com/search.php`,
		params: { f: letter },
		headers
	})
	return data.meals
}

export const fetchAllRecipes = async () => {
	// String.fromCharCode(97 + n)

	const data = await request({
		method: 'GET',
		url: `https://themealdb.p.rapidapi.com/search.php`,
		params: { s: '' },
		headers
	})
	return data.meals
}

const filterRecipes = async (params: any) => {
	const filterConfig: IRequestOptions = {
		method: 'GET',
		url: 'https://themealdb.p.rapidapi.com/filter.php',
		params,
		headers
	}
	const data = await request(filterConfig)
	return data.meals
}

export const fetchRecipesByIngredients = async (ingredients: string) => await filterRecipes({ i: ingredients })

export const fetchRecipesByCategory = async (category: string) => await filterRecipes({ c: category })

export const fetchRecipesByArea = async (area: string) => await filterRecipes({ a: area })
