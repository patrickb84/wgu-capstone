import { RequestConfig } from 'types/RequestConfig'
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
	const data = await request({
		method: 'GET',
		url: `https://themealdb.p.rapidapi.com/lookup.php`,
		params: { i: id },
		headers
	})
	return data.meals[0]
}

const filterRecipes = async (params: any) => {
	const filterConfig: RequestConfig = {
		method: 'GET',
		url: 'https://themealdb.p.rapidapi.com/filter.php',
		params,
		headers
	}
	const data = await request(filterConfig)
	return data.meals
}

export const filterByIngredients = async (ingredients: string) =>
	await filterRecipes({ i: ingredients })

export const filterByCategory = async (category: string) => await filterRecipes({ c: category })

export const filterByArea = async (area: string) => await filterRecipes({ a: area })
