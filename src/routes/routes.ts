const ROUTES = {
	HOME: '/',
	LOGIN: '/login',
	REGISTER: '/register',
	MEAL_PLANS: '/meal-plans', // Good
	MEAL_PLAN: '/meal-plan/:id', // SCHEDULED MEALS
	RECIPES: '/recipes',
	RECIPE: '/recipe/:recipeId',
	SHOPPING_LIST: '/shopping-list', // TODO: Part of the meal plan?
	ERROR_404: '*'
}

export default ROUTES
