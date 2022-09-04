import { Navbar } from 'components/Navbar'
import { Routes, Route, useLocation } from 'react-router-dom'
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
	const { currentUser } = useAppContext()

	const location = useLocation()

	const hideFooter = !![ROUTES.LOGIN, ROUTES.REGISTER].find(route => route === location.pathname)

	return (
		<>
			<main className="min-h-100 position-relative">
				<Navbar />

				<Routes>
					{currentUser ? (
						<Route path={ROUTES.HOME} element={<Dashboard />} />
					) : (
						<Route path={ROUTES.HOME} element={<HomePage />} />
					)}
					<Route path={ROUTES.RECIPES} element={<RecipesPage />} />
					<Route path={ROUTES.RECIPE} element={<RecipePage />} />
					<Route path={ROUTES.LOGIN} element={<LoginPage />} />
					<Route path={ROUTES.REGISTER} element={<RegisterPage />} />
				</Routes>

				<Footer hidden={hideFooter} />
			</main>
		</>
	)
}
