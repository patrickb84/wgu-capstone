import { Routes, Route } from 'react-router-dom'
import { HomePage } from 'pages/HomePage'
import { LoginPage } from 'pages/Auth/LoginPage'
import { RegisterPage } from 'pages/Auth/RegisterPage'
import { ROUTES } from 'routes/AppRouter'
import { Dashboard } from 'pages/Dashboard/DashboardPage'
import { RecipesPage } from 'pages/Recipes/RecipesPage'
import { RecipePage } from 'pages/Recipe/RecipePage'
import { useUser } from 'providers/UserProvider'
import { MealPlanProvider } from 'providers/MealPlanProvider'
import { GroceryListPage } from 'pages/GroceryList/GroceryListPage'

export default function App() {
	const user = useUser()

	return (
		<>
			<MealPlanProvider user={user}>
				<Routes>
					<Route path={ROUTES.HOME} element={<HomePage />} />
					<Route path={ROUTES.MEALPLAN} element={<Dashboard />} />
					<Route path={ROUTES.RECIPES} element={<RecipesPage />} />
					<Route path={ROUTES.RECIPE} element={<RecipePage />} />
					<Route path={ROUTES.LOGIN} element={<LoginPage />} />
					<Route path={ROUTES.REGISTER} element={<RegisterPage />} />
					<Route path={ROUTES.GROCERYLIST} element={<GroceryListPage />} />
				</Routes>
			</MealPlanProvider>
		</>
	)
}
