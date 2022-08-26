import * as React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'

export const AppRouter = ({ children }: { children: React.ReactNode }) => {
	return <BrowserRouter>{children}</BrowserRouter>
}

export const ROUTES = {
	HOME: '/',
   LOGIN: '/login',
   REGISTER: '/register'
}

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path={ROUTES.HOME} element={<HomePage />} />
         <Route path={ROUTES.LOGIN} element={<LoginPage />} />
         <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
		</Routes>
	)
}
