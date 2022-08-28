import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'

export const AppRouter = ({ children }: { children: React.ReactNode }) => {
	return <BrowserRouter>{children}</BrowserRouter>
}

export const ROUTES = {
	HOME: '/',
	LOGIN: '/login',
	REGISTER: '/register',
	RECIPES: '/recipes',
}