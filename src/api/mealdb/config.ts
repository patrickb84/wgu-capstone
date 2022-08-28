export const MEALDB_API_HOST = 'themealdb.p.rapidapi.com'

export const headers = {
   'X-RapidAPI-Key': process.env.REACT_APP_MEALDB_API_KEY as string,
   'X-RapidAPI-Host': MEALDB_API_HOST
}
