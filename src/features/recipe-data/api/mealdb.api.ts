import { IngredientAdapter, ApiIngredient } from './../types/IngredientAdapter'
import {
   CategoryAdapter,
   ApiCategory
} from '../types/CategoryAdapter'
import request from './request'
import { headers } from './headers'
import { RequestConfig } from '@/types/RequestConfig'
import { RecipeAdapter } from '../types/RecipeAdapter'
import { Recipe } from '@/types/Recipe'

export const fetchCategories = async () => {
   const data = await request({
      method: 'GET',
      url: 'https://themealdb.p.rapidapi.com/categories.php',
      headers
   })
   return data.categories.map(
      (category: ApiCategory) => new CategoryAdapter(category)
   )
}

export const fetchAreas = async () => {
   const data = await request({
      method: 'GET',
      url: 'https://themealdb.p.rapidapi.com/list.php',
      params: { a: 'list' },
      headers
   })
   return data.meals.map((area: string) => area)
}

export const fetchIngredients = async () => {
   const data = await request({
      method: 'GET',
      url: 'https://themealdb.p.rapidapi.com/list.php',
      params: { i: 'list' },
      headers
   })
   return data.meals.map(
      (ingredient: ApiIngredient) => new IngredientAdapter(ingredient)
   )
}

export const fetchRandom10Recipes = async () =>
   await request({
      method: 'GET',
      url: 'https://themealdb.p.rapidapi.com/randomselection.php',
      headers
   })

export const fetchRandomRecipe = async () => {
   const data = await request({
      method: 'GET',
      url: 'https://themealdb.p.rapidapi.com/random.php',
      headers
   })
   const recipe: Recipe = await RecipeAdapter.Init(data.meals[0])
   return recipe
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
   const d = data.meals[0]
   // const ingredients = Recipe.parseIngredients(d)
   // const lookup = await Recipe.lookupIngredients(d)
   // console.warn({ lookup })
   const rec = await RecipeAdapter.Init(d)
   console.warn({ rec })
   return rec
   // return new Recipe(d, ingredients)
}

export const filterRecipes = async (params: any) => {
   const filterConfig: RequestConfig = {
      method: 'GET',
      url: 'https://themealdb.p.rapidapi.com/filter.php',
      params,
      headers
   }
   const data = await request(filterConfig)
   return data.meals.map((recipe: any) =>
      new RecipeAdapter(recipe).lookupIngredients()
   )
}

export const filterByIngredients = async (ingredients: string) =>
   await filterRecipes({ i: ingredients })

export const filterByCategory = async (category: string) =>
   await filterRecipes({ c: category })

export const filterByArea = async (area: string) =>
   await filterRecipes({ a: area })
