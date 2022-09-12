import { ErrorPage } from 'pages/Error/ErrorPage'
import { HomePage } from 'pages/Home/HomePage'
import { LoginPage } from 'pages/Login/LoginPage'
import MealPlanTable from 'pages/MealPlans/MealPlan.Table'
import { MealPlanView } from 'pages/MealPlans/MealPlan.View'
import { RecipesMain } from 'pages/Recipes/Recipes.Main'
import { RegisterPage } from 'pages/Register/RegisterPage'
import { Routes, Route } from 'react-router-dom'
import ROUTES from 'routes/routes'

export default function App() {
	return (
		<>
			<Routes>
				<Route path={ROUTES.HOME} element={<HomePage />} />
				<Route path={ROUTES.LOGIN} element={<LoginPage />} />
				<Route path={ROUTES.REGISTER} element={<RegisterPage />} />
				<Route path={ROUTES.MEAL_PLANS} element={<MealPlanTable />} />
				<Route path={ROUTES.MEAL_PLAN} element={<MealPlanView />} />
				<Route path={ROUTES.RECIPES} element={<RecipesMain />} />
				<Route path={'*'} element={<ErrorPage />} />
			</Routes>
		</>
	)
}
