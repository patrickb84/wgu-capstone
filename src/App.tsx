import { Dashboard } from 'pages/Dashboard/Dashboard'
import { ErrorPage } from 'pages/Error/ErrorPage'
import GroceryListTable from 'pages/GroceryList/GroceryList.Table'
import { HomePage } from 'pages/Home/HomePage'
import { HowItWorksPage } from 'pages/HowItWorks/HowItWorksPage'
import { LoginPage } from 'pages/Login/LoginPage'
import MealPlanTable from 'pages/MealPlans/MealPlan.Table'
import { MealPlanView } from 'pages/MealPlans/MealPlan.View'
import RecipeDetails from 'pages/Recipes/Recipe.Details'
import { RecipesMain } from 'pages/Recipes/Recipes.Main'
import { RecipeTypeResults } from 'pages/Recipes/RecipeTypeResults'
import { SearchResults } from 'pages/Recipes/SearchResults'
import { RegisterPage } from 'pages/Register/RegisterPage'
import { Routes, Route } from 'react-router-dom'
import ROUTES from 'routes/routes'

export default function App() {
	return (
		<Routes>
			<Route path={ROUTES.HOME} element={<HomePage />} />
			<Route path={ROUTES.LOGIN} element={<LoginPage />} />
			<Route path={ROUTES.REGISTER} element={<RegisterPage />} />
			<Route path={ROUTES.DASHBOARD} element={<Dashboard />}>
				<Route path={ROUTES.MEAL_PLANS} element={<MealPlanTable />} />
				<Route path={ROUTES.MEAL_PLAN} element={<MealPlanView />} />
				<Route path={ROUTES.GROCERY_LIST} element={<GroceryListTable />} />
			</Route>
			<Route path={ROUTES.RECIPES} element={<RecipesMain />} />
			<Route path={ROUTES.RECIPE} element={<RecipeDetails />} />
			<Route path={ROUTES.RECIPE_TYPE_VIEW} element={<RecipeTypeResults />} />
			<Route path={ROUTES.SEARCH} element={<SearchResults />} />
			<Route path={ROUTES.HOW_IT_WORKS} element={<HowItWorksPage />} />

			<Route path={ROUTES.ERROR} element={<ErrorPage />} />

			<Route path={'*'} element={<ErrorPage />} />
		</Routes>
	)
}
