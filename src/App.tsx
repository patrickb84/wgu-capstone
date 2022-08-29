import { AppNavbar } from 'components/AppNavbar'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from 'pages/HomePage'
import { LoginPage } from 'pages/Auth/LoginPage'
import { RegisterPage } from 'pages/Auth/RegisterPage'
import { ROUTES } from 'routes/AppRouter'
import { useAppContext } from 'providers/AppProvider'
import { Dashboard } from 'pages/Dashboard/DashboardPage'
import { RecipesPage } from 'pages/Recipe/RecipesPage'
import { RecipePage } from 'pages/Recipe/RecipePage'
import { Footer } from 'components/Footer'

export default function App() {
	const { appUser } = useAppContext()

	return (
		<>
			<main>
				<AppNavbar appUser={appUser} />

				<Routes>
					{appUser ? (
						<Route path={ROUTES.HOME} element={<Dashboard />} />
					) : (
						<Route path={ROUTES.HOME} element={<HomePage />} />
					)}
					<Route path={ROUTES.RECIPES} element={<RecipesPage />} />
					<Route path={ROUTES.RECIPE} element={<RecipePage />} />
					<Route path={ROUTES.LOGIN} element={<LoginPage />} />
					<Route path={ROUTES.REGISTER} element={<RegisterPage />} />
				</Routes>

				<Footer />
			</main>
		</>
	)
}
