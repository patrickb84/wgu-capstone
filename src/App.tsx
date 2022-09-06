import { Routes, Route } from 'react-router-dom'
import { HomePage } from 'pages/HomePage'
import { LoginPage } from 'pages/Auth/LoginPage'
import { RegisterPage } from 'pages/Auth/RegisterPage'
import { ROUTES } from 'routes/AppRouter'
import { Dashboard } from 'pages/Dashboard/DashboardPage'
import { RecipesPage } from 'pages/Recipes/RecipesPage'
import { RecipePage } from 'pages/Recipe/RecipePage'
import { useUser } from 'providers/UserProvider'

export default function App() {
	const user = useUser()

	return (
		<>
			<Routes>
				{user ? (
					<Route path={ROUTES.HOME} element={<Dashboard />} />
				) : (
					<Route path={ROUTES.HOME} element={<HomePage />} />
				)}
				<Route path={ROUTES.RECIPES} element={<RecipesPage />} />
				<Route path={ROUTES.RECIPE} element={<RecipePage />} />
				<Route path={ROUTES.LOGIN} element={<LoginPage />} />
				<Route path={ROUTES.REGISTER} element={<RegisterPage />} />
			</Routes>
		</>
	)
}
