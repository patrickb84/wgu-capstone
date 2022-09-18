import { RecipeType } from 'pages/Recipes/RecipeTypeResults'

const ROUTES = {
	HOME: '/',
	LOGIN: '/login',
	REGISTER: '/register',
	MEAL_PLANS: '/meal-plans',
	MEAL_PLAN: '/meal-plan/:id',
	TO_MEAL_PLAN: (id: string) => `/meal-plan/${id}`,
	RECIPES: '/recipes',
	RECIPE: '/recipe/:recipeId',
	USER_RECIPE: '/user-recipe/:userRecipeId',
	TO_RECIPE: (recipeId: string) => `/recipe/${recipeId}`,
	// TO_USER_RECIPE: (recipeId: string) => `/user-recipe/${recipeId}`,
	SHOPPING_LIST: '/shopping-list', // TODO: Part of the meal plan?
	ERROR_404: '*',
	SEARCH: '/search',
	TO_SEARCH: (query: string) => `/search?q=${query}`,
	RECIPE_TYPE_VIEW: '/recipe-filter/:recipeType',
	TO_RECIPE_TYPE_VIEW: (recipeType: RecipeType, query: string, title: string) =>
		`/recipe-filter/${recipeType.toLowerCase()}?q=${query}&t=${title}`,
	// USER_RECIPE_DASH: '/my-recipes',
	GROCERY_LIST: '/grocery-list',
	ERROR: '/error',
	HOW_IT_WORKS: '/how-it-works',
}

export default ROUTES
